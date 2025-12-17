
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_CONTAINER = document.getElementById('news-grid');

// Calculate date 3 days ago in YYYY-MM-DD format (Optional)
const threeDaysAgo = new Date();
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
const fromDate = threeDaysAgo.toISOString();

async function fetchNews() {
    if (!API_KEY) {
        console.error('API Key is missing!');
        NEWS_CONTAINER.innerHTML = `<p class="error-msg">⚠️ Configuration Error: API Key is missing.</p>`;
        return;
    }

    try {
        // NewsAPI.org endpoint
        // Using 'top-headlines' with source 'techcrunch' as requested
        const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;
        console.log('Fetching news from:', url.replace(API_KEY, 'HIDDEN_KEY'));

        const response = await fetch(url);

        if (!response.ok) {
            const status = response.status;
            const data = await response.json().catch(() => ({}));
            // NewsAPI returns { status: "error", code: "...", message: "..." }
            const errorMsg = data.message || `HTTP Error ${status}`;
            throw new Error(errorMsg);
        }

        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            renderNews(data.articles);
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
        // NewsAPI.org field mapping
        const imageUrl = article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop';

        const date = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', {
            weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
        }) : 'Recent';

        const card = document.createElement('article');
        card.className = 'news-card';

        const sourceName = article.source.name || 'TechCrunch';

        card.innerHTML = `
            <div class="card-image">
                <img src="${imageUrl}" alt="${article.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop'">
            </div>
            <div class="news-content">
                <span class="news-source">${sourceName}</span>
                <a href="${article.url}" target="_blank" class="news-title">${article.title}</a>
                <p class="news-desc">${article.description ? (article.description.length > 100 ? article.description.substring(0, 100) + '...' : article.description) : ''}</p>
                <span class="news-date">${date}</span>
            </div>
        `;

        NEWS_CONTAINER.appendChild(card);
    });
}

// Initial Fetch
fetchNews();
