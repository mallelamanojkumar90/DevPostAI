# Vercel Deployment Guide for DevPostAI

## 🚀 Quick Deploy to Vercel

Follow these steps to deploy your DevPostAI application to Vercel.

---

## 📋 Prerequisites

Before deploying, make sure you have:

- ✅ GitHub account
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ GitHub Personal Access Token (for API requests)
- ✅ Your code pushed to GitHub

---

## 🔑 Step 1: Get Your GitHub Token

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a name: `DevPostAI-Production`
4. Select scope: **`public_repo`** (or `repo` for private repos)
5. Click **"Generate token"**
6. **Copy the token** - you'll need it in Step 4!

⚠️ **Important**: Save this token somewhere safe - you won't be able to see it again!

---

## 📤 Step 2: Push Your Code to GitHub

If you haven't already pushed your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit - DevPostAI ready for deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/DevPostAI.git

# Push to GitHub
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🌐 Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click **"Sign Up"** or **"Log In"**
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click **"Add New..."** → **"Project"**
   - Select **"Import Git Repository"**
   - Find your `DevPostAI` repository
   - Click **"Import"**

3. **Configure Your Project**
   - **Project Name**: `devpostai` (or your preferred name)
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variable** (CRITICAL!)
   - Click **"Environment Variables"**
   - Add the following:
     - **Name**: `VITE_GITHUB_TOKEN`
     - **Value**: Paste your GitHub token from Step 1
     - **Environment**: Select all (Production, Preview, Development)
   - Click **"Add"**

5. **Deploy!**
   - Click **"Deploy"**
   - Wait 1-2 minutes for the build to complete
   - 🎉 Your app is live!

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? devpostai
# - In which directory is your code located? ./
# - Want to override settings? No

# Add environment variable
vercel env add VITE_GITHUB_TOKEN

# Paste your GitHub token when prompted
# Select: Production, Preview, Development

# Deploy to production
vercel --prod
```

---

## ✅ Step 4: Verify Deployment

After deployment completes:

1. **Visit Your Live URL**
   - Vercel will provide a URL like: `https://devpostai.vercel.app`
   - Or your custom domain if configured

2. **Test the Application**
   - Paste a GitHub repository URL
   - Click "Generate"
   - Verify posts are generated correctly

3. **Check API Rate Limit**
   - With your token, you should have 5,000 requests/hour
   - Without token, only 60 requests/hour

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables Management

To update your GitHub token later:

1. Go to **Project Settings** → **Environment Variables**
2. Find `VITE_GITHUB_TOKEN`
3. Click **"Edit"** or **"Delete"** and re-add
4. Redeploy to apply changes

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main`** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull Requests** → Preview deployment with unique URL

---

## 🐛 Troubleshooting

### Issue: Build Failed

**Solution**:
```bash
# Test build locally first
npm run build

# If it works locally, check Vercel build logs
# Common issues:
# - Missing dependencies
# - Node version mismatch
# - Environment variables not set
```

### Issue: API Rate Limit Errors

**Solution**:
- Verify `VITE_GITHUB_TOKEN` is set in Vercel
- Check token has `public_repo` scope
- Regenerate token if needed

### Issue: 404 on Page Refresh

**Solution**:
- Vercel should auto-detect SPA routing
- If not, the `vercel.json` file handles this
- Check that `vercel.json` exists in your project

### Issue: Environment Variable Not Working

**Solution**:
1. Ensure variable name starts with `VITE_`
2. Redeploy after adding variables
3. Check variable is set for correct environment

---

## 📊 Deployment Checklist

Before deploying, ensure:

- ✅ Code is pushed to GitHub
- ✅ GitHub token is ready
- ✅ `.env` file is in `.gitignore` (don't commit it!)
- ✅ `.env.example` exists for reference
- ✅ `vercel.json` exists in project root
- ✅ Build works locally (`npm run build`)
- ✅ Preview works locally (`npm run preview`)

---

## 🔄 Redeployment

To redeploy after making changes:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push

# Vercel automatically redeploys!
```

Or manually trigger:
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"**
4. Click **"Redeploy"** on latest deployment

---

## 📈 Monitoring

Vercel provides:

- **Analytics**: View page views and performance
- **Logs**: Real-time function logs
- **Speed Insights**: Performance metrics
- **Deployment History**: All past deployments

Access these in your Vercel Dashboard.

---

## 🎯 Production URLs

After deployment, you'll get:

- **Production URL**: `https://devpostai.vercel.app`
- **Preview URLs**: `https://devpostai-git-branch.vercel.app`
- **Custom Domain**: Your own domain (if configured)

---

## 🔒 Security Best Practices

1. ✅ Never commit `.env` file
2. ✅ Use environment variables for tokens
3. ✅ Rotate tokens periodically
4. ✅ Use minimal token scopes
5. ✅ Enable Vercel's security features

---

## 💡 Pro Tips

1. **Preview Deployments**: Every PR gets a unique URL
2. **Instant Rollback**: Revert to any previous deployment
3. **Edge Network**: Your app is served from 100+ locations
4. **Zero Config**: Vercel auto-detects Vite projects
5. **Free SSL**: HTTPS enabled automatically

---

## 📞 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **GitHub Issues**: Report bugs in your repository

---

## ✨ Next Steps

After successful deployment:

1. ✅ Share your live URL
2. ✅ Add custom domain (optional)
3. ✅ Set up analytics
4. ✅ Monitor performance
5. ✅ Update README with live demo link

---

**Your DevPostAI app is now live on Vercel!** 🎉

Production URL: `https://devpostai.vercel.app` (or your custom URL)

---

## 🚀 Quick Reference

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove devpostai
```

---

**Made with ❤️ for the developer community**
