# Community Events Platform

A modern web application for managing and discovering local community events. Built with React and featuring a beautiful, responsive design with dark mode support.

## Features

- 🎨 Beautiful, responsive UI with dark mode support
- 📅 Create, edit, and manage events
- 👥 Community-focused design
- 🖼️ Image upload with automatic resizing
- 💾 Persistent storage using localStorage
- 📱 Mobile-friendly interface

## Tech Stack

- **React** - Frontend library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, consistent icons
- **Vite** - Next generation frontend tooling

## Implementation Choices

### State Management

- Utilized React's built-in useState and useContext hooks for state management
- Implemented a custom ThemeContext for handling dark/light mode preferences
- Local storage for data persistence without backend dependencies

### UI/UX Design

- Mobile-first approach using Tailwind CSS
- Consistent spacing and typography using Tailwind's design system
- Smooth transitions and hover effects for better interactivity
- Dark mode support with system preference detection
- Responsive grid layouts for different screen sizes

### Image Handling

- Client-side image resizing for optimal performance
- Maintains 4:3 aspect ratio for consistency
- Automatic compression to reduce bandwidth usage

## Project Structure

```
src/
├── components/
│   ├── EventForm.jsx    # Event creation/editing form
│   ├── EventList.jsx    # List view of all events
│   └── HomePage.jsx     # Landing page with featured content
├── context/
│   └── ThemeContext.jsx # Dark mode context provider
├── utils/
│   ├── mediaUtils.js    # Image processing utilities
│   └── storage.js       # Local storage operations
└── App.jsx             # Main application component
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

### Prerequisites

- Node.js 16+
- npm 7+

## Design Decisions

### Component Architecture

- Modular components for better maintainability
- Separation of concerns between UI components and business logic
- Reusable utility functions for common operations

### Styling Approach

- Tailwind CSS for rapid development and consistent design
- Custom utility classes for specific design needs
- CSS-in-JS avoided for better performance

### Data Management

- Local storage for data persistence
- Efficient data structures for quick access and updates
- Type-safe operations with proper error handling
