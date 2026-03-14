# Vercel Deployment Guide for JITConnect Frontend

## ✅ Prerequisites
- Backend is already deployed at: **https://jitconnectnew.onrender.com**
- Frontend is configured to use the backend API
- You have a Vercel account (free tier works)

---

## 🚀 Method 1: Deploy via Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Navigate to Frontend Directory
```bash
cd jitconnect-react
```

### Step 4: Deploy
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → jitconnect (or your preferred name)
- **Directory?** → ./
- **Override settings?** → No

### Step 5: Deploy to Production
```bash
vercel --prod
```

---

## 🚀 Method 2: Deploy via Vercel Dashboard (Easiest)

### Step 1: Push to GitHub
Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Import Project on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your **JITConnectNew** repository
5. Click **"Import"**

### Step 3: Configure Project
- **Framework Preset**: Vite
- **Root Directory**: `jitconnect-react`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:
```
Name: VITE_API_URL
Value: https://jitconnectnew.onrender.com/api
```

### Step 5: Deploy
Click **"Deploy"** and wait for deployment to complete (usually 1-2 minutes)

---

## 🔧 After Deployment

### Step 1: Get Your Vercel URL
After deployment, you'll get a URL like:
```
https://jitconnect-xyz123.vercel.app
```

### Step 2: Update Backend CORS
Go to your Render dashboard and update the `CLIENT_URL` environment variable:
```
CLIENT_URL=https://jitconnect-xyz123.vercel.app
```

Then restart your backend service on Render.

### Step 3: Test Your Application
1. Open your Vercel URL
2. Try to register with a college email
3. Try to login
4. Create a post
5. View jobs
6. Test all features

---

## 📝 Environment Variables on Vercel

Make sure this is set in your Vercel project settings:

```
VITE_API_URL=https://jitconnectnew.onrender.com/api
```

To add/edit environment variables:
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add or edit variables
5. Redeploy if needed

---

## 🔄 Automatic Deployments

Once connected to GitHub, Vercel will automatically deploy:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

---

## 🎨 Custom Domain (Optional)

### Step 1: Add Domain
1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Domains"**
3. Click **"Add"**
4. Enter your domain (e.g., `jitconnect.com`)

### Step 2: Configure DNS
Add these records to your domain provider:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Update Backend
Update `CLIENT_URL` on Render with your custom domain:
```
CLIENT_URL=https://jitconnect.com
```

---

## 🐛 Troubleshooting

### Issue: Build Fails
**Error**: `Module not found` or `Cannot find module`
**Solution**:
```bash
cd jitconnect-react
rm -rf node_modules package-lock.json
npm install
npm run build
```
If it works locally, push and redeploy.

### Issue: API Calls Fail
**Error**: CORS error or network error
**Solution**:
1. Check `VITE_API_URL` is set correctly on Vercel
2. Check `CLIENT_URL` is set correctly on Render
3. Make sure backend is awake (visit https://jitconnectnew.onrender.com)

### Issue: Environment Variables Not Working
**Solution**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Make sure `VITE_API_URL` is set
3. Redeploy the project

### Issue: 404 on Page Refresh
**Solution**: Already fixed with `vercel.json` rewrites configuration

### Issue: Blank Page
**Solution**:
1. Check browser console for errors
2. Verify build completed successfully
3. Check if `dist` folder was created
4. Verify `index.html` exists in `dist`

---

## 📊 Vercel Dashboard Features

### Deployments
- View all deployments
- Rollback to previous versions
- View deployment logs

### Analytics (Optional)
- Enable Web Analytics
- Track page views
- Monitor performance

### Logs
- View function logs
- Debug runtime errors
- Monitor API calls

---

## ✅ Deployment Checklist

- [x] Backend deployed on Render
- [x] Frontend configured with backend URL
- [x] Environment variables set
- [x] vercel.json created
- [ ] Code pushed to GitHub
- [ ] Project imported on Vercel
- [ ] Environment variables added on Vercel
- [ ] Deployment successful
- [ ] CLIENT_URL updated on Render
- [ ] Backend restarted
- [ ] End-to-end testing complete

---

## 🎯 Quick Commands Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
cd jitconnect-react
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove [deployment-url]
```

---

## 📞 Support Links

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Documentation**: https://vitejs.dev/guide/
- **Backend URL**: https://jitconnectnew.onrender.com
- **GitHub Repo**: https://github.com/PrajwalMudrabett/JITConnectNew

---

## 🎉 Success!

Once deployed, your application will be live at:
```
https://your-project-name.vercel.app
```

Share this URL with your users and enjoy your fully deployed JITConnect application! 🚀
