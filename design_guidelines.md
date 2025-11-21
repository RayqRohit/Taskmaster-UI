# Design Guidelines: Modern Todo List Application

## Design Approach
**System-Based with Productivity Focus**
Drawing inspiration from Linear and Todoist's clean, focused interfaces. Emphasizing clarity, speed, and distraction-free task management with purposeful micro-interactions.

## Core Design Principles
1. **Clarity First**: Every element serves task completion
2. **Minimal Friction**: Fast input, instant feedback, smooth transitions
3. **Breathing Room**: Generous spacing for focus and readability
4. **Purposeful Motion**: Animations enhance usability, not distract

## Typography System
- **Primary Font**: Inter or SF Pro via Google Fonts
- **Header (App Title)**: text-2xl, font-semibold
- **Task Text**: text-base, font-normal
- **Input Fields**: text-base, font-normal
- **Filters/Metadata**: text-sm, font-medium
- **Timestamps/Counters**: text-xs, font-normal

## Layout & Spacing
**Container Structure**:
- Main app container: max-w-2xl, centered, px-4
- Vertical rhythm: py-8 for sections, py-4 for components
- Card padding: p-6
- List item spacing: py-3

**Spacing Primitives**: Use Tailwind units of 2, 3, 4, 6, and 8 consistently (e.g., gap-3, p-4, mt-8)

## Component Library

### App Header
- Theme switcher in top-right (icon button with smooth rotate transition)
- App title/logo on left
- Task counter display (e.g., "5 active tasks")
- Height: h-16, flex layout

### Task Input
- Full-width input field with rounded-lg borders
- Placeholder: "Add a new task..."
- Add button integrated or on Enter key
- Focus state with subtle scale effect

### Task List
- Individual task cards with rounded-lg, subtle shadow
- Checkbox on left (custom styled, not default browser)
- Task text with strikethrough animation when completed
- Delete button appears on hover (trash icon, right-aligned)
- Edit functionality: click task text to enter edit mode inline
- Spacing between tasks: space-y-3

### Filter Bar
- Three pill-shaped buttons: All / Active / Completed
- Active filter has filled background
- Horizontal layout with gap-2
- Positioned below input, above task list

### Empty States
- Centered illustration/icon when no tasks
- Helpful messaging: "No tasks yet. Add one to get started!"
- Different states for filtered views

### Footer Actions
- "Clear completed" button when completed tasks exist
- Subtle, text-button style
- Positioned at bottom

## Animations & Transitions

**Task Operations** (use sparingly):
- Add task: Slide down + fade in (duration-300)
- Complete task: Checkbox fill + text strikethrough (duration-200)
- Delete task: Slide up + fade out (duration-200)
- Theme switch: Smooth transition on all elements (duration-300)

**Interaction Feedback**:
- Checkbox: Scale slightly on click
- Buttons: Subtle opacity change on hover
- Input: Gentle border highlight on focus

## Accessibility
- Keyboard navigation for all interactions (Tab, Enter, Escape)
- Focus indicators visible on all interactive elements
- ARIA labels for icon-only buttons
- Semantic HTML throughout (form, list, button elements)

## Theme System Structure
Both themes share identical layout and spacing. Theme toggle triggers smooth transitions across entire interface. Icon for switcher: sun/moon with rotation animation.

## Icons
**Library**: Heroicons via CDN
- Checkbox states (check icon)
- Delete (trash icon)
- Theme toggle (sun/moon)
- Empty state (clipboard or checkmark)

## No Images
This application uses no images. All visuals are icon-based or text-based.

## Responsive Behavior
- Mobile (<768px): Full-width container, px-4 padding
- Desktop (≥768px): max-w-2xl centered container
- Touch targets minimum 44px for mobile