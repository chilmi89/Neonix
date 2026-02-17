"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GenreCardProps {
    icon: LucideIcon;
    label: string;
}

export function GenreCard({ icon: Icon, label }: GenreCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5, borderColor: "#FF00FF" }}
            className="flex flex-col items-center justify-center gap-4 bg-background border border-glass-border dark:bg-muted rounded-2xl py-8 px-6 cursor-pointer transition-all duration-300 group shadow-lg hover:shadow-neon-pink/10"
        >
            <div className="text-foreground group-hover:text-neon-pink transition-all duration-300 transform group-hover:scale-110 mb-2">
                <Icon size={32} strokeWidth={1.5} />
            </div>
            <span className="text-[11px] font-bold text-muted-foreground group-hover:text-foreground uppercase tracking-[0.2em] transition-colors">{label}</span>
        </motion.div>
    );
}
