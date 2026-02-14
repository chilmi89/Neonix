"use client";

import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { NeonButton } from "../ui/NeonButton";

export function NeonHero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"
                    alt="Hero Music"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto text-center relative z-10 py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-[900] leading-[1.1] tracking-tighter text-white uppercase">
                        <span className="text-neon-pink drop-shadow-[0_0_20px_rgba(255,0,255,0.5)]">EXPERIENCE THE</span><br />
                        <span>Extraordinary</span>
                    </h1>
                </motion.div>

                <p className="max-w-2xl mx-auto text-white/50 text-base md:text-lg font-medium leading-relaxed mt-8">
                    Your gateway to the most electrifying live performances, exclusive gatherings, and unforgettable nights.
                </p>

                {/* Search Bar */}
                <div className="max-w-[750px] mx-auto mt-16 bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-2 rounded-full flex flex-col md:flex-row items-center gap-2 shadow-2xl">
                    <div className="flex-1 w-full px-6 py-3 flex items-center gap-3">
                        <Search className="text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Search events, artists..."
                            className="bg-transparent border-none outline-none text-white w-full text-sm font-medium placeholder:text-white/20"
                        />
                    </div>
                    <div className="hidden md:block w-px h-8 bg-white/10" />
                    <div className="w-full md:w-auto px-6 py-3 flex items-center gap-3 cursor-pointer group">
                        <MapPin className="text-white/20 group-hover:text-neon-cyan transition-colors" size={18} />
                        <span className="text-white text-sm font-medium whitespace-nowrap">Jakarta</span>
                        <motion.div animate={{ rotate: 180 }} className="text-white/20 flex items-center">
                            <i className="fas fa-chevron-down text-[10px]"></i>
                        </motion.div>
                    </div>
                    <button className="w-full md:w-auto bg-neon-pink text-white font-bold text-sm px-12 h-14 rounded-full shadow-[0_0_25px_rgba(255,0,255,0.4)] hover:brightness-110 transition-all">
                        Find Events
                    </button>
                </div>
            </div>
        </section >
    );
}
