# Vercel Deployment Instructions

## Quick Deploy

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel will **auto-detect** it's a Vite project
   - **DO NOT** change any build settings - let Vercel use defaults
   
3. **Add Environment Variable**:
   - In the deployment setup, click "Environment Variables"
   - Add:
     - **Name**: `NEWS_API_KEY`
     - **Value**: `6a5ba6d64f89d798263131d3fb22eb9a`
     - **Environment**: Production, Preview, Development (select all)
   - Click "Add"

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~1-2 minutes)

## Troubleshooting

### If you see "Permission denied" error:
- **Delete `vercel.json`** if it exists (Vercel auto-detects Vite)
- Let Vercel use its default build settings

### If environment variable error:
- Make sure you added `NEWS_API_KEY` in the Vercel dashboard
- **DO NOT** use `@news_api_key` or secret references
- Just paste the actual API key value

### Build Settings (if needed):
- **Framework Preset**: Vite
- **Build Command**: `npm run build` (or leave empty for auto-detect)
- **Output Directory**: `dist` (or leave empty for auto-detect)
- **Install Command**: `npm install` (or leave empty for auto-detect)

## After Deployment

Your site will be live at: `https://your-project-name.vercel.app`

To redeploy after changes:
```bash
git add .
git commit -m "Update"
git push origin main
```

Vercel will automatically rebuild and deploy!
