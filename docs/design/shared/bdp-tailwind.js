/**
 * Best Day Phone — Tailwind Configuration
 * Used with Tailwind CDN: https://cdn.tailwindcss.com
 */

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#D97706",           // Warm amber/orange
                secondary: "#3B2F2F",         // Dark warm brown for text/headings
                "background-light": "#FFFBF7", // Very light cream/warm white
                "background-dark": "#1F1A17",  // Dark warm charcoal/brown
                "surface-light": "#FDEEDC",    // Light peach/beige for cards
                "surface-dark": "#322822",     // Darker coffee for dark mode cards
                "accent-green": "#4D7C5D",     // Sage green for trust
                "soft-pink": "#FCE7F3",        // Soft pink for testimonial backgrounds
            },
            fontFamily: {
                display: ["Playfair Display", "serif"],
                sans: ["Inter", "sans-serif"],
            },
            // Override default sizes with fluid scale (clamp)
            fontSize: {
                'xs':   'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
                'sm':   'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
                'base': 'clamp(1rem, 0.925rem + 0.375vw, 1.125rem)',
                'lg':   'clamp(1.125rem, 1rem + 0.625vw, 1.375rem)',
                'xl':   'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
                '2xl':  'clamp(1.5rem, 1.25rem + 1.25vw, 2rem)',
                '3xl':  'clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)',
                '4xl':  'clamp(2.25rem, 1.75rem + 2.5vw, 3.25rem)',
                '5xl':  'clamp(3rem, 2.25rem + 3.75vw, 4.5rem)',
                '6xl':  'clamp(3.75rem, 2.75rem + 5vw, 5.5rem)',
                '7xl':  'clamp(4.5rem, 3.25rem + 6.25vw, 7rem)',
                // Keep fluid-* as aliases if needed
                'fluid-xs': 'var(--step--2)',
                'fluid-sm': 'var(--step--1)',
                'fluid-base': 'var(--step-0)',
                'fluid-lg': 'var(--step-1)',
                'fluid-xl': 'var(--step-2)',
                'fluid-2xl': 'var(--step-3)',
                'fluid-3xl': 'var(--step-4)',
                'fluid-4xl': 'var(--step-5)',
            },
            borderRadius: {
                DEFAULT: "1rem",
                'xl': '1.5rem',
                '2xl': '2rem',
            },
        },
    },
};
