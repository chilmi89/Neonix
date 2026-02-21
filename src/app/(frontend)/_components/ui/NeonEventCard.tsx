"use client";

import { Calendar, MapPin, Zap, TrendingUp } from "lucide-react";
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
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            onClick={onClick}
            className="group relative h-full min-h-[380px] rounded-2xl overflow-hidden cursor-pointer"
            style={{ isolation: "isolate" }}
        >
            {/* Animated neon border glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-linear-to-br from-neon-pink/0 via-white/5 to-neon-cyan/0 group-hover:from-neon-pink/60 group-hover:via-white/10 group-hover:to-neon-cyan/60 transition-all duration-700 z-0" />
            <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-transparent transition-colors duration-500 z-0" />

            {/* Inner container */}
            <div className="relative h-full rounded-2xl overflow-hidden z-10">
                {/* Full-cover background image */}
                <div className="absolute inset-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Multi-layer gradient system */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent" />
                    {/* Cinematic side vignette */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30" />
                </div>

                {/* Tag badge — floating top-left */}
                {tag && (
                    <div className="absolute top-4 left-4 z-20">
                        {tag === "trending" ? (
                            <motion.div
                                initial={{ opacity: 0.8 }}
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md bg-white/10 border border-white/20 text-white"
                            >
                                <TrendingUp size={10} />
                                trending
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0.9 }}
                                animate={{ opacity: [0.9, 1, 0.9], boxShadow: ["0 0 8px rgba(255,0,128,0.4)", "0 0 18px rgba(255,0,128,0.7)", "0 0 8px rgba(255,0,128,0.4)"] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md bg-neon-pink/20 border border-neon-pink/60 text-neon-pink"
                            >
                                <Zap size={10} fill="currentColor" />
                                hot
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Floating price chip — top-right */}
                <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl backdrop-blur-md bg-black/50 border border-neon-yellow/30 text-neon-yellow font-black text-sm drop-shadow-[0_0_8px_rgba(255,230,0,0.6)]">
                    ${price}
                </div>

                {/* Bottom content overlay */}
                <div className="absolute inset-x-0 bottom-0 z-10">
                    {/* Deep bottom gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/98 via-black/80 to-transparent" />

                    <div className="relative px-5 pb-5 pt-16 space-y-3">
                        {/* Title */}
                        <h3 className="text-xl font-extrabold text-white line-clamp-2 leading-tight tracking-tight group-hover:text-neon-pink transition-colors duration-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                            {title}
                        </h3>

                        {/* Meta row */}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-white/60 text-xs font-medium">
                                <MapPin size={11} className="text-neon-pink/80 shrink-0" />
                                <span className="truncate">{location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/60 text-xs font-medium">
                                <Calendar size={11} className="text-neon-pink/80 shrink-0" />
                                <span>{date}</span>
                            </div>
                        </div>

                        {/* Neon divider */}
                        <div className="h-px bg-linear-to-r from-transparent via-neon-pink/40 to-transparent" />

                        {/* Bottom row: label + CTA */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[9px] uppercase text-white/30 font-bold tracking-[0.2em]">Mulai dari</p>
                                <p className="text-2xl font-black text-neon-yellow drop-shadow-[0_0_14px_rgba(255,230,0,0.8)] leading-none">
                                    ${price}
                                </p>
                            </div>

                            {/* Shimmer CTA button */}
                            <button className="relative overflow-hidden flex items-center gap-2 bg-neon-pink text-white font-black text-[10px] px-5 py-2.5 rounded-xl uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,128,0.4)] hover:shadow-[0_0_30px_rgba(255,0,128,0.7)] transition-all duration-300 group/btn">
                                <span className="relative z-10">Detail</span>
                                {/* Shine sweep */}
                                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
