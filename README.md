# 🗂️ Portfolio Admin — SaaS Portfolio Builder

A full-stack SaaS platform that lets users build and manage 
their personal portfolio through a secure admin dashboard — 
with a unique public portfolio link generated for each user.

## 🌐 Live Demo
👉 [Try it now](https://admin-portfolio-delta-flame.vercel.app/)

## ✨ Features
- 🔐 Authentication (Sign up / Login / Email verification)
- 🛡️ Protected admin dashboard with route management
- 📁 Full CRUD — manage projects, skills & personal info
- 🌍 Auto-generated public portfolio page per user
- 📊 User analytics & behavior tracking with PostHog
- 📱 Fully responsive design (mobile-first)

## 🛠️ Tech Stack
| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | Next.js (App Router), TypeScript  |
| Styling    | Tailwind CSS                      |
| Backend/DB | Supabase (Auth + PostgreSQL)      |
| Analytics  | PostHog                           |
| Deployment | Vercel                            |

## 🏗️ Architecture
- Next.js App Router with SSR for dynamic portfolio pages
- Supabase Auth with protected middleware routes
- PostgreSQL database with RLS (Row Level Security)
- Each user gets a unique public URL: /portfolio/[username]

## 🚀 Run Locally
git clone https://github.com/a7mad-jheer/Admin_Portfolio.git
cd Admin_Portfolio
npm install

# Add your environment variables
cp .env.example .env.local

npm run dev

## 🔑 Environment Variables
NEXT_PUBLIC_SUPABASE_URL=*********
NEXT_PUBLIC_SUPABASE_ANON_KEY=********
NEXT_PUBLIC_POSTHOG_KEY=*******
NEXT_PUBLIC_POSTHOG_HOST=********

