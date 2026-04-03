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
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Menyusun Grid Tiket...</p>
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
            <div className="bg-white border border-border rounded-[40px] p-24 flex flex-col items-center text-center gap-8 shadow-sm">
                <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center text-foreground/10 group animate-pulse">
                    <ShoppingBag size={48} />
                </div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-black uppercase tracking-tight">No Tickets Found</h3>
                    <p className="text-muted-foreground text-sm max-w-[340px] font-medium leading-relaxed">Your event tickets will automatically appear here once you complete a purchase.</p>
                </div>
                <button
                    onClick={() => window.location.href = "/"}
                    className="mt-2 px-10 py-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
                >
                    Discover Awesome Events
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
                            className="group relative bg-white border border-border rounded-[2.5rem] p-3 flex items-center gap-8 hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer overflow-hidden shadow-xl"
                            onClick={() => setSelectedTicket(uiTicket)}
                        >
                            {/* Left: Image with VIP badge */}
                            <div className="relative w-48 h-32 shrink-0 overflow-hidden rounded-[2rem] border border-border">
                                <img
                                    src={uiTicket.image}
                                    alt={uiTicket.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3 px-3 py-1 bg-white/80 backdrop-blur-md border border-border rounded-lg shadow-sm">
                                    <span className="text-[9px] font-black italic text-primary tracking-wider uppercase">VIP</span>
                                </div>
                            </div>

                            {/* Middle: Info */}
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                                <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter mb-1.5 truncate group-hover:text-primary transition-colors">
                                    {uiTicket.title}
                                </h3>
                                <p className="text-[11px] font-bold text-muted-foreground mb-5 truncate uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={12} className="text-primary" />
                                    {uiTicket.location}
                                </p>

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                                    <div className="flex items-center gap-2.5">
                                        <Calendar size={14} className="text-primary" />
                                        <span className="text-[10px] font-black text-foreground/60 uppercase tracking-widest">{uiTicket.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 px-4 py-1.5 bg-muted rounded-xl border border-border">
                                        <Ticket size={12} className="text-primary" />
                                        <span className="text-[9px] font-black text-foreground/60 uppercase tracking-widest">{uiTicket.category}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Divider Line */}
                            <div className="w-px h-20 bg-border ml-4 hidden md:block" />

                            {/* Right: Price & CTA */}
                            <div className="px-10 flex flex-col items-end gap-4 min-w-[220px]">
                                <div className="text-right">
                                    <div className="flex items-center gap-2 mb-1 justify-end">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <p className="text-[9px] font-black text-foreground/30 uppercase tracking-[0.2em]">Active Ticket</p>
                                    </div>
                                    <p className="text-3xl font-black text-primary tracking-tight">
                                        {uiTicket.price}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTicket(uiTicket);
                                    }}
                                    className="px-10 py-3 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:brightness-110 hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-3 group active:scale-95"
                                >
                                    View Ticket
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
