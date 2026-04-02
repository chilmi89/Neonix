"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Calendar,
    Ticket,
    ChevronRight,
    Loader2,
    ShoppingBag,
    AlertCircle
} from "lucide-react";
import { TicketDetailModal } from "./TicketDetailModal";
import { getMemberTransactions, TransactionDTO } from "@/services/transactionService";
import { getImageUrl } from "@/config/api.config";

export function TicketsHistory() {
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await getMemberTransactions();
                if (response.status === "success") {
                    setTransactions(response.data || []);
                } else {
                    setError(response.message || "Gagal mengambil riwayat tiket");
                }
            } catch (err: any) {
                setError(err.message || "Terjadi kesalahan saat menghubungkan ke server");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
        }) + " WIB";
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-neon-pink" size={40} />
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Menyusun Grid Tiket...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 flex items-center gap-4 text-red-500">
                <AlertCircle size={24} />
                <p className="font-bold">{error}</p>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-20 flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/10">
                    <ShoppingBag size={40} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase">Belum ada tiket</h3>
                    <p className="text-white/40 text-sm max-w-[300px]">Semua tiket yang Anda beli akan muncul di sini secara otomatis.</p>
                </div>
                <button
                    onClick={() => window.location.href = "/"}
                    className="mt-4 px-8 py-4 bg-neon-pink text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-neon-pink/20"
                >
                    Cari Event Baru
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex flex-col gap-4">
                {transactions.map((t, i) => {
                    // Map TransactionDTO to UI structure
                    const uiTicket = {
                        id: `TIX-${t.id.toString().padStart(4, '0')}`,
                        title: t.eventName,
                        image: t.eventPoster ? getImageUrl(t.eventPoster) : "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80",
                        date: formatDate(t.purchasedAt),
                        time: formatTime(t.purchasedAt),
                        location: t.eventLocation || "Venue TBD",
                        category: t.categoryName,
                        status: "Active",
                        type: t.ticketName,
                        price: formatCurrency(t.totalPrice),
                        quantity: t.quantity
                    };

                    return (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-3 flex items-center gap-6 hover:border-neon-pink/30 hover:bg-white/[0.02] transition-all cursor-pointer overflow-hidden shadow-2xl"
                            onClick={() => setSelectedTicket(uiTicket)}
                        >
                            {/* Left: Image with VIP badge */}
                            <div className="relative w-44 h-28 shrink-0 overflow-hidden rounded-[2rem] border border-white/10">
                                <img
                                    src={uiTicket.image}
                                    alt={uiTicket.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3 px-3 py-1 bg-neon-yellow/10 backdrop-blur-md border border-neon-yellow/30 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                                    <span className="text-[9px] font-black italic text-neon-yellow">VIP</span>
                                </div>
                            </div>

                            {/* Middle: Info */}
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                                <h3 className="text-2xl font-black text-neon-pink uppercase tracking-tighter mb-0.5 truncate group-hover:drop-shadow-[0_0_10px_rgba(255,0,255,0.4)] transition-all">
                                    {uiTicket.title}
                                </h3>
                                <p className="text-[11px] font-medium text-white/40 mb-4 truncate">{uiTicket.location}</p>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-neon-pink" />
                                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{uiTicket.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-md border border-white/5">
                                        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">{uiTicket.category}</span>
                                    </div>
                                    <div className="px-3 py-1 border border-neon-pink/20 rounded-md bg-neon-pink/5">
                                        <span className="text-[8px] font-black text-neon-pink uppercase tracking-widest">Limited Seats</span>
                                    </div>
                                </div>
                            </div>

                            {/* Divider Line */}
                            <div className="w-px h-16 bg-white/5 ml-4 hidden md:block" />

                            {/* Right: Price & CTA */}
                            <div className="px-8 flex flex-col items-end gap-3 min-w-[200px]">
                                <div className="text-right">
                                    <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Status: Active</p>
                                    <p className="text-2xl font-black text-neon-yellow drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                                        {uiTicket.price}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTicket(uiTicket);
                                    }}
                                    className="px-8 py-2.5 bg-neon-cyan text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all flex items-center gap-2"
                                >
                                    View Details
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <TicketDetailModal
                isOpen={!!selectedTicket}
                onClose={() => setSelectedTicket(null)}
                ticket={selectedTicket}
            />
        </div>
    );
}
