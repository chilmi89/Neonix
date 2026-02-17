"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LiquidBackground = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-60 dark:opacity-40">
            {/* Liquid Blobs Container */}
            <div className="absolute inset-0 filter blur-[100px] brightness-125 contrast-125 scale-110">
                <motion.div
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -100, 50, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-neon-pink opacity-40"
                />
                <motion.div
                    animate={{
                        x: [0, -120, 80, 0],
                        y: [0, 100, -100, 0],
                        scale: [1, 0.8, 1.1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 right-1/4 w-[35vw] h-[35vw] rounded-full bg-neon-cyan opacity-30"
                />
                <motion.div
                    animate={{
                        x: [0, 150, -100, 0],
                        y: [0, 50, 150, 0],
                        scale: [1, 1.3, 0.7, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-1/4 left-1/3 w-[45vw] h-[45vw] rounded-full bg-neon-yellow opacity-20"
                />
            </div>

            {/* Glass Overlay for depth */}
            <div className="absolute inset-0 backdrop-blur-[40px] bg-background/30" />

            {/* Noise Texture (Optional but adds premium feel) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};
