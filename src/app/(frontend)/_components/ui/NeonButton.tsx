"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "pink" | "cyan" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
}

export function NeonButton({
    variant = "pink",
    size = "md",
    className,
    children,
    ...props
}: NeonButtonProps) {
    const variants = {
        pink: "bg-neon-pink text-white shadow-[0_0_20px_rgba(255,0,204,0.4)] hover:shadow-[0_0_30px_rgba(255,0,204,0.6)] hover:brightness-110",
        cyan: "bg-neon-cyan text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:brightness-110",
        outline: "bg-transparent border border-glass-border text-foreground hover:bg-muted",
        ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-2.5 text-base rounded-xl",
        lg: "px-10 py-4 text-lg rounded-2xl",
    };

    return (
        <button
            className={cn(
                "transition-all duration-300 font-medium flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
