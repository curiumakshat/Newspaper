import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import path from 'path';

// Explicitly load .env file from the current directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Log to verify (remove in production)
console.log('Loading NEWS_API_KEY:', process.env.NEWS_API_KEY ? 'Found' : 'Not found');

export default defineConfig({
    define: {
        // Explicitly define the API key as a string literal
        'process.env.NEWS_API_KEY': JSON.stringify(process.env.NEWS_API_KEY)
    }
});
