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
            whileHover={{ backgroundColor: "#1a1a1a", borderColor: "#FF00FF" }}
            className="flex flex-col items-center justify-center gap-3 bg-[#111111] border border-white/5 rounded-lg py-6 px-4 cursor-pointer transition-all duration-300 group"
        >
            <div className="text-white group-hover:text-neon-pink transition-colors duration-300 mb-1">
                <Icon size={24} />
            </div>
            <span className="text-[10px] font-semibold text-white uppercase tracking-[0.1em]">{label}</span>
        </motion.div>
    );
}
