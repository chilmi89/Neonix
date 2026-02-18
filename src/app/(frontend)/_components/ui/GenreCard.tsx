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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            whileHover={{ y: -5, borderColor: "#FF00FF" }}
            className="flex flex-col items-center justify-center gap-4 bg-background border border-glass-border dark:bg-muted rounded-2xl py-8 px-6 cursor-pointer transition-all duration-300 group shadow-lg hover:shadow-neon-pink/10 h-full"
        >
            <div className="text-foreground group-hover:text-neon-pink transition-all duration-300 transform group-hover:scale-110 mb-2">
                <Icon size={32} strokeWidth={1.5} />
            </div>
            <span className="text-[11px] font-bold text-muted-foreground group-hover:text-foreground uppercase tracking-[0.2em] transition-colors">{label}</span>
=======
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-4 cursor-pointer group"
        >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center bg-muted/20 group-hover:border-neon-pink group-hover:bg-muted/40 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]">
                <Icon size={32} strokeWidth={1.5} className="text-white group-hover:text-neon-pink transition-colors" />
            </div>
            <span className="text-xs font-bold text-white/60 group-hover:text-white uppercase tracking-wider transition-colors">{label}</span>
>>>>>>> Stashed changes
=======
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-4 cursor-pointer group"
        >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center bg-muted/20 group-hover:border-neon-pink group-hover:bg-muted/40 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]">
                <Icon size={32} strokeWidth={1.5} className="text-white group-hover:text-neon-pink transition-colors" />
            </div>
            <span className="text-xs font-bold text-white/60 group-hover:text-white uppercase tracking-wider transition-colors">{label}</span>
>>>>>>> Stashed changes
        </motion.div>
    );
}
