"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ThumbsUp, MapPin, Calendar, Ticket, Loader2, Info, Share2, Heart, Star, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublicEventById, PublicEvent } from "@/services/publicService";

interface NeonEventDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: {
        id: string;
        title: string;
        image: string;
        location: string;
        date: string;
        price: string;
        description?: string;
        genres?: string[];
    } | null;
}

export function NeonEventDetailModal({ isOpen, onClose, event }: NeonEventDetailModalProps) {
    const [fullDetail, setFullDetail] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && event?.id) {
            const fetchDetail = async () => {
                try {
                    setLoading(true);
                    const res = await getPublicEventById(event.id);
                    if (res.status === "success") {
                        setFullDetail(res.data);
                    }
                } catch (err) {
                    console.error("Failed to fetch event details:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchDetail();
        } else if (!isOpen) {
            setFullDetail(null);
        }
    }, [isOpen, event?.id]);

    if (!event) return null;

    const displayDescription = fullDetail?.description || event.description || "Informasi detail mengenai event ini akan segera diperbarui oleh penyelenggara melalui platform Neonix.";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8">
                    {/* Cinematic Overlay Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                    />

                    {/* Premium Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0F0F0F] rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col"
                    >
                        {/* Close Action */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-[110] w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {/* Visual Header Section */}
                            <div className="relative h-[420px]">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/20" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/60 via-transparent to-transparent" />

                                <div className="absolute bottom-0 left-0 p-10 md:p-14 w-full">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-xl"
                                    >
                                        {event.title}
                                    </motion.h2>

                                    <div className="flex flex-wrap items-center gap-5 mb-8">
                                        <div className="flex items-center gap-1.5 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                                            <span className="text-green-500 font-black text-[10px] uppercase tracking-widest">98% Recommendation</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded border border-white/10 text-white/40 font-black text-[10px] uppercase tracking-widest">
                                            2025
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-neon-cyan/10 px-2 py-1 rounded border border-neon-cyan/20 text-neon-cyan font-black text-[10px] uppercase tracking-widest">
                                            LIVE ACCESS
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-neon-pink/10 px-2 py-1 rounded border border-neon-pink/20 text-neon-pink font-black text-[10px] uppercase tracking-widest">
                                            EXCLUSIVE
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5">
                                        <Link
                                            href={`/checkout/${event.id}`}
                                            className="flex items-center gap-2.5 bg-white text-black font-black px-10 py-4.5 rounded-2xl hover:bg-neon-cyan hover:scale-105 transition-all shadow-2xl uppercase tracking-[0.1em] text-[12px]"
                                        >
                                            <Ticket size={20} />
                                            Reservasi Tiket
                                        </Link>
                                        <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                                            <Plus size={24} />
                                        </button>
                                        <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                                            <Heart size={24} className="hover:text-neon-pink" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Info & Description Grid */}
                            <div className="px-10 md:px-14 py-14 grid md:grid-cols-[1fr_360px] gap-16">
                                <div className="space-y-12">
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-4 bg-neon-pink rounded-full" />
                                            <h3 className="text-[11px] font-black text-neon-pink uppercase tracking-[0.3em]">Petunjuk Deskripsi</h3>
                                        </div>

                                        {loading ? (
                                            <div className="flex items-center gap-4 py-8 px-8 bg-white/[0.03] border border-white/5 rounded-3xl">
                                                <Loader2 className="animate-spin text-neon-cyan" size={24} />
                                                <div className="space-y-2">
                                                    <p className="text-white font-bold text-sm tracking-wide">Mengsinkronkan Data...</p>
                                                    <p className="text-white/30 text-xs font-medium">Mengambil informasi terbaru dari grid sistem.</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-xl text-white/80 leading-relaxed font-medium">
                                                {displayDescription}
                                            </div>
                                        )}
                                    </div>

                                    {/* Visual Context */}
                                    <div className="space-y-8 pt-12 border-t border-white/5">
                                        <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">Navigasi Gallery Terkait</h3>
                                        <div className="grid grid-cols-3 gap-6 opacity-60">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="aspect-[16/10] bg-white/5 rounded-2xl border border-white/5 overflow-hidden group cursor-pointer hover:border-neon-cyan/30 transition-all">
                                                    <img
                                                        src={`https://images.unsplash.com/photo-${i === 1 ? '1470225620780' : i === 2 ? '1492684223066' : '1501281668745-f7f57925c3b4'}?auto=format&fit=crop&q=80&w=400`}
                                                        className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                                        alt="Grid"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar Metadata */}
                                <div className="space-y-10">
                                    <div className="space-y-8 bg-white/[0.02] p-8 md:p-10 rounded-[40px] border border-white/5 shadow-inner">
                                        <div className="space-y-2.5">
                                            <div className="flex items-center gap-2 text-neon-cyan/60 font-black uppercase text-[10px] tracking-[0.3em]">
                                                <Star size={12} className="text-neon-cyan" /> Kategori Acara
                                            </div>
                                            <p className="text-lg text-white font-black uppercase tracking-tight">{event.genres?.join(", ") || "UMUM"}</p>
                                        </div>

                                        <div className="space-y-2.5">
                                            <div className="flex items-center gap-2 text-neon-pink/60 font-black uppercase text-[10px] tracking-[0.3em]">
                                                <MapPin size={12} className="text-neon-pink" /> Lokasi Venue
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-lg text-white font-black uppercase tracking-tight">{event.location.split(' - ')[0]}</p>
                                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{event.location.split(' - ')[1] || 'Main District'}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2.5">
                                            <div className="flex items-center gap-2 text-neon-yellow/60 font-black uppercase text-[10px] tracking-[0.3em]">
                                                <Clock size={12} className="text-neon-yellow" /> Jadwal Grid
                                            </div>
                                            <p className="text-lg text-white font-black uppercase tracking-tight">{event.date}</p>
                                        </div>

                                        <div className="pt-8 border-t border-white/10 mt-6">
                                            <div className="flex items-center gap-2 text-white/30 font-black uppercase text-[10px] tracking-[0.3em] mb-4">
                                                Harga Registrasi
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-[10px] font-black text-white/30 tracking-widest uppercase">IDR</span>
                                                <p className="text-5xl text-white font-black tracking-tighter tabular-nums drop-shadow-lg">
                                                    {event.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnote */}
                                    <div className="px-6 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                                            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Active Slot: Available</span>
                                        </div>
                                        <div className="text-xs text-white/30 font-medium leading-relaxed italic">
                                            Hubungi tim support kami jika Anda mengalami kesulitan dalam proses reservasi tiket melalui sistem grid Neonix.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
