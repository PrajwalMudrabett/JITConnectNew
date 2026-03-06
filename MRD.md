Project Name: JITConnect
1. Overview

JITConnect is a private, college-exclusive social networking platform designed for members of
Jyothy Institute of Technology.

It integrates features inspired by:

Instagram

LinkedIn

But strictly restricted to verified members of JIT.

The platform will allow:

Students to showcase certifications, internships, placements

Faculties to share research papers & conference participation

Alumni to guide students and post career insights

Departments to post newsletters, events & placement updates

2. Problem Statement

Currently:

Achievements are scattered across WhatsApp groups.

Alumni-student connection is weak.

Department updates lack centralized visibility.

No structured internal digital identity for members.

There is no centralized internal professional network exclusive to JIT.

3. Target Users
User Type	Description	Purpose
Students	Current students	Showcase achievements, connect with alumni
Faculties	Teaching staff	Share research, publications
Alumni	Past students	Mentor, share career journey
Departments	Official accounts	Post newsletters & placement updates
4. Core Features
4.1 Authentication System
Role-Based Signup/Login

Users must select:

Student

Faculty

Alumni

Department

Required Fields at Registration
Students

Name

USN

Branch

Year

Official Email

Password

Profile Picture

Faculties

Name

Department

Designation

Email

Experience

Password

Alumni

Name

Batch

Branch

Current Company

Designation

LinkedIn URL

Email

Password

Departments

Department Name

Official Email

Password

Description

4.2 Landing Page (Home Feed)

After login:

Users see:

Posts from Departments (always visible)

Posts from connected users

Trending posts

Post Types:

Image post

Text post

Achievement post

Event post

Each post contains:

Profile image

Username

Role tag (Student / Faculty / Alumni / Dept)

Timestamp

Like button

Comment section

Share button (internal share)

4.3 User Profiles

Each user profile must show:

Profile picture

Bio

Role badge

Achievements section

Posts

Connections

Message button

4.4 Connections System

Users can:

Send connection request

Accept / Reject

View connection list

Students should be able to:

Filter alumni by branch or company

4.5 Messaging System

Basic 1-to-1 messaging:

Real-time (optional in Phase 2)

Simple chat interface

Message history stored in database

4.6 Posting System

Users can:

Upload image

Write caption

Tag as:

Internship

Placement

Research

Event

General

Departments can:

Pin posts

Mark as “Official Announcement”

4.7 Admin Panel (Important)

You must build:

View all users

Approve accounts

Delete inappropriate posts

See analytics:

Number of students

Number of alumni

Most active users

Posts count

5. Functional Requirements
5.1 Frontend Stack

HTML5

CSS3

JavaScript (Vanilla JS)

Simple responsive layout

Minimal design

Clean typography

5.2 Backend Stack

Recommended:

Node.js

Express.js

MySQL (or MongoDB)

Since you’re already working with backend in CruzeLab, this will strengthen your profile massively.

5.3 Database Design
Tables
Users Table

user_id (PK)

name

email

password (hashed)

role

branch

batch

department

designation

company

profile_pic

bio

created_at

Posts Table

post_id (PK)

user_id (FK)

content

image_url

category

created_at

Likes Table

like_id

post_id

user_id

Comments Table

comment_id

post_id

user_id

comment_text

created_at

Connections Table

id

sender_id

receiver_id

status (pending/accepted)

Messages Table

id

sender_id

receiver_id

message

timestamp

6. Non-Functional Requirements

Secure password hashing (bcrypt)

Role-based authorization

Clean UI/UX

Responsive design

Data validation

Session management (JWT)

7. User Journey Flow
1️⃣ Registration

User selects role → fills details → account created → waiting for admin approval

2️⃣ Login

Credentials validated → session created → redirect to Home

3️⃣ Home Feed

User sees posts → can like/comment → can connect

4️⃣ Profile

User edits bio → uploads achievements → views connections

8. UI Structure
Pages Required

index.html (Landing Page)

login.html

register.html

dashboard.html

profile.html

messaging.html

admin.html

9. Future Scope (Version 2)

Real-time chat using Socket.io

AI-based alumni recommendation

Resume upload

Internship board

Placement tracker dashboard

Event calendar

Notifications system

Mobile App version

10. Risks & Mitigation
Risk	Mitigation
Fake accounts	Admin approval required
Inappropriate posts	Reporting + Admin moderation
Low adoption	Department endorsement
Data privacy	Restricted email domain
11. Competitive Advantage

Unlike Instagram:

Not public

Professional & academic focused

Unlike LinkedIn:

Community-specific

Personal + professional mix

Unlike WhatsApp:

Structured

Searchable

Profile-based

12. Success Metrics

70% student registration

50% active monthly users

10+ alumni actively mentoring

Weekly department announcements

13. Technical Architecture (High-Level)

Frontend → REST API → Backend → Database
Authentication → JWT
Images → Stored locally or Cloud Storage

14. Why This Project Is Powerful For You

Jayashankar, this project can:

Showcase full-stack ability

Demonstrate real-world system design

Impress automotive companies (internal systems matter!)

Strengthen your resume for internships