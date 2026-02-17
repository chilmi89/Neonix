"use client";

import { motion } from "framer-motion";
import { Check, X, Shield, BarChart3, Users, Zap, Terminal } from "lucide-react";
import { NeonNavbar } from "../_components/layout/NeonNavbar";
import { NeonFooter } from "../_components/layout/NeonFooter";

export default function VipAccessPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-inter">
            <NeonNavbar />

            <main className="w-full">
                {/* Hero Section */}
                <section className="min-h-screen flex flex-col justify-center items-center text-center px-8 md:px-12 lg:px-16 pt-32 pb-20 overflow-hidden relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[120px] -z-10" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-neon-pink/10 border border-neon-pink/20 text-[10px] font-black uppercase tracking-[0.2em] text-neon-pink mb-10"
                    >
                        EXCLUSIVE FOR CREATORS
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-[0.9] uppercase"
                    >
                        UNLOCK THE<br />
                        <span className="text-neon-pink drop-shadow-[0_0_30px_rgba(255,0,255,0.4)]">VIP EXPERIENCE</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed"
                    >
                        Take control of your events with advanced seller tools, real-time analytics, and premium tier management.
                    </motion.p>
                </section>

                {/* Pricing Section */}
                <section className="py-20 px-8 md:px-12 lg:px-16 flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                        {/* Standard Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-muted border border-glass-border rounded-[2.5rem] p-12 flex flex-col"
                        >
                            <div className="space-y-4 mb-12">
                                <h3 className="text-2xl font-bold">Standard</h3>
                                <div className="flex items-end gap-1">
                                    <span className="text-5xl font-black tracking-tighter">Free</span>
                                    <span className="text-muted-foreground font-bold text-sm pb-1">/ forever</span>
                                </div>
                            </div>

                            <ul className="space-y-6 flex-1 mb-12">
                                <li className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                    <div className="w-5 h-5 rounded-full bg-background/50 flex items-center justify-center text-muted-foreground">
                                        <Check size={12} />
                                    </div>
                                    Basic Event Creation
                                </li>
                                <li className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                    <div className="w-5 h-5 rounded-full bg-background/50 flex items-center justify-center text-muted-foreground">
                                        <Check size={12} />
                                    </div>
                                    Standard Support
                                </li>
                                <li className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                    <div className="w-5 h-5 rounded-full bg-background/50 flex items-center justify-center text-muted-foreground">
                                        <Check size={12} />
                                    </div>
                                    5% Platform Fee
                                </li>
                                <li className="flex items-center gap-4 text-xs font-bold text-muted-foreground/30 uppercase tracking-wider">
                                    <div className="w-5 h-5 rounded-full bg-background/50 flex items-center justify-center text-muted-foreground/30">
                                        <X size={12} />
                                    </div>
                                    No Seat Mapping
                                </li>
                            </ul>

                            <button className="w-full bg-white/5 text-white/40 border border-white/5 py-5 rounded-xl font-black text-[10px] uppercase tracking-widest cursor-default">
                                CURRENT PLAN
                            </button>
                        </motion.div>

                        {/* VIP Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#100812] border border-neon-pink/20 rounded-[2.5rem] p-12 flex flex-col relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-neon-pink/10 blur-[60px]" />

                            <div className="space-y-4 mb-12">
                                <h3 className="text-2xl font-bold text-neon-pink">VIP Access</h3>
                                <div className="flex items-end gap-1">
                                    <span className="text-5xl font-black tracking-tighter text-foreground">$49</span>
                                    <span className="text-muted-foreground font-bold text-sm pb-1">/ mo</span>
                                </div>
                            </div>

                            <div className="h-px bg-glass-border w-full mb-12" />

                            <ul className="space-y-6 flex-1 mb-12">
                                <li className="flex items-center gap-4 text-xs font-bold text-foreground uppercase tracking-wider">
                                    <div className="w-5 h-5 rounded-full bg-neon-pink/20 flex items-center justify-center text-neon-pink">
                                        <Check size={12} />
                                    </div>
                                    Advanced Seller Dashboard
                                </li>
                                <li className="flex items-center gap-4 text-xs font-bold text-foreground uppercase tracking-wider">
                                    <div className="w-5 h-5 rounded-full bg-neon-pink/20 flex items-center justify-center text-neon-pink">
                                        <Check size={12} />
                                    </div>
                                    Interactive Seat Maps
                                </li>
                                <li className="flex items-center gap-4 text-xs font-bold text-foreground uppercase tracking-wider">
                                    <div className="w-5 h-5 rounded-full bg-neon-pink/20 flex items-center justify-center text-neon-pink">
                                        <Check size={12} />
                                    </div>
                                    Real-time Sales Analytics
                                </li>
                                <li className="flex items-center gap-4 text-xs font-bold text-foreground uppercase tracking-wider">
                                    <div className="w-5 h-5 rounded-full bg-neon-pink/20 flex items-center justify-center text-neon-pink">
                                        <Check size={12} />
                                    </div>
                                    Custom Pricing Tiers
                                </li>
                                <li className="flex items-center gap-4 text-xs font-bold text-foreground uppercase tracking-wider">
                                    <div className="w-5 h-5 rounded-full bg-neon-pink/20 flex items-center justify-center text-neon-pink">
                                        <Check size={12} />
                                    </div>
                                    Priority Support 24/7
                                </li>
                            </ul>

                            <button className="w-full bg-neon-yellow text-black py-5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                                UPGRADE TO VIP
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* Seller Tools Section */}
                <section className="py-40 px-8 md:px-12 lg:px-16 bg-muted overflow-hidden">
                    <div className="max-w-6xl mx-auto space-y-20">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase text-foreground">
                                POWERFUL SELLER <span className="text-neon-pink">TOOLS</span>
                            </h2>
                            <p className="text-muted-foreground max-w-lg text-sm leading-relaxed font-medium">
                                Everything you need to manage sold-out events from a single command center.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Feature Sidebar */}
                            <div className="lg:col-span-4 space-y-4">
                                {[
                                    { icon: BarChart3, title: "Analytics", desc: "Track sales in real-time" },
                                    { icon: Zap, title: "Create Event", desc: "Launch new ticket sales" },
                                    { icon: Shield, title: "Pricing Tiers", desc: "Manage VIP vs Standard" },
                                    { icon: Users, title: "Seat Map", desc: "Interactive venue layout" }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "p-6 rounded-2xl border transition-all cursor-pointer group",
                                            i === 0 ? "bg-neon-pink/5 border-neon-pink/30" : "bg-background border-glass-border hover:border-neon-pink/20"
                                        )}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={cn(
                                                "p-3 rounded-xl transition-colors",
                                                i === 0 ? "bg-neon-pink text-white" : "bg-white/5 text-white/40 group-hover:text-white"
                                            )}>
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">{item.title}</h4>
                                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Dashboard Preview */}
                            <div className="lg:col-span-8 bg-background border border-glass-border rounded-[2.5rem] p-10 relative group">
                                <div className="grid grid-cols-3 gap-8 mb-12">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Revenue</span>
                                        <div className="text-3xl font-black tracking-tighter text-neon-yellow dark:text-neon-yellow light:text-neon-pink">$124,500</div>
                                        <div className="text-[10px] text-neon-yellow/50 font-bold">+12.5% vs last week</div>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Tickets Sold</span>
                                        <div className="text-3xl font-black tracking-tighter text-foreground">1,240</div>
                                        <div className="text-[10px] text-muted-foreground font-bold">85% Capacity</div>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Avg. Price</span>
                                        <div className="text-3xl font-black tracking-tighter text-neon-pink">$98.50</div>
                                        <div className="text-[10px] text-neon-pink/50 font-bold">VIP Tier leading</div>
                                    </div>
                                </div>
                                <div className="h-64 bg-muted/50 rounded-2xl border border-glass-border flex items-center justify-center mb-0">
                                    <div className="flex items-end gap-1 px-10 w-full h-full pb-10">
                                        {[40, 60, 45, 75, 55, 90, 65, 80, 50, 95].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${h}%` }}
                                                className="flex-1 bg-gradient-to-t from-neon-pink/20 to-neon-pink rounded-t-lg"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <NeonFooter />
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
