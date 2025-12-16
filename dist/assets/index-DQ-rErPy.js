(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const l=void 0,c=document.getElementById("news-grid"),a=new Date;a.setDate(a.getDate()-3);a.toISOString();async function d(){try{const s=`https://gnews.io/api/v4/search?q=technology&lang=en&max=10&sortby=publishedAt&token=${l}`,t=await fetch(s),n=await t.json();if(t.ok&&n.articles)u(n.articles);else{console.error("Error fetching news:",n.errors);const o=n.errors?JSON.stringify(n.errors):n.message||"Unknown Error";c.innerHTML=`<p>Error loading news: ${o}</p>`}}catch(s){console.error("Network error:",s),c.innerHTML="<p>Failed to connect to news source.</p>"}}function u(s){c.innerHTML="",s.forEach(t=>{const n=t.image||"https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",o=new Date(t.publishedAt).toLocaleDateString("en-US",{weekday:"short",year:"numeric",month:"long",day:"numeric"}),e=document.createElement("article");e.className="news-card",e.innerHTML=`
            <div class="card-image">
                <img src="${n}" alt="${t.title}" loading="lazy">
            </div>
            <div class="news-content">
                <span class="news-source">${t.source.name}</span>
                <a href="${t.url}" target="_blank" class="news-title">${t.title}</a>
                <p class="news-desc">${t.description||""}</p>
                <span class="news-date">${o}</span>
            </div>
        `,c.appendChild(e)})}d();
