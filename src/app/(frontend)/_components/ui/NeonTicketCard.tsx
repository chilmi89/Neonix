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
            className="group relative bg-white border border-border hover:border-primary/30 rounded-[2.5rem] overflow-hidden transition-all duration-500 cursor-pointer shadow-xl shadow-black/5"
            onClick={onClick}
        >
            <div className="flex flex-col md:flex-row items-center p-3 gap-8">
                {/* Image Section */}
                <div className="relative w-full md:w-64 h-48 md:h-40 shrink-0 rounded-[2rem] overflow-hidden border border-border">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    {/* Overlay Type Tag */}
                    <div className="absolute top-4 left-4 z-20">
                        <span className={cn(
                            "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg",
                            type === "VIP"
                                ? "bg-primary text-white border border-primary/50"
                                : "bg-white/90 text-foreground border border-border"
                        )}>
                            {type}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0 py-4 px-2 md:px-0">
                    <div className="flex flex-col gap-2 mb-6">
                        <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-bold uppercase tracking-widest">
                            <MapPin size={14} className="text-primary" />
                            <span className="truncate">{location}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-3 gap-x-10">
                        <div className="flex items-center gap-2.5 text-foreground/60 font-black text-[10px] uppercase tracking-widest">
                            <Calendar size={16} className="text-primary" />
                            <span>{date}</span>
                        </div>
                        {time && (
                            <div className="flex items-center gap-2.5 text-foreground/60 font-black text-[10px] uppercase tracking-widest">
                                <Clock size={16} className="text-primary" />
                                <span>{time}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2.5 text-foreground/60 font-black text-[10px] uppercase tracking-widest">
                            <span className="px-3 py-1.5 rounded-lg bg-muted border border-border">{category}</span>
                        </div>
                        {tag && (
                            <div className="px-4 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest animate-pulse">
                                {tag}
                            </div>
                        )}
                    </div>
                </div>

                {/* Price & Action Section */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-6 w-full md:w-auto px-10 py-6 md:py-0 border-t md:border-t-0 md:border-l border-border bg-muted/30 md:bg-transparent">
                    <div className="text-left md:text-right space-y-1.5">
                        <p className="text-[10px] uppercase text-foreground/30 font-black tracking-[0.2em] leading-none">Starting from</p>
                        <p className="text-3xl font-black text-primary leading-none tracking-tight">
                            ${price}
                        </p>
                    </div>
                    <button className={cn(
                        "px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-500 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 group/btn relative overflow-hidden bg-primary text-white"
                    )}>
                        <span className="relative z-10">{type === "VIP" ? "Reserve VIP" : "Reserve Now"}</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
