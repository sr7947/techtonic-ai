import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default async function handler(req, res) {
  const { url, chat_id } = req.method === 'POST' ? req.body : req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing youtube video url parameter." });
  }

  const chatId = chat_id || process.env.TELEGRAM_CHAT_ID;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!botToken || !chatId) {
    return res.status(500).json({ error: "Telegram bot token or chat ID is missing." });
  }

  if (!geminiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured in Vercel environment variables." });
  }

  const videoId = getYouTubeId(url);
  if (!videoId) {
    return res.status(400).json({ error: "Invalid YouTube URL format." });
  }

  try {
    let transcriptText = "";
    let fetchedMetadata = null;

    // 1. Fetch transcript from unblocked public API (bypasses YouTube serverless IP blocks)
    try {
      console.log(`Fetching transcript from public API for videoId: ${videoId}`);
      const transcriptRes = await fetch(`https://youtube-transcript.ai/transcript/${videoId}.txt`);
      if (transcriptRes.ok) {
        const rawText = await transcriptRes.text();
        const lines = rawText.split('\n');
        // Extract text after the header metadata
        transcriptText = lines.slice(8).join('\n');
        console.log(`Transcript fetched successfully! Length: ${transcriptText.length} characters.`);
      } else {
        throw new Error(`Public transcript API returned status: ${transcriptRes.status}`);
      }
    } catch (err) {
      console.warn("Transcript extraction failed, falling back to official oEmbed metadata:", err.message);
      // Fallback to official oEmbed metadata API (does not block datacenter IPs)
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (oembedRes.ok) {
        fetchedMetadata = await oembedRes.json();
      }
    }

    if (!transcriptText && !fetchedMetadata) {
      throw new Error("Unable to retrieve transcript or video metadata from YouTube.");
    }

    // 2. Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

    // 3. Compile prompt
    let prompt = "";
    if (transcriptText) {
      prompt = `You are a professional AI news editor and tech analyst. 
Based on the following transcript of a YouTube video, extract the most important AI announcements, tools, news, or developer insights.
Generate a compelling news article title and a summary formatted as 3-4 key bullet points using the '•' character and newlines.
Also generate a short 6-8 word prompt for an AI image generator describing a clean, modern, copyright-free high-tech illustration related to this topic.
Respond ONLY with a valid JSON object matching this exact schema:
{
  "title": "A short, catchy, professional title describing the news",
  "summary": "• First key point about what is new.\\n• Second key point about why it matters.\\n• Third key point with specific details.",
  "image_prompt": "A short, descriptive, copyright-free tech illustration concept prompt"
}
Do not write any markdown code blocks, backticks, or intro/outro text. Just return the raw JSON string.

Transcript:
${transcriptText.slice(0, 15000)}
`;
    } else {
      prompt = `You are a professional AI news editor and tech analyst. 
Based on the following YouTube video title, generate a compelling news article title and a summary formatted as 3-4 key bullet points using the '•' character and newlines.
Also generate a short 6-8 word prompt for an AI image generator describing a clean, modern, copyright-free high-tech illustration related to this topic.
Respond ONLY with a valid JSON object matching this exact schema:
{
  "title": "A short, catchy, professional title describing the news",
  "summary": "• First key point about what is new.\\n• Second key point about why it matters.\\n• Third key point with specific details.",
  "image_prompt": "A short, descriptive, copyright-free tech illustration concept prompt"
}
Do not write any markdown code blocks, backticks, or intro/outro text. Just return the raw JSON string.

Video Title: ${fetchedMetadata.title}
Channel Author: ${fetchedMetadata.author_name}
`;
    }

    // 4. Run LLM summary
    console.log("Analyzing content with Gemini...");
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    let cleanJson = responseText.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
    }

    let parsedNews;
    try {
      parsedNews = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Failed to parse Gemini output as JSON. Output was:", responseText);
      throw new Error("AI analysis did not return a valid JSON payload.");
    }

    // Generate a beautiful, copyright-free high-tech illustration based on Gemini's image_prompt
    const cleanPrompt = (parsedNews.image_prompt || parsedNews.title || 'futuristic artificial intelligence concept')
      .replace(/[^\w\s-]/g, '')
      .trim();
    const generatedImageUrl = `https://image.pollinations.ai/p/${encodeURIComponent(cleanPrompt + ', premium high-tech concept illustration, dark cyber navy and gold theme, minimalist 3d render')}?width=800&height=450&nologo=true`;

    // 5. Stage in pending_articles table
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Check if it already exists in live database
    const { data: exists } = await supabase
      .from('ai_articles')
      .select('id')
      .eq('article_url', videoUrl)
      .maybeSingle();

    if (exists) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `ℹ️ *Duplicate Skipped*:\nThis YouTube video ("${parsedNews.title}") is already present in your live database.`,
          parse_mode: 'Markdown'
        })
      });
      return res.status(200).json({ success: true, message: "Duplicate skipped." });
    }

    // Check if it already exists in pending staging
    const { data: pendingExists } = await supabase
      .from('pending_articles')
      .select('id')
      .eq('article_url', videoUrl)
      .maybeSingle();

    let savedId = pendingExists?.id;

    if (!pendingExists) {
      // Insert into pending staging
      const { data: saved, error: stageErr } = await supabase
        .from('pending_articles')
        .insert([{
          title: parsedNews.title,
          summary: parsedNews.summary,
          article_url: videoUrl,
          source_name: 'YouTube',
          image_url: generatedImageUrl,
          published_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (stageErr) {
        throw new Error(`Failed to save pending article: ${stageErr.message}`);
      }
      savedId = saved.id;
    } else {
      // Update existing pending entry
      const { error: updateErr } = await supabase
        .from('pending_articles')
        .update({
          title: parsedNews.title,
          summary: parsedNews.summary,
          image_url: generatedImageUrl,
          published_at: new Date().toISOString()
        })
        .eq('id', savedId);

      if (updateErr) {
        throw new Error(`Failed to update pending article: ${updateErr.message}`);
      }
    }

    // 6. Send the Telegram CMS message with action buttons
    const text = `🔔 *New YouTube AI Analysis!*\n\n*Source*: YouTube\n*Video Link*: ${url}\n\n*Title*: ${parsedNews.title}\n*Summary*: ${parsedNews.summary}\n\nPublish this video summary to the live portal?`;
    
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✅ Accept & Save to DB', callback_data: `accept_${savedId}` },
              { text: '🚀 Go Live (Deploy)', callback_data: `deploy_${savedId}` }
            ]
          ]
        }
      })
    });

    return res.status(200).json({ success: true, article: parsedNews });

  } catch (error) {
    console.error("YouTube analysis failed:", error.message);
    
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `❌ *Analysis Failed*:\nUnable to summarize the YouTube video. Details: ${error.message}`,
        parse_mode: 'Markdown'
      })
    });

    return res.status(500).json({ error: error.message });
  }
}
