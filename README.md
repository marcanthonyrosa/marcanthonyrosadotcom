# marcrosa.com

Personal portfolio and blog for Marc Anthony Rosa — product leader, founder of [Sugo AI](https://sugoai.com), and builder of opinionated software.

## What's here

- **Writing** — Essays on product strategy, leadership, and software craft
- **About** — Career timeline, speaking engagements, and work philosophy
- **MarcMan** — A hidden Pac-Man-style game triggered by clicking the headshot on the about page, complete with ghost AI, power-ups, and a Redis-backed leaderboard

## Tech stack

- [Next.js 16](https://nextjs.org) with App Router and React 19
- TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Upstash Redis](https://upstash.com) for game leaderboard storage
- [PostHog](https://posthog.com) for analytics
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

The game leaderboard and analytics require environment variables for Upstash Redis and PostHog. The site runs fine without them — the leaderboard falls back to in-memory storage in development.

## Project structure

```
app/
  (site)/          # Main site layout with sidebar navigation
    page.tsx       # Home
    about/         # Bio, career timeline, MarcMan game
    writing/       # Blog posts
    work/          # Case studies (dev only)
  api/
    leaderboard/   # Game score persistence (Upstash Redis)
    location/      # Geolocation for leaderboard entries
components/        # Shared UI components
public/            # Static assets
```
