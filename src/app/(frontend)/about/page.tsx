"use client";

<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Mail, MapPin, MessageSquare, ArrowRight, UserPlus, BarChart3, Award } from "lucide-react";
import { NeonNavbar } from "../_components/layout/NeonNavbar";
import { NeonFooter } from "../_components/layout/NeonFooter";

const stats = [
    { label: "Active Members", value: "50K+", icon: UserPlus },
    { label: "Volume Traded", value: "$20M+", icon: BarChart3 },
    { label: "VIP Partners", value: "100+", icon: Award }
];

const faqs = [
=======
=======
>>>>>>> Stashed changes
import { useState } from "react";
import { ChevronDown, Mail, MapPin, MessageSquare, Users, TrendingUp, ShieldCheck } from "lucide-react";
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    {
        question: "How do I get VIP Access?",
        answer: "VIP Access can be purchased directly through our dashboard using crypto or fiat. Once subscribed, you get instant access to premium signals, tools, and our private Discord community."
    },
    {
        question: "What payment methods are accepted?",
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        answer: "We accept all major credit cards, as well as popular cryptocurrencies like Bitcoin, Ethereum, and USDC."
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we use industry-standard encryption and security protocols to ensure your data and assets are always protected."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Absolutely. You can manage your subscription from your account settings and cancel whenever you wish."
=======
=======
>>>>>>> Stashed changes
        answer: "We accept all major credit cards, PayPal, and various cryptocurrencies including BTC, ETH, and USDT."
    },
    {
        question: "Is my data secure?",
        answer: "Security is our top priority. We use industry-standard encryption and security protocols to ensure your data and transactions are always protected."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time from your account settings. You will continue to have access until the end of your billing cycle."
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }
];

export default function AboutPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <div className="min-h-screen bg-background text-foreground font-inter">
            <NeonNavbar />

            <main className="w-full">
                {/* Hero Section */}
                <section className="min-h-screen flex flex-col justify-center items-center text-center px-8 md:px-12 lg:px-16 pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                            WE ARE BUILDING THE<br />
                            <span className="text-neon-pink drop-shadow-[0_0_30px_rgba(255,0,255,0.4)]">FUTURE OF DIGITAL ASSETS</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
                            Join the revolution. We provide the tools, community, and insights you need to dominate the market.
                        </p>
                        <button className="bg-cta text-cta-foreground px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 mx-auto">
                            JOIN COMMUNITY <ArrowRight size={16} />
                        </button>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mt-32">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="bg-muted border border-glass-border rounded-2xl p-10 flex flex-col items-center gap-4 group hover:border-neon-pink/50 transition-colors"
                            >
                                <div className="p-4 rounded-full bg-background/50 text-neon-yellow group-hover:text-neon-pink transition-colors">
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-4xl md:text-5xl font-black text-neon-yellow tracking-tighter">{stat.value}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
=======
=======
>>>>>>> Stashed changes
        <div className="min-h-screen bg-background text-foreground font-inter transition-colors duration-500">
            <NeonNavbar />

            <main className="w-full px-8 md:px-12 lg:px-16 pt-32 pb-20">
                {/* About Banner */}
                <section className="relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden mb-24 shadow-2xl group flex flex-col justify-center text-center px-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[1.1]"
                    >
                        WE ARE BUILDING THE<br />
                        <span className="text-neon-pink drop-shadow-[0_0_30px_rgba(255,0,255,0.4)] uppercase">Future of Digital Assets</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-medium mb-12"
                    >
                        Join the revolution. We provide the tools, community, and insights you need to dominate the market.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-neon-yellow text-black px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all flex items-center gap-2 mx-auto"
                    >
                        Join Community <ChevronDown size={16} className="-rotate-90" />
                    </motion.button>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
                        {STATS.map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-muted border border-white/5 rounded-[2.5rem] p-12 group hover:border-white/10 transition-colors"
                            >
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white/5", stat.color)}>
                                    <stat.icon size={24} />
                                </div>
                                <h2 className={cn("text-5xl font-black mb-3 tracking-tighter", stat.color)}>{stat.value}</h2>
                                <p className="text-[11px] font-black uppercase tracking-widest text-white/20">{stat.label}</p>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                            </motion.div>
                        ))}
                    </div>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
                    {/* Trusted by Section */}
                    <div className="mt-20 flex flex-col items-center gap-6">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-muted">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-2 border-black bg-[#111] flex items-center justify-center text-[10px] font-bold">
                                +4k
                            </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground/30 font-bold uppercase tracking-widest">
=======
=======
>>>>>>> Stashed changes
                    {/* Trust Group */}
                    <div className="mt-16 flex flex-col items-center gap-4">
                        <div className="flex -space-x-4">
                            {AVATARS.map((avatar, i) => (
                                <img key={i} src={avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-black" />
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-black bg-[#1A1A1A] flex items-center justify-center text-[10px] font-black text-white/60">
                                +4k
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-relaxed">
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                            Trusted by thousands of traders worldwide
                        </p>
                    </div>
                </section>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
                <section className="py-40 px-8 md:px-12 lg:px-16 bg-muted">
                    <div className="max-w-4xl mx-auto space-y-20">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase text-foreground">
                                FREQUENTLY ASKED <span className="text-neon-yellow">QUESTIONS</span>
                            </h2>
                            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
                                Everything you need to know about our platform and services.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className="bg-background border border-glass-border rounded-2xl overflow-hidden cursor-pointer"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <div className="p-8 flex items-center justify-between gap-8 hover:bg-muted/50 transition-colors">
                                        <h3 className={cn(
                                            "text-sm font-bold uppercase tracking-wider transition-colors",
                                            openFaq === i ? "text-neon-yellow" : "text-foreground"
                                        )}>
                                            {faq.question}
                                        </h3>
                                        <ChevronDown size={20} className={cn(
                                            "transition-transform duration-300",
                                            openFaq === i ? "rotate-180 text-neon-yellow" : "text-muted-foreground"
                                        )} />
                                    </div>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-8 text-sm text-muted-foreground leading-relaxed font-medium">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-40 px-8 md:px-12 lg:px-16">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neon-pink uppercase">
                                    GET IN TOUCH
                                </h2>
                                <p className="text-muted-foreground max-w-md text-sm leading-relaxed font-medium">
=======
=======
>>>>>>> Stashed changes
                <div className="w-full h-px bg-white/5 mb-32" />

                {/* FAQ Section */}
                <section className="max-w-4xl mx-auto px-6 mb-40">
                    <div className="text-center mb-16 px-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            FREQUENTLY ASKED <span className="text-neon-yellow">QUESTIONS</span>
                        </h2>
                        <p className="text-white/40 text-sm font-medium">Everything you need to know about our platform and services.</p>
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
                                        "text-xs md:text-sm font-black transition-colors",
                                        openFaq === idx ? "text-neon-yellow" : "text-white/80 group-hover:text-white"
                                    )}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={cn(
                                            "transition-transform text-white/20",
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
                                            <p className="text-xs leading-relaxed text-white/40 font-medium font-inter">
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
                                <p className="text-white/40 text-sm font-medium leading-relaxed max-w-sm">
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                                    Have questions or need support? Our team is here to help you navigate the future of finance.
                                </p>
                            </div>

                            <div className="space-y-8">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all">
                                        <Mail size={20} />
                                    </div>
                                    <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">support@neoverse.com</span>
                                </div>
                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all">
                                        <MapPin size={20} />
                                    </div>
                                    <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">Crypto Valley, Switzerland</span>
                                </div>
                                <div className="flex items-center gap-5 group">
                                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all">
                                        <MessageSquare size={20} />
                                    </div>
                                    <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">Live Chat Available 24/7</span>
=======
=======
>>>>>>> Stashed changes
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all">
                                        <Mail size={20} />
                                    </div>
                                    <span className="text-sm font-black text-white/80">support@neoverse.com</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all">
                                        <MapPin size={20} />
                                    </div>
                                    <span className="text-sm font-black text-white/80">Crypto Valley, Switzerland</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-neon-pink group-hover:bg-neon-pink group-hover:text-white transition-all">
                                        <MessageSquare size={20} />
                                    </div>
                                    <span className="text-sm font-black text-white/80">Live Chat Available 24/7</span>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                                </div>
                            </div>
                        </div>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
                        <div className="bg-muted border border-glass-border rounded-[2.5rem] p-8 md:p-12 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest pl-2">Full Name</label>
                                    <input type="text" className="w-full bg-background border border-glass-border rounded-xl px-6 py-4 text-sm text-foreground outline-none focus:border-neon-pink transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest pl-2">Email Address</label>
                                    <input type="email" className="w-full bg-background border border-glass-border rounded-xl px-6 py-4 text-sm text-foreground outline-none focus:border-neon-pink transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest pl-2">Message</label>
                                <textarea rows={6} className="w-full bg-background border border-glass-border rounded-xl px-6 py-4 text-sm text-foreground outline-none focus:border-neon-pink transition-colors resize-none"></textarea>
                            </div>
                            <button className="w-full bg-neon-pink text-white font-black text-xs py-5 rounded-xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(255,0,255,0.2)]">
                                SEND MESSAGE
                            </button>
=======
=======
>>>>>>> Stashed changes
                        {/* Form Column */}
                        <div className="bg-muted border border-white/5 rounded-[3rem] p-10 md:p-14 relative group">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white bg-opacity-100 border-none rounded-xl p-4 text-black text-sm font-bold focus:ring-2 focus:ring-neon-pink transition-all outline-none"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-white bg-opacity-100 border-none rounded-xl p-4 text-black text-sm font-bold focus:ring-2 focus:ring-neon-pink transition-all outline-none"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Message</label>
                                    <textarea
                                        className="w-full bg-white bg-opacity-100 border-none rounded-xl p-4 text-black text-sm font-bold min-h-[160px] focus:ring-2 focus:ring-neon-pink transition-all outline-none resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <button className="w-full bg-neon-pink py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_15px_30px_rgba(255,0,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,0,255,0.4)] hover:-translate-y-1 active:scale-[0.98] transition-all">
                                    Send Message
                                </button>
                            </div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                        </div>
                    </div>
                </section>
            </main>

            <NeonFooter />
        </div>
    );
}
<<<<<<< Updated upstream
<<<<<<< Updated upstream

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
