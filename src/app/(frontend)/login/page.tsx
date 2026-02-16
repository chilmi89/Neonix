"use client";

import Link from "next/link";
import { useState } from "react";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#000000] text-white font-inter flex flex-col relative">
            {/* Modal Backdrop Overlay */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

            <NeonNavbar />

            <main className="flex-1 flex items-center justify-center py-20 px-6 relative z-50 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-neon-pink/10 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-neon-cyan/5 blur-[120px] rounded-full -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[480px] bg-[#121212] border border-white/[0.05] rounded-[2.5rem] p-10 md:p-12 shadow-2xl relative"
                >
                    {/* Close Button */}
                    <Link href="/" className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors p-2">
                        <X size={24} />
                    </Link>

                    {/* Tab Switcher */}
                    <div className="flex gap-8 mb-10 border-b border-white/5">
                        <Link href="/login" className="pb-4 text-sm font-bold border-b-2 border-neon-pink text-white transition-all">
                            Login
                        </Link>
                        <Link href="/register" className="pb-4 text-sm font-bold text-white/20 hover:text-white transition-all border-b-2 border-transparent">
                            Register
                        </Link>
                    </div>

                    <div className="space-y-2 mb-8 text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
                        <p className="text-white/40 text-sm">Enter your credentials to access your account</p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/60 ml-1">Email or Phone</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-pink transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="name@example.com"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-neon-pink/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 relative text-left">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/60 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-pink transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-sm text-white outline-none focus:border-neon-pink/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="flex justify-end pt-1">
                                <Link href="#" className="text-[11px] font-bold text-[#FFD700] hover:brightness-125 transition-all">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button className="w-full bg-[#FF00FF] text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(255,0,255,0.4)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] hover:brightness-110 transition-all mt-4">
                            Log In
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#121212] px-4 text-white/20 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 bg-black/40 border border-white/5 rounded-2xl py-4 hover:bg-white/5 transition-all group">
                            <i className="fab fa-google text-white/40 group-hover:text-white transition-colors"></i>
                            <span className="text-sm font-bold text-white/60 group-hover:text-white">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 bg-black/40 border border-white/5 rounded-2xl py-4 hover:bg-white/5 transition-all group">
                            <i className="fab fa-apple text-white/40 group-hover:text-white transition-colors text-lg"></i>
                            <span className="text-sm font-bold text-white/60 group-hover:text-white">Apple</span>
                        </button>
                    </div>
                </motion.div>
            </main>

            <NeonFooter />
        </div>
    );
}
