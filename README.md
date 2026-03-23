# Twinspire Website

A secure authentication and team management platform built with Next.js 15.

## Features

- 🔐 **Secure Authentication**: Firebase-based authentication with email/password, Google, and Apple sign-in
- 👥 **Team Management**: Admin dashboard for managing teams and users
- 🛡️ **Security First**: Comprehensive security headers, CSP, and .gitignore configuration
- ⚡ **Modern Stack**: Next.js 15, React 19, TypeScript, TailwindCSS 4

## Project Structure

```text
├── app/
│   ├── admin/          # Admin authentication and dashboard
│   │   ├── components/ # Auth UI components
│   │   ├── dashboard/  # Protected dashboard page
│   │   └── hooks/      # Auth hooks
│   ├── api/           # API routes
│   └── page.tsx       # Home page (login redirect)
├── components/
│   ├── auth/          # Auth wrapper components
│   └── ui/            # Reusable UI components
├── services/
│   └── firebase/      # Firebase configuration and hooks
├── hooks/             # Custom React hooks
└── lib/               # Utility functions and configs
```

## Getting Started

### Prerequisites

- Node.js 20+
- Firebase project with authentication enabled

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Firebase config to .env.local

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Security Features

- ✅ Content Security Policy (CSP)
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ Comprehensive .gitignore for sensitive files
- ✅ Firebase authentication with secure session management
- ✅ Protected routes with authentication guards

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Authentication**: Firebase Auth
- **State Management**: TanStack Query
- **UI Components**: Custom components with Radix UI primitives
- **Analytics**: Vercel Analytics

## License

Private

