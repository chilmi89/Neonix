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
                "flex flex-col items-center justify-center gap-4 rounded-3xl py-8 px-6 cursor-pointer transition-all duration-500 group shadow-lg h-full",
                isActive
                    ? "bg-primary text-white border-2 border-primary shadow-primary/20"
                    : "bg-white border border-border hover:border-primary/40 hover:bg-muted/50"
            )}
        >
            <div className={cn(
                "transition-all duration-500 transform group-hover:scale-110 mb-2",
                isActive ? "text-white" : "text-primary group-hover:text-primary"
            )}>
                <Icon size={32} strokeWidth={1.5} />
            </div>
            <span className={cn(
                "text-[10px] font-black uppercase tracking-[0.25em] transition-colors",
                isActive ? "text-white" : "text-foreground/40 group-hover:text-foreground"
            )}>{label}</span>
        </motion.div>
    );
}
