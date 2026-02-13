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
            <div className="max-w-5xl mx-auto text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <h1 className="text-[12vw] md:text-8xl lg:text-[10rem] font-[1000] leading-[0.85] tracking-tighter text-white flex flex-col items-center">
                        <span className="text-neon-pink drop-shadow-[0_0_15px_rgba(255,0,204,0.5)]">EXPERIENCE THE</span>
                        <span className="relative">
                            EXTRAORDINARy
                            <span className="absolute -right-4 top-0 text-neon-pink">.</span>
                        </span>
                    </h1>
                </motion.div>

                <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                    Your gateway to the most electrifying live performances, exclusive gatherings, and unforgettable nights.
                </p>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mt-12 bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2">
                    <div className="flex-1 w-full px-4 py-3 flex items-center gap-3">
                        <Search className="text-white/40" size={20} />
                        <input
                            type="text"
                            placeholder="Search events, artists..."
                            className="bg-transparent border-none outline-none text-white w-full text-sm font-medium"
                        />
                    </div>
                    <div className="hidden md:block w-px h-8 bg-white/10" />
                    <div className="w-full md:w-auto px-4 py-3 flex items-center gap-3">
                        <MapPin className="text-white/40" size={20} />
                        <select className="bg-transparent border-none outline-none text-white text-sm font-medium cursor-pointer appearance-none pr-6">
                            <option value="jakarta">Jakarta</option>
                            <option value="bali">Bali</option>
                        </select>
                    </div>
                    <NeonButton variant="pink" className="w-full md:w-auto rounded-xl px-8 h-12">
                        Find Events
                    </NeonButton>
                </div>
            </div>
        </section>
    );
}
