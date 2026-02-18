"use client";

<<<<<<< Updated upstream
<<<<<<< Updated upstream
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
=======
=======
>>>>>>> Stashed changes
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
=======
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 animate-pulse" />
>>>>>>> Stashed changes
=======
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 animate-pulse" />
>>>>>>> Stashed changes
        );
    }

    return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-10 h-10 rounded-full bg-muted border border-glass-border flex items-center justify-center transition-all duration-300 hover:border-primary/50 group overflow-hidden"
        >
            <div className="relative w-5 h-5">
                <Sun className="h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-neon-pink" />
                <Moon className="absolute top-0 left-0 h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-neon-cyan" />
            </div>
            <span className="sr-only">Toggle theme</span>
        </motion.button>
=======
=======
>>>>>>> Stashed changes
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 hover:border-neon-pink/50 hover:bg-neon-pink/5 transition-all duration-300 group overflow-hidden"
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ y: 20, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === "dark" ? (
                        <Sun className="w-5 h-5 text-neon-yellow group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                    ) : (
                        <Moon className="w-5 h-5 text-neon-pink group-hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.5)]" />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Decorative aura */}
            <div className="absolute inset-0 bg-neon-pink/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
        </button>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    );
}
