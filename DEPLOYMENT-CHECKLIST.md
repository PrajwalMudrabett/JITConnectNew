# 🚀 JITConnect Deployment Checklist

## ✅ Backend Setup (COMPLETED)

- [x] Backend deployed on Render
- [x] URL: https://jitconnectnew.onrender.com
- [x] MongoDB Atlas connected
- [x] Environment variables configured
- [x] CORS configured for multiple origins
- [x] Security headers enabled
- [x] API endpoints tested and working

**Backend Status**: ✅ LIVE AND WORKING

---

## ✅ Frontend Configuration (COMPLETED)

- [x] API URL configured: `https://jitconnectnew.onrender.com/api`
- [x] Environment variables set in `.env`
- [x] `vercel.json` created for routing
- [x] Backend connection tested successfully
- [x] All API calls pointing to Render backend

**Frontend Status**: ✅ READY FOR DEPLOYMENT

---

## 📋 Vercel Deployment Steps

### Option A: Via Vercel Dashboard (Recommended)

#### Step 1: Push to GitHub ⏳
```bash
cd /path/to/JITConnect
git add .
git commit -m "Ready for Vercel deployment with Render backend"
git push origin main
```

#### Step 2: Import on Vercel ⏳
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select "JITConnectNew" repository
4. Click "Import"

#### Step 3: Configure Build Settings ⏳
- **Framework Preset**: Vite
- **Root Directory**: `jitconnect-react`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Step 4: Add Environment Variable ⏳
Click "Environment Variables" and add:
```
Name: VITE_API_URL
Value: https://jitconnectnew.onrender.com/api
```

#### Step 5: Deploy ⏳
Click "Deploy" button and wait 1-2 minutes

---

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Navigate to frontend
cd jitconnect-react

# Deploy
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

### Step 1: Get Your Vercel URL ⏳
After deployment, copy your URL (e.g., `https://jitconnect-abc123.vercel.app`)

### Step 2: Update Render Backend ⏳
1. Go to Render Dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Update `CLIENT_URL` variable:
   ```
   CLIENT_URL=https://jitconnect-abc123.vercel.app
   ```
5. Click "Save Changes"
6. Backend will automatically restart

### Step 3: Verify CORS ⏳
The backend is already configured to accept your Vercel URL through the `CLIENT_URL` variable.

---

## 🧪 Testing Checklist

### Backend Tests ✅
- [x] Root endpoint responds: https://jitconnectnew.onrender.com
- [x] API endpoints respond: https://jitconnectnew.onrender.com/api
- [x] CORS headers configured
- [x] MongoDB connection active
- [x] Authentication endpoints working

### Frontend Tests (After Deployment) ⏳
- [ ] Homepage loads
- [ ] Registration page works
- [ ] Login page works
- [ ] Dashboard displays
- [ ] Posts can be created
- [ ] Jobs page loads
- [ ] Profile page works
- [ ] Admin panel accessible (for admin users)

### Integration Tests (After Deployment) ⏳
- [ ] User can register with college email
- [ ] User can login
- [ ] User can create a post
- [ ] User can view jobs
- [ ] User can apply to jobs
- [ ] Admin can moderate content
- [ ] Connections work
- [ ] Messages work

---

## 📊 Current Configuration

### Backend (Render)
```
URL: https://jitconnectnew.onrender.com
API: https://jitconnectnew.onrender.com/api
Database: MongoDB Atlas
Status: ✅ LIVE
```

### Frontend (Local)
```
URL: http://localhost:5174
API Connection: https://jitconnectnew.onrender.com/api
Status: ✅ WORKING
```

### Frontend (Vercel) - After Deployment
```
URL: https://your-project.vercel.app
API Connection: https://jitconnectnew.onrender.com/api
Status: ⏳ PENDING DEPLOYMENT
```

---

## 🔐 Environment Variables

### Backend (Render)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=jitconnect_secret_key_2024_prajwal_mudrabett_secure
ALLOWED_EMAIL_DOMAINS=@jyothyit.ac.in,@jit.ac.in
CLIENT_URL=https://your-vercel-url.vercel.app  # UPDATE AFTER DEPLOYMENT
```

### Frontend (Vercel)
```env
VITE_API_URL=https://jitconnectnew.onrender.com/api
```

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error
**Symptom**: "Access to fetch has been blocked by CORS policy"
**Solution**: 
1. Update `CLIENT_URL` on Render with your Vercel URL
2. Restart backend service
3. Clear browser cache

### Issue 2: API Calls Timeout
**Symptom**: Requests take too long or timeout
**Solution**: 
1. Render free tier sleeps after inactivity
2. First request may take 30 seconds to wake up
3. Subsequent requests will be fast

### Issue 3: 404 on Page Refresh
**Symptom**: Page not found when refreshing on routes
**Solution**: Already fixed with `vercel.json` rewrites

### Issue 4: Environment Variables Not Working
**Symptom**: API calls go to wrong URL
**Solution**:
1. Check Vercel dashboard → Settings → Environment Variables
2. Ensure `VITE_API_URL` is set correctly
3. Redeploy the project

---

## 📝 Important Notes

### Render Free Tier Limitations
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month free (enough for one service)

### Vercel Free Tier
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Custom domains supported

### MongoDB Atlas Free Tier
- 512 MB storage
- Shared cluster
- No credit card required

---

## 🎯 Next Actions

1. **Push code to GitHub** ⏳
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel** ⏳
   - Go to vercel.com
   - Import repository
   - Configure settings
   - Deploy

3. **Update Backend** ⏳
   - Copy Vercel URL
   - Update CLIENT_URL on Render
   - Restart backend

4. **Test Everything** ⏳
   - Registration
   - Login
   - Posts
   - Jobs
   - Admin features

---

## ✅ Success Criteria

Your deployment is successful when:
- ✅ Frontend loads on Vercel URL
- ✅ Users can register with college email
- ✅ Users can login
- ✅ Posts can be created and viewed
- ✅ Jobs can be viewed and applied to
- ✅ Admin can moderate content
- ✅ No CORS errors in console
- ✅ All features work as expected

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Vite Docs**: https://vitejs.dev
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas

---

## 🎉 Ready to Deploy!

Everything is configured and tested. Follow the steps above to deploy your frontend to Vercel!

**Estimated Time**: 10-15 minutes
**Difficulty**: Easy
**Cost**: $0 (Free tier)
