# CashBack Cinematic — React Website

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack
- React 18 + React Router v6
- Vite (bundler)
- Tailwind CSS (styling)

## Swap Your Videos
Edit `src/data/projects.js` — replace `youtubeId` values with your real YouTube video IDs.

For the hero background video on Home, edit the iframe `src` in `src/pages/Home.jsx` (search for `youtube.com/embed`).

## Google Drive Videos
For Google Drive embeds, use:
`https://drive.google.com/file/d/YOUR_FILE_ID/preview`
Replace the iframe src in VideoModal.jsx with this pattern.

## Pages
- `/` — Home
- `/services` — Studio Departments
- `/portfolio` — Video Showcase
- `/case-studies` — Results
- `/team` — The Syndicate
- `/blog` — Insights & Dispatches
- `/studio` — Studio (empty placeholder, navbar logo entry)
- `/contact` — Book Consultation

## Studio Section
The navbar has a **CashBack Studio** text link → `/studio`. While that page is open:
- the top (navbar) and bottom (footer) logos swap to the CashBack Studio logo, and
- every gold accent re-grades to the logo red (`#ED1C24`) — reverting when you leave.

The Studio logo is `public/cashstudio.png`, shown on a clean white rounded chip so it
stays sharp and readable on the dark navbar/footer.

## Booking Backend (email notifications)
The Contact page booking form posts to a small Express server that emails you the booking.

1. Copy `.env.example` to `.env` and fill in your Gmail + App Password:
   ```bash
   cp .env.example .env
   ```
   Create a Gmail **App Password** at https://myaccount.google.com/apppasswords
   (2-Step Verification must be enabled on the account).
2. Run the booking server in one terminal:
   ```bash
   npm run server
   ```
3. Run the site in another terminal:
   ```bash
   npm run dev
   ```
Vite proxies `/api` → `http://localhost:3001`, so submitting the booking form
sends an email to `TO_EMAIL` (default `cashbackagency1@gmail.com`).
