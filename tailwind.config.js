/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Baloo 2', 'Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Flood Escape 2 industrial palette
        cave: {
          50: '#3a3f4b',
          100: '#2d3139',
          200: '#232730',
          300: '#1a1d24',
          400: '#14161c',
          500: '#0f1115',
          600: '#0b0d11',
          700: '#08090c',
          800: '#050608',
          900: '#030405',
        },
        steel: {
          50: '#6b7686',
          100: '#5a6573',
          200: '#4a5360',
          300: '#3d454f',
          400: '#323841',
          500: '#282d35',
          600: '#1f2329',
          700: '#171a1f',
        },
        // element: water / lava / acid / lightning
        water: { DEFAULT: '#3b9eff', deep: '#1e6fd9', glow: '#5db8ff' },
        lava: { DEFAULT: '#ff7a3d', deep: '#e8551e', glow: '#ff9d5c' },
        acid: { DEFAULT: '#7ed957', deep: '#4caf2e', glow: '#a0eb78' },
        volt: { DEFAULT: '#ffd43b', deep: '#f5a623', glow: '#ffe66b' },
        frost: { DEFAULT: '#67e8f9', deep: '#0891b2', glow: '#a5f3fc' },
        moss: { DEFAULT: '#34d399', deep: '#059669', glow: '#6ee7b7' },
        ember: { DEFAULT: '#f472b6', deep: '#db2777', glow: '#f9a8d4' },
        sand: { DEFAULT: '#e2b26b', deep: '#b7791f', glow: '#f0d19a' },
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        ink: {
          50: '#f7f7f8',
          100: '#ececef',
          200: '#d0d0d4',
          300: '#a9a9b1',
          400: '#74747e',
          500: '#54545d',
          600: '#3f3f47',
          700: '#2d2d33',
          800: '#1c1c21',
          900: '#101013',
        },
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '60%': { transform: 'scale(1.02)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'spin-slow': { '100%': { transform: 'rotate(360deg)' } },
        'flood-rise': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.35s ease-out both',
        'slide-up': 'slide-up 0.4s ease-out both',
        'shake': 'shake 0.4s ease-in-out',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 1.1s linear infinite',
        'pulse-glow': 'pulse-glow 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
