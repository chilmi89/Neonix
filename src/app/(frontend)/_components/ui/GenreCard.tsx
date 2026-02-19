"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GenreCardProps {
    icon: LucideIcon;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

export function GenreCard({ icon: Icon, label, isActive, onClick }: GenreCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center gap-4 rounded-2xl py-8 px-6 cursor-pointer transition-all duration-300 group shadow-lg h-full",
                isActive
                    ? "bg-neon-pink/10 border-2 border-neon-pink shadow-neon-pink/20"
                    : "bg-background border border-glass-border dark:bg-muted hover:shadow-neon-pink/10 hover:border-neon-pink/40"
            )}
        >
            <div className={cn(
                "transition-all duration-300 transform group-hover:scale-110 mb-2",
                isActive ? "text-neon-pink" : "text-foreground group-hover:text-neon-pink"
            )}>
                <Icon size={32} strokeWidth={1.5} />
            </div>
            <span className={cn(
                "text-[11px] font-bold uppercase tracking-[0.2em] transition-colors",
                isActive ? "text-neon-pink" : "text-muted-foreground group-hover:text-foreground"
            )}>{label}</span>
        </motion.div>
    );
}
