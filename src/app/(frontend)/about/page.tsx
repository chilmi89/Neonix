"use client";

import { useState } from "react";
import { ChevronDown, Mail, MapPin, MessageSquare, Users, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const STATS = [
    { label: "Active Members", value: "50K+", icon: Users, color: "text-neon-yellow" },
    { label: "Volume Traded", value: "$20M+", icon: TrendingUp, color: "text-neon-yellow" },
    { label: "VIP Partners", value: "100+", icon: ShieldCheck, color: "text-neon-pink" },
];

const AVATARS = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
];

const FAQS = [
    {
        question: "How do I get VIP Access?",
        answer: "VIP Access can be purchased directly through our dashboard using crypto or fiat. Once subscribed, you get instant access to premium signals, tools, and our private Discord community."
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit cards, PayPal, and various cryptocurrencies including BTC, ETH, and USDT."
    },
    {
        question: "Is my data secure?",
        answer: "Security is our top priority. We use industry-standard encryption and security protocols to ensure your data and transactions are always protected."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time from your account settings. You will continue to have access until the end of your billing cycle."
    }
];

export default function AboutPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-background text-foreground font-inter">
            <NeonNavbar />

            <main className="w-full px-8 md:px-12 lg:px-16 pt-32 pb-20">
                {/* About Hero Section */}
                <section className="min-h-[60vh] flex flex-col justify-center items-center text-center max-w-5xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                            WE ARE BUILDING THE<br />
                            <span className="text-neon-pink drop-shadow-[0_0_30px_rgba(255,0,255,0.4)]">FUTURE OF DIGITAL ASSETS</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
                            Join the revolution. We provide the tools, community, and insights you need to dominate the market.
                        </p>
                        <button className="bg-neon-yellow text-black px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2 mx-auto">
                            JOIN COMMUNITY <ArrowRight size={16} />
                        </button>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mt-32">
                        {STATS.map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-muted border border-glass-border rounded-[2.5rem] p-12 group hover:border-white/10 transition-colors"
                            >
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-background/50", stat.color)}>
                                    <stat.icon size={24} />
                                </div>
                                <h2 className={cn("text-5xl font-black mb-3 tracking-tighter", stat.color)}>{stat.value}</h2>
                                <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/40">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Group */}
                    <div className="mt-16 flex flex-col items-center gap-4">
                        <div className="flex -space-x-4">
                            {AVATARS.map((avatar, i) => (
                                <img key={i} src={avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-background" />
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-black text-muted-foreground/60">
                                +4k
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground/20 uppercase tracking-widest leading-relaxed">
                            Trusted by thousands of traders worldwide
                        </p>
                    </div>
                </section>

                <div className="w-full h-px bg-white/5 mb-32" />

                {/* FAQ Section */}
                <section className="max-w-4xl mx-auto px-6 mb-40">
                    <div className="text-center mb-16 px-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">
                            FREQUENTLY ASKED <span className="text-neon-yellow">QUESTIONS</span>
                        </h2>
                        <p className="text-muted-foreground text-sm font-medium">Everything you need to know about our platform and services.</p>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "rounded-[1.5rem] border transition-all duration-300 overflow-hidden",
                                    openFaq === idx ? "bg-muted border-white/10" : "bg-transparent border-white/5 hover:border-white/10"
                                )}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                >
                                    <span className={cn(
                                        "text-xs md:text-sm font-black transition-colors uppercase tracking-wider",
                                        openFaq === idx ? "text-neon-yellow" : "text-foreground opacity-80 group-hover:opacity-100"
                                    )}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={cn(
                                            "transition-transform text-muted-foreground/20",
                                            openFaq === idx ? "rotate-180 text-neon-yellow" : ""
                                        )}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-8 pb-8"
                                        >
                                            <p className="text-xs leading-relaxed text-muted-foreground font-medium font-inter">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="w-full h-px bg-white/5 mb-32" />

                {/* Get In Touch Section */}
                <section className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Info Column */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-4xl font-black tracking-tighter text-neon-pink mb-6 uppercase">Get In Touch</h2>
                                <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm">
                                    Have questions or need support? Our team is here to help you navigate the future of finance.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all">
                                        <Mail size={20} />
                                    </div>
                                    <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors font-inter">support@neoverse.com</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all">
                                        <MapPin size={20} />
                                    </div>
                                    <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors font-inter">Crypto Valley, Switzerland</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all">
                                        <MessageSquare size={20} />
                                    </div>
                                    <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors font-inter">Live Chat Available 24/7</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="bg-muted border border-glass-border rounded-[3rem] p-10 md:p-14 relative group">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-background border border-glass-border rounded-xl p-4 text-foreground text-sm font-bold focus:ring-2 focus:ring-neon-pink transition-all outline-none"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-background border border-glass-border rounded-xl p-4 text-foreground text-sm font-bold focus:ring-2 focus:ring-neon-pink transition-all outline-none"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Message</label>
                                    <textarea
                                        className="w-full bg-background border border-glass-border rounded-xl p-4 text-foreground text-sm font-bold min-h-[160px] focus:ring-2 focus:ring-neon-pink transition-all outline-none resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <button className="w-full bg-neon-pink py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_15px_30px_rgba(255,0,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,0,255,0.4)] hover:-translate-y-1 active:scale-[0.98] transition-all">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <NeonFooter />
        </div>
    );
}
