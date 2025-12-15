# Deployment Instructions for Newspaper Website

This guide provides step-by-step instructions to deploy your newspaper website to various hosting platforms.

## Prerequisites

Before deploying, ensure you have:
- ✅ A GNews API key (stored in `.env` file)
- ✅ Git installed and repository initialized
- ✅ Node.js and npm installed locally

---

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- Free tier available
- Automatic deployments from Git
- Built-in environment variable management
- Optimized for Vite projects

**Steps:**

1. **Create a `.gitignore` file** (if not already present):
   ```bash
   echo "node_modules" > .gitignore
   echo ".env" >> .gitignore
   echo "dist" >> .gitignore
   ```

2. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

3. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your `Newspaper` repository
   - Configure:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add Environment Variable:
     - Name: `NEWS_API_KEY`
     - Value: Your GNews API key
   - Click "Deploy"

4. **Done!** Your site will be live at `https://your-project.vercel.app`

---

### Option 2: Netlify

**Why Netlify?**
- Free tier with generous limits
- Easy continuous deployment
- Great for static sites

**Steps:**

1. **Add a build script to `package.json`** (if not present):
   ```json
   "scripts": {
     "build": "vite build",
     "preview": "vite preview"
   }
   ```

2. **Create a `netlify.toml` file**:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Build settings should auto-detect from `netlify.toml`
   - Add Environment Variable:
     - Key: `NEWS_API_KEY`
     - Value: Your GNews API key
   - Click "Deploy site"

4. **Done!** Your site will be live at `https://your-site.netlify.app`

---

### Option 3: GitHub Pages

**Why GitHub Pages?**
- Completely free
- Integrated with GitHub
- Simple for static sites

**Steps:**

1. **Install `gh-pages` package**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**:
   ```json
   {
     "scripts": {
       "build": "vite build",
       "deploy": "npm run build && gh-pages -d dist"
     },
     "homepage": "https://curiumakshat.github.io/Newspaper"
   }
   ```

3. **Update `vite.config.js`** to set the base path:
   ```javascript
   export default defineConfig({
     base: '/Newspaper/',
     define: {
       'process.env.NEWS_API_KEY': JSON.stringify(process.env.NEWS_API_KEY)
     }
   });
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: `gh-pages` branch
   - Click Save

⚠️ **Important Note**: GitHub Pages doesn't support environment variables securely. You'll need to hardcode the API key in the build (not recommended for sensitive keys) or use a different platform.

---

### Option 4: Render

**Why Render?**
- Free tier available
- Supports static sites
- Good environment variable support

**Steps:**

1. **Create a `render.yaml` file**:
   ```yaml
   services:
     - type: web
       name: newspaper
       env: static
       buildCommand: npm install && npm run build
       staticPublishPath: ./dist
       envVars:
         - key: NEWS_API_KEY
           sync: false
   ```

2. **Deploy:**
   - Go to [render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New" → "Static Site"
   - Connect your repository
   - Configure:
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
   - Add Environment Variable:
     - Key: `NEWS_API_KEY`
     - Value: Your GNews API key
   - Click "Create Static Site"

---

## 📋 Pre-Deployment Checklist

Before deploying to any platform:

- [ ] Ensure `.env` is in `.gitignore` (never commit API keys!)
- [ ] Test the build locally: `npm run build`
- [ ] Preview the production build: `npx vite preview`
- [ ] Verify all environment variables are set on the hosting platform
- [ ] Check that the API key is valid and has sufficient quota

---

## 🔧 Build Configuration

### Add Build Script

Make sure your `package.json` has a build script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Test Build Locally

```bash
# Build the project
npm run build

# Preview the production build
npx vite preview
```

The build output will be in the `dist` folder.

---

## 🔐 Environment Variables

All platforms require you to set the `NEWS_API_KEY` environment variable:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Render**: Environment tab in your service dashboard

**Never commit your `.env` file to Git!**

---

## 🐛 Troubleshooting

### Build Fails

- Ensure all dependencies are in `package.json` (not just `devDependencies`)
- Check that Node.js version is compatible (use Node 18+)

### API Key Not Working

- Verify the environment variable name matches exactly: `NEWS_API_KEY`
- Check that the API key is valid on [gnews.io](https://gnews.io)
- Ensure the key has sufficient quota
- **Important**: Make sure your `.env` file is encoded as UTF-8 without BOM

### Site Loads But No News

- Open browser console (F12) to check for errors
- Verify the API endpoint is accessible
- Check CORS settings (GNews should allow browser requests)

### Environment Variables Not Injected During Build

If you see `injecting env (0)` during build:

1. **Check `.env` file encoding** - it must be UTF-8
2. **Recreate the `.env` file**:
   ```powershell
   "NEWS_API_KEY=your_api_key_here" | Out-File -FilePath .env -Encoding UTF8 -NoNewline
   ```
3. **Rebuild**: `npm run build`
4. **Verify**: You should see `injecting env (1)` in the build output

---

## 📊 Recommended Platform Comparison

| Platform | Free Tier | Build Time | Custom Domain | Difficulty |
|----------|-----------|------------|---------------|------------|
| **Vercel** | ✅ Generous | ⚡ Fast | ✅ Yes | 🟢 Easy |
| **Netlify** | ✅ Good | ⚡ Fast | ✅ Yes | 🟢 Easy |
| **GitHub Pages** | ✅ Unlimited | 🐌 Slower | ✅ Yes | 🟡 Medium |
| **Render** | ✅ Limited | 🐌 Slower | ✅ Yes | 🟢 Easy |

**Recommendation**: Start with **Vercel** for the best developer experience and performance.

---

## 🎯 Next Steps After Deployment

1. **Set up custom domain** (optional)
2. **Enable analytics** (Vercel Analytics, Google Analytics, etc.)
3. **Monitor API usage** on GNews dashboard
4. **Set up continuous deployment** (auto-deploy on git push)

---

## 📞 Support

If you encounter issues:
- Check the platform's documentation
- Review build logs for error messages
- Verify environment variables are set correctly
- Test the build locally first

Happy deploying! 🚀
