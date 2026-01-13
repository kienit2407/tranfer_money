# J-V Money Transfer App

A modern React application for transferring money between Japan and Vietnam, featuring a premium glassmorphism design.

## Features

- **Authentication**: secure Login and Registration pages.
- **Money Transfer**: Easy interface to send JPY to VND with real-time conversion rates.
- **Rewards System**: Earn points for every successful transfer.
- **Transaction History**: View past transfers with filtering options.
- **Responsive Design**: Works on mobile and desktop.

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx       # Main navigation with user points display
├── pages/
│   ├── Login.jsx        # Login page
│   ├── Register.jsx     # Registration page
│   ├── Transfer.jsx     # Main transfer functionality
│   └── History.jsx      # Transaction history
├── App.jsx              # Routing and Layout
├── index.css            # Global styles and variables (Theming)
└── main.jsx             # Entry point
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Technologies

- React 18+
- React Router 6
- Lucide React (Icons)
- Vite
