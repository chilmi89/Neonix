"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function GlassButton({
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}: GlassButtonProps) {
    const variants = {
        primary: "bg-primary text-primary-foreground hover:brightness-110",
        outline: "border border-glass-border bg-glass-surface text-glass-text hover:bg-white/10",
        ghost: "text-glass-text hover:bg-white/5",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "rounded-xl font-medium transition-all duration-200 backdrop-blur-sm",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
