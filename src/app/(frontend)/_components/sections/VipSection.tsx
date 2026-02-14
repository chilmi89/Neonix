"use client";

import { Crown } from "lucide-react";
import { NeonButton } from "../ui/NeonButton";
import { motion } from "framer-motion";

export function VipSection() {
    return (
        <section className="my-20 px-6">
            <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#0a010a] to-[#200120] border border-white/5 rounded-[2rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl">
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-neon-pink/10 blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-cyan/5 blur-[100px] -z-10" />

                <div className="max-w-lg mb-8 md:mb-0 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-yellow/10 border border-neon-yellow/20 text-neon-yellow text-[10px] font-bold uppercase">
                        <i className="fas fa-crown"></i>
                        <span>Premium Experience</span>
                    </div>
                    <h2 className="text-4xl font-extrabold text-white leading-tight">
                        Unlock VIP Access
                    </h2>
                    <p className="text-white/40 text-sm">
                        Get backstage passes, meet & greets, and exclusive lounge access. Elevate your night to the next level.
                    </p>
                </div>

                <div className="relative z-10">
                    <button className="px-10 py-4 rounded-full border-2 border-neon-yellow text-neon-yellow font-bold hover:bg-neon-yellow hover:text-black transition-all">
                        Unlocked VIP
                    </button>
                </div>
            </div>
        </section>
    );
}
