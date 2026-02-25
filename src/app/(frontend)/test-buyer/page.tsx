"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users, Ticket, ArrowRight, CheckCircle2, Loader2,
    UserPlus, LogIn, ShoppingCart, Info, Copy, Check
} from "lucide-react";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { PlasmaBackground } from "@/app/(frontend)/_components/ui/PlasmaBackground";
import Link from "next/link";
import * as authService from "@/services/authService";
import { useRouter } from "next/navigation";

// ── Dummy buyer accounts to create ────────────────────────────────────────────
const DUMMY_BUYERS = [
    {
        name: "Budi Santoso",
        email: "budi.buyer@mail.com",
        password: "buyer123",
        label: "Buyer Demo 1",
        color: "from-neon-pink to-purple-500",
    },
    {
        name: "Siti Rahayu",
        email: "siti.buyer@mail.com",
        password: "buyer123",
        label: "Buyer Demo 2",
        color: "from-neon-cyan to-blue-500",
    },
    {
        name: "Agus Pujiono",
        email: "agus.buyer@mail.com",
        password: "buyer123",
        label: "Buyer Demo 3",
        color: "from-neon-yellow to-orange-400",
    },
];

type Status = "idle" | "loading" | "success" | "error" | "exists";

export default function TestBuyerPage() {
    const router = useRouter();
    const [statuses, setStatuses] = useState<Record<string, Status>>({});
    const [messages, setMessages] = useState<Record<string, string>>({});
    const [loginLoading, setLoginLoading] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const u = localStorage.getItem("user");
        if (u) setCurrentUser(JSON.parse(u));
    }, []);

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 1500);
    };

    const registerBuyer = async (buyer: typeof DUMMY_BUYERS[0]) => {
        setStatuses(prev => ({ ...prev, [buyer.email]: "loading" }));
        try {
            await authService.register({
                name: buyer.name,
                email: buyer.email,
                password: buyer.password,
            });
            setStatuses(prev => ({ ...prev, [buyer.email]: "success" }));
            setMessages(prev => ({ ...prev, [buyer.email]: "Berhasil didaftarkan!" }));
        } catch (err: any) {
            const msg = err.message || "";
            if (msg.toLowerCase().includes("exist") || msg.toLowerCase().includes("duplicate") || msg.includes("409")) {
                setStatuses(prev => ({ ...prev, [buyer.email]: "exists" }));
                setMessages(prev => ({ ...prev, [buyer.email]: "Akun sudah ada — langsung login saja" }));
            } else {
                setStatuses(prev => ({ ...prev, [buyer.email]: "error" }));
                setMessages(prev => ({ ...prev, [buyer.email]: msg || "Gagal mendaftar" }));
            }
        }
    };

    const loginAsBuyer = async (buyer: typeof DUMMY_BUYERS[0]) => {
        setLoginLoading(buyer.email);
        try {
            const res = await authService.login(buyer.email, buyer.password);
            const { token, user } = res.data;
            if (token) localStorage.setItem("token", token);
            if (user) localStorage.setItem("user", JSON.stringify(user));
            setCurrentUser(user);
            setLoginLoading(null);
            // Setelah login, pergi ke homepage untuk cari event
            router.push("/");
        } catch (err: any) {
            alert("Login gagal: " + (err.message || "Cek email/password"));
            setLoginLoading(null);
        }
    };

    const registerAll = async () => {
        for (const buyer of DUMMY_BUYERS) {
            await registerBuyer(buyer);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-inter relative">
            <PlasmaBackground />
            <NeonNavbar />

            <main className="relative z-10 pt-32 pb-20 px-4 max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full px-4 py-2 text-neon-cyan text-xs font-black uppercase tracking-widest mb-6">
                        <Info size={12} />
                        Halaman Khusus Testing
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                        Dummy <span className="text-neon-pink">Buyer</span>
                    </h1>
                    <p className="text-white/40 mt-4 text-lg font-medium max-w-xl mx-auto">
                        Buat dan login sebagai user buyer untuk test alur checkout tiket dari setiap tenant.
                    </p>
                </motion.div>

                {/* Current user status */}
                {currentUser && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 bg-neon-cyan/10 border border-neon-cyan/20 rounded-3xl p-5 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <CheckCircle2 className="text-neon-cyan" size={24} />
                            <div>
                                <p className="font-black text-neon-cyan text-sm">Sedang login sebagai:</p>
                                <p className="font-bold text-white">{currentUser.name} — {currentUser.email}</p>
                            </div>
                        </div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 bg-neon-cyan text-black font-black px-5 py-2.5 rounded-xl text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                        >
                            <ShoppingCart size={14} />
                            Cari Event
                        </Link>
                    </motion.div>
                )}

                {/* Instructions */}
                <div className="grid md:grid-cols-3 gap-4 mb-10">
                    {[
                        { step: "01", icon: UserPlus, title: "Register", desc: "Klik tombol Register di tiap card. Jika sudah ada, skip ke login.", color: "text-neon-pink" },
                        { step: "02", icon: LogIn, title: "Login", desc: "Login dengan akun buyer. Otomatis diarahkan ke homepage.", color: "text-neon-cyan" },
                        { step: "03", icon: ShoppingCart, title: "Checkout", desc: "Pilih event → klik Reservasi Tiket → isi form & beli.", color: "text-neon-yellow" },
                    ].map(item => (
                        <div key={item.step} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-[10px] font-black text-white/20 font-mono">{item.step}</span>
                                <item.icon size={18} className={item.color} />
                                <span className="font-black text-sm uppercase tracking-wider">{item.title}</span>
                            </div>
                            <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bulk register button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={registerAll}
                        className="flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/15 text-white font-black px-6 py-3 rounded-2xl text-sm uppercase tracking-widest transition-all"
                    >
                        <Users size={16} />
                        Daftarkan Semua Sekaligus
                    </button>
                </div>

                {/* Buyer cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {DUMMY_BUYERS.map((buyer, i) => {
                        const status = statuses[buyer.email] ?? "idle";
                        const msg = messages[buyer.email];
                        const isLoggingIn = loginLoading === buyer.email;

                        return (
                            <motion.div
                                key={buyer.email}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all"
                            >
                                {/* Top gradient bar */}
                                <div className={`h-1 bg-gradient-to-r ${buyer.color}`} />

                                <div className="p-6 space-y-4">
                                    {/* Avatar + label */}
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${buyer.color} p-0.5`}>
                                            <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${buyer.name}`}
                                                    alt={buyer.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">{buyer.label}</p>
                                            <h3 className="font-black text-base">{buyer.name}</h3>
                                        </div>
                                    </div>

                                    {/* Credentials */}
                                    <div className="space-y-2 bg-black/30 rounded-2xl p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Email</span>
                                            <button
                                                onClick={() => copyToClipboard(buyer.email, buyer.email + "_email")}
                                                className="text-white/30 hover:text-white transition-colors"
                                            >
                                                {copied === buyer.email + "_email" ? <Check size={12} className="text-neon-cyan" /> : <Copy size={12} />}
                                            </button>
                                        </div>
                                        <p className="text-xs font-mono text-white/60 break-all">{buyer.email}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Password</span>
                                            <button
                                                onClick={() => copyToClipboard(buyer.password, buyer.email + "_pw")}
                                                className="text-white/30 hover:text-white transition-colors"
                                            >
                                                {copied === buyer.email + "_pw" ? <Check size={12} className="text-neon-cyan" /> : <Copy size={12} />}
                                            </button>
                                        </div>
                                        <p className="text-xs font-mono text-white/60">{buyer.password}</p>
                                    </div>

                                    {/* Status message */}
                                    {msg && (
                                        <p className={`text-[11px] font-bold ${
                                            status === "success" ? "text-neon-cyan" :
                                            status === "exists" ? "text-neon-yellow" :
                                            status === "error" ? "text-red-400" : "text-white/40"
                                        }`}>
                                            {msg}
                                        </p>
                                    )}

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-2">
                                        {/* Register */}
                                        <button
                                            onClick={() => registerBuyer(buyer)}
                                            disabled={status === "loading" || status === "success"}
                                            className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-black px-3 py-2.5 rounded-xl text-[10px] uppercase tracking-widest transition-all disabled:opacity-40"
                                        >
                                            {status === "loading" ? (
                                                <Loader2 size={12} className="animate-spin" />
                                            ) : status === "success" || status === "exists" ? (
                                                <CheckCircle2 size={12} className="text-neon-cyan" />
                                            ) : (
                                                <UserPlus size={12} />
                                            )}
                                            {status === "success" ? "Terdaftar" : status === "exists" ? "Sudah Ada" : "Register"}
                                        </button>

                                        {/* Login */}
                                        <button
                                            onClick={() => loginAsBuyer(buyer)}
                                            disabled={isLoggingIn}
                                            className="flex items-center justify-center gap-1.5 bg-neon-pink/10 hover:bg-neon-pink/20 border border-neon-pink/20 text-neon-pink font-black px-3 py-2.5 rounded-xl text-[10px] uppercase tracking-widest transition-all disabled:opacity-40"
                                        >
                                            {isLoggingIn ? (
                                                <Loader2 size={12} className="animate-spin" />
                                            ) : (
                                                <LogIn size={12} />
                                            )}
                                            {isLoggingIn ? "Masuk..." : "Login"}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Tip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 bg-neon-yellow/5 border border-neon-yellow/20 rounded-3xl p-6 flex items-start gap-4"
                >
                    <Ticket className="text-neon-yellow mt-0.5 shrink-0" size={20} />
                    <div>
                        <p className="font-black text-neon-yellow text-sm uppercase tracking-widest mb-1">Tips Checkout</p>
                        <p className="text-white/40 text-xs leading-relaxed">
                            Setelah login sebagai buyer, buka homepage → klik event → klik &quot;Reservasi Tiket&quot;.
                            Tiket otomatis diambil dari public endpoint berdasarkan eventId.
                            Buyer tidak perlu punya tenantId — sistem akan fetch tiket sesuai event yang dipilih.
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
