# TaskFlow - Modern Todo List Application

## Overview
A beautiful, modern todo list application with smooth animations, dark/light theme switching, and frontend LocalStorage persistence. Built with React, TypeScript, Framer Motion, and Tailwind CSS.

## Features
- ✅ Create, edit, and delete tasks with smooth animations
- ✅ Mark tasks as complete/incomplete with animated checkboxes
- ✅ Filter tasks by status (All/Active/Completed)
- ✅ Dark/light theme switcher with smooth color transitions
- ✅ LocalStorage persistence for tasks and theme preference
- ✅ Modern UI with gradient accents and micro-interactions
- ✅ Fully responsive design (mobile and desktop)
- ✅ Inline task editing (click task to edit, Enter to save, Escape to cancel)
- ✅ Clear all completed tasks functionality
- ✅ Beautiful empty states for different views
- ✅ Keyboard navigation and accessibility features

## Technology Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Routing**: Wouter
- **Icons**: Lucide React
- **Storage**: LocalStorage (frontend-only, no backend needed)
- **Font**: Inter (Google Fonts)
- **Build Tool**: Vite

## Project Structure
```
client/
├── src/
│   ├── contexts/
│   │   └── ThemeContext.tsx         # Dark/light theme provider
│   ├── hooks/
│   │   ├── use-local-storage.ts     # LocalStorage persistence hook
│   │   └── use-toast.ts             # Toast notifications
│   ├── pages/
│   │   ├── home.tsx                 # Main todo app page
│   │   └── not-found.tsx            # 404 page
│   ├── components/ui/               # Shadcn UI components
│   ├── App.tsx                      # App entry point with routing
│   ├── index.css                    # Global styles and theme variables
│   └── main.tsx                     # React DOM entry
├── index.html                       # HTML entry point
└── public/                          # Static assets

shared/
└── schema.ts                        # TypeScript types and Zod schemas

server/                              # Minimal backend (not used for todos)
├── routes.ts
└── storage.ts
```

## Data Model
```typescript
type Todo = {
  id: string;           // Unique identifier (nanoid)
  text: string;         // Task description
  completed: boolean;   // Completion status
  createdAt: number;    // Timestamp
};

type FilterType = "all" | "active" | "completed";
```

## Design System
- **Primary Color**: Purple (#A855F7) - Used for buttons, icons, accents
- **Typography**: Inter font family
- **Spacing**: Consistent 8px grid system
- **Border Radius**: Rounded-lg (9px) for cards and inputs
- **Animations**: 200-300ms transitions with ease-in-out easing
- **Theme**: Light and dark modes with automatic color adjustments

## Key Components

### ThemeProvider
- Manages light/dark theme state
- Syncs with localStorage
- Applies theme class to document root
- Smooth transitions between themes

### useLocalStorage Hook
- Generic hook for localStorage persistence
- Type-safe with TypeScript
- Handles JSON serialization/deserialization
- Syncs across browser tabs

### HomePage (Main Todo App)
- Task input with validation
- Task list with animations (add/delete/complete)
- Inline editing with keyboard shortcuts
- Filter bar (All/Active/Completed)
- Theme toggle button
- Clear completed tasks button
- Empty states for different views
- Task counter display

## User Interactions
1. **Add Task**: Type in input field and press Enter or click "Add" button
2. **Complete Task**: Click the circle icon to toggle completion status
3. **Edit Task**: Click on task text to enter edit mode, Enter to save, Escape to cancel
4. **Delete Task**: Hover over task and click the trash icon
5. **Filter Tasks**: Click "All", "Active", or "Completed" buttons
6. **Toggle Theme**: Click the moon/sun icon in the header
7. **Clear Completed**: Click "Clear X completed tasks" button at bottom

## Accessibility Features
- ARIA labels for icon-only buttons
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators on all interactive elements
- Semantic HTML (form, input, button elements)
- Proper color contrast in both light and dark themes
- Descriptive data-testid attributes for testing

## LocalStorage Keys
- `todos`: Array of todo objects
- `theme`: "light" or "dark"

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Type Check**: `tsc --noEmit`

## Testing
All features have been tested including:
- Task creation, editing, deletion
- Completion toggling
- Filtering (all/active/completed)
- Theme switching
- LocalStorage persistence
- Empty states
- Responsive design
- Keyboard navigation

## Recent Changes
- Initial implementation (November 21, 2024)
- Complete frontend with LocalStorage persistence
- Theme switching with smooth animations
- Framer Motion animations for all task operations
- Responsive design optimized for mobile and desktop
- Accessibility improvements with ARIA labels and keyboard navigation

## User Preferences
- Clean, minimal design inspired by Linear and Todoist
- Smooth animations that enhance UX without being distracting
- Dark mode support for reduced eye strain
- Fast, keyboard-friendly interactions for power users
