"use client";

import { cn } from "@/lib/utils";

interface NeonBadgeProps {
    children: React.ReactNode;
    variant?: "pink" | "cyan" | "yellow" | "glass";
    className?: string;
}

export function NeonBadge({ children, variant = "glass", className }: NeonBadgeProps) {
    const variants = {
        pink: "bg-neon-pink/10 text-neon-pink border-neon-pink/20",
        cyan: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
        yellow: "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20",
        glass: "bg-muted text-muted-foreground border-glass-border backdrop-blur-sm",
    };

    return (
        <span className={cn(
            "px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-full inline-flex items-center justify-center whitespace-nowrap",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
