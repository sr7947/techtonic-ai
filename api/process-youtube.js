import { YoutubeTranscript } from 'youtube-transcript';
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

async function getYouTubeMetadata(videoId) {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
    
    const titleMatch = html.match(/<meta name="title" content="([^"]+)"/i) || html.match(/<title>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/i) || html.match(/<meta property="og:description" content="([^"]+)"/i);
    
    return {
      title: titleMatch ? titleMatch[1] : 'YouTube Video',
      description: descMatch ? descMatch[1] : ''
    };
  } catch (e) {
    console.error("Failed to fetch metadata:", e.message);
    return null;
  }
}

export default async function handler(req, res) {
  // Allow POST requests (e.g. from our webhook) or GET (for browser tests)
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

    // 1. Try to fetch YouTube transcript first
    try {
      console.log(`Fetching transcript for videoId: ${videoId}`);
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      transcriptText = transcript.map(entry => entry.text).join(' ');
    } catch (err) {
      console.warn("Transcript fetch failed, falling back to page metadata scraping:", err.message);
      fetchedMetadata = await getYouTubeMetadata(videoId);
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
Generate a compelling news article title and a 2-3 sentence summary explaining the core message.
Respond ONLY with a valid JSON object matching this exact schema:
{
  "title": "A short, catchy, professional title describing the news",
  "summary": "A 2-3 sentence overview explaining what is new, why it matters, and the core details."
}
Do not write any markdown code blocks, backticks, or intro/outro text. Just return the raw JSON string.

Transcript:
${transcriptText.slice(0, 10000)} // Slice to prevent token limit issues
`;
    } else {
      prompt = `You are a professional AI news editor and tech analyst. 
Based on the following YouTube video metadata, extract the most important AI announcements, tools, news, or developer insights.
Generate a compelling news article title and a 2-3 sentence summary explaining the core message.
Respond ONLY with a valid JSON object matching this exact schema:
{
  "title": "A short, catchy, professional title describing the news",
  "summary": "A 2-3 sentence overview explaining what is new, why it matters, and the core details."
}
Do not write any markdown code blocks, backticks, or intro/outro text. Just return the raw JSON string.

Video Title: ${fetchedMetadata.title}
Video Description: ${fetchedMetadata.description}
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

    // 5. Stage in pending_articles table
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    // Check if it already exists in live database
    const { data: exists } = await supabase
      .from('ai_articles')
      .select('id')
      .eq('article_url', videoUrl)
      .maybeSingle();

    if (exists) {
      // Notify user that it is already live
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

    // Upsert or insert into pending staging
    const { data: saved, error: stageErr } = await supabase
      .from('pending_articles')
      .insert([{
        title: parsedNews.title,
        summary: parsedNews.summary,
        article_url: videoUrl,
        source_name: 'YouTube',
        published_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (stageErr) {
      throw new Error(`Failed to save pending article: ${stageErr.message}`);
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
              { text: '✅ Accept & Save to DB', callback_data: `accept_${saved.id}` },
              { text: '🚀 Go Live (Deploy)', callback_data: `deploy_${saved.id}` }
            ]
          ]
        }
      })
    });

    return res.status(200).json({ success: true, article: parsedNews });

  } catch (error) {
    console.error("YouTube analysis failed:", error.message);
    
    // Notify the user on Telegram that analysis failed
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
