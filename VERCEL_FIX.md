# Fixed: Vercel Deployment Guide

## What Was Wrong

The `npm run build` command was failing with exit code 126 because:

1. **Incorrect Vite configuration**: The `vite.config.js` was trying to use Node.js modules (`dotenv`, `path`) in a way that caused build failures
2. **Wrong environment variable syntax**: Using `process.env` instead of Vite's `import.meta.env`
3. **Missing VITE_ prefix**: Vite requires environment variables to be prefixed with `VITE_` to be exposed to client-side code

## Changes Made

### 1. Updated `vite.config.js`
Removed unnecessary dotenv imports. Vite automatically loads `.env` files.

### 2. Updated `script.js`
Changed from `process.env.NEWS_API_KEY` to `import.meta.env.VITE_NEWS_API_KEY`

### 3. Environment Variable Naming
Your `.env` file should now use:
```
VITE_NEWS_API_KEY=your_actual_api_key_here
```

## Deploying to Vercel

### Step 1: Update Your Local .env File
Edit your `.env` file (not tracked by git) and change it to:
```
VITE_NEWS_API_KEY=69c070e95bc14084923f8e9c1a2eb4e3
```

### Step 2: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `VITE_NEWS_API_KEY`
   - **Value**: `69c070e95bc14084923f8e9c1a2eb4e3` (or your GNews API key)
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**

### Step 3: Redeploy

Option A - Automatic (if connected to GitHub):
1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Fix: Update Vite config and env variables for deployment"
   git push
   ```
2. Vercel will automatically redeploy

Option B - Manual:
1. In Vercel dashboard, go to **Deployments**
2. Click the three dots on the latest deployment
3. Select **Redeploy**

### Step 4: Verify Build Settings (if needed)

In Vercel project settings, ensure:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Testing Locally

Test the build locally before deploying:
```bash
npm run build
npm run preview
```

## Important Notes

⚠️ **Security Warning**: Environment variables prefixed with `VITE_` are embedded in your client-side JavaScript bundle and are publicly visible. This is fine for public API keys like GNews, but never use this for sensitive keys like database credentials or payment API keys.

✅ The build should now complete successfully without exit code 126 errors!
