/**
 * Neonix Color Palette Constants
 * 
 * These constants match the CSS variables defined in src/styles/globals.css.
 * Use these for inline styles, Framer Motion animations, or canvas rendering.
 */

export const colors = {
    // Core Branding
    primary: '#0064D2',        // Tiket Blue
    accent: '#00BAFF',         // Sky Blue
    yellow: '#FEDD00',         // Tiket Yellow
    green: '#21D35F',          // Success Green

    // Neutral Palette
    background: '#FFFFFF',     // Main Background
    foreground: '#0F172A',     // Main Text (Deep Slate)
    muted: '#F8FAFC',          // Light Secondary Background
    mutedForeground: '#64748B', // Muted Text
    border: '#E2E8F0',         // Subtle Borders

    // Glassmorphism (RGBA equivalent)
    glass: {
        surface: 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(15, 23, 42, 0.08)',
        hover: 'rgba(0, 100, 210, 0.03)',
        text: '#0F172A',
    },

    // Functional Aliases
    brand: {
        blue: '#0064D2',
        sky: '#00BAFF',
        yellow: '#FEDD00',
    }
} as const;

export type ColorPalette = typeof colors;
