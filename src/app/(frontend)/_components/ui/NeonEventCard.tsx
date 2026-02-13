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
}

export function NeonEventCard({ image, title, location, date, price, tag }: NeonEventCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group bg-[#111111] rounded-xl overflow-hidden border border-white/5 hover:border-neon-cyan/30 transition-all duration-500"
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
                        tag === "trending" ? "bg-black/60 text-white" : "bg-pink-600 text-white"
                    )}>
                        {tag}
                    </div>
                )}
            </div>

            <div className="p-5 space-y-4">
                <h3 className="text-lg font-bold text-white line-clamp-1">{title}</h3>

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                        <MapPin size={12} />
                        {location}
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Calendar size={12} />
                        {date}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div>
                        <p className="text-[10px] uppercase text-white/50 font-bold tracking-wider">Price from</p>
                        <p className="text-xl font-bold text-[#FFD700]">${price}</p>
                    </div>
                    <button className="bg-[#00FFFF] text-black font-bold text-[11px] px-8 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:brightness-110 transition-all">
                        BUY
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
