# 🔧 Vercel Deployment Troubleshooting

## ❌ Error: 404 NOT_FOUND

This error means Vercel can't find your application files. Here's how to fix it:

---

## ✅ Solution: Fix Root Directory

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to your Vercel project**:
   - Visit: https://vercel.com/dashboard
   - Click on your project

2. **Go to Settings**:
   - Click "Settings" tab
   - Click "General" in the left sidebar

3. **Update Root Directory**:
   - Find "Root Directory" section
   - Click "Edit"
   - Enter: `jitconnect-react`
   - Click "Save"

4. **Redeploy**:
   - Go to "Deployments" tab
   - Click the three dots (...) on the latest deployment
   - Click "Redeploy"
   - Check "Use existing Build Cache" (optional)
   - Click "Redeploy"

---

### Method 2: Delete and Reimport

If the above doesn't work:

1. **Delete the project**:
   - Go to Settings → General
   - Scroll to bottom
   - Click "Delete Project"
   - Confirm deletion

2. **Reimport with correct settings**:
   - Go to: https://vercel.com/new
   - Import "JITConnectNew" repository
   - **IMPORTANT**: Set these correctly:
     - Framework Preset: **Vite**
     - Root Directory: **jitconnect-react** ← CRITICAL!
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Add Environment Variable**:
   ```
   Name: VITE_API_URL
   Value: https://jitconnectnew.onrender.com/api
   ```

4. **Deploy**:
   - Click "Deploy" button

---

## 🔍 Verify Settings

After deployment, check these settings:

### Project Settings → General
```
Root Directory: jitconnect-react
Framework Preset: Vite
Node.js Version: 18.x (or latest)
```

### Project Settings → Environment Variables
```
VITE_API_URL = https://jitconnectnew.onrender.com/api
```

### Build & Development Settings
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Development Command: npm run dev
```

---

## 🧪 Test Locally First

Before deploying, test the build locally:

```bash
cd jitconnect-react
npm install
npm run build
npm run preview
```

If this works locally, it should work on Vercel.

---

## 🐛 Common Issues

### Issue 1: Wrong Root Directory
**Symptom**: 404 NOT_FOUND error
**Solution**: Set Root Directory to `jitconnect-react`

### Issue 2: Build Fails
**Symptom**: Build error during deployment
**Solution**: 
```bash
cd jitconnect-react
rm -rf node_modules package-lock.json
npm install
npm run build
```
If it works locally, push and redeploy.

### Issue 3: Environment Variables Not Working
**Symptom**: API calls fail or go to wrong URL
**Solution**: 
- Check variable name is exactly: `VITE_API_URL`
- Check value is: `https://jitconnectnew.onrender.com/api`
- Redeploy after adding variables

### Issue 4: Blank Page
**Symptom**: Page loads but shows nothing
**Solution**: 
- Check browser console for errors
- Verify API URL is correct
- Check if backend is awake (visit https://jitconnectnew.onrender.com)

---

## 📋 Correct Configuration Checklist

- [ ] Root Directory set to `jitconnect-react`
- [ ] Framework Preset set to `Vite`
- [ ] Build Command is `npm run build`
- [ ] Output Directory is `dist`
- [ ] Environment variable `VITE_API_URL` is added
- [ ] Environment variable value is `https://jitconnectnew.onrender.com/api`
- [ ] Project redeployed after changes

---

## 🎯 Step-by-Step Fix

### Step 1: Check Current Settings
1. Go to Vercel Dashboard
2. Click your project
3. Go to Settings → General
4. Check "Root Directory" value

### Step 2: Fix Root Directory
If it's empty or wrong:
1. Click "Edit" next to Root Directory
2. Enter: `jitconnect-react`
3. Click "Save"

### Step 3: Verify Environment Variables
1. Go to Settings → Environment Variables
2. Verify `VITE_API_URL` exists
3. Verify value is `https://jitconnectnew.onrender.com/api`

### Step 4: Redeploy
1. Go to Deployments tab
2. Click three dots on latest deployment
3. Click "Redeploy"
4. Wait for deployment to complete

### Step 5: Test
1. Visit your Vercel URL
2. Check if homepage loads
3. Try to register/login
4. Check browser console for errors

---

## 🆘 Still Not Working?

### Option 1: Use Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from correct directory
cd jitconnect-react
vercel --prod
```

This will automatically detect the correct settings.

### Option 2: Check Build Logs

1. Go to Vercel Dashboard
2. Click on your project
3. Go to "Deployments"
4. Click on the failed deployment
5. Check the build logs for errors
6. Share the error message for specific help

---

## 📞 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Backend API**: https://jitconnectnew.onrender.com
- **GitHub Repo**: https://github.com/PrajwalMudrabett/JITConnectNew

---

## ✅ Expected Result

After fixing, you should see:
- ✅ Homepage loads
- ✅ Login/Register pages work
- ✅ No 404 errors
- ✅ API calls work
- ✅ No console errors

---

## 🎉 Success!

Once deployed correctly, your app will be live at:
```
https://your-project-name.vercel.app
```

Don't forget to update `CLIENT_URL` on Render with your Vercel URL!
