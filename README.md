# MentWel — Mental Health Support Platform

MentWel is a web-based mental health support system built as a Final Year Project. It connects users with licensed therapists, provides evidence-based self-assessments, a curated resource library, mood tracking tools, and an AI wellness companion — all in one secure, responsive platform.

---

## Live Demo

- **Frontend:** *(deploy URL here)*
- **Backend API:** https://plp-final-project-backend.onrender.com

---

## Features

- **Authentication** — Email/password login, Google OAuth (Clerk), forgot/reset password
- **Self-Assessments** — PHQ-9, GAD-7, and Perceived Stress Scale with scored results
- **Resource Library** — Articles and guides with category filters, search, and bookmarks
- **Mood Tracking** — Daily emoji-based mood logs, 7-day chart, and calendar view
- **AI Chatbot (Welly)** — Mental wellness companion powered by OpenRouter (Llama 3.3)
- **Therapist Directory** — Browse licensed therapists and book sessions
- **Session Booking** — 4-step wizard to schedule text, voice, or video sessions
- **User Dashboard** — Personalised welcome, quick stats, and action shortcuts
- **Admin Dashboard** — User management, analytics, and platform overview
- **Dark/Light Mode** — System-aware with manual toggle, persisted in localStorage
- **Responsive Design** — Mobile, tablet, and desktop layouts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 4 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Forms | React Hook Form |
| Auth | Clerk (OAuth) + custom JWT |
| State | Zustand + React Query |
| HTTP | Axios |
| AI Chat | OpenRouter API |
| Testing | Vitest + Playwright |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Copy the environment file
cp .env.example .env

# 4. Add your keys to .env (see Environment Variables below)

# 5. Start the development server
npm run dev
```

The app runs at **http://localhost:3000** by default.

---

## Environment Variables

Create a `.env` file in the `frontend/` folder with the following:

```env
# Backend API
VITE_API_URL=https://plp-final-project-backend.onrender.com/api
VITE_BACKEND_URL=https://plp-final-project-backend.onrender.com

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# OpenRouter (AI Chatbot)
VITE_OPENROUTER_API_KEY=your_openrouter_api_key

# App
VITE_APP_NAME=MentWel
VITE_APP_URL=http://localhost:3000
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |
| `npm run lint` | Lint TypeScript/React code |
| `npm run lint:fix` | Lint and auto-fix issues |
| `npm run type-check` | TypeScript type checking only |

---

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Shared UI components
│   │   ├── Header.tsx       # Navigation with dark mode toggle
│   │   ├── Footer.tsx       # Site footer with links
│   │   ├── Layout.tsx       # Page wrapper
│   │   └── ChatBot.tsx      # Welly AI chat widget
│   ├── pages/               # Route-level page components
│   │   ├── auth/            # Login, register, forgot/reset password
│   │   ├── dashboard/       # User dashboard
│   │   ├── assessments/     # Self-assessment flow + results
│   │   ├── resources/       # Resource library + bookmarks
│   │   ├── mood/            # Mood tracking + calendar
│   │   ├── therapists/      # Therapist directory + detail
│   │   ├── sessions/        # Session booking wizard
│   │   ├── profile/         # User profile management
│   │   └── admin/           # Admin panel (login, dashboard, users)
│   ├── services/            # API service layer
│   ├── hooks/               # Custom React hooks
│   ├── data/                # Static fallback data
│   └── config/              # Axios instance and API config
├── public/                  # Static assets
├── index.html
├── tailwind.config.js
└── vite.config.ts
```

---

## Admin Access

Visit `/admin/login` and use the demo credentials:

- **Email:** `admin@mentwel.com`
- **Password:** `Admin@1234`

---

## Troubleshooting

**Dependencies fail to install**
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

**Port already in use**
Change `server.port` in `vite.config.ts` or stop the conflicting process.

**Chatbot not responding**
Make sure `VITE_OPENROUTER_API_KEY` is set in `.env` and the dev server was restarted after adding the key.

---

## License

This project is developed as a Final Year Project. All rights reserved.

---

*Built with care for mental health awareness* 💚
