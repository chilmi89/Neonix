"use client";

import Link from "next/link";
import { useState } from "react";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";
import { motion } from "framer-motion";
import { User, Mail, Lock, Briefcase, Crown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
    const [role, setRole] = useState<"buyer" | "seller">("buyer");

    return (
        <div className="min-h-screen bg-[#000000] text-white font-inter flex flex-col">
            <NeonNavbar />

            <main className="flex-1 flex items-center justify-center py-20 px-6 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-neon-yellow/5 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-neon-pink/10 blur-[120px] rounded-full -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[540px] bg-[#0F0F0F] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative z-10"
                >
                    <div className="space-y-2 mb-8 text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Create Account</h1>
                        <p className="text-white/40 text-sm font-medium">Join the marketplace as a Buyer or VIP Seller</p>
                    </div>

                    {/* Role Selection */}
                    <div className="mb-8 space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-widest text-white/60 ml-1">I want to be a</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setRole("buyer")}
                                className={cn(
                                    "relative flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300",
                                    role === "buyer"
                                        ? "bg-neon-yellow/5 border-neon-yellow shadow-[0_0_20px_rgba(255,215,0,0.15)]"
                                        : "bg-black/40 border-white/5 hover:border-white/10"
                                )}
                            >
                                <div className={cn(
                                    "p-3 rounded-full transition-colors",
                                    role === "buyer" ? "text-neon-yellow" : "text-white/20"
                                )}>
                                    <Briefcase size={22} />
                                </div>
                                <span className={cn(
                                    "text-xs font-bold uppercase tracking-wider",
                                    role === "buyer" ? "text-white" : "text-white/40"
                                )}>Buyer</span>
                                <p className="text-[10px] text-white/20 font-medium">Explore items</p>
                                {role === "buyer" && (
                                    <div className="absolute top-3 right-3 text-neon-yellow">
                                        <div className="w-4 h-4 rounded-full bg-neon-yellow flex items-center justify-center">
                                            <Check size={10} className="text-black stroke-[4]" />
                                        </div>
                                    </div>
                                )}
                            </button>

                            <button
                                onClick={() => setRole("seller")}
                                className={cn(
                                    "relative flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300",
                                    role === "seller"
                                        ? "bg-neon-yellow/5 border-neon-yellow shadow-[0_0_20px_rgba(255,215,0,0.15)]"
                                        : "bg-black/40 border-white/5 hover:border-white/10"
                                )}
                            >
                                <div className={cn(
                                    "p-3 rounded-full transition-colors",
                                    role === "seller" ? "text-neon-yellow" : "text-white/20"
                                )}>
                                    <Crown size={22} />
                                </div>
                                <span className={cn(
                                    "text-xs font-bold uppercase tracking-wider",
                                    role === "seller" ? "text-white" : "text-white/40"
                                )}>Seller</span>
                                <p className="text-[10px] text-white/20 font-medium">VIP Access</p>
                                {role === "seller" && (
                                    <div className="absolute top-3 right-3 text-neon-yellow">
                                        <div className="w-4 h-4 rounded-full bg-neon-yellow flex items-center justify-center">
                                            <Check size={10} className="text-black stroke-[4]" />
                                        </div>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>

                    <form className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-white/60 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-yellow transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-neon-yellow/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-white/60 ml-1">Email or Phone</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-yellow transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="name@example.com"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-neon-yellow/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-white/60 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-yellow transition-colors" size={18} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-neon-yellow/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-white/60 ml-1">Confirm</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-yellow transition-colors" size={18} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-neon-yellow/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button type="button" className="w-5 h-5 rounded bg-neon-yellow flex items-center justify-center">
                                <Check size={12} className="text-black stroke-[4]" />
                            </button>
                            <p className="text-[11px] font-medium text-white/40">
                                I agree to the <Link href="#" className="text-neon-yellow hover:underline">Terms of Service</Link> and <Link href="#" className="text-neon-yellow hover:underline">Privacy Policy</Link>
                            </p>
                        </div>

                        <button className="w-full bg-[#FFD700] text-black font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:brightness-110 transition-all mt-4 uppercase tracking-wider text-xs">
                            Register Now
                        </button>
                    </form>

                    <p className="text-center text-sm text-white/40 mt-10">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#FFD700] font-bold hover:brightness-125 transition-all">
                            Sign In
                        </Link>
                    </p>
                </motion.div>
            </main>

            <NeonFooter />
        </div>
    );
}
