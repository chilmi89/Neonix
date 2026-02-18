"use client";

import { Crown } from "lucide-react";
import { NeonButton } from "@/app/(frontend)/_components/ui/NeonButton";
import { motion } from "framer-motion";

export function VipSection() {
    return (
        <section className="my-20 px-6">
            <div className="max-w-7xl mx-auto bg-[#FFF5FF] dark:bg-muted border border-glass-border dark:border-white/5 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-sm">
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-neon-pink/5 blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-cyan/5 blur-[100px] -z-10" />

                <div className="max-w-xl mb-8 md:mb-0 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF9E6] dark:bg-neon-yellow/10 border border-[#FFE4A3] dark:border-neon-yellow/20 text-[#B8860B] dark:text-neon-yellow text-[10px] font-black uppercase tracking-widest">
                        <i className="fas fa-crown"></i>
                        <span>Premium Experience</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-foreground leading-[1.1] uppercase tracking-tighter">
                        Unlock VIP Access
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-lg">
                        Get backstage passes, meet & greets, and exclusive lounge access. Elevate your night to the next level.
                    </p>
                </div>

                <div className="relative z-10">
                    <button className="px-10 py-5 rounded-full border-2 border-neon-pink/30 text-neon-pink font-black uppercase tracking-widest hover:bg-neon-pink hover:text-white transition-all shadow-lg shadow-neon-pink/10 group bg-white dark:bg-transparent">
                        <span className="group-hover:scale-110 transition-transform inline-block">Unlocked VIP</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
