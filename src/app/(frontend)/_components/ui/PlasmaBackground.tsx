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
        <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
            {/* Plasma Layer 1 - Neon Pink */}
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    x: ["-30%", "30%", "-30%"],
                    y: ["-30%", "30%", "-30%"],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] blur-[100px] opacity-50"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 0, 204, 0.4) 0%, transparent 60%)'
                }}
            />

            {/* Plasma Layer 2 - Neon Cyan */}
            <motion.div
                animate={{
                    scale: [1.4, 1, 1.4],
                    x: ["30%", "-30%", "30%"],
                    y: ["30%", "-30%", "30%"],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -bottom-[10%] -right-[10%] w-[120%] h-[120%] blur-[100px] opacity-40"
                style={{
                    background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 60%)'
                }}
            />

            {/* Plasma Layer 3 - Electric Yellow */}
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    x: ["0%", "20%", "0%"],
                    y: ["40%", "-20%", "40%"],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-0 left-0 w-full h-full blur-[120px] opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 60%)'
                }}
            />

            {/* Glass Overlay for depth */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[60px]" />

            {/* Fine Grain */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};
