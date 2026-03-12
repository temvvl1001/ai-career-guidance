# AI Career Guidance Platform

A modern full-stack web application that helps users discover the best career for them using personality tests (MBTI), AI analysis, and skill testing.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Recharts, Zustand
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **AI**: Google Gemini API
- **Auth**: JWT (cookie-based)

## Features

- **Landing Page**: Hero section, platform intro, top demanded careers
- **Login/Register**: Email + password authentication
- **Dashboard**: Welcome message, personality test CTA, career recommendations, AI assistant
- **Personality Test**: 20-question MBTI-style assessment
- **Results**: Personality visualization, strengths/weaknesses, career recommendations
- **Skill Test**: Career-specific skill assessments
- **AI Assistant**: Gemini-powered career advice and chat
- **Profile**: Grey dark theme, progress overview, test history
- **Career Comparison**: Side-by-side comparison of recommended careers

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add:
   - `DATABASE_URL` - PostgreSQL connection string
   - `JWT_SECRET` - Secret for JWT signing
   - `GEMINI_API_KEY` - Google Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

3. **Setup database**
   ```bash
   npx prisma db push
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app
  page.tsx          # Landing page
  /dashboard        # User dashboard
  /test             # MBTI personality test
  /skills           # Career skill tests
  /results          # Test results & recommendations
  /          # User profile (grey dark theme)

/components
  Header, LoginPopup, CareerCard
  MBTITest, SkillTest, ResultGraph
  AIHelper, CareerComparison

/lib
  prisma.ts, auth.ts, gemini.ts
  career-data.ts, mbti-questions.ts, skill-questions.ts

/api
  /auth (login, register, logout, me)
  /mbti (submit, results)
  /career (recommend)
  /skills (questions, submit)
  /ai (advice, chat)
  /profile (results)
```

## API Keys

- **Gemini API**: Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- The app works without Gemini (shows fallback content) but AI features require the key
