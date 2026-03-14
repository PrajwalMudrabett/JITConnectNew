# ⚡ Quick Deploy Guide

## 🎯 Current Status
- ✅ Backend: https://jitconnectnew.onrender.com (LIVE)
- ✅ Frontend: Configured and ready
- ⏳ Deployment: Ready to deploy to Vercel

---

## 🚀 Deploy in 3 Steps

### Step 1: Push to GitHub (30 seconds)
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy on Vercel (2 minutes)
1. Go to https://vercel.com/new
2. Import "JITConnectNew" repository
3. Set Root Directory: `jitconnect-react`
4. Add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://jitconnectnew.onrender.com/api`
5. Click "Deploy"

### Step 3: Update Backend (1 minute)
1. Copy your Vercel URL (e.g., `https://jitconnect-xyz.vercel.app`)
2. Go to Render Dashboard → Your Service → Environment
3. Update `CLIENT_URL` with your Vercel URL
4. Save (backend will auto-restart)

---

## ✅ Done!

Your app is now live at: `https://your-project.vercel.app`

Test it:
- Register with college email
- Login
- Create a post
- View jobs

---

## 🔧 Alternative: CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd jitconnect-react
vercel --prod
```

---

## 📋 Environment Variables Reference

### Vercel (Frontend)
```
VITE_API_URL=https://jitconnectnew.onrender.com/api
```

### Render (Backend)
```
CLIENT_URL=https://your-vercel-url.vercel.app
```

---

## 🐛 Troubleshooting

**CORS Error?**
→ Update CLIENT_URL on Render

**API Timeout?**
→ Wait 30 seconds (Render waking up)

**Build Failed?**
→ Check Root Directory is set to `jitconnect-react`

---

## 📞 Need Help?

Check these files:
- `VERCEL-DEPLOYMENT.md` - Detailed Vercel guide
- `DEPLOYMENT-CHECKLIST.md` - Complete checklist
- `BACKEND-INTEGRATION.md` - Backend integration details

---

## 🎉 That's It!

Your full-stack JITConnect app will be live in under 5 minutes!
