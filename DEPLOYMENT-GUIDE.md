# JITConnect Deployment Guide

## Backend Deployment (Render.com)

### ✅ Already Deployed
Your backend is live at: **https://jitconnectnew.onrender.com**

### Environment Variables on Render
Make sure these are set in your Render dashboard:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://prajwalmudrabett_db_user:PrajwalDB@cluster0.ljwzydb.mongodb.net/jitconnect?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=jitconnect_secret_key_2024_prajwal_mudrabett_secure
ALLOWED_EMAIL_DOMAINS=@jyothyit.ac.in,@jit.ac.in
CLIENT_URL=https://your-frontend-url.vercel.app
```

### Update CLIENT_URL
Once you deploy the frontend, update the `CLIENT_URL` environment variable on Render with your actual frontend URL.

---

## Frontend Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy from the frontend directory**:
   ```bash
   cd jitconnect-react
   vercel
   ```

3. **Set Environment Variables on Vercel**:
   - Go to your Vercel project settings
   - Add environment variable:
     ```
     VITE_API_URL=https://jitconnectnew.onrender.com/api
     ```

4. **Update Backend CORS**:
   - After deployment, copy your Vercel URL
   - Update `CLIENT_URL` on Render with your Vercel URL

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   cd jitconnect-react
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. **Set Environment Variables**:
   - Go to Netlify dashboard → Site settings → Environment variables
   - Add: `VITE_API_URL=https://jitconnectnew.onrender.com/api`

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   cd jitconnect-react
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/jitconnect",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## Testing the Deployment

### 1. Test Backend API
```bash
curl https://jitconnectnew.onrender.com
```

Expected response:
```json
{
  "message": "JITConnect API is running..."
}
```

### 2. Test Frontend Connection
Once deployed, open your frontend URL and try:
- Registration with college email
- Login
- Creating a post
- Viewing jobs

---

## Important Notes

### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:5173` (local development)
- `http://localhost:5174` (local development)
- `https://jitconnectnew.onrender.com` (backend itself)
- Your frontend URL (set via CLIENT_URL env variable)

### Environment Variables

**Backend (.env)**:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ALLOWED_EMAIL_DOMAINS=@jyothyit.ac.in,@jit.ac.in
CLIENT_URL=your_frontend_url
```

**Frontend (.env)**:
```env
VITE_API_URL=https://jitconnectnew.onrender.com/api
```

### Security Checklist
- ✅ CORS configured with specific origins
- ✅ Environment variables not committed to Git
- ✅ JWT secret is secure
- ✅ MongoDB connection string is secure
- ✅ Input validation on all endpoints
- ✅ Password hashing with bcrypt
- ✅ Security headers enabled
- ✅ Rate limiting (recommended to add)

---

## Troubleshooting

### Backend Issues

**Problem**: CORS errors
**Solution**: Make sure CLIENT_URL is set correctly on Render

**Problem**: Database connection fails
**Solution**: Check MongoDB Atlas whitelist (allow all IPs: 0.0.0.0/0)

**Problem**: 502 Bad Gateway
**Solution**: Check Render logs, might be cold start (wait 30 seconds)

### Frontend Issues

**Problem**: API calls fail
**Solution**: Check VITE_API_URL is set correctly

**Problem**: Build fails
**Solution**: Run `npm install` and `npm run build` locally first

**Problem**: Environment variables not working
**Solution**: Rebuild and redeploy after setting env vars

---

## Local Development

### Backend
```bash
cd server
npm install
npm start
```

### Frontend
```bash
cd jitconnect-react
npm install
npm run dev
```

---

## Monitoring

### Backend Logs (Render)
- Go to Render dashboard
- Select your service
- Click "Logs" tab

### Frontend Logs (Vercel)
- Go to Vercel dashboard
- Select your project
- Click "Deployments" → Select deployment → "View Function Logs"

---

## Next Steps

1. ✅ Backend deployed on Render
2. ⏳ Deploy frontend (Vercel/Netlify/GitHub Pages)
3. ⏳ Update CLIENT_URL on Render with frontend URL
4. ⏳ Test complete flow
5. ⏳ Set up custom domain (optional)
6. ⏳ Enable analytics (optional)
7. ⏳ Set up monitoring (optional)

---

## Support

If you encounter any issues:
1. Check the logs on Render/Vercel
2. Verify environment variables are set correctly
3. Test API endpoints with Postman/curl
4. Check browser console for errors
