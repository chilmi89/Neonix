"use client";

import { Crown } from "lucide-react";
import { NeonButton } from "../ui/NeonButton";
import { motion } from "framer-motion";

export function VipSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto bg-linear-to-r from-[#121212] to-black border border-neon-yellow/10 rounded-[3rem] p-12 relative overflow-hidden group">
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-yellow/5 blur-[100px] -z-10 group-hover:bg-neon-yellow/10 transition-all duration-700" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-yellow/10 border border-neon-yellow/20 text-neon-yellow text-[10px] font-black uppercase tracking-widest">
                            <Crown size={14} /> Premium Experience
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Unlock <span className="text-neon-yellow">VIP Access</span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-xl font-medium">
                            Get backstage passes, meet & greets, and exclusive lounge access. Elevate your night to the next level.
                        </p>
                    </div>

                    <div className="shrink-0">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button className="px-12 py-5 rounded-full border-2 border-neon-yellow text-neon-yellow font-black uppercase tracking-widest hover:bg-neon-yellow hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                                Unlocked VIP
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
