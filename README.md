# Life OS

A gamified personal development and productivity application built with React, TypeScript, and modern web technologies.

## Overview

Life OS is a comprehensive personal development platform that helps you track and improve various aspects of your life through gamification and structured organization. It combines task management, skill development, and time tracking to create an engaging and effective personal development system.

## Features

### 🎯 Quest System
- Create and manage quests across different life categories
- Track progress and earn XP for completed tasks
- Categorize quests for better organization
- Set deadlines and milestones

### 📅 Calendar & Time Management
- Visual calendar interface for event planning
- Support for different event types:
  - Standalone events
  - Time blocks for focused work
  - Milestones for major achievements
- Drag-and-drop event scheduling
- Color-coded events by category

### 🎮 Gamification
- Experience points (XP) system
- Level progression
- Streak tracking
- Category-specific skill development
- Visual progress indicators

### 📊 Categories & Skills
- Organize activities into main categories:
  - Coding & GameDev
  - Fitness
  - Azure
- Track skill development within each category
- Category-specific XP and leveling

### ⏱️ Pomodoro Timer
- Built-in Pomodoro timer for focused work sessions
- Customizable work/break intervals
- Session tracking and statistics

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Zustand
- **Styling**: Emotion (CSS-in-JS)
- **Animations**: Framer Motion
- **Calendar**: FullCalendar
- **Icons**: Font Awesome
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/life-os-react.git
cd life-os-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
life-os-react/
├── src/
│   ├── components/
│   │   ├── features/     # Feature-specific components
│   │   └── ui/          # Reusable UI components
│   ├── pages/           # Page components
│   ├── store/           # Zustand store
│   ├── styles/          # Global styles and theme
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by gamification principles and personal development methodologies
- Built with modern web technologies and best practices
- Special thanks to all contributors and users 