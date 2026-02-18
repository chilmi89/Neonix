"use client";

import { useState } from "react";
import { Check, X, BarChart3, PlusCircle, Settings2, Map as MapIcon, ArrowUpRight, TrendingUp, Users, DollarSign, Zap, Shield } from "lucide-react";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PRICING_PLANS = [
    {
        name: "Standard",
        price: "Free",
        duration: "/ forever",
        features: [
            { text: "Basic Event Creation", included: true },
            { text: "Standard Support", included: true },
            { text: "5% Platform Fee", included: true },
            { text: "No Seat Mapping", included: false },
        ],
        buttonText: "Current Plan",
        isVip: false
    },
    {
        name: "VIP Access",
        price: "$49",
        duration: "/ mo",
        features: [
            { text: "Advanced Seller Dashboard", included: true },
            { text: "Interactive Seat Maps", included: true },
            { text: "Real-time Sales Analytics", included: true },
            { text: "Custom Pricing Tiers", included: true },
            { text: "Priority Support 24/7", included: true },
        ],
        buttonText: "Upgrade to VIP",
        isVip: true
    }
];

const SELLER_TOOLS = [
    { id: "analytics", name: "Analytics", desc: "Track sales in real-time", icon: BarChart3 },
    { id: "create", name: "Create Event", desc: "Launch new ticket sales", icon: PlusCircle },
    { id: "pricing", name: "Pricing Tiers", desc: "Manage VIP vs Standard", icon: Settings2 },
    { id: "seatmap", name: "Seat Map", desc: "Interactive venue layout", icon: MapIcon },
];

export default function VipAccessPage() {
    const [activeTool, setActiveTool] = useState("analytics");

    return (
        <div className="min-h-screen bg-background text-foreground font-inter">
            <NeonNavbar />

            <main className="w-full">
                {/* VIP Hero - Full Screen */}
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

                {/* Pricing Cards */}
                <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
                    {PRICING_PLANS.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "relative rounded-[2.5rem] p-10 md:p-12 transition-all duration-500",
                                plan.isVip
                                    ? "bg-[#121212] border-2 border-neon-pink/40 shadow-[0_0_50px_rgba(255,0,255,0.1)] scale-105 z-10"
                                    : "bg-muted border border-glass-border opacity-60"
                            )}
                        >
                            {plan.isVip && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-pink text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(255,0,255,0.5)]">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-10">
                                <h3 className={cn("text-xl font-black mb-4", plan.isVip ? "text-neon-pink" : "text-white")}>{plan.name}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className={cn("text-5xl font-black tracking-tighter", plan.isVip ? "text-neon-yellow" : "text-white")}>
                                        {plan.price}
                                    </span>
                                    <span className="text-white/30 text-sm font-bold">{plan.duration}</span>
                                </div>
                            </div>

                            <div className="space-y-5 mb-12">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                                            feature.included
                                                ? (plan.isVip ? "bg-neon-pink text-white" : "bg-white/10 text-white/40")
                                                : "bg-white/5 text-transparent border border-white/10"
                                        )}>
                                            {feature.included ? <Check size={12} strokeWidth={4} /> : <X size={12} />}
                                        </div>
                                        <span className={cn("text-xs font-bold", feature.included ? "text-white/80" : "text-white/20")}>
                                            {feature.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button className={cn(
                                "w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                                plan.isVip
                                    ? "bg-neon-yellow text-black shadow-[0_20px_40px_rgba(255,215,0,0.2)] hover:shadow-[0_20px_50px_rgba(255,215,0,0.4)] hover:-translate-y-1 active:scale-[0.98]"
                                    : "bg-white/5 text-white/20 cursor-default"
                            )}>
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </section>

                {/* Dashboard Preview Section */}
                <section className="max-w-7xl mx-auto px-6 mb-40">
                    <div className="mb-16">
                        <h2 className="text-4xl font-black tracking-tighter mb-4 text-foreground uppercase">Powerful Seller <span className="text-neon-pink">Tools</span></h2>
                        <p className="text-muted-foreground text-sm font-medium">Everything you need to manage sold-out events from a single command center.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Tabs */}
                        <div className="w-full lg:w-80 shrink-0 space-y-4">
                            {SELLER_TOOLS.map((tool) => (
                                <button
                                    key={tool.id}
                                    onClick={() => setActiveTool(tool.id)}
                                    className={cn(
                                        "w-full text-left p-6 rounded-[2rem] border transition-all duration-300 group",
                                        activeTool === tool.id
                                            ? "bg-neon-pink/5 border-neon-pink/20 shadow-[0_0_30px_rgba(255,0,255,0.05)]"
                                            : "bg-muted border-glass-border hover:border-neon-pink/20"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                                            activeTool === tool.id ? "bg-neon-pink text-white" : "bg-white/5 text-white/20 group-hover:text-white/40"
                                        )}>
                                            <tool.icon size={22} />
                                        </div>
                                        <div>
                                            <h4 className={cn("text-sm font-black transition-colors uppercase tracking-wider", activeTool === tool.id ? "text-foreground" : "text-muted-foreground")}>
                                                {tool.name}
                                            </h4>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">{tool.desc}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 min-h-[600px] bg-muted border border-glass-border rounded-[3rem] p-10 md:p-12 relative overflow-hidden group">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Total Revenue</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-black text-neon-yellow">$124,500</span>
                                        <span className="text-[10px] font-bold text-neon-yellow/60">+12.5% vs last week</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Tickets Sold</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-black text-foreground">1,240</span>
                                        <span className="text-[10px] font-bold text-muted-foreground/40">85% Capacity</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Avg. Price</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-black text-foreground">$98.50</span>
                                        <span className="text-[10px] font-bold text-neon-yellow/60 font-inter">VIP Tier leading</span>
                                    </div>
                                </div>
                            </div>

                            {/* Simulated Chart Area */}
                            <div className="relative aspect-[16/8] w-full rounded-[2rem] bg-background/40 border border-glass-border p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/5 to-transparent pointer-events-none" />

                                {/* Simulated Grid Lines */}
                                <div className="absolute inset-x-8 top-8 bottom-12 flex flex-col justify-between opacity-10">
                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full h-px bg-foreground" />)}
                                </div>

                                {/* Simulated Bar Chart */}
                                <div className="absolute inset-x-12 bottom-12 top-20 flex items-end justify-between gap-4">
                                    {[60, 40, 85, 50, 70, 90, 45, 65, 80, 55, 75, 95].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.05, duration: 1 }}
                                            className={cn(
                                                "flex-1 min-w-[4px] rounded-t-full relative group",
                                                i === 3 || i === 8 ? "bg-neon-pink shadow-[0_0_15px_rgba(255,0,255,0.4)]" : "bg-foreground/10"
                                            )}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                <span className="text-[9px] font-black bg-background border border-glass-border px-2 py-1 rounded backdrop-blur-md">
                                                    {Math.floor(h * 1.5)} Sales
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Legend Labels */}
                                <div className="absolute bottom-4 inset-x-12 flex justify-between text-[8px] font-black uppercase text-muted-foreground/20 tracking-tighter">
                                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                </div>
                            </div>

                            {/* Decor elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-pink/5 blur-[120px] -z-10 group-hover:bg-neon-pink/10 transition-colors duration-1000" />
                        </div>
                    </div>
                </section>
            </main>

            <NeonFooter />
        </div>
    );
}
