/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212', // Dark background matching the mockups
        surface: '#1c1c1c',   // Card background
        surfaceHover: '#2a2a2a', // Card hover state
        primary: '#0ea5e9',    // Cyan/Blue theme color
        secondary: '#a1a1aa',  // Muted text color
        border: '#27272a',     // Subtle border color
        
        status: {
          success: '#10b981', // Interview Passed
          info: '#3b82f6',    // Document Screened
          warning: '#eab308', // Pending Review
          danger: '#ef4444',  // Rejected
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
