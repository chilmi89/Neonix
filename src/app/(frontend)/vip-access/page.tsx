"use client";

import { useEffect, useState } from "react";
import {
    Check,
    X,
    BarChart3,
    PlusCircle,
    Settings2,
    Map as MapIcon,
    ArrowUpRight,
    TrendingUp,
    Users,
    DollarSign,
    Zap,
    Shield,
    Loader2,
    CheckCircle2,
    Activity,
    CreditCard,
    Clock,
    Calendar
} from "lucide-react";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";
import { MobileMockupWidget } from "@/app/(frontend)/_components/ui/MobileMockupWidget";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getActiveSubscriptionPlans } from "@/services/subscriptionPlanService";
import { subscribeToPlan, getPublicSubscriptionCount, getAllUserSubscriptions } from "@/services/userSubscriptionService";
import { SubscriptionPlan } from "@/types/auth";
import { useUser } from "@/context/UserContext";

// Fallback plans if none in DB
const DEFAULT_PLANS = [
    {
        id: -1,
        name: "Standard",
        price: 0,
        durationDays: 0,
        description: "Basic Event Creation, Standard Support, 5% Platform Fee",
        isActive: true
    }
];

const SELLER_TOOLS = [
    { id: "analytics", name: "Analytics", desc: "Track sales in real-time", icon: BarChart3 },
    { id: "create", name: "Create Event", desc: "Launch new ticket sales", icon: PlusCircle },
    { id: "pricing", name: "Pricing Tiers", desc: "Manage VIP vs Standard", icon: Settings2 },
    { id: "seatmap", name: "Seat Map", desc: "Interactive venue layout", icon: MapIcon },
];

export default function VipAccessPage() {
    const { user } = useUser();
    const [activeTool, setActiveTool] = useState("analytics");
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [totalSubs, setTotalSubs] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [plansRes, countRes] = await Promise.all([
                    getActiveSubscriptionPlans(),
                    getPublicSubscriptionCount()
                ]);

                if (plansRes.data && plansRes.data.length > 0) {
                    setPlans(plansRes.data);
                } else {
                    setPlans(DEFAULT_PLANS as any);
                }

                setTotalSubs(countRes.data || 0);
            } catch (err) {
                console.error("Failed to load VIP data:", err);
                setPlans(DEFAULT_PLANS as any);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleUpgrade = async (plan: SubscriptionPlan) => {
        if (plan.price === 0) return;

        setSubmitting(true);
        try {
            // Using the actual user ID from context
            const userId = user?.id || 1; // Fallback to 1 if session lost
            await subscribeToPlan(userId, plan.id);
            setShowSuccess(true);
            const subsRes = await getAllUserSubscriptions();
            setTotalSubs(subsRes.data?.length || 0);
        } catch (err: any) {
            alert(err.message || "Gagal melakukan upgrade.");
        } finally {
            setSubmitting(false);
        }
    };

    const parseFeatures = (desc: string) => {
        if (!desc) return [];
        // Split by newline, comma, semicolon, or " / " (slash with spaces)
        return desc.split(/\n|,|;| \/ /).map(f => f.trim()).filter(f => f.length > 0).map(f => ({ text: f, included: true }));
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-inter">
            <NeonNavbar />

            <main className="w-full">
                {/* VIP Hero */}
                <section className="min-h-screen flex flex-col justify-center items-center text-center px-8 md:px-12 lg:px-16 overflow-hidden relative">
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
                        JOIN AS<br />
                        <span className="text-neon-pink drop-shadow-[0_0_30px_rgba(255,0,255,0.4)]">EVENT ORGANIZER</span>
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
                <section className="max-w-5xl mx-auto px-6 mb-40 pt-24 pb-16">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="animate-spin text-neon-pink mb-4" size={40} />
                            <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Loading Pricing Plans...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {plans.map((plan, idx) => {
                                const isVip = plan.price > 0;
                                const features = parseFeatures(plan.description);

                                return (
                                    <motion.div
                                        key={plan.id}
                                        initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className={cn(
                                            "relative rounded-[2.5rem] p-10 md:p-12 transition-all duration-500",
                                            isVip
                                                ? "bg-[#121212] border-2 border-neon-pink/40 shadow-[0_0_50px_rgba(255,0,255,0.1)] scale-105 z-10"
                                                : "bg-muted border border-glass-border opacity-60"
                                        )}
                                    >
                                        {isVip && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-pink text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(255,0,255,0.5)] z-20">
                                                Active Tier
                                            </div>
                                        )}

                                        <div className="mb-10">
                                            <h3 className={cn("text-xl font-black mb-4", isVip ? "text-neon-pink" : "text-foreground")}>{plan.name}</h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className={cn("text-5xl font-black tracking-tighter", isVip ? "text-neon-yellow" : "text-foreground")}>
                                                    {plan.price === 0 ? "Free" : `$${plan.price}`}
                                                </span>
                                                <span className={cn("text-sm font-bold", isVip ? "text-white/30" : "text-muted-foreground/60")}>
                                                    {plan.durationDays > 0 ? `/ ${plan.durationDays} days` : "/ forever"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-5 mb-12">
                                            {features.map((feature, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                                                        feature.included
                                                            ? (isVip ? "bg-neon-pink text-white" : "bg-primary/20 text-primary")
                                                            : (isVip ? "bg-white/5 text-transparent border border-white/10" : "bg-muted text-transparent border border-border")
                                                    )}>
                                                        {feature.included ? <Check size={12} strokeWidth={4} /> : <X size={12} />}
                                                    </div>
                                                    <span className={cn(
                                                        "text-xs font-bold",
                                                        feature.included
                                                            ? (isVip ? "text-white/80" : "text-foreground")
                                                            : (isVip ? "text-white/20" : "text-muted-foreground/30")
                                                    )}>
                                                        {feature.text}
                                                    </span>
                                                </div>
                                            ))}
                                            {features.length === 0 && (
                                                <div className={cn("text-[10px] italic", isVip ? "text-white/20" : "text-muted-foreground/40")}>Check dashboard for feature details</div>
                                            )}
                                        </div>

                                        {isVip ? (
                                            <button
                                                onClick={() => handleUpgrade(plan)}
                                                disabled={submitting}
                                                className="w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all block text-center bg-neon-yellow text-black shadow-[0_20px_40px_rgba(255,215,0,0.2)] hover:shadow-[0_20px_50px_rgba(255,215,0,0.4)] hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50"
                                            >
                                                {submitting ? "Processing..." : "Upgrade to VIP"}
                                            </button>
                                        ) : (
                                            <button className="w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all bg-foreground/5 text-foreground/20 cursor-default border border-border">
                                                Current Plan
                                            </button>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Seller Tools Preview */}
                <section className="max-w-7xl mx-auto px-6 mb-40">
                    <div className="mb-16">
                        <h2 className="text-4xl font-black tracking-tighter mb-4 text-foreground uppercase">Powerful Seller <span className="text-neon-pink">Tools</span></h2>
                        <p className="text-muted-foreground text-sm font-medium">Everything you need to manage sold-out events from a single command center.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="w-full lg:w-80 shrink-0 space-y-4">
                            {SELLER_TOOLS.map((tool) => (
                                <button
                                    key={tool.id}
                                    onClick={() => setActiveTool(tool.id)}
                                    className={cn(
                                        "w-full text-left p-6 rounded-[2rem] border transition-all duration-300 group",
                                        activeTool === tool.id
                                            ? "bg-neon-pink/5 border-neon-pink/20"
                                            : "bg-muted border-glass-border hover:border-neon-pink/20"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                                            activeTool === tool.id ? "bg-neon-pink text-white" : "bg-white/5 text-white/20"
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

                        <div className="flex-1 min-h-[600px] bg-muted border border-glass-border rounded-[3rem] p-10 md:p-12 relative overflow-hidden group">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Total Creators Subscribed</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-black text-neon-yellow">{totalSubs.toLocaleString()}</span>
                                        <span className="text-[10px] font-bold text-neon-yellow/60">Community growing 🚀</span>
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

                            <div className="relative aspect-[16/8] w-full rounded-[2rem] bg-background/40 border border-glass-border p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/5 to-transparent pointer-events-none" />
                                <div className="absolute inset-x-8 top-8 bottom-12 flex flex-col justify-between opacity-10">
                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full h-px bg-foreground" />)}
                                </div>
                                <div className="absolute inset-x-12 bottom-12 top-20 flex items-end justify-between gap-4">
                                    {[60, 40, 85, 50, 70, 90, 45, 65, 80, 55, 75, 95].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            className={cn(
                                                "flex-1 min-w-[4px] rounded-t-full relative group",
                                                i === 3 || i === 8 ? "bg-neon-pink shadow-[0_0_15px_rgba(255,0,255,0.4)]" : "bg-foreground/10"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <NeonFooter />
            <MobileMockupWidget />

            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-sm bg-[#121212] border border-neon-pink/20 rounded-[2.5rem] p-12 text-center shadow-[0_0_50px_rgba(255,0,255,0.15)]"
                        >
                            <div className="w-20 h-20 bg-neon-pink/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-neon-pink/20">
                                <CheckCircle2 className="text-neon-pink" size={40} />
                            </div>
                            <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Upgrade Success!</h2>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed mb-10">
                                Your VIP access has been activated. You can now access advanced tools from your dashboard.
                            </p>
                            <button onClick={() => setShowSuccess(false)} className="w-full py-5 bg-neon-pink text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-[0_10px_30px_rgba(255,0,255,0.3)]">
                                Get Started
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
