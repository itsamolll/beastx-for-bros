# Beast X (Gym Tracker) 🏋️

Production-ready MVP gym tracker built with **Next.js App Router**, **TypeScript**, **TailwindCSS**, **Prisma**, and **SQLite**.

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
- Prisma ORM + SQLite
- Zod for validation

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy environment file
   ```bash
   cp .env.example .env
   ```
3. Run migrations
   ```bash
   npm run prisma:migrate
   ```
4. Generate Prisma client
   ```bash
   npm run prisma:generate
   ```
5. Seed exercise library
   ```bash
   npm run prisma:seed
   ```
6. Start dev server
   ```bash
   npm run dev
   ```


## Deployment Notes

- This app uses **Prisma + SQLite**. For many serverless platforms, SQLite file writes are ephemeral; prefer a persistent SQL provider for production scale.
- Pages that read Prisma are configured as dynamic (`force-dynamic`) and Node runtime to avoid build-time prerender DB errors.
- Ensure `DATABASE_URL` is set in deployment env vars.

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
