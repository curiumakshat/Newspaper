# 🚀 Quick Deployment Guide

Your newspaper website is ready to deploy! Here's the fastest way to get it live:

## ⚡ Fastest Option: Vercel (5 minutes)

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Visit: https://vercel.com/new
   - Click "Import Git Repository"
   - Select your `Newspaper` repository
   - Vercel will auto-detect Vite settings
   - Add environment variable:
     - **Name**: `NEWS_API_KEY`
     - **Value**: [Your GNews API key from .env file]
   - Click "Deploy"

3. **Done!** 🎉 Your site will be live in ~1 minute

---

## 📝 What I've Set Up For You

✅ **Build scripts** added to `package.json`  
✅ **`.gitignore`** created (protects your API key)  
✅ **`netlify.toml`** for Netlify deployment  
✅ **`vercel.json`** for Vercel deployment  
✅ **Production build tested** (dist folder created successfully)

---

## 🔑 Important: Environment Variable

Your API key is in the `.env` file. When deploying:

1. **Copy the API key** from `.env`
2. **Add it as an environment variable** on your hosting platform
3. **Never commit** the `.env` file to Git (already in `.gitignore`)

---

## 📚 Full Instructions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Detailed step-by-step guides for all platforms
- Troubleshooting tips
- Platform comparisons
- Custom domain setup

---

## 🧪 Test Locally First

```bash
# Build the production version
npm run build

# Preview the production build
npm run preview
```

Then open http://localhost:4173 to test.

---

## ✨ Recommended Platforms

1. **Vercel** - Fastest, easiest, best for Vite
2. **Netlify** - Great alternative, generous free tier
3. **Render** - Good for static sites

Choose any platform from DEPLOYMENT.md and follow the steps!
