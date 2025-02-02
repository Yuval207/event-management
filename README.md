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

### Prerequisites

- Node.js 16+
- npm 7+

### Steps
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```


## Video Sample



https://github.com/user-attachments/assets/79c9105e-f46a-4a02-a990-c23516d1f1b4



