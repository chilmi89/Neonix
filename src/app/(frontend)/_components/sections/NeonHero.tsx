"use client";

import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { NeonButton } from "../ui/NeonButton";

export function NeonHero() {
    return (
        <section className="relative px-6 pt-32 pb-20 overflow-hidden transition-colors duration-500 w-full">
            {/* Rounded Hero Banner - Expanded Width */}
            <div className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden group shadow-2xl mx-auto w-full max-w-[95%]">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1540575861501-7ad058bf3efb?auto=format&fit=crop&q=80&w=2000"
                        alt="Hero Music"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-10000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Banner Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20 z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl space-y-6"
                    >
                        <div className="inline-block px-4 py-1 rounded bg-neon-pink text-[10px] font-black uppercase tracking-widest text-white mb-4">
                            Limited Edition
                        </div>
                        <h1 className="text-5xl md:text-7xl font-[900] leading-[1] tracking-tighter text-white uppercase drop-shadow-2xl">
                            FROM POP <span className="text-neon-cyan">BALLADS</span><br />
                            TO EMO <span className="text-neon-pink">ENCORES</span>
                        </h1>
                        <p className="text-white/80 text-lg font-medium leading-relaxed max-w-md">
                            Your gateway to the most electrifying live performances, exclusive gatherings, and unforgettable nights.
                        </p>
                        <button className="bg-white text-black font-black text-sm px-10 py-4 rounded-full hover:bg-neon-cyan hover:scale-105 transition-all shadow-xl">
                            Get Into Live Music
                        </button>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
