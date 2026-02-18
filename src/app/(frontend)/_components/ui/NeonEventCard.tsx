"use client";

import { Calendar, MapPin } from "lucide-react";
import { NeonBadge } from "./NeonBadge";
import { NeonButton } from "./NeonButton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonEventCardProps {
    image: string;
    title: string;
    location: string;
    date: string;
    price: string;
    tag?: "trending" | "hot";
    onClick?: () => void;
}

export function NeonEventCard({ image, title, location, date, price, tag, onClick }: NeonEventCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
<<<<<<< Updated upstream
            onClick={onClick}
            className="group h-full flex flex-col bg-background rounded-xl overflow-hidden border border-glass-border hover:border-neon-cyan/30 transition-all duration-500 shadow-lg dark:bg-muted cursor-pointer"
=======
            className="group bg-muted rounded-xl overflow-hidden border border-glass-border hover:border-neon-cyan/30 transition-all duration-500"
>>>>>>> Stashed changes
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {tag && (
                    <div className={cn(
                        "absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md border border-white/10",
                        tag === "trending" ? "bg-black/60 text-white" : "bg-neon-pink text-white"
                    )}>
                        {tag}
                    </div>
                )}
            </div>

<<<<<<< Updated upstream
            <div className="p-5 flex flex-col flex-1 space-y-4">
                <div className="flex-1 space-y-4">
                    <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-neon-pink transition-colors">{title}</h3>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <MapPin size={12} />
                            {location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <Calendar size={12} />
                            {date}
                        </div>
=======
            <div className="p-5 space-y-4">
                <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-neon-pink transition-colors">{title}</h3>

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <MapPin size={12} />
                        {location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Calendar size={12} />
                        {date}
>>>>>>> Stashed changes
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Price from</p>
<<<<<<< Updated upstream
                        <p className="text-xl font-bold text-neon-yellow">${price}</p>
                    </div>
                    <button className="bg-neon-cyan text-black font-bold text-[11px] px-8 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:brightness-110 transition-all uppercase tracking-wider">
                        DETAIL
=======
                        <p className="text-xl font-bold text-neon-yellow tracking-tighter">${price}</p>
                    </div>
                    <button className="bg-neon-cyan text-black font-bold text-[11px] px-8 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:brightness-110 active:scale-95 transition-all">
                        BUY
>>>>>>> Stashed changes
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
