📘 JITConnect – Technical Stack Document

(Architecture & Technology Blueprint)

1️⃣ Project Overview

JITConnect is a private college-exclusive social networking platform for
Jyothy Institute of Technology

The system will be built using the MERN Stack with role-based authentication, real-time messaging, and structured content management.

2️⃣ Core Technology Stack
🌐 Frontend
Framework

React.js (Vite or Create React App)

UI Styling

Tailwind CSS (clean and modern)

OR CSS Modules (if you prefer structured styling)

State Management

React Context API (Phase 1)

Redux Toolkit (Phase 2 – optional scaling)

Routing

React Router DOM

HTTP Communication

Axios

UI Enhancements

React Icons

Framer Motion (optional animations)

⚙️ Backend
Runtime Environment

Node.js

Framework

Express.js

Authentication

JWT (JSON Web Tokens)

bcrypt (password hashing)

Middleware

CORS

Body-parser

Morgan (logging)

Multer (for image uploads)

🗄️ Database
Database

MongoDB

ODM

Mongoose

Why MongoDB?

Flexible schema (perfect for multi-role users)

Easy post & comment nesting

Scalable for social media type content

3️⃣ System Architecture

Frontend (React)
⬇
REST API (Express Server)
⬇
MongoDB Database

Optional Phase 2:
⬇
Socket.io (Real-time chat)

4️⃣ Folder Structure
📁 Root
JITConnect/
│
├── client/        (React Frontend)
├── server/        (Node Backend)
└── README.md
📁 Client Structure
client/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/ (API calls)
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
📁 Server Structure
server/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── models/
│   ├── User.js
│   ├── Post.js
│   ├── Message.js
│   └── Connection.js
│
├── routes/
│
├── middleware/
│
├── uploads/
│
├── server.js
└── package.json
5️⃣ Database Schema Design (MongoDB Models)
User Model
{
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["student", "faculty", "alumni", "department"]
  },
  branch: String,
  batch: String,
  department: String,
  designation: String,
  company: String,
  bio: String,
  profilePic: String,
  connections: [ObjectId],
  createdAt: Date
}
Post Model
{
  user: ObjectId,
  content: String,
  image: String,
  category: {
    type: String,
    enum: ["internship", "placement", "research", "event", "general"]
  },
  likes: [ObjectId],
  comments: [
    {
      user: ObjectId,
      text: String,
      createdAt: Date
    }
  ],
  createdAt: Date
}
Message Model
{
  sender: ObjectId,
  receiver: ObjectId,
  message: String,
  createdAt: Date
}
6️⃣ Authentication Flow

User registers

Password hashed with bcrypt

JWT token generated

Token stored in:

HTTP-only cookie (recommended)

OR localStorage (simpler setup)

Protected routes verify JWT middleware

7️⃣ Security Stack

Password hashing (bcrypt)

JWT authentication

Role-based access control

Input validation (Joi or Express-validator)

Rate limiting (optional Phase 2)

Helmet (security headers)

8️⃣ Real-Time Features (Phase 2)
Socket.io Integration

Used For:

Real-time chat

Instant notifications

Online status indicator

9️⃣ Deployment Stack
Frontend Hosting

Vercel

Netlify

Backend Hosting

Render

Railway

Cyclic

Database Hosting

MongoDB Atlas (Cloud)

🔟 Development Tools

VS Code

Postman

MongoDB Compass

Git & GitHub

ESLint & Prettier

11️⃣ Environment Variables
PORT=5000
MONGO_URI=
JWT_SECRET=
CLOUDINARY_API_KEY= (optional)
CLOUDINARY_SECRET=
12️⃣ API Structure
Auth Routes
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
Post Routes
POST   /api/posts
GET    /api/posts
DELETE /api/posts/:id
Connection Routes
POST /api/connect/:userId
PUT  /api/connect/accept/:userId
Message Routes
POST /api/messages
GET  /api/messages/:userId
13️⃣ Performance Considerations

Pagination for posts

Lazy loading images

Indexing MongoDB fields

Caching (optional)

14️⃣ Scalability Plan

Phase 1:

Basic social feed

Connections

Messaging

Phase 2:

Real-time system

AI recommendations

Internship board

Notification system

15️⃣ Why MERN is Perfect for This

✔ Flexible user roles
✔ Document-based social content
✔ Real-time ready
✔ Highly scalable
✔ Resume-strong tech stack