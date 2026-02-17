"use client";

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
    {
        question: "How do I get VIP Access?",
        answer: "VIP Access can be purchased directly through our dashboard using crypto or fiat. Once subscribed, you get instant access to premium signals, tools, and our private Discord community."
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit cards, as well as popular cryptocurrencies like Bitcoin, Ethereum, and USDC."
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we use industry-standard encryption and security protocols to ensure your data and assets are always protected."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Absolutely. You can manage your subscription from your account settings and cancel whenever you wish."
    }
];

export default function AboutPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
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
                            </motion.div>
                        ))}
                    </div>

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
                            Trusted by thousands of traders worldwide
                        </p>
                    </div>
                </section>

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
                                    Have questions or need support? Our team is here to help you navigate the future of finance.
                                </p>
                            </div>

                            <div className="space-y-8">
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
                                </div>
                            </div>
                        </div>

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
