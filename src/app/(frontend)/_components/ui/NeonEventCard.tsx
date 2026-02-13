"use client";

import { Calendar, MapPin } from "lucide-react";
import { NeonBadge } from "./NeonBadge";
import { NeonButton } from "./NeonButton";
import { motion } from "framer-motion";

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
            whileHover={{ y: -10 }}
            className="group bg-[#121212] rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 shadow-2xl"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {tag && (
                    <div className="absolute top-4 right-4">
                        <NeonBadge variant={tag === "trending" ? "pink" : "cyan"} className="backdrop-blur-md">
                            {tag}
                        </NeonBadge>
                    </div>
                )}
            </div>

            <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white line-clamp-1">{title}</h3>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/50 text-xs">
                        <MapPin size={14} className="text-white/30" />
                        {location}
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-xs">
                        <Calendar size={14} className="text-white/30" />
                        {date}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div>
                        <p className="text-[10px] uppercase text-white/40 font-bold tracking-wider">Price from</p>
                        <p className="text-xl font-black text-neon-yellow">${price}</p>
                    </div>
                    <NeonButton variant="cyan" size="sm" className="rounded-xl font-black uppercase text-[10px] tracking-widest px-6 italic">
                        BUY
                    </NeonButton>
                </div>
            </div>
        </motion.div>
    );
}
