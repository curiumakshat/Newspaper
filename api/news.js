
export default async function handler(req, res) {
    // Allow simple CORS for GET requests if needed, though usually same-domain on Vercel
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Get the key from environment variables (Vercel > Settings > Environment Variables)
    // For local dev, make sure VITE_NEWS_API_KEY (or just NEWS_API_KEY) is in your .env
    // Vercel serverless functions can read simple env vars without VITE_ prefix too.
    const API_KEY = process.env.VITE_NEWS_API_KEY || process.env.NEWS_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'Server misconfiguration: API Key missing' });
    }

    const { category = 'tech', language = 'en' } = req.query;

    try {
        const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=${category}&language=${language}`;

        // Server-side fetch
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        // Return the data to the frontend
        res.status(200).json(data);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
}
