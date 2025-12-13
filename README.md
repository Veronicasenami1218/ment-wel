# 🌟 MentWel - Mental Health Platform

A beautiful, modern mental health platform built with React, TypeScript, and Tailwind CSS. Connect with licensed therapists across Nigeria for anonymous, secure, and flexible therapy sessions.

## 🌐 Live Demo

- **Frontend:** [https://plp-ment-wel.netlify.app/](https://plp-ment-wel.netlify.app/)
- **Backend API:** [https://plp-final-project-backend.onrender.com](https://plp-final-project-backend.onrender.com)
- **API Documentation:** [https://plp-final-project-backend.onrender.com/api/v1/docs](https://plp-final-project-backend.onrender.com/api/v1/docs)

## ✨ Features

- **Beautiful UI** - Vibrant gradients and inspirational design
- **100% Anonymous** - Complete privacy and confidentiality
- **Licensed Therapists** - Verified mental health professionals
- **Nigeria-focused** - Tailored for the Nigerian mental health landscape
- **Responsive Design** - Works perfectly on all devices
- **Modern Tech Stack** - React 18, TypeScript, Tailwind CSS

## Prerequisites
- Node.js 18+ and npm 9+
- Recommended: Git

## Getting Started
1. Install dependencies (pick one):
   - Normal install:
     ```powershell
     npm install
     ```
   - If you hit ERESOLVE / vite@undefined:
     ```powershell
     npm install --legacy-peer-deps
     ```
2. Start the dev server:
   ```powershell
   npm run dev
   ```
3. Open the URL printed in the terminal (usually http://localhost:5173).

## Scripts
- `npm run dev` – Start Vite dev server
- `npm run build` – Type-check and build for production
- `npm run preview` – Preview the production build locally
- `npm run test` – Run unit tests (Vitest)
- `npm run test:ui` – Run Vitest in UI mode
- `npm run test:e2e` – Run Playwright end-to-end tests
- `npm run lint` – Lint TypeScript/React code
- `npm run lint:fix` – Lint and auto-fix

## 🔧 Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the variables:
   ```env
   # API Configuration
   VITE_API_URL=https://plp-final-project-backend.onrender.com/api
   VITE_BACKEND_URL=https://plp-final-project-backend.onrender.com
   
   # App Configuration
   VITE_APP_NAME=MentWel
   VITE_APP_URL=https://plp-ment-wel.netlify.app
   
   # Feature Flags
   VITE_ENABLE_ANALYTICS=true
   VITE_ENABLE_CHAT=true
   ```

3. Restart the dev server after changes.

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite 4** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API calls

### Backend Integration
- **Backend URL:** [https://plp-final-project-backend.onrender.com](https://plp-final-project-backend.onrender.com)
- **API Endpoints:** RESTful API for therapists, sessions, and user management

### Development Tools
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **ESLint** - Code linting and formatting
- **Netlify** - Deployment and hosting

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/              # Page components
│   │   ├── LandingPage.tsx
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # User dashboard
│   │   ├── therapists/     # Therapist directory
│   │   └── sessions/       # Session booking
│   ├── services/           # API services
│   │   ├── auth.service.ts
│   │   ├── therapist.service.ts
│   │   └── session.service.ts
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.ts
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   └── config/             # Configuration files
│       └── api.ts
├── public/                 # Static assets
├── index.html             # Entry HTML file
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts         # Vite configuration
└── vercel.json           # Deployment configuration
```

## Docker (optional)
Build and run with Docker:
```powershell
docker build -t mentwel-frontend .
docker run -p 5173:5173 mentwel-frontend
```
If the image exposes a different port, adjust the mapping.

## Troubleshooting
- **npm ERESOLVE / vite@undefined**
  - This is usually an npm resolver/cache quirk. Try:
    ```powershell
    npm cache clean --force
    npm install --legacy-peer-deps
    ```
  - Or pin compatible versions explicitly:
    ```powershell
    npm install -D vite@4.5.0 @vitejs/plugin-react@4.7.0
    npm install
    ```
- **Node version**
  - Ensure Node 18+ (`node -v`).
- **Port already in use**
  - Change the dev server port in `vite.config.ts` or stop the conflicting process.

## Build & Preview
```powershell
npm run build
npm run preview
```

## 🚀 Deployment

The application is deployed on **Netlify** with automatic deployments from the main branch.

- **Live URL:** [https://plp-ment-wel.netlify.app/](https://plp-ment-wel.netlify.app/)
- **Backend API:** [https://plp-final-project-backend.onrender.com](https://plp-final-project-backend.onrender.com)

### Deploy Your Own

1. **Fork this repository**
2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your forked repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
3. **Add environment variables** in Netlify dashboard
4. **Deploy!**

## 🤝 Contributing

This is a PLP (Power Learn Project) final project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the PLP Final Project. All rights reserved.

---

**Built with ❤️ for mental health awareness in Nigeria** 🇳🇬

