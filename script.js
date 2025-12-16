
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_CONTAINER = document.getElementById('news-grid');

// Calculate date 3 days ago in YYYY-MM-DD format (Optional for GNews if we just want latest)
const threeDaysAgo = new Date();
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
const fromDate = threeDaysAgo.toISOString(); // GNews requires full ISO string if used

async function fetchNews() {
    try {
        // GNews API Endpoint
        // Documentation: https://gnews.io/docs/v4#search-endpoint
        // Using 'token' param effectively acts as the API key

        const url = `https://gnews.io/api/v4/search?q=technology&lang=en&max=10&sortby=publishedAt&token=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.articles) {
            renderNews(data.articles);
        } else {
            console.error('Error fetching news:', data.errors);
            // Handle specific GNews error messages if possible
            const errorMsg = data.errors ? JSON.stringify(data.errors) : (data.message || 'Unknown Error');
            NEWS_CONTAINER.innerHTML = `<p>Error loading news: ${errorMsg}</p>`;
        }
    } catch (error) {
        console.error('Network error:', error);
        NEWS_CONTAINER.innerHTML = `<p>Failed to connect to news source.</p>`;
    }
}

function renderNews(articles) {
    NEWS_CONTAINER.innerHTML = '';

    articles.forEach(article => {
        // GNews uses 'image', NewsAPI used 'urlToImage'
        const imageUrl = article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop';

        const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
            weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
        });

        const card = document.createElement('article');
        card.className = 'news-card';

        card.innerHTML = `
            <div class="card-image">
                <img src="${imageUrl}" alt="${article.title}" loading="lazy">
            </div>
            <div class="news-content">
                <span class="news-source">${article.source.name}</span>
                <a href="${article.url}" target="_blank" class="news-title">${article.title}</a>
                <p class="news-desc">${article.description || ''}</p>
                <span class="news-date">${date}</span>
            </div>
        `;

        NEWS_CONTAINER.appendChild(card);
    });
}

// Initial Fetch
fetchNews();
