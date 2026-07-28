export default async function handler(req, res) {
  // Set CORS headers for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { sort = 'trendingScore', limit = '10', cursor = '', search = '', filter = '' } = req.query;

  // Build the Hugging Face API URL
  let url = `https://huggingface.co/api/models?sort=${encodeURIComponent(sort)}&limit=${encodeURIComponent(limit)}`;
  
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`;
  }
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  if (filter) {
    url += `&filter=${encodeURIComponent(filter)}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `Hugging Face API error: ${errText}` });
    }

    const data = await response.json();

    // Parse the Link header for pagination
    const linkHeader = response.headers.get('link');
    let nextCursor = '';
    
    if (linkHeader) {
      // Look for cursor parameter in the rel="next" URL
      const nextMatch = linkHeader.match(/<[^>]*[?&]cursor=([^>&]*)[^>]*>;\s*rel="next"/);
      if (nextMatch) {
        nextCursor = decodeURIComponent(nextMatch[1]);
      }
    }

    return res.status(200).json({ models: data, nextCursor });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
