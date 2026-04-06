/**
 * TailAdmin Inspired Color Palette Constants
 * 
 * These constants map to the TailAdmin UI style colors.
 * Use these for inline styles, Framer Motion animations, or canvas rendering.
 */

export const colors = {
    // Core Branding
    primary: '#3C50E0',        // TailAdmin Primary Blue
    secondary: '#80CAEE',      // TailAdmin Secondary
    success: '#219653',        // Success Green
    danger: '#D34053',         // Danger Red
    warning: '#FFA70B',        // Warning Yellow
    info: '#3BA2B8',           // Info Blue

    // Light Theme
    light: {
        background: '#F1F5F9',     // Main Background (body)
        surface: '#FFFFFF',        // Card/Box Background
        text: '#64748b',           // Body text
        heading: '#1C2434',        // Heading text
        border: '#E2E8F0',         // Stroke / borders
        sidebar: '#1C2434',        // Sidebar background
    },

    // Dark Theme
    dark: {
        background: '#1A222C',     // Main Background (boxdark-2)
        surface: '#24303F',        // Card/Box Background (boxdark)
        text: '#8A99AF',           // Body text (bodydark)
        heading: '#FFFFFF',        // Heading text
        border: '#313D4A',         // Stroke dark
        sidebar: '#1C2434',        // Sidebar background
    },

    glass: {
        surface: 'rgba(36, 48, 63, 0.7)',
        border: 'rgba(255, 255, 255, 0.12)',
        hover: 'rgba(255, 255, 255, 0.05)',
        text: '#8A99AF',
    }
} as const;

export type ColorPalette = typeof colors;
