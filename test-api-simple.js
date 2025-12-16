import fs from 'fs';
import path from 'path';

// Manual .env parser since we can't rely on dotenv being installed correctly in the quick script
try {
    const envPath = path.resolve(process.cwd(), '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/VITE_NEWS_API_KEY=(.+)/);

    if (match && match[1]) {
        const API_KEY = match[1].trim();
        console.log(`🔑 Found API Key in .env: ${API_KEY.slice(0, 5)}...`);

        const url = `https://gnews.io/api/v4/search?q=technology&lang=en&max=1&sortby=publishedAt&token=${API_KEY}`;

        console.log('📡 Sending request...');
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log('✅ API SUCCESS! The key works.');
            console.log(`📰 Article Title: ${data.articles?.[0]?.title}`);
        } else {
            console.error('❌ API FAILED.');
            console.error('Status:', response.status);
            console.error('Response:', JSON.stringify(data, null, 2));
        }
    } else {
        console.error('❌ Could not find VITE_NEWS_API_KEY in .env file');
    }
} catch (err) {
    console.error('❌ Error reading .env file or executing request:', err.message);
}
