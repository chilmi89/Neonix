"use client";

import { motion } from "framer-motion";
import { Lock, Bell, Shield, Eye, Mail, Smartphone, Globe, Save } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SettingsSection() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: true
    });

    return (
        <div className="space-y-8">
            {/* Security Section */}
            <section className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-neon-pink/20 flex items-center justify-center">
                        <Lock className="text-neon-pink" size={20} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Security & Password</h2>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">Update your security credentials</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-white/40">Current Password</label>
                            <input
                                type="password"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-neon-pink/50 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-white/40">New Password</label>
                            <input
                                type="password"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-neon-pink/50 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-widest text-white/40">Confirm New Password</label>
                            <input
                                type="password"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-neon-pink/50 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="bg-neon-pink/5 border border-neon-pink/20 rounded-2xl p-6 self-start">
                        <div className="flex gap-4 items-start">
                            <Shield className="text-neon-pink mt-1" size={20} />
                            <div>
                                <h3 className="text-sm font-black uppercase mb-2">Password Requirements</h3>
                                <ul className="space-y-2">
                                    {['Minimum 8 characters', 'One uppercase letter', 'One special character'].map((req, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-white/60">
                                            <div className="w-1 h-1 rounded-full bg-neon-pink" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                    <button className="bg-neon-pink text-white font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-neon-pink/20 flex items-center gap-3">
                        <Save size={16} />
                        Update Password
                    </button>
                </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Notifications Section */}
                <section className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                            <Bell className="text-neon-cyan" size={20} />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Notifications</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                                <Mail className="text-white/40" size={18} />
                                <div>
                                    <p className="text-sm font-black uppercase">Email Notifications</p>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">News and updates</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                                className={cn(
                                    "w-12 h-6 rounded-full transition-all relative",
                                    notifications.email ? "bg-neon-cyan" : "bg-white/10"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                                    notifications.email ? "left-7" : "left-1"
                                )} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                                <Smartphone className="text-white/40" size={18} />
                                <div>
                                    <p className="text-sm font-black uppercase">Push Notifications</p>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Direct to your mobile</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                                className={cn(
                                    "w-12 h-6 rounded-full transition-all relative",
                                    notifications.push ? "bg-neon-cyan" : "bg-white/10"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                                    notifications.push ? "left-7" : "left-1"
                                )} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Privacy Section */}
                <section className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-neon-yellow/20 flex items-center justify-center">
                            <Eye className="text-neon-yellow" size={20} />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">Privacy</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                            <div className="flex items-center gap-4">
                                <Globe className="text-white/40" size={18} />
                                <div>
                                    <p className="text-sm font-black uppercase">Public Profile</p>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Allow others to see your events</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <span className="text-[10px] font-black uppercase px-3 py-1 bg-neon-yellow/10 text-neon-yellow rounded-lg border border-neon-yellow/20">Enabled</span>
                            </div>
                        </div>

                        <button className="w-full p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center gap-3 text-white/60 hover:text-white hover:bg-white/10 transition-all uppercase text-[10px] font-black tracking-widest">
                            Manager Blocked Users
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
