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

interface TicketsHistoryProps {
    selectedTicket: any;
    setSelectedTicket: (ticket: any) => void;
}

export function TicketsHistory({ selectedTicket, setSelectedTicket }: TicketsHistoryProps) {
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                        status: t.status === "PAID" ? "Active" : t.status,
                        type: t.ticketName,
                        price: formatCurrency(t.totalPrice),
                        quantity: t.quantity,
                        attendees: t.attendees // Pass the attendees data
                    };

                    return (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-white border border-border rounded-[2rem] p-3 flex flex-col md:flex-row items-center gap-6 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer overflow-hidden shadow-sm"
                            onClick={() => setSelectedTicket(uiTicket)}
                        >
                            {/* Left: Image with VIP badge */}
                            <div className="relative w-full md:w-44 h-32 shrink-0 overflow-hidden rounded-[1.5rem] border border-border">
                                <img
                                    src={uiTicket.image}
                                    alt={uiTicket.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md border border-border rounded-lg shadow-sm">
                                    <span className="text-[8px] font-black italic text-primary tracking-wider uppercase">VIP</span>
                                </div>
                            </div>

                            {/* Middle: Info */}
                            <div className="flex-1 flex flex-col justify-center min-w-0 py-2">
                                <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-2 truncate group-hover:text-primary transition-colors">
                                    {uiTicket.title}
                                </h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin size={12} className="text-primary/60" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider truncate">{uiTicket.location}</span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={12} className="text-primary/60" />
                                            <span className="text-[9px] font-black text-foreground/50 uppercase tracking-widest">{uiTicket.date}</span>
                                        </div>
                                        <div className="px-3 py-1 bg-muted rounded-lg border border-border/50">
                                            <span className="text-[8px] font-black text-primary uppercase tracking-widest">{uiTicket.category}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Divider Line */}
                            <div className="hidden md:block w-px h-16 bg-border/50 mx-2" />

                            {/* Right: Price & CTA */}
                            <div className="w-full md:w-auto px-6 py-2 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                                <div className="text-left md:text-right">
                                    <div className="flex items-center gap-1.5 mb-1 justify-end">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        <p className="text-[8px] font-black text-foreground/30 uppercase tracking-widest">Active</p>
                                    </div>
                                    <p className="text-2xl font-black text-primary tracking-tight leading-none">
                                        {uiTicket.price}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTicket(uiTicket);
                                    }}
                                    className="px-6 py-3 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2 group active:scale-95"
                                >
                                    Details
                                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
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
