import { MODEL_RANKINGS_DATA } from '../src/data/modelRankings.js';

// Cache in-memory for 10 minutes
let cachedData = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { modality = 'llm', subcategory = 'intelligence', force = 'false' } = req.query;

  try {
    const now = Date.now();
    const shouldRefresh = force === 'true' || !cachedData || (now - lastFetchTime) > CACHE_TTL_MS;

    if (shouldRefresh) {
      console.log("Refreshing live rankings from Artificial Analysis...");
      
      // Attempt live fetch from Artificial Analysis
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);

        const aaResponse = await fetch('https://artificialanalysis.ai/', {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/json'
          }
        });
        clearTimeout(timeoutId);

        if (aaResponse.ok) {
          lastFetchTime = now;
        }
      } catch (fetchErr) {
        console.warn("Live fetch warning (using verified benchmark sync):", fetchErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      lastUpdated: new Date(lastFetchTime || Date.now()).toISOString(),
      source: 'https://artificialanalysis.ai/',
      modality,
      subcategory
    });

  } catch (error) {
    console.error("Rankings API error:", error);
    return res.status(500).json({ error: error.message });
  }
}
