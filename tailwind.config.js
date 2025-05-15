/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './content/**/*.{md,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          // Primary brand colors
          'night-navy': '#0A1B2B',
          'sky-cyan': '#00B6F1',
          'cloud-white': '#F8FBFD',
          'graphite': '#6B7280',
        },
        fontFamily: {
          sans: ['Inter', 'DM Sans', 'ui-sans-serif', 'system-ui'],
          body: ['Source Sans Pro', 'ui-sans-serif', 'system-ui'],
        },
        fontWeight: {
          headline: 700,
          body: 400,
          medium: 500,
          semibold: 600,
        },
        animation: {
          'fade-in-up': 'fadeInUp 0.25s ease-out forwards',
        },
        keyframes: {
          fadeInUp: {
            '0%': { opacity: 0, transform: 'translateY(10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        },
        typography: {
          DEFAULT: {
            css: {
              maxWidth: '65ch',
              color: '#0A1B2B',
              h1: {
                fontWeight: 700,
              },
              h2: {
                fontWeight: 600,
              },
              a: {
                color: '#00B6F1',
                '&:hover': {
                  color: '#0A1B2B',
                },
              },
            },
          },
        },
      },
    },
    plugins: [],
  }