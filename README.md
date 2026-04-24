# Arash & Roxana Luxury Dashboard

Full-stack project: Next.js + Supabase + TailwindCSS.

## Install

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in SQL Editor.
3. Create a public Storage bucket named `memories`.
4. Add env values in `.env.local`.

## Pages

- `/` main dashboard
- `/admin` admin panel

## Notes

- Main page is mostly display-only, except goals/checklist toggles.
- Admin page edits settings, months, goals, uploads couple photos, monthly photos, and monthly music.
- Current month is detected using real Persian calendar via Intl.
