import { createClient } from '@supabase/supabase-js';
import { analyzeAndStageYoutubeVideo } from './_youtube-analyzer.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export default async function handler(req, res) {
  const { callback_query, message: textMessage } = req.body || {};
  
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const deployHook = process.env.VERCEL_DEPLOY_HOOK;

  if (!botToken) {
    console.error("Missing TELEGRAM_BOT_TOKEN environment variable.");
    return res.status(500).send('Bot token missing');
  }

  // Intercept and handle text messages containing YouTube links
  if (textMessage && textMessage.text) {
    const text = textMessage.text.trim();
    const chatId = textMessage.chat.id;

    const urlMatch = text.match(/https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/[^\s]+/i);
    if (urlMatch) {
      const youtubeUrl = urlMatch[0];
      
      // Send processing alert
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `⏳ *Analyzing YouTube Video...*\nFetching transcript and summarizing with Gemini AI. This will take a few seconds...`,
          parse_mode: 'Markdown'
        })
      });

      // Directly call YouTube analyzer logic to avoid self-HTTP routing delays and Vercel container freezing
      const geminiKey = process.env.GEMINI_API_KEY;
      try {
        await analyzeAndStageYoutubeVideo(youtubeUrl, chatId, botToken, geminiKey);
      } catch (err) {
        console.error("Direct YouTube analysis failed:", err.message);
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `❌ <b>Analysis Failed</b>:\nUnable to summarize the YouTube video. Details: ${err.message}`,
            parse_mode: 'HTML'
          })
        });
      }

      return res.status(200).send('OK');
    }
  }

  if (!callback_query) {
    console.log("Received non-callback request on webhook.");
    return res.status(200).send('OK');
  }

  const { data, message, id: queryId } = callback_query;
  const messageId = message.message_id;
  const chatId = message.chat.id;

  try {
    // 1. Answer Callback Query to stop loading animation in Telegram
    await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callback_query_id: queryId })
    });

    if (data.startsWith('accept_')) {
      const pendingId = data.replace('accept_', '');
      console.log(`Callback Accept received for ID: ${pendingId}`);

      // Fetch staging article details
      const { data: article, error: fetchErr } = await supabase
        .from('pending_articles')
        .select('*')
        .eq('id', pendingId)
        .maybeSingle();

      if (fetchErr || !article) {
        console.warn("Could not find pending article details:", fetchErr?.message);
        
        await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: `⚠️ *Error*: This pending article has already been processed or deleted.`,
            parse_mode: 'Markdown'
          })
        });
        return res.status(200).send('OK');
      }

      // Insert into production ai_articles table
      const { error: insertErr } = await supabase
        .from('ai_articles')
        .insert([{
          title: article.title,
          summary: article.summary,
          article_url: article.article_url,
          source_name: article.source_name,
          published_at: article.published_at,
          image_url: article.image_url,
          category: article.category || 'Models'
        }]);

      if (insertErr) {
        console.error("Failed to insert into ai_articles:", insertErr.message);
        throw insertErr;
      }

      // Delete from pending table
      await supabase
        .from('pending_articles')
        .delete()
        .eq('id', pendingId);

      // Edit Telegram message to show confirmation
      await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          text: `✅ <b>Article Accepted & Saved Live!</b>\n\n<b>Source</b>: ${article.source_name}\n<b>Title</b>: ${article.title}\n\nThe news feed has been updated successfully.`,
          parse_mode: 'HTML'
        })
      });

    } else if (data.startsWith('deploy_')) {
      const pendingId = data.replace('deploy_', '');
      console.log(`Callback Go Live/Deploy received for ID: ${pendingId}`);

      if (!deployHook) {
        console.error("Missing VERCEL_DEPLOY_HOOK in environment.");
        
        await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text: `⚠️ *Error*: VERCEL_DEPLOY_HOOK env variable is missing on Vercel.`,
            parse_mode: 'Markdown'
          })
        });
        return res.status(200).send('OK');
      }

      // 1. Process ingestion first if article is still in pending staging
      const { data: article } = await supabase
        .from('pending_articles')
        .select('*')
        .eq('id', pendingId)
        .maybeSingle();

      let articleTitle = 'staged updates';
      if (article) {
        articleTitle = article.title;
        // Save to live DB
        await supabase.from('ai_articles').insert([{
          title: article.title,
          summary: article.summary,
          article_url: article.article_url,
          source_name: article.source_name,
          published_at: article.published_at,
          image_url: article.image_url,
          category: article.category || 'Models'
        }]);
        // Remove from pending
        await supabase.from('pending_articles').delete().eq('id', pendingId);
      }

      // 2. Trigger Vercel deploy hook HTTP POST
      console.log("Triggering Vercel rebuild...");
      const deployRes = await fetch(deployHook, { method: 'POST' });
      if (!deployRes.ok) {
        const deployErr = await deployRes.text();
        console.error("Deploy hook failed:", deployErr);
        throw new Error("Failed to contact Vercel build trigger.");
      }

      // Edit Telegram message to show confirmation
      await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          text: `🚀 <b>Ingested & Production Deploy Triggered!</b>\n\n<b>Article</b>: ${articleTitle}\n\nThe Vercel build is now compiling. Your update will go live in 1-2 minutes!`,
          parse_mode: 'HTML'
        })
      });
    }

    return res.status(200).send('OK');

  } catch (error) {
    console.error("Webhook processing error:", error);
    return res.status(500).send(`Error: ${error.message}`);
  }
}
