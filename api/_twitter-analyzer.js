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
  // Remove inner HTML tags
  text = text.replace(/<[^>]*>/g, '');
  // Clean basic HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return text;
}

export async function analyzeAndStageTwitterPost(url, chatId, botToken, geminiKey) {
  // Extract handle and tweet ID
  // Pattern matches: https://x.com/antigravity/status/2082157410139914278?s=46
  const match = url.match(/https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/([a-zA-Z0-9_]+)\/status\/(\d+)/i);
  if (!match) {
    throw new Error("Invalid Twitter/X URL format.");
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

  // 2. Initialize Gemini AI
  let tag = '#AI';
  let summary = tweetText;

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
      if (parsed.tag) tag = parsed.tag;
    } catch (err) {
      console.warn("Gemini tweet analysis failed, using fallback:", err.message);
    }
  }

  // Ensure tag starts with '#'
  if (!tag.startsWith('#')) {
    tag = '#' + tag;
  }

  // 3. Check for duplicates in live trending_tweets
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
        text: `ℹ️ <b>Duplicate Skipped</b>:\nThis tweet by @${authorName} is already present in your live trending section.`,
        parse_mode: 'HTML'
      })
    });
    return { title: `Tweet by @${authorName}`, summary, tag };
  }

  // 4. Check if it already exists in pending staging
  const { data: pendingExists } = await supabase
    .from('pending_articles')
    .select('id')
    .eq('article_url', cleanUrl)
    .maybeSingle();

  let savedId = pendingExists?.id;

  if (!pendingExists) {
    // Insert into pending staging
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
      throw new Error(`Failed to save pending tweet: ${stageErr.message}`);
    }
    savedId = saved.id;
  } else {
    // Update existing pending entry
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

  // 5. Send Telegram approval message with inline buttons
  const text = `🐦 <b>New X / Twitter Post Detected!</b>\n\n<b>User</b>: @${authorName}\n<b>Tweet Link</b>: ${url}\n<b>Hashtag Tag</b>: <code>${tag}</code>\n\n<b>Tweet Content Preview</b>:\n"${tweetText}"\n\n<b>AI Developer Take</b>:\n${summary}\n\nIngest this tweet to the live trending section?`;

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
            { text: '✅ Accept & Ingest', callback_data: `accept_${savedId}` },
            { text: '🚀 Go Live (Deploy)', callback_data: `deploy_${savedId}` }
          ],
          [
            { text: '❌ Reject & Discard', callback_data: `reject_${savedId}` }
          ]
        ]
      }
    })
  });

  return { title: `Tweet by @${authorName}`, summary, tag };
}
