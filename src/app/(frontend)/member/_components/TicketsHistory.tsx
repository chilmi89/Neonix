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
        <div className="space-y-6">
            <div className="grid gap-6">
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
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all cursor-pointer"
                            onClick={() => setSelectedTicket(uiTicket)}
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Image Wrapper */}
                                <div className="w-full md:w-56 h-48 md:h-auto overflow-hidden bg-white/5">
                                    <img
                                        src={uiTicket.image}
                                        alt={uiTicket.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="px-3 py-1 rounded-lg bg-neon-cyan/20 text-neon-cyan text-[10px] font-black uppercase tracking-widest">
                                                Active
                                            </span>
                                            <span className="text-[10px] text-white/40 font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                                                {uiTicket.category}
                                            </span>
                                            <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">ID: {uiTicket.id}</span>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:text-neon-pink transition-colors">
                                                {uiTicket.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-white/60 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={16} className="text-neon-cyan" />
                                                    <span>{uiTicket.date} · {uiTicket.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Ticket size={16} className="text-neon-pink" />
                                                    <span>{uiTicket.type} <span className="text-white/20">×{uiTicket.quantity}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col justify-between items-end md:text-right gap-4">
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Amount Paid</p>
                                            <p className="text-xl font-black text-white mt-1">{uiTicket.price}</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedTicket(uiTicket);
                                            }}
                                            className="w-full md:w-auto bg-white/5 border border-white/10 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-neon-pink/10 hover:border-neon-pink/30 hover:text-neon-pink transition-all text-xs font-black uppercase tracking-widest"
                                        >
                                            View Detail
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
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
