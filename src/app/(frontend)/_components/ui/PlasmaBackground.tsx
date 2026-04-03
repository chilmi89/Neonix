"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const PlasmaBackground = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none transition-colors duration-500">
            {/* Plasma Layer 1 - Soft Blue */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: ["-10%", "10%", "-10%"],
                    y: ["-10%", "10%", "-10%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] blur-[120px] opacity-[0.05]"
                style={{
                    background: 'radial-gradient(circle, rgba(0, 100, 210, 0.3) 0%, transparent 60%)'
                }}
            />

            {/* Plasma Layer 2 - Clean White */}
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: ["10%", "-10%", "10%"],
                    y: ["10%", "-10%", "10%"],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -bottom-[20%] -right-[20%] w-[140%] h-[140%] blur-[120px] opacity-[0.08]"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, transparent 60%)'
                }}
            />

            {/* Plasma Layer 3 - Ultra Light Blue */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: ["5%", "-5%", "5%"],
                    y: ["-5%", "5%", "-5%"],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 w-full h-full blur-[150px] opacity-[0.03]"
                style={{
                    background: 'radial-gradient(circle, rgba(0, 186, 255, 0.2) 0%, transparent 60%)'
                }}
            />

            {/* Glass Overlay for depth - Increased blur for softness */}
            <div className="absolute inset-0 bg-background/10 backdrop-blur-[120px]" />

            {/* Fine Grain */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};
