"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Mail, Shield, Zap, Edit2, CheckCircle2 } from "lucide-react";

export function ProfileSection() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <section className="bg-white border border-border rounded-[2.5rem] p-10 space-y-10 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <User className="text-primary" size={20} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Personal Info</h3>
                        </div>
                        <button className="p-3 rounded-2xl bg-muted border border-border hover:bg-primary/10 hover:text-primary transition-all text-foreground/40 group/edit">
                            <Edit2 size={16} className="group-hover/edit:scale-110 transition-transform" />
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-2.5">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-foreground/30">Full Name</label>
                            <p className="text-xl font-black text-foreground tracking-tight">{user?.name || 'Alex Morgan'}</p>
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-foreground/30">Email Address</label>
                            <div className="flex items-center gap-3">
                                <p className="text-xl font-black text-foreground tracking-tight">{user?.email || 'alex.morgan@neonix.com'}</p>
                                <div className="p-1 px-2.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-green-500/20">
                                    <CheckCircle2 size={12} />
                                    Verified
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-foreground/30">Bio</label>
                            <p className="text-sm text-foreground/60 leading-relaxed font-bold">
                                {user?.bio || "Music enthusiast, night owl, and regular attendee of Jakarta's most exclusive neon events. Always chasing the perfect beat."}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Account Status */}
                <section className="bg-white border border-border rounded-[2.5rem] p-10 space-y-10 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-sky-500/10 flex items-center justify-center">
                            <Shield className="text-sky-500" size={20} />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Account Status</h3>
                    </div>

                    <div className="space-y-10">
                        <div className="p-8 bg-sky-500/5 rounded-[2rem] border border-sky-500/10 group/status">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center">
                                        <Zap className="text-sky-500" size={24} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase text-foreground/40 tracking-wider">Membership</p>
                                        <p className="text-lg text-sky-600 font-black uppercase tracking-tight">Active Level 2</p>
                                    </div>
                                </div>
                                <span className="px-4 py-2 bg-sky-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-sky-500/20">Pro Member</span>
                            </div>
                            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-sky-500"
                                />
                            </div>
                            <p className="text-[10px] text-foreground/30 mt-4 uppercase font-black tracking-widest">250 points to Level 3</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-muted rounded-[2rem] border border-border text-center group/stat">
                                <p className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">12</p>
                                <p className="text-[10px] text-foreground/30 uppercase font-black tracking-widest mt-2">Events Attended</p>
                            </div>
                            <div className="p-6 bg-muted rounded-[2rem] border border-border text-center group/stat">
                                <p className="text-3xl font-black text-primary">3</p>
                                <p className="text-[10px] text-foreground/30 uppercase font-black tracking-widest mt-2">Total Badges</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
