
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_CONTAINER = document.getElementById('news-grid');

async function fetchNews() {
    if (!API_KEY) {
        console.error('API Key is missing!');
        NEWS_CONTAINER.innerHTML = `<p class="error-msg">⚠️ Configuration Error: API Key is missing.</p>`;
        return;
    }

    try {
        // NewsData.io API endpoint
        // User requested: https://newsdata.io/api/1/latest?apikey=...&q=tech
        // We will add language=en to ensure English results
        const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=tech&language=en`;
        console.log('Fetching news from:', url.replace(API_KEY, 'HIDDEN_KEY'));

        const response = await fetch(url);

        if (!response.ok) {
            const status = response.status;
            const data = await response.json().catch(() => ({}));
            const errorMsg = data.results && data.results.message ? data.results.message : (data.message || `HTTP Error ${status}`);
            throw new Error(errorMsg);
        }

        const data = await response.json();

        // NewsData.io returns 'results' array
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
