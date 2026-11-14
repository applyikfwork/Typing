/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF7',
        surface: '#FFFFFF',
        brand: {
          teal: '#159E8C',
          darkTeal: '#11796E',
          lightTeal: '#EAF7F4',
          accent: '#0E6B61',
        },
        ink: {
          heading: '#172B36',
          body: '#586772',
          muted: '#8A99A4',
          light: '#CCD5DC',
        },
        soft: {
          blue: '#EAF1FC',
          yellow: '#FFF2CC',
          gray: '#F3F5F4',
        },
        border: {
          subtle: '#E8ECEB',
          strong: '#D5DDDB',
        },
        status: {
          success: '#23865B',
          error: '#D94B4B',
          warning: '#D97706',
          info: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        hindi: ['Noto Sans Devanagari', 'Mangal', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(23, 43, 54, 0.05), 0 1px 4px -1px rgba(23, 43, 54, 0.03)',
        hover: '0 8px 24px -4px rgba(21, 158, 140, 0.12), 0 4px 12px -2px rgba(23, 43, 54, 0.04)',
        glow: '0 0 0 3px rgba(21, 158, 140, 0.25)',
      }
    },
  },
  plugins: [],
}
