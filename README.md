# Kajo Studio 360

Prémiový 360° photobooth — webová prezentace.

## Setup

```bash
npm install
cp .env.example .env.local  # configure your API keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `CONTACT_EMAIL` | Email to receive form submissions |
| `NEXT_PUBLIC_SITE_URL` | Production site URL |

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form + Zod
- Resend (email)
