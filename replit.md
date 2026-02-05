# Impactiv - Corporate Landing Page

## Overview

This is a corporate landing page application for "Impactiv," a French professional training company. The application features a single-page marketing website with sections for hero, about, benefits, services, news/articles, and contact forms. It includes an admin capability for authenticated users to manage news content through Replit Auth integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming (brand colors: primary dark blue, secondary cyan)
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **State Management**: TanStack React Query for server state and caching
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Animations**: Framer Motion for scroll reveals and hero sections
- **Smooth Scrolling**: react-scroll for navigation to anchor sections

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for validation
- **Authentication**: Replit Auth (OpenID Connect) with Passport.js, session-based authentication stored in PostgreSQL

### Data Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema-to-validation generation
- **Schema Location**: `shared/schema.ts` contains all database tables
- **Tables**: 
  - `news` - Articles/podcasts with title, content, category, image/link URLs
  - `contacts` - Form submissions with name, email, company, message
  - `users` - User accounts for Replit Auth
  - `sessions` - Session storage for authentication

### Build System
- **Dev Server**: Vite with HMR for frontend, tsx for backend hot-reloading
- **Production Build**: Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **Database Migrations**: Drizzle Kit with `db:push` command

### Project Structure
```
client/           # React frontend
  src/
    components/   # Reusable UI components
    hooks/        # Custom React hooks (use-auth, use-news, use-contact)
    pages/        # Route components
    lib/          # Utilities (queryClient, utils)
server/           # Express backend
  replit_integrations/auth/  # Replit Auth implementation
shared/           # Shared code between frontend/backend
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod schemas
  models/         # TypeScript model definitions
```

## External Dependencies

### Database
- **PostgreSQL**: Required via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage in PostgreSQL

### Authentication
- **Replit Auth**: OpenID Connect provider via `ISSUER_URL` (defaults to replit.com/oidc)
- **Required Environment Variables**: `REPL_ID`, `SESSION_SECRET`, `DATABASE_URL`

### Third-Party Libraries
- **openid-client**: OpenID Connect client for Replit Auth
- **passport / passport-local**: Authentication middleware
- **express-session**: Session management
- **memoizee**: Caching for OIDC configuration

### Fonts
- **Google Fonts**: Nunito Sans (primary font family), loaded via CDN in index.html

### Replit-Specific Plugins
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)