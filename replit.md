# TaskFlow - Modern Todo List Application

## Overview

TaskFlow is a modern, productivity-focused todo list application built with React and TypeScript. The application emphasizes a clean, distraction-free interface inspired by Linear and Todoist, featuring smooth animations, dark mode support, and client-side data persistence using LocalStorage. The app provides a streamlined task management experience with filtering capabilities and inline editing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** React hooks (useState, useContext) with custom hooks for LocalStorage persistence
- **Styling:** Tailwind CSS with custom design system based on shadcn/ui components
- **Animations:** Framer Motion for smooth, purposeful micro-interactions
- **Component Library:** Radix UI primitives for accessible, unstyled components

**Design System:**
- Custom Tailwind configuration with extended color palette supporting light/dark themes
- Typography system using Inter font family from Google Fonts
- Consistent spacing primitives (2, 3, 4, 6, 8 units)
- Component variants using class-variance-authority (CVA)
- CSS variables for theme-aware colors and design tokens

**State Management Strategy:**
- Theme state managed via React Context (ThemeContext)
- Todo data persisted to browser LocalStorage using custom `useLocalStorage` hook
- No backend state synchronization - fully client-side application
- LocalStorage changes detected across tabs via storage event listeners

**Key Architectural Decisions:**
- **Client-Side Only:** All todo data stored in browser LocalStorage rather than database, simplifying deployment and eliminating need for user authentication
- **Rationale:** Reduces complexity, provides instant offline functionality, and maintains user privacy
- **Trade-offs:** Data not synced across devices, lost if browser data cleared

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Separate development (index-dev.ts) and production (index-prod.ts) entry points
- Vite middleware integration in development for HMR and instant updates

**Development vs Production:**
- **Development:** Vite dev server middleware serves React app with HMR
- **Production:** Express serves pre-built static files from dist/public directory
- **Build Process:** Vite builds client, esbuild bundles server code

**API Structure:**
- Routes registered via `registerRoutes` function in server/routes.ts
- Currently no active API endpoints as app uses client-side storage
- Storage interface defined but not implemented (MemStorage class serves as placeholder)

**Key Architectural Decisions:**
- **Minimal Backend:** Server primarily serves static files, no active API layer
- **Rationale:** Todo app doesn't require server-side data persistence, reducing infrastructure needs
- **Future Extensibility:** Storage interface allows easy migration to database-backed solution if needed

### Data Storage Solutions

**Current Implementation:**
- **Primary Storage:** Browser LocalStorage API
- **Schema Validation:** Zod schemas defined in shared/schema.ts for type safety
- **Data Structure:** Array of Todo objects with id, text, completed status, and createdAt timestamp

**Database Configuration (Unused):**
- Drizzle ORM configured for PostgreSQL (via Neon serverless driver)
- Configuration present in drizzle.config.ts but not actively used
- Schema file exists in shared/schema.ts for future database migration
- **Rationale:** Infrastructure prepared for potential backend implementation while keeping current version simple

**Key Architectural Decisions:**
- **LocalStorage First:** Prioritizes simplicity and instant user feedback
- **Prepared for Migration:** Database tooling configured for easy transition to server-side persistence
- **Trade-offs:** No cross-device sync, data persistence limited to single browser

### Authentication and Authorization

**Current Implementation:**
- No authentication or authorization system
- All data stored locally per browser session
- No user accounts or multi-user support

**Rationale:**
- Simplifies initial implementation
- Reduces privacy concerns (data never leaves user's device)
- Eliminates need for user management infrastructure

### External Dependencies

**UI Component Libraries:**
- **Radix UI:** Comprehensive set of unstyled, accessible component primitives (@radix-ui/react-*)
- **shadcn/ui:** Pre-styled components built on Radix UI following design system conventions
- **Framer Motion:** Animation library for smooth transitions and micro-interactions
- **Lucide React:** Icon library for consistent iconography

**State Management & Data Fetching:**
- **TanStack React Query:** Configured but not actively used (prepared for future API integration)
- **React Hook Form:** Form validation with Zod resolver integration (@hookform/resolvers)

**Database & ORM (Configured but Unused):**
- **Drizzle ORM:** Type-safe ORM for PostgreSQL (drizzle-orm, drizzle-zod)
- **Neon Serverless:** PostgreSQL driver for serverless environments (@neondatabase/serverless)

**Utilities:**
- **nanoid:** Unique ID generation for todo items
- **date-fns:** Date manipulation and formatting
- **clsx & tailwind-merge:** Utility for conditional CSS class composition
- **zod:** Runtime type validation and schema definition

**Development Tools:**
- **TypeScript:** Type safety across client and server
- **Vite:** Build tool with plugin ecosystem (@replit/vite-plugin-*)
- **ESBuild:** Fast JavaScript bundler for server code
- **PostCSS:** CSS processing with Tailwind CSS and Autoprefixer

**Third-Party Services:**
- **Google Fonts:** Inter font family via CDN
- None currently integrated for data persistence or analytics

**Key Architectural Decisions:**
- **Comprehensive UI Library:** Radix UI + shadcn/ui provides accessible, customizable components
- **Prepared for Backend:** Database tools configured but inactive, enabling easy future migration
- **Modern Tooling:** Vite and ESBuild provide fast development experience and optimized builds