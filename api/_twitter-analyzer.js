import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

function cleanTweetText(html) {
  if (!html) return '';
  const textMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  if (!textMatch) return '';
  let text = textMatch[1];
  text = text.replace(/<[^>]*>/g, '');
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return text;
}

export async function analyzeAndStageTwitterPost(url, chatId, botToken, geminiKey, userProvidedTag = null, directPost = false) {
  // Extract handle and tweet ID
  const match = url.match(/https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/([a-zA-Z0-9_]+)\/status\/(\d+)/i);
  if (!match) {
    throw new Error("Invalid Twitter/X URL format. Expected: https://x.com/username/status/123456789");
  }

  const username = match[1];
  const tweetId = match[2];
  const cleanUrl = `https://x.com/${username}/status/${tweetId}`;

  let tweetText = "Trending tweet update.";
  let authorName = username;

  // 1. Fetch metadata from official public oEmbed API
  try {
    console.log(`Fetching Twitter OEmbed for: ${cleanUrl}`);
    const oembedRes = await fetch(`https://publish.twitter.com/oembed?url=${encodeURIComponent(cleanUrl)}`);
    if (oembedRes.ok) {
      const metadata = await oembedRes.json();
      authorName = metadata.author_name || username;
      tweetText = cleanTweetText(metadata.html) || tweetText;
    }
  } catch (err) {
    console.warn("Failed to fetch tweet from oEmbed API:", err.message);
  }

  // 2. Determine Tag: User provided tag takes top priority
  let tag = userProvidedTag ? userProvidedTag.trim() : '#AI';
  if (!tag.startsWith('#')) {
    tag = '#' + tag;
  }

  let summary = tweetText;

  // 3. Summarize with Gemini if key is provided and needed
  if (geminiKey) {
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

      const prompt = `You are a professional AI news editor and tech analyst.
Analyze the following text of an X (Twitter) post related to technology, machine learning, software, or AI.
Generate a concise, developer-focused 1-sentence summary of the tweet (max 30 words) and identify the most relevant technical hashtag (e.g. #AI, #Agents, #Coding, #Models, #Infra, #Learning, #Future).
Respond ONLY with a valid JSON object matching this exact schema:
{
  "summary": "Concise developer-focused summary of the post",
  "tag": "#HashtagCategory"
}
Do not write any markdown code blocks, backticks, or intro/outro text. Just return the raw JSON string.

Tweet Content:
${tweetText}
`;

      console.log("Analyzing tweet with Gemini...");
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      let cleanJson = responseText.trim();
      if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
      }

      const parsed = JSON.parse(cleanJson);
      if (parsed.summary) summary = parsed.summary;
      // Only use Gemini's tag if user didn't supply their own
      if (!userProvidedTag && parsed.tag) {
        tag = parsed.tag.startsWith('#') ? parsed.tag : '#' + parsed.tag;
      }
    } catch (err) {
      console.warn("Gemini tweet analysis failed, using fallback:", err.message);
    }
  }

  // 4. Check for duplicates in live trending_tweets
  const { data: exists } = await supabase
    .from('trending_tweets')
    .select('id')
    .eq('tweet_url', cleanUrl)
    .maybeSingle();

  if (exists) {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `ℹ️ <b>Duplicate Skipped</b>:\nThis tweet by @${authorName} is already live in your Trending section under tag <code>${tag}</code>.`,
        parse_mode: 'HTML'
      })
    });
    return { title: `Tweet by @${authorName}`, summary, tag };
  }

  // 5. If Direct Post is requested (e.g. via /post command) -> Insert directly to trending_tweets!
  if (directPost) {
    console.log(`Directly inserting tweet to trending_tweets: ${cleanUrl} (${tag})`);
    const { data: inserted, error: insErr } = await supabase
      .from('trending_tweets')
      .insert([{
        tag: tag,
        tweet_url: cleanUrl,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (insErr) {
      throw new Error(`Failed to insert into trending_tweets: ${insErr.message}`);
    }

    const text = `🚀 <b>Tweet Posted Live to Trending!</b>\n\n` +
      `<b>Author</b>: @${authorName}\n` +
      `<b>Hashtag</b>: <code>${tag}</code>\n` +
      `<b>URL</b>: ${cleanUrl}\n\n` +
      `<b>Content Preview</b>:\n"${tweetText}"\n\n` +
      `✅ <i>Visible live now at wenzdaylab.in/trending</i>`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🌐 View on WenzdayLab', url: 'https://www.wenzdaylab.in/trending' },
              { text: '🗑️ Delete from Live', callback_data: `delete_tweet_${inserted.id}` }
            ]
          ]
        }
      })
    });

    return { title: `Tweet by @${authorName}`, summary, tag };
  }

  // 6. Otherwise (Normal sharing from mobile) -> Stage in pending_articles and send 1-tap confirmation button!
  const { data: pendingExists } = await supabase
    .from('pending_articles')
    .select('id')
    .eq('article_url', cleanUrl)
    .maybeSingle();

  let savedId = pendingExists?.id;

  if (!pendingExists) {
    const { data: saved, error: stageErr } = await supabase
      .from('pending_articles')
      .insert([{
        title: `Tweet by @${authorName}`,
        summary: summary,
        article_url: cleanUrl,
        source_name: `Tweet::${tag}`,
        published_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (stageErr) {
      throw new Error(`Failed to stage pending tweet: ${stageErr.message}`);
    }
    savedId = saved.id;
  } else {
    const { error: updateErr } = await supabase
      .from('pending_articles')
      .update({
        title: `Tweet by @${authorName}`,
        summary: summary,
        source_name: `Tweet::${tag}`,
        published_at: new Date().toISOString()
      })
      .eq('id', savedId);

    if (updateErr) {
      throw new Error(`Failed to update pending tweet: ${updateErr.message}`);
    }
  }

  // 7. Send Telegram interactive message with 1-tap Post button
  const text = `🐦 <b>New X / Twitter Post Received!</b>\n\n` +
    `<b>Author</b>: @${authorName}\n` +
    `<b>Hashtag</b>: <code>${tag}</code>\n` +
    `<b>URL</b>: ${cleanUrl}\n\n` +
    `<b>Tweet Preview</b>:\n"${tweetText}"\n\n` +
    `Post this tweet live to WenzdayLab Trending?`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🚀 Post Live to Trending', callback_data: `accept_${savedId}` },
            { text: '❌ Reject & Discard', callback_data: `reject_${savedId}` }
          ]
        ]
      }
    })
  });

  return { title: `Tweet by @${authorName}`, summary, tag };
}
