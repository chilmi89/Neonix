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
            <section className="bg-white border border-border rounded-[2.5rem] p-10 shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Lock className="text-primary" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">Security & Password</h2>
                        <p className="text-xs text-foreground/40 font-black uppercase tracking-[0.2em] mt-1">Update your credentials</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-2.5">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-foreground/30">Current Password</label>
                            <input
                                type="password"
                                className="w-full bg-muted border border-border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-foreground"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-foreground/30">New Password</label>
                            <input
                                type="password"
                                className="w-full bg-muted border border-border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-foreground"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-foreground/30">Confirm New Password</label>
                            <input
                                type="password"
                                className="w-full bg-muted border border-border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-foreground"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 self-start">
                        <div className="flex gap-4 items-start">
                            <Shield className="text-primary mt-1" size={24} />
                            <div>
                                <h3 className="text-sm font-black uppercase mb-4 text-foreground">Password Security</h3>
                                <ul className="space-y-3">
                                    {['Minimum 8 characters', 'One uppercase letter', 'One special character'].map((req, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-foreground/60">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-border flex justify-end">
                    <button className="bg-primary text-white font-black px-10 py-5 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center gap-3">
                        <Save size={16} />
                        Save Changes
                    </button>
                </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Notifications Section */}
                <section className="bg-white border border-border rounded-[2.5rem] p-10 shadow-sm">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center">
                            <Bell className="text-sky-500" size={24} />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">Notifications</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 bg-muted rounded-[2rem] border border-border">
                            <div className="flex items-center gap-4">
                                <Mail className="text-foreground/20" size={20} />
                                <div>
                                    <p className="text-sm font-black uppercase text-foreground">Email Notifications</p>
                                    <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.2em]">News and updates</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                                className={cn(
                                    "w-12 h-6 rounded-full transition-all relative",
                                    notifications.email ? "bg-primary" : "bg-foreground/10"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                                    notifications.email ? "left-7" : "left-1"
                                )} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-6 bg-muted rounded-[2rem] border border-border">
                            <div className="flex items-center gap-4">
                                <Smartphone className="text-foreground/20" size={20} />
                                <div>
                                    <p className="text-sm font-black uppercase text-foreground">Push Notifications</p>
                                    <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.2em]">Direct to your mobile</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                                className={cn(
                                    "w-12 h-6 rounded-full transition-all relative",
                                    notifications.push ? "bg-sky-500" : "bg-foreground/10"
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
                <section className="bg-white border border-border rounded-[2.5rem] p-10 shadow-sm">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                            <Eye className="text-amber-500" size={24} />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">Privacy Settings</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-muted rounded-[2rem] border border-border space-y-6">
                            <div className="flex items-center gap-4">
                                <Globe className="text-foreground/20" size={20} />
                                <div>
                                    <p className="text-sm font-black uppercase text-foreground">Public Profile</p>
                                    <p className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.2em]">Allow others to see your events</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <span className="text-[10px] font-black uppercase px-4 py-2 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20">Enabled</span>
                            </div>
                        </div>

                        <button className="w-full p-5 bg-muted rounded-[2rem] border border-border flex items-center justify-center gap-3 text-foreground/40 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all uppercase text-[10px] font-black tracking-widest">
                            Manage Blocked Users
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
