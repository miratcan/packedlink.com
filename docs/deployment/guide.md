# Deployment Guide

This guide covers deployment steps for PackedLink. Update as the project evolves.

## Backend (Django)
- `cp src/backend/.env.example src/backend/.env` and update:
  - `DJANGO_ALLOWED_HOSTS=packedlink.com,api.packedlink.com`
  - `CORS_ALLOWED_ORIGINS=https://packedlink.com,https://www.packedlink.com`
- Run migrations: `just migrate`
- Start server: `uv run gunicorn config.wsgi:application --bind 0.0.0.0:8000`
- Smoke checks:
  - `curl https://api.packedlink.com/api/health/` → `healthy`
  - `curl -X POST https://api.packedlink.com/api/waitlist/ -H "Content-Type: application/json" -d '{"email":"test@example.com"}'`
- Admin: create a superuser if needed (`uv run python manage.py createsuperuser`) to view waitlist entries.

## Frontend (Next.js)
- `cp src/frontend/.env.local.example src/frontend/.env.local` and set `NEXT_PUBLIC_API_BASE_URL=https://api.packedlink.com`
- Install + build: `cd src/frontend && npm install && npm run build`
- Deploy to Vercel (or any Node host):
  - Build command: `npm run build`
  - Output: Next.js standalone (already configured)
  - Env: `NEXT_PUBLIC_API_BASE_URL` pointing to the backend
- Post-deploy smoke:
  - `/` renders with hero + CTA
  - `/waitlist` submits to `/api/waitlist/` and shows success

## DNS & SSL
- Point `packedlink.com` to the frontend host.
- Point `api.packedlink.com` to the Django host; enable HTTPS.

## Acceptance Checklist
- Landing loads without console errors.
- Waitlist POST returns `200/201`, duplicates handled gracefully.
- Healthcheck returns `healthy`.
