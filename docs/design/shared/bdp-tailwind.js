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
            fontSize: {
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
