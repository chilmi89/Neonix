"use client";

import { motion } from "framer-motion";
import {
    ChevronLeft,
    Minus,
    Plus,
    CreditCard,
    Wallet,
    QrCode,
    CheckCircle2,
    ArrowRight,
    MapPin,
    Calendar,
    Ticket
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LiquidBackground } from "@/app/(frontend)/_components/ui/LiquidBackground";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";

export default function CheckoutPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [regularCount, setRegularCount] = useState(2);
    const [vipCount, setVipCount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("card");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login?redirect=/checkout/" + params.id);
        }
    }, [router, params.id]);

    const prices = {
        regular: 50000,
        vip: 120000,
        serviceFee: 5000,
        tax: 0.11
    };

    const subtotal = (regularCount * prices.regular) + (vipCount * prices.vip);
    const taxAmount = Math.round(subtotal * prices.tax);
    const total = subtotal + prices.serviceFee + taxAmount;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-neon-pink/30 overflow-x-hidden font-inter relative">
            <LiquidBackground />

            <main className="relative z-10 pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-wider">Back to Home</span>
                </Link>

                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
                    Ticket Checkout
                </h1>

                <div className="grid lg:grid-cols-[1fr_400px] gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Select Tickets */}
                        <section className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                                    <Ticket className="text-neon-cyan" size={20} />
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-tight">Select Tickets</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Regular Admission */}
                                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg">Regular Admission</h3>
                                        <p className="text-xs text-white/40">Standard entry access to the screening.</p>
                                        <p className="text-xl font-black text-neon-cyan mt-2">Rp {prices.regular.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-black/40 p-2 rounded-xl border border-white/10">
                                        <button
                                            onClick={() => setRegularCount(Math.max(0, regularCount - 1))}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="text-lg font-black w-8 text-center">{regularCount}</span>
                                        <button
                                            onClick={() => setRegularCount(regularCount + 1)}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors bg-white/5"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* VIP Experience */}
                                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg">VIP Experience</h3>
                                        <p className="text-xs text-white/40">Premium seating, free popcorn & drinks.</p>
                                        <p className="text-xl font-black text-neon-pink mt-2">Rp {prices.vip.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-black/40 p-2 rounded-xl border border-white/10">
                                        <button
                                            onClick={() => setVipCount(Math.max(0, vipCount - 1))}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="text-lg font-black w-8 text-center">{vipCount}</span>
                                        <button
                                            onClick={() => setVipCount(vipCount + 1)}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors bg-white/5"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Secure Payment */}
                        <section className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-neon-pink/20 flex items-center justify-center">
                                    <CheckCircle2 className="text-neon-pink" size={20} />
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-tight">Secure Payment</h2>
                            </div>

                            {/* Payment Tabs */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {[
                                    { id: 'card', icon: CreditCard, label: 'Card' },
                                    { id: 'crypto', icon: Wallet, label: 'Crypto' },
                                    { id: 'qr', icon: QrCode, label: 'QR Pay' }
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all ${paymentMethod === method.id
                                            ? 'bg-neon-pink/5 border-neon-pink text-white'
                                            : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
                                            }`}
                                    >
                                        <method.icon size={24} />
                                        <span className="text-xs font-bold uppercase tracking-widest">{method.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Payment Form */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-white/40">Cardholder Name</label>
                                    <input
                                        type="text"
                                        placeholder="Alex Morgan"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-neon-pink/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-white/40">Card Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="4242 4242 4242 4242"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-neon-pink/50 transition-colors"
                                        />
                                        <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-white/40">Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="12 / 25"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-neon-pink/50 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-white/40">CVC</label>
                                        <input
                                            type="text"
                                            placeholder="***"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-neon-pink/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <input
                                        type="text"
                                        placeholder="VIP_ACCESS_20"
                                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-sm font-bold"
                                    />
                                    <button className="bg-white/5 border border-white/10 px-8 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
                                        Apply Code
                                    </button>
                                </div>
                                <p className="text-[10px] font-bold text-neon-pink flex items-center gap-2">
                                    <CheckCircle2 size={12} />
                                    Discount applied successfully!
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="space-y-8">
                        <section className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden">
                            {/* Card Visual */}
                            <div className="relative h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80"
                                    alt="Event"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                <div className="absolute top-4 left-4 bg-neon-pink text-black px-3 py-1 rounded text-[10px] font-black uppercase">
                                    Horror
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter">SUKMA</h3>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar size={18} className="text-neon-cyan shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold">Saturday, Oct 25, 2025</p>
                                            <p className="text-[10px] text-white/40 uppercase font-black">19:30 WIB</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-neon-cyan shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold">CGV Grand Indonesia</p>
                                            <p className="text-[10px] text-white/40 uppercase font-black">Audi 4, Free Seating</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/5 space-y-4 text-sm">
                                    <div className="flex justify-between text-white/60">
                                        <span>Regular Admission (x{regularCount})</span>
                                        <span className="font-bold text-white">Rp {(regularCount * prices.regular).toLocaleString()}</span>
                                    </div>
                                    {vipCount > 0 && (
                                        <div className="flex justify-between text-white/60">
                                            <span>VIP Experience (x{vipCount})</span>
                                            <span className="font-bold text-white">Rp {(vipCount * prices.vip).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-white/60">
                                        <span>Service Fee</span>
                                        <span className="font-bold text-white">Rp {prices.serviceFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-white/60">
                                        <span>Tax (11%)</span>
                                        <span className="font-bold text-white">Rp {taxAmount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/5 flex items-end justify-between">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-1">Total Payment</p>
                                    <p className="text-4xl font-black text-neon-cyan">Rp {total.toLocaleString()}</p>
                                </div>

                                <button className="w-full bg-neon-cyan text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-neon-cyan/20 group uppercase tracking-widest">
                                    Proceed to Payment
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-[10px] text-white/40 text-center uppercase tracking-widest leading-relaxed">
                                    By proceeding, you agree to our <Link href="#" className="underline">Terms & Conditions</Link>.
                                </p>
                            </div>
                        </section>

                        {/* Confirmation QR */}
                        <section className="flex flex-col items-center gap-6 py-8">
                            <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Scan to confirm on mobile</p>
                            <div className="w-48 h-48 bg-white p-6 rounded-3xl shadow-2xl shadow-neon-cyan/10 flex items-center justify-center">
                                <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                                    <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h10v10H40zM50 10h10v10H50zM40 20h10v10H40zM0 40h10v10H0zM10 50h10v10H10zM20 40h10v10H20zM40 40h20v20H40zM45 45h10v10H45zM70 40h10v10H70zM90 40h10v10H90zM80 50h10v10H80zM40 70h10v10H40zM50 80h10v10H50zM40 90h10v10H40zM70 70h10v10H70zM90 70h10v10H90zM80 80h10v10H80zM70 90h10v10H70zM90 90h10v10H90z" fill="currentColor" />
                                </svg>
                            </div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-white/20">Expires in 14:59</p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
