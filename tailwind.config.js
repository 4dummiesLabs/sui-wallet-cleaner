/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark crypto wallet theme colors
        background: {
          DEFAULT: '#0a0a0a',
          secondary: '#1a1a1a',
          card: '#1f1f1f',
          elevated: '#2a2a2a'
        },
        foreground: {
          DEFAULT: '#ffffff',
          secondary: '#a1a1aa',
          muted: '#71717a'
        },
        primary: {
          DEFAULT: '#22c55e', // Green accent like in reference
          foreground: '#ffffff',
          hover: '#16a34a',
          50: '#f0fdf4',
          100: '#dcfce7', 
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          900: '#14532d'
        },
        secondary: {
          DEFAULT: '#3f3f46',
          foreground: '#fafafa',
          hover: '#52525b'
        },
        accent: {
          DEFAULT: '#3b82f6', // Blue accent for secondary actions
          foreground: '#ffffff',
          hover: '#2563eb'
        },
        muted: {
          DEFAULT: '#27272a',
          foreground: '#a1a1aa'
        },
        border: {
          DEFAULT: '#3f3f46',
          light: '#52525b'
        },
        input: '#27272a',
        ring: '#22c55e',
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff'
        },
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff'
        }
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '6px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}