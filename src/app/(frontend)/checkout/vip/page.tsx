"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    CreditCard,
    Wallet,
    Landmark,
    CheckCircle2,
    Info,
    Calendar,
    Lock,
    User
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";
import { PaymentSelector } from "@/app/(frontend)/_components/ui/PaymentSelector";


export default function VipPaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState("card");
    const [cardName, setCardName] = useState("ALEX VANDERBILT");
    const [saveCard, setSaveCard] = useState(true);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-inter selection:bg-neon-pink selection:text-white">
            <NeonNavbar />

            <main className="max-w-7xl mx-auto px-6 py-20 md:py-32">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link
                        href="/vip-access"
                        className="flex items-center gap-2 text-neon-pink font-bold text-sm hover:gap-3 transition-all mb-8 group"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        KEMBALI
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Checkout Form */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-tight">
                                NEONIX VIP ACCESS CHECKOUT
                            </h1>
                            <p className="text-neon-pink font-bold text-lg mb-16 tracking-wide">
                                Complete your high-fidelity experience at NEONIX.
                            </p>
                        </motion.div>

                        {/* Payment Method Selection */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-6 h-6 bg-neon-pink rounded flex items-center justify-center">
                                    <div className="w-3 h-3 border-2 border-white rounded-sm" />
                                </div>
                                <h2 className="text-lg font-black uppercase tracking-widest text-white/90">
                                    Pilih Metode Pembayaran
                                </h2>
                            </div>

                            <PaymentSelector
                                selectedMethod={selectedMethod}
                                onSelect={setSelectedMethod}
                            />
                        </div>

                        {/* Card Form */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-8"
                        >
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                                    CARDHOLDER NAME
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-pink transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        className="w-full bg-[#111] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-neon-pink/50 focus:bg-neon-pink/5 transition-all"
                                        placeholder="Enter name on card"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                                    CARD NUMBER
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-pink transition-colors">
                                        <CreditCard size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className="w-full bg-[#111] border border-white/5 rounded-2xl py-5 pl-14 pr-16 text-sm font-bold tracking-[0.3em] focus:outline-none focus:border-neon-pink/50 focus:bg-neon-pink/5 transition-all font-mono"
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20">
                                        <CreditCard size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                                        EXPIRY DATE
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-pink transition-colors">
                                            <Calendar size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            className="w-full bg-[#111] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold tracking-widest focus:outline-none focus:border-neon-pink/50 focus:bg-neon-pink/5 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                                        CVV
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-pink transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="***"
                                            className="w-full bg-[#111] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold tracking-[0.4em] focus:outline-none focus:border-neon-pink/50 focus:bg-neon-pink/5 transition-all"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20">
                                            <Info size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSaveCard(!saveCard)}
                                className="flex items-center gap-3 group cursor-pointer"
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded flex items-center justify-center transition-colors",
                                    saveCard ? "bg-neon-pink" : "border border-white/20"
                                )}>
                                    {saveCard && <CheckCircle2 size={14} className="text-white" />}
                                </div>
                                <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                                    Save card for future purchases
                                </span>
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-32"
                        >
                            <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden">
                                {/* Decor Background */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-pink/5 blur-3xl -z-10" />

                                <h2 className="text-2xl font-black mb-1 text-white">Order Summary</h2>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-12">
                                    Transaction ID: #NX-8892
                                </p>

                                <div className="space-y-6 mb-12">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-white/60">Standard VIP Fee</span>
                                        <span className="text-sm font-black">$280.00</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-white/60">Service Fee</span>
                                        <span className="text-sm font-black">$30.00</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-white/60">Early Bird Tax</span>
                                        <span className="text-sm font-black">$20.00</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-8 mb-12">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] font-black text-neon-pink uppercase tracking-widest mb-1">TOTAL AMOUNT</p>
                                            <p className="text-white/20 text-[10px] font-bold">Inc. all applicable taxes</p>
                                        </div>
                                        <span className="text-4xl font-black tracking-tighter">$330.00</span>
                                    </div>
                                </div>

                                <button className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_20px_40px_rgba(255,0,255,0.2)] hover:shadow-[0_20px_50px_rgba(255,0,255,0.4)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group mb-6">
                                    SECURE MY VIP ACCESS - $330
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        🚀
                                    </motion.span>
                                </button>

                                <p className="text-[8px] font-bold text-center text-white/30 uppercase tracking-widest leading-relaxed px-4">
                                    By completing this purchase, you agree to the <span className="text-white/60 hover:text-neon-pink transition-colors cursor-pointer">Terms of Service</span> and our <span className="text-white/60 hover:text-neon-pink transition-colors cursor-pointer">Refund Policy</span>.
                                </p>
                            </div>

                            {/* Ticket Preview Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-6 bg-gradient-to-r from-[#111] to-[#1a1a1a] border border-white/5 rounded-3xl p-6 flex items-center gap-6 group hover:border-neon-pink/20 transition-all cursor-default"
                            >
                                <div className="w-16 h-16 bg-neon-pink/10 rounded-2xl flex flex-col items-center justify-center border border-neon-pink/20 group-hover:bg-neon-pink group-hover:text-white transition-all duration-500">
                                    <span className="text-[8px] font-black uppercase">NEONIX</span>
                                    <span className="text-lg font-black leading-none">2024</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse" />
                                        <span className="text-[8px] font-black text-neon-pink uppercase tracking-widest">Active Booking</span>
                                    </div>
                                    <h4 className="text-sm font-black uppercase mb-0.5">NEONIX FESTIVAL 2024</h4>
                                    <p className="text-[10px] font-bold text-white/40">August 12-14 • Tokyo Bay</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-medium text-white/30 uppercase tracking-[0.2em]">
                        © 2024 NEONIX FESTIVAL GROUP. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8">
                        {["Privacy", "Terms", "Support"].map((link) => (
                            <button key={link} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-neon-pink transition-colors">
                                {link}
                            </button>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
