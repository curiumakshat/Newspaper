import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_NEWS_API_KEY;

if (!API_KEY) {
    console.error('❌ API Key NOT found in process.env');
    process.exit(1);
}

console.log(`🔑 Testing API Key: ${API_KEY.slice(0, 4)}...`);

const url = `https://gnews.io/api/v4/search?q=technology&lang=en&max=1&sortby=publishedAt&token=${API_KEY}`;

try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
        console.log('✅ Success! API is working.');
        console.log(`📰 First article: ${data.articles[0].title}`);
    } else {
        console.error('❌ API Error:', data);
    }
} catch (error) {
    console.error('❌ Network Error:', error);
}
