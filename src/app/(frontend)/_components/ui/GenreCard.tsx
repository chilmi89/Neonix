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
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="flex flex-col items-center justify-center gap-4 bg-[#121212] border border-white/5 rounded-2xl py-8 px-4 cursor-pointer transition-all duration-300 group shadow-xl"
        >
            <div className="p-4 rounded-full bg-white/5 text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                <Icon size={28} />
            </div>
            <span className="text-sm font-bold text-white uppercase tracking-wider">{label}</span>
        </motion.div>
    );
}
