(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const l="6a5ba6d64f89d798263131d3fb22eb9a",c=document.getElementById("news-grid"),i=new Date;i.setDate(i.getDate()-3);i.toISOString();async function d(){try{const n=`https://gnews.io/api/v4/search?q=technology&lang=en&max=10&sortby=publishedAt&token=${l}`,t=await fetch(n),s=await t.json();if(t.ok&&s.articles)u(s.articles);else{console.error("Error fetching news:",s.errors);const o=s.errors?JSON.stringify(s.errors):s.message||"Unknown Error";c.innerHTML=`<p>Error loading news: ${o}</p>`}}catch(n){console.error("Network error:",n),c.innerHTML="<p>Failed to connect to news source.</p>"}}function u(n){c.innerHTML="",n.forEach(t=>{const s=t.image||"https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",o=new Date(t.publishedAt).toLocaleDateString("en-US",{weekday:"short",year:"numeric",month:"long",day:"numeric"}),e=document.createElement("article");e.className="news-card",e.innerHTML=`
            <div class="card-image">
                <img src="${s}" alt="${t.title}" loading="lazy">
            </div>
            <div class="news-content">
                <span class="news-source">${t.source.name}</span>
                <a href="${t.url}" target="_blank" class="news-title">${t.title}</a>
                <p class="news-desc">${t.description||""}</p>
                <span class="news-date">${o}</span>
            </div>
        `,c.appendChild(e)})}d();
