"use client";

import { motion } from "framer-motion";
import { 
    LayoutDashboard, 
    Ticket, 
    ArrowRight, 
    Clock, 
    Wallet,
    Star,
    Download,
    Calendar,
    ArrowUpRight,
    ShoppingBag,
    Loader2,
    Search
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { getMemberTransactions, TransactionDTO } from "@/services/transactionService";

export default function MemberDashboard() {
    const { user } = useUser();
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await getMemberTransactions();
                if (response.status === "success") {
                    setTransactions(response.data || []);
                } else {
                    setError(response.message || "Gagal mengambil data tiket");
                }
            } catch (err: any) {
                setError(err.message || "Terjadi kesalahan saat menghubungi server");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const filteredTransactions = transactions.filter(t =>
        t.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.ticketName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Welcome Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-neon-pink/10 via-transparent to-neon-cyan/10 border border-white/5 rounded-[32px] p-8 md:p-12">
                <div className="relative z-10 space-y-4 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                        Halo, <span className="text-neon-pink">{user?.username || "Member"}</span>!
                    </h1>
                    <p className="text-white/40 text-lg font-medium leading-relaxed">
                        Selamat datang di grid kontrol pribadi Anda. Temukan event terbaru dan kelola tiket Anda dengan mudah.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link 
                            href="#tickets-section"
                            className="bg-white text-black font-black uppercase tracking-widest text-xs px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-neon-pink hover:text-white transition-all group"
                        >
                            Lihat Tiket Saya
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link 
                            href="/"
                            className="bg-white/5 text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                        >
                            Jelajahi Event
                        </Link>
                    </div>
                </div>
                
                {/* Visual Accent */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 blur-3xl pointer-events-none">
                    <div className="w-[300px] h-[300px] bg-neon-pink rounded-full" />
                </div>
            </div>

            {/* Ticket Section */}
            <div id="tickets-section" className="space-y-6 pt-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-neon-pink/10 border border-neon-pink/20">
                                <Ticket className="text-neon-pink" size={24} />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Tiket <span className="text-neon-pink">Saya</span></h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-pink transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Cari tiket..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-[#0A0A0A] border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm font-bold focus:outline-none focus:border-neon-pink/30 hover:border-white/10 transition-all w-full md:w-[250px] placeholder:text-white/10"
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-[#0A0A0A] border border-white/5 rounded-[32px]">
                        <Loader2 className="animate-spin text-neon-pink mb-4" size={40} />
                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Menyelaraskan Grid Tiket...</p>
                    </div>
                ) : filteredTransactions.length === 0 ? (
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-12 flex flex-col items-center text-center space-y-6">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/10">
                            <ShoppingBag size={32} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold">Belum ada tiket</h3>
                            <p className="text-white/30 text-xs max-w-[250px]">Jelajahi berbagai event seru dan amankan tiket Anda sekarang!</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredTransactions.map((t, idx) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-[#0A0A0A] hover:bg-[#0F0F0F] border border-white/5 hover:border-neon-pink/20 rounded-3xl p-6 transition-all duration-500"
                            >
                                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-neon-pink/10 text-neon-pink rounded-full border border-neon-pink/10">
                                                    {t.categoryName}
                                                </span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                                                    Order #{t.id}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-black group-hover:text-neon-pink transition-colors">{t.eventName}</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Jenis Tiket</p>
                                                <p className="text-sm font-bold flex items-center gap-2">
                                                    <Ticket className="text-white/20" size={14} />
                                                    {t.ticketName} <span className="text-neon-pink">×{t.quantity}</span>
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Waktu</p>
                                                <p className="text-sm font-bold flex items-center gap-2 text-white/60">
                                                    <Calendar className="text-white/20" size={14} />
                                                    {formatDate(t.purchasedAt)}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Total</p>
                                                <p className="text-lg font-black text-neon-cyan">{formatCurrency(t.totalPrice)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto">
                                        <button className="flex-1 lg:w-40 bg-white/5 hover:bg-neon-pink hover:text-white border border-white/5 hover:border-neon-pink/30 text-white p-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group/btn">
                                            <Download size={16} className="text-white/30 group-hover/btn:text-white" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">E-Ticket</span>
                                        </button>
                                        <button className="flex-1 lg:w-40 bg-white/5 hover:bg-white text-white hover:text-black border border-white/5 p-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group/btn">
                                            <ArrowUpRight size={16} className="text-white/30 group-hover/btn:text-black" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Detail</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Stats/Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 space-y-4 hover:border-neon-pink/30 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center text-neon-pink border border-neon-pink/10">
                        <Ticket size={24} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg">Tiket Aktif</h3>
                        <p className="text-white/30 text-xs font-medium uppercase tracking-widest">Akses tiket yang Anda beli</p>
                    </div>
                </div>

                <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 space-y-4 hover:border-neon-cyan/30 transition-all group text-white/50 grayscale-[0.5]">
                    <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan border border-neon-cyan/10">
                        <Clock size={24} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg">Riwayat Event</h3>
                        <p className="text-white/30 text-xs font-medium uppercase tracking-widest text-left">Event yang telah diikuti</p>
                    </div>
                </div>

                <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 space-y-4 hover:border-purple-500/30 transition-all group text-white/50 grayscale-[0.5]">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/10">
                        <Star size={24} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg">Wishlist</h3>
                        <p className="text-white/30 text-xs font-medium uppercase tracking-widest">Event impian Anda</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
