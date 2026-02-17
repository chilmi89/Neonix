"use client";

import { motion } from "framer-motion";
import { User, Mail, Shield, Zap, Edit2, CheckCircle2 } from "lucide-react";

export function ProfileSection() {
    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <section className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <User className="text-neon-pink" size={20} />
                            <h3 className="text-xl font-bold uppercase tracking-tight">Personal Info</h3>
                        </div>
                        <button className="p-2 rounded-xl bg-white/5 hover:bg-neon-pink/10 hover:text-neon-pink transition-all">
                            <Edit2 size={16} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-white/40">Full Name</label>
                            <p className="text-lg font-bold">Alex Morgan</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-white/40">Email Address</label>
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-bold">alex.morgan@neonix.com</p>
                                <CheckCircle2 size={16} className="text-green-500" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-white/40">Bio</label>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Music enthusiast, night owl, and regular attendee of Jakarta's most exclusive neon events. Always chasing the perfect beat.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Account Status */}
                <section className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 space-y-8">
                    <div className="flex items-center gap-3">
                        <Shield className="text-neon-cyan" size={20} />
                        <h3 className="text-xl font-bold uppercase tracking-tight">Account Status</h3>
                    </div>

                    <div className="space-y-8">
                        <div className="p-6 bg-neon-cyan/5 rounded-2xl border border-neon-cyan/20">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                                        <Zap className="text-neon-cyan" size={20} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold uppercase">VIP Status</p>
                                        <p className="text-[10px] text-neon-cyan font-black uppercase tracking-widest">Active Level 2</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-lg text-[10px] font-black uppercase">Pro</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                                />
                            </div>
                            <p className="text-[10px] text-white/40 mt-3 uppercase font-black tracking-widest">250 points to Level 3</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                <p className="text-2xl font-black text-white">12</p>
                                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Events Attended</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                                <p className="text-2xl font-black text-neon-pink">3</p>
                                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Total Badges</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
