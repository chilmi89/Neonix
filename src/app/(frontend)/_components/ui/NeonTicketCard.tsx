"use client";

import { MapPin, Calendar, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonTicketCardProps {
    image: string;
    title: string;
    location: string;
    date: string;
    time?: string;
    price: string;
    category: string;
    type?: "VIP" | "STANDARD";
    tag?: string;
    onClick: () => void;
}

export function NeonTicketCard({
    image,
    title,
    location,
    date,
    time,
    price,
    category,
    type = "STANDARD",
    tag,
    onClick
}: NeonTicketCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="group relative bg-black/60 backdrop-blur-xl border border-white/10 hover:border-neon-pink/30 rounded-[2.5rem] overflow-hidden transition-all duration-500 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex flex-col md:flex-row items-center p-2 gap-8">
                {/* Image Section */}
                <div className="relative w-full md:w-56 h-48 md:h-36 shrink-0 rounded-[2rem] overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    {/* Overlay Type Tag */}
                    <div className="absolute top-4 left-4 z-20">
                        <span className={cn(
                            "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-2xl",
                            type === "VIP"
                                ? "bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/50"
                                : "bg-black/80 text-white/50 border border-white/10"
                        )}>
                            {type}
                        </span>
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0 py-4 px-2 md:px-0">
                    <div className="flex flex-col gap-1 mb-4">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-neon-pink transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
                            <span className="truncate">{location}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-3 gap-x-8">
                        <div className="flex items-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest">
                            <Calendar size={14} className="text-neon-pink/80" />
                            <span>{date}</span>
                        </div>
                        {time && (
                            <div className="flex items-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest">
                                <Clock size={14} className="text-neon-pink/80" />
                                <span>{time}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest">
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{category}</span>
                        </div>
                        {tag && (
                            <div className="px-3 py-1 rounded-lg bg-neon-pink/10 text-neon-pink border border-neon-pink/30 text-[10px] font-black uppercase tracking-widest animate-pulse">
                                {tag}
                            </div>
                        )}
                    </div>
                </div>

                {/* Price & Action Section */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 w-full md:w-auto px-10 py-6 md:py-0 border-t md:border-t-0 md:border-l border-white/5">
                    <div className="text-left md:text-right space-y-1">
                        <p className="text-[10px] uppercase text-white/30 font-bold tracking-[0.2em] leading-none">Mulai dari</p>
                        <p className="text-3xl font-black text-neon-yellow drop-shadow-[0_0_15px_rgba(255,230,0,0.5)] leading-none italic">
                            ${price}
                        </p>
                    </div>
                    <button className={cn(
                        "px-10 py-3.5 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 group/btn relative overflow-hidden",
                        "bg-neon-cyan text-black"
                    )}>
                        <span className="relative z-10">{type === "VIP" ? "Buy VIP" : "Buy"}</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
