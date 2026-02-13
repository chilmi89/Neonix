"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/lib/motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export function GlassCard({ children, className, animate = true, ...props }: GlassCardProps) {
    return (
        <motion.div
            variants={animate ? fadeIn : undefined}
            initial="initial"
            animate="animate"
            className={cn(
                "glass-card rounded-2xl p-6 overflow-hidden relative",
                className
            )}
            {...props}
        >
            {/* Optional subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
