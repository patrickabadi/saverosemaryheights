/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Professional nature-inspired theme for Save Rosemary Heights
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5cc',
          300: '#8dd1a7',
          400: '#57b87b',
          500: '#359a5a', // Main primary - professional forest green
          600: '#277c46',
          700: '#20633a',
          800: '#1c4f30',
          900: '#184128',
          950: '#0c2414',
        },
        secondary: {
          50: '#fdf7f0',
          100: '#faebdb',
          200: '#f4d5b7',
          300: '#ecb787',
          400: '#e39355',
          500: '#dc7633', // Warm earth tone
          600: '#ce5f28',
          700: '#ab4924',
          800: '#883a23',
          900: '#6e301f',
          950: '#3b1710',
        },
        accent: {
          50: '#f0f8ff',
          100: '#e0f0fe',
          200: '#b9e1fe',
          300: '#7cc8fd',
          400: '#36abfa',
          500: '#0c8ce9', // Professional blue accent
          600: '#0070c7',
          700: '#0159a1',
          800: '#064c85',
          900: '#0b406e',
          950: '#072849',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'nature-gradient': 'linear-gradient(135deg, #359a5a 0%, #277c46 100%)',
        'earth-gradient': 'linear-gradient(135deg, #dc7633 0%, #ab4924 100%)',
        'community-gradient': 'linear-gradient(135deg, #0c8ce9 0%, #0159a1 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            '[class~="lead"]': {
              color: '#4b5563',
            },
            a: {
              color: '#359a5a',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            strong: {
              color: '#1f2937',
              fontWeight: '600',
            },
            'h1, h2, h3, h4': {
              color: '#1f2937',
            },
            blockquote: {
              borderLeftColor: '#359a5a',
              color: '#4b5563',
            },
            code: {
              color: '#dc7633',
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: '#d1d5db',
            '[class~="lead"]': {
              color: '#9ca3af',
            },
            a: {
              color: '#8dd1a7',
            },
            strong: {
              color: '#f9fafb',
            },
            'h1, h2, h3, h4': {
              color: '#f9fafb',
            },
            blockquote: {
              borderLeftColor: '#8dd1a7',
              color: '#9ca3af',
            },
            code: {
              color: '#f4d5b7',
              backgroundColor: '#374151',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
