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
            // Fluid scale with tighter line heights for larger sizes
            fontSize: {
                'xs':   ['clamp(0.75rem, 0.7rem + 0.25vw, 0.85rem)', { lineHeight: '1.5' }],
                'sm':   ['clamp(0.85rem, 0.8rem + 0.25vw, 0.95rem)', { lineHeight: '1.5' }],
                'base': ['clamp(1rem, 0.95rem + 0.25vw, 1.1rem)', { lineHeight: '1.6' }],
                'lg':   ['clamp(1.1rem, 1rem + 0.5vw, 1.3rem)', { lineHeight: '1.5' }],
                'xl':   ['clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', { lineHeight: '1.4' }],
                '2xl':  ['clamp(1.5rem, 1.25rem + 1.25vw, 1.9rem)', { lineHeight: '1.3' }],
                '3xl':  ['clamp(1.85rem, 1.5rem + 1.75vw, 2.4rem)', { lineHeight: '1.2' }],
                '4xl':  ['clamp(2.2rem, 1.7rem + 2.5vw, 3.2rem)', { lineHeight: '1.15' }],
                '5xl':  ['clamp(2.8rem, 2.1rem + 3.5vw, 4rem)', { lineHeight: '1.1' }],
                '6xl':  ['clamp(3.4rem, 2.5rem + 4.5vw, 5rem)', { lineHeight: '1.05' }],
                '7xl':  ['clamp(4rem, 2.8rem + 6vw, 6rem)', { lineHeight: '1' }],
                // Keep fluid-* as aliases
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
