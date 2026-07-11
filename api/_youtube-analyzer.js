import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function analyzeAndStageYoutubeVideo(url, chatId, botToken, geminiKey) {
  const videoId = getYouTubeId(url);
  if (!videoId) {
    throw new Error("Invalid YouTube URL format.");
  }

  let transcriptText = "";
  let fetchedMetadata = null;

  // 1. Fetch transcript from unblocked public API with a 4-second timeout
  try {
    console.log(`Fetching transcript from public API for videoId: ${videoId}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const transcriptRes = await fetch(`https://youtube-transcript.ai/transcript/${videoId}.txt`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

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
    console.warn("Transcript extraction failed or timed out, falling back to official oEmbed metadata:", err.message);
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
Also identify the primary company this video focuses on (e.g. OpenAI, Google, Anthropic, Meta, Microsoft, Nvidia, etc.) and generate a short 6-8 word prompt for an AI image generator describing a clean, modern, copyright-free high-tech illustration related to this topic, explicitly incorporating that company's name and brand logo.
Respond ONLY with a valid JSON object matching this exact schema:
{
  "title": "A short, catchy, professional title describing the news",
  "summary": "• First key point about what is new.\\n• Second key point about why it matters.\\n• Third key point with specific details.",
  "company": "OpenAI or Google or Anthropic or Meta etc.",
  "image_prompt": "A short, descriptive, copyright-free tech illustration concept prompt incorporating the brand logo"
}
Do not write any markdown code blocks, backticks, or intro/outro text. Just return the raw JSON string.

Transcript:
${transcriptText.slice(0, 15000)}
`;
  } else {
    prompt = `You are a professional AI news editor and tech analyst. 
Based on the following YouTube video title, generate a compelling news article title and a summary formatted as 3-4 key bullet points using the '•' character and newlines.
Also identify the primary company this video focuses on (e.g. OpenAI, Google, Anthropic, Meta, Microsoft, Nvidia, etc.) and generate a short 6-8 word prompt for an AI image generator describing a clean, modern, copyright-free high-tech illustration related to this topic, explicitly incorporating that company's name and brand logo.
Respond ONLY with a valid JSON object matching this exact schema:
{
  "title": "A short, catchy, professional title describing the news",
  "summary": "• First key point about what is new.\\n• Second key point about why it matters.\\n• Third key point with specific details.",
  "company": "OpenAI or Google or Anthropic or Meta etc.",
  "image_prompt": "A short, descriptive, copyright-free tech illustration concept prompt incorporating the brand logo"
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

  // Generate a beautiful, copyright-free high-tech illustration based on Gemini's image_prompt incorporating the brand logo
  const cleanPrompt = (parsedNews.image_prompt || parsedNews.title || 'futuristic artificial intelligence concept')
    .replace(/[^\w\s-]/g, '')
    .trim();
  const generatedImageUrl = `https://image.pollinations.ai/p/${encodeURIComponent(cleanPrompt + ', modern graphic design, minimalist 3d render, vector logo art, clean dark cyber navy and gold theme')}?width=800&height=450&nologo=true`;

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
        text: `ℹ️ <b>Duplicate Skipped</b>:\nThis YouTube video ("${parsedNews.title}") is already present in your live database.`,
        parse_mode: 'HTML'
      })
    });
    return parsedNews;
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
        source_name: `YouTube::${parsedNews.company || 'Models'}`,
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
        source_name: `YouTube::${parsedNews.company || 'Models'}`,
        published_at: new Date().toISOString()
      })
      .eq('id', savedId);

    if (updateErr) {
      throw new Error(`Failed to update pending article: ${updateErr.message}`);
    }
  }

  // 6. Send the Telegram CMS message with action buttons using HTML formatting
  const text = `🔔 <b>New YouTube AI Analysis!</b>\n\n<b>Source</b>: YouTube\n<b>Video Link</b>: ${url}\n\n<b>Title</b>: ${parsedNews.title}\n<b>Summary</b>:\n${parsedNews.summary}\n\nPublish this video summary to the live portal?`;
  
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
            { text: '✅ Accept & Save to DB', callback_data: `accept_${savedId}` },
            { text: '🚀 Go Live (Deploy)', callback_data: `deploy_${savedId}` }
          ]
        ]
      }
    })
  });

  return parsedNews;
}
