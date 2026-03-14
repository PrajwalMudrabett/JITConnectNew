# 🎓 JITConnect - College Social Network

A LinkedIn-style social networking platform for Jyothy Institute of Technology, connecting students, faculty, alumni, and departments.

## 🚀 Live Demo

- **Frontend**: Deploy on Vercel
- **Backend**: https://jitconnectnew.onrender.com
- **Database**: MongoDB Atlas

## ✨ Features

### For Students
- Create and share posts
- View and apply to job openings
- Connect with alumni and faculty
- Access research opportunities
- View college events

### For Faculty
- Post research opportunities
- Share academic content
- Connect with students
- Manage department activities

### For Alumni
- Post job openings
- Share career opportunities
- Mentor students
- Stay connected with college

### For Departments
- Post events and announcements
- Manage department activities
- Connect with other departments

### For Admins
- Content moderation
- Approve/restrict posts, jobs, research
- User management
- Platform oversight

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Vite
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## 📦 Project Structure

```
JITConnect/
├── src/                    # React source files
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   └── services/          # API services
├── public/                # Static assets
├── server/                # Backend server
│   ├── config/           # Database config
│   ├── middleware/       # Auth middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── utils/            # Utility functions
├── index.html            # Entry HTML
├── package.json          # Frontend dependencies
└── vite.config.js        # Vite configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Git installed

### 1. Clone Repository
```bash
git clone https://github.com/PrajwalMudrabett/JITConnectNew.git
cd JITConnectNew
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

**Frontend (.env)**:
```env
VITE_API_URL=https://jitconnectnew.onrender.com/api
```

**Backend (server/.env)**:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ALLOWED_EMAIL_DOMAINS=@jyothyit.ac.in,@jit.ac.in
CLIENT_URL=http://localhost:5173
```

### 5. Run Development Servers

**Frontend**:
```bash
npm run dev
```

**Backend** (in another terminal):
```bash
cd server
npm start
```

Visit: http://localhost:5173

## 🌐 Deployment

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variable:
   - `VITE_API_URL` = `https://jitconnectnew.onrender.com/api`
5. Deploy!

**Note**: No need to set Root Directory - frontend is now in root!

### Backend (Already Deployed)
- Platform: Render.com
- URL: https://jitconnectnew.onrender.com

## 🔐 Security Features

- Email validation (college domains only)
- Strong password requirements
- JWT authentication
- Password hashing with bcrypt
- Input sanitization
- CORS protection
- Security headers
- Role-based access control

## 👥 User Roles

- **Student**: Access jobs, research, events
- **Faculty**: Post research, manage content
- **Alumni**: Post jobs, mentor students
- **Department**: Manage events, announcements
- **Admin**: Full platform control

## 📧 Admin Access

- Email: admin@jyothyit.ac.in
- Password: Admin@12345

## 📚 Documentation

- `DEPLOY-NOW.md` - Quick deployment guide
- `VERCEL-DEPLOYMENT.md` - Detailed Vercel guide
- `BACKEND-INTEGRATION.md` - Backend integration
- `SECURITY-IMPROVEMENTS.md` - Security features

## 🐛 Troubleshooting

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Connection Issues
- Check backend is running
- Verify VITE_API_URL is correct
- Check CORS settings on backend

### Database Connection
- Verify MongoDB Atlas connection string
- Check network access (whitelist 0.0.0.0/0)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Prajwal Mudrabett

## 🔗 Links

- **GitHub**: https://github.com/PrajwalMudrabett/JITConnectNew
- **Backend**: https://jitconnectnew.onrender.com
- **College**: Jyothy Institute of Technology

---

Made with ❤️ for JIT Community
