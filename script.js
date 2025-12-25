

const NEWS_CONTAINER = document.getElementById('news-grid');

async function fetchNews() {
    // No more API_KEY check here, the server handles it.

    try {
        // Fetch from our own Vercel serverless function
        // This hides the upstream API key from the browser
        const url = '/api/news?category=tech&language=en';
        console.log('Fetching news from secure endpoint:', url);

        const response = await fetch(url);

        if (!response.ok) {
            const status = response.status;
            const data = await response.json().catch(() => ({}));
            // If the server tells us the key is missing or invalid
            const errorMsg = data.error || (data.results && data.results.message) || `HTTP Error ${status}`;
            throw new Error(errorMsg);
        }

        const data = await response.json();

        // NewsData.io structure is passed through: { status, totalResults, results: [...] }
        if (data.results && data.results.length > 0) {
            renderNews(data.results);
        } else {
            throw new Error('No articles found in response');
        }

    } catch (error) {
        console.error('Fetch error:', error);
        NEWS_CONTAINER.innerHTML = `
            <div class="error-container">
                <p>⚠️ Failed to load news.</p>
                <small>${error.message}</small>
                <p style="font-size: 0.8rem; margin-top: 10px; opacity: 0.8;">Note: If running locally without 'vercel dev', this will 404.</p>
            </div>
        `;
    }
}

function renderNews(articles) {
    NEWS_CONTAINER.innerHTML = '';

    articles.forEach(article => {
        // NewsData.io field mapping
        // image_url can be null, provide fallback
        const imageUrl = article.image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop';

        // NewsData.io uses 'pubDate'
        const date = article.pubDate ? new Date(article.pubDate).toLocaleDateString('en-US', {
            weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
        }) : 'Recent';

        // Filter: sometimes duplicates or weird content appears, but we'll display what we get.

        const card = document.createElement('article');
        card.className = 'news-card';

        // source_id is usually a string like "techcrunch"
        const sourceName = article.source_id || 'News';

        card.innerHTML = `
            <div class="card-image">
                <img src="${imageUrl}" alt="${article.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop'">
            </div>
            <div class="news-content">
                <span class="news-source">${sourceName}</span>
                <a href="${article.link}" target="_blank" class="news-title">${article.title}</a>
                <p class="news-desc">${article.description ? (article.description.length > 100 ? article.description.substring(0, 100) + '...' : article.description) : ''}</p>
                <span class="news-date">${date}</span>
            </div>
        `;

        NEWS_CONTAINER.appendChild(card);
    });
}

// Initial Fetch
fetchNews();
