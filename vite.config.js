import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

export default defineConfig({
    define: {
        // Explicitly define the API key as a string literal
        'process.env.NEWS_API_KEY': JSON.stringify(process.env.NEWS_API_KEY)
    }
});
