"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Check, Eye, EyeOff, X } from "lucide-react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#000000] text-white font-inter flex flex-col relative">
            {/* Modal Backdrop Overlay */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />


            <main className="flex-1 flex items-center justify-center py-20 px-6 relative z-50 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-neon-yellow/5 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-neon-pink/10 blur-[120px] rounded-full -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[540px] bg-[#121212] border border-white/[0.05] rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative"
                >
                    {/* Close Button */}
                    <Link href="/" className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors p-2">
                        <X size={24} />
                    </Link>

                    {/* Tab Switcher */}
                    <div className="flex gap-8 mb-10 border-b border-white/5">
                        <Link href="/login" className="pb-4 text-sm font-bold text-white/20 hover:text-white transition-all border-b-2 border-transparent">
                            Login
                        </Link>
                        <Link href="/register" className="pb-4 text-sm font-bold border-b-2 border-[#FFD700] text-white transition-all">
                            Register
                        </Link>
                    </div>

                    <div className="space-y-2 mb-8 text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Create Account</h1>
                        <p className="text-white/40 text-sm font-medium leading-relaxed">Create your account to get started</p>
                    </div>

                    <form className="space-y-6">
                        {/* Full Name */}
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1 font-inter">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[#FFD700]/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        {/* Email or Phone */}
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1 font-inter">Email or Phone</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="name@example.com"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[#FFD700]/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        {/* Password Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1 font-inter">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[#FFD700]/50 focus:bg-black/60 transition-all placeholder:text-white/10 font-mono"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1 font-inter">Confirm</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[#FFD700]/50 focus:bg-black/60 transition-all placeholder:text-white/10 font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center gap-3 pt-2 group cursor-pointer">
                            <div className="w-5 h-5 rounded bg-[#FFD700] flex items-center justify-center transition-transform group-active:scale-95 shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                                <Check size={14} className="text-black stroke-[4]" />
                            </div>
                            <p className="text-[11px] font-medium text-white/40 leading-none font-inter">
                                I agree to the <Link href="#" className="text-[#FFD700] hover:underline transition-all">Terms of Service</Link> and <Link href="#" className="text-[#FFD700] hover:underline transition-all">Privacy Policy</Link>
                            </p>
                        </div>

                        {/* Register Button */}
                        <button className="w-full bg-[#FFD700] text-black font-bold py-4 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.3)] hover:shadow-[0_0_35px_rgba(255,215,0,0.5)] hover:brightness-110 transition-all mt-4 text-sm active:scale-[0.98] font-inter">
                            Register Now
                        </button>
                    </form>

                    {/* Footer Link */}
                    <p className="text-center text-sm text-white/40 mt-10">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#FFD700] font-bold hover:brightness-125 transition-all">
                            Sign In
                        </Link>
                    </p>
                </motion.div>
            </main>

        </div>
    );
}
