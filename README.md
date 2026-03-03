# Beast X (Gym Tracker) 🏋️

Production-ready MVP gym tracker built with **Next.js App Router**, **TypeScript**, **TailwindCSS**, **Prisma**, and **PostgreSQL** (Vercel Postgres / Neon / Supabase compatible).

## Features

- Onboarding with BMI calculation and category
- Weekly split setup (Mon-Sun muscle groups)
- Dashboard with today's split, recommended exercises, GIF previews, alternatives
- Workout logging with sets/reps/weight/notes
- History + session detail pages
- Progress stats (sessions/week, sets by muscle group, weekly volume)
- Dark/light mode (system + manual toggle)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL
- Zod for validation

## Setup

1. Create a Postgres database (Vercel Postgres recommended) and copy its connection string.

2. Install dependencies
   ```bash
   npm install
   ```
3. Copy environment file
   ```bash
   cp .env.example .env
   ```
4. Run migrations
   ```bash
   npm run prisma:migrate
   ```
5. Generate Prisma client
   ```bash
   npm run prisma:generate
   ```
6. Seed exercise library
   ```bash
   npm run prisma:seed
   ```
7. Start dev server
   ```bash
   npm run dev
   ```


## Deployment Notes

- This project is configured for **Prisma + PostgreSQL** in both local and deployment environments.
- Set `DATABASE_URL` in Vercel Project Settings → Environment Variables for Preview and Production.
- Prisma client is generated in `postinstall` and also during `build` to avoid missing-client deployment failures.
- Pages that read Prisma are configured as dynamic (`force-dynamic`) and Node runtime to avoid build-time prerender DB errors.

## Data Model Notes

- `UserProfile`: single-user MVP profile (age, height, weight, goal, BMI)
- `WeeklySplit`: 1 row per weekday + muscle group
- `ExerciseLibrary`: seeded with 30+ exercises and placeholder GIF URLs
- `ExerciseAlternative`: links exercises to alternatives
- `WorkoutSession` and `WorkoutExerciseEntry`: workout logs

## Next Version Ideas (Ultra Smart)

- Auto-adjust plan based on prior 2-week volume
- Rest/workout timers
- PR tracking
- Basic food tracking + safe “Can I eat this?” assistant
