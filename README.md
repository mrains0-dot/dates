# Dates - Event Management App

A modern, responsive web application for managing important dates, deadlines, and events.

## Features

✨ **Event Management**
- Create, view, and delete events
- Set event titles, dates, descriptions, and priorities
- Mark events as completed
- Filter events by status (All, Upcoming, Overdue, Completed)

📊 **Smart Dashboard**
- Real-time statistics for upcoming and overdue events
- Visual priority indicators (Low, Medium, High)
- Today/Overdue badges for quick identification
- Empty state guidance

🎨 **Modern UI**
- Beautiful gradient design with purple theme
- Responsive layout that works on mobile, tablet, and desktop
- Smooth animations and transitions
- Intuitive controls and interactions

🔧 **Built With**
- React 18 with TypeScript
- Vite for fast development and building
- date-fns for date manipulation
- Lucide React for beautiful icons

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mrains0-dot/dates.git
cd dates
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized build will be generated in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Add Event**: Click the "Add Event" button to create a new event
2. **Fill Form**: Enter the event details (title is required)
3. **Set Priority**: Choose Low, Medium, or High priority
4. **Add Description**: Optionally add notes about the event
5. **Complete Event**: Click the circle icon to mark events as done
6. **Delete Event**: Use the trash icon to remove events
7. **Filter**: Use the filter buttons to view different event categories

## File Structure

```
src/
├── components/
│   ├── DateCard.tsx         # Individual event card component
│   ├── DateCard.css         # Card styling
│   ├── DateForm.tsx         # Event creation form
│   └── DateForm.css         # Form styling
├── App.tsx                  # Main application component
├── App.css                  # Main app styling
├── index.css                # Global styles
├── main.tsx                 # React entry point
└── vite-env.d.ts           # Vite environment types
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or feature requests, please open an issue on GitHub.
