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
            className="group relative h-full min-h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer bg-white border border-border shadow-xl shadow-black/5"
            style={{ isolation: "isolate" }}
        >

            {/* Inner container */}
            <div className="relative h-full rounded-[2.5rem] overflow-hidden z-10">
                {/* Background image area */}
                <div className="absolute top-0 inset-x-0 h-[65%] overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
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
                                animate={{ opacity: [0.9, 1, 0.9] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md bg-accent/20 border border-accent/40 text-accent-foreground"
                            >
                                <Zap size={10} fill="currentColor" />
                                hot
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Price hint — replaced with bottom section details */}
                <div className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/80 border border-border text-foreground font-black text-sm shadow-sm">
                    ${price}
                </div>

                {/* Bottom content overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 pt-0 flex flex-col gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Featured Event</span>
                        </div>
                        <h3 className="text-xl font-black text-foreground line-clamp-2 leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                            {title}
                        </h3>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-2.5 text-muted-foreground text-[11px] font-bold uppercase tracking-widest">
                            <MapPin size={12} className="text-primary shrink-0" />
                            <span className="truncate">{location}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-muted-foreground text-[11px] font-bold uppercase tracking-widest">
                            <Calendar size={12} className="text-primary shrink-0" />
                            <span>{date}</span>
                        </div>
                    </div>

                    <div className="h-px bg-border my-1" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[9px] uppercase text-foreground/30 font-bold tracking-[0.2em]">Starting from</p>
                            <p className="text-2xl font-black text-primary leading-none">
                                ${price}
                            </p>
                        </div>

                        <button className="relative overflow-hidden flex items-center gap-2 bg-primary text-white font-black text-[10px] px-6 py-3 rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 transition-all duration-300 group/btn">
                            <span className="relative z-10">Details</span>
                            <Zap size={12} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
