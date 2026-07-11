import { analyzeAndStageYoutubeVideo } from './_youtube-analyzer.js';

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

  try {
    const result = await analyzeAndStageYoutubeVideo(url, chatId, botToken, geminiKey);
    return res.status(200).json({ success: true, article: result });
  } catch (error) {
    console.error("YouTube analysis endpoint failed:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
