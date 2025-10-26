/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure all your file paths are listed here
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html',
  ],
  theme: {
    // Extend the default theme to add your custom colors, fonts, and animations
    extend: {
      colors: {
        // Core Palette
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        border: 'var(--color-border)',
        
        // Semantic Colors
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)', // #e57b46
          foreground: 'var(--color-primary-foreground)',
          light: '#ff8f5e',
          dark: '#cc6a3e'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // #B9AEDF
          foreground: 'var(--color-secondary-foreground)',
          light: '#cec6eb',
          dark: '#a498d3'
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // #88E5BE
          foreground: 'var(--color-accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // #E76F51
          foreground: 'var(--color-destructive-foreground)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',

        // Custom Utility Colors
        surface: {
          DEFAULT: 'var(--color-surface)',
          foreground: 'var(--color-surface-foreground)',
        },
        dark: {
          DEFAULT: 'var(--color-dark)', // #1A1A32
          foreground: 'var(--color-dark-foreground)',
        },
        cta: {
          DEFAULT: 'var(--color-cta)', // #E85A4F
          foreground: 'var(--color-cta-foreground)',
        },
        
        // Text-specific colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)', // #B8B8C8
      },
      
      // Map custom fonts
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      // Custom Animation Keyframes (moved from global.css)
      keyframes: {
        'fade-in-down': {
          'from': { opacity: '0', transform: 'translateY(-10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'ring-rotate': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      
      // Custom Animation Names (moved from global.css)
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'ring-rotate': 'ring-rotate 2s linear infinite',
        'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'professional': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'professional-lg': '0 4px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        'professional-xl': '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
      }
    },
  },
  plugins: [
    // Add any plugins you might need here
  ],
}