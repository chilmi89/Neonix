"use client";

import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { NeonButton } from "@/app/(frontend)/_components/ui/NeonButton";

export function NeonHero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
            {/* Content */}
            <div className="w-full text-center relative z-10 py-20 px-8 md:px-12 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-[950] leading-[0.85] tracking-tighter uppercase text-white">
                        EXPERIENCE THE<br />
                        <span className="text-neon-pink drop-shadow-[0_0_30px_rgba(255,0,255,0.4)]">Extraordinary</span>
                    </h1>
                </motion.div>

                <p className="max-w-2xl mx-auto text-white/60 text-base md:text-lg font-medium leading-relaxed mt-8">
                    Your gateway to the most electrifying live performances, exclusive gatherings, and unforgettable nights.
                </p>

                {/* Search Bar */}
                <div className="max-w-[800px] mx-auto mt-20 bg-black/60 backdrop-blur-3xl border border-white/10 p-2.5 rounded-full flex flex-col md:flex-row items-center gap-2 shadow-2xl">
                    <div className="flex-1 w-full px-8 py-3 flex items-center gap-4 border-r border-white/5">
                        <Search className="text-white/40" size={20} />
                        <input
                            type="text"
                            placeholder="Search events, artists..."
                            className="bg-transparent border-none outline-none text-white w-full text-sm font-bold placeholder:text-white/20"
                        />
                    </div>
                    <div className="w-full md:w-auto px-8 py-3 flex items-center gap-4 cursor-pointer group">
                        <MapPin className="text-white/40 group-hover:text-neon-cyan transition-colors" size={20} />
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Location</span>
                            <div className="flex items-center gap-2">
                                <span className="text-white text-sm font-black uppercase tracking-wider">Jakarta, ID</span>
                                <i className="fas fa-chevron-down text-[10px] text-white/20 group-hover:translate-y-0.5 transition-transform"></i>
                            </div>
                        </div>
                    </div>
                    <button className="w-full md:w-auto bg-neon-pink text-white font-black text-sm px-10 h-14 rounded-full shadow-lg shadow-neon-pink/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                        Find Events
                    </button>
                </div>
            </div>
        </section >
    );
}
