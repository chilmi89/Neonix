"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, MapPin, Calendar, Ticket, Loader2, Heart, Star, Clock, Zap, ArrowRight } from "lucide-react";
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 32 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 32 }}
                        transition={{ type: "spring", stiffness: 260, damping: 24 }}
                        className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,0,128,0.1)] border border-white/8 flex flex-col bg-[#080808]"
                    >
                        {/* Ambient neon glow bars */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-neon-pink/60 to-transparent z-20" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-neon-cyan/40 to-transparent z-20" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-110 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:bg-neon-pink/20 hover:border-neon-pink/40 transition-all border border-white/10"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">

                            {/* ── HERO SECTION ── */}
                            <div className="relative h-[340px] md:h-[420px] overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Cinematic gradients */}
                                <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-[#080808]/40 to-transparent" />
                                <div className="absolute inset-0 bg-linear-to-r from-[#080808]/80 via-transparent to-transparent" />
                                <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-transparent" />

                                {/* Hero content */}
                                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-3/4">
                                    {/* Genre chips */}
                                    {event.genres && event.genres.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {event.genres.map((g, i) => (
                                                <span key={i} className="px-2.5 py-1 rounded-lg bg-neon-pink/15 border border-neon-pink/30 text-neon-pink text-[10px] font-black uppercase tracking-widest">
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Title — giant neon pink */}
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-[0_0_30px_rgba(255,0,128,0.4)]"
                                    >
                                        {event.title}
                                    </motion.h2>

                                    {/* Status badges */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-black uppercase tracking-widest">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80] animate-pulse" />
                                            Tersedia
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-[10px] font-black uppercase tracking-widest">
                                            <Zap size={9} fill="currentColor" />
                                            Live Access
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest">
                                            Exclusive
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── BODY ── */}
                            <div className="px-6 md:px-10 py-8 grid md:grid-cols-[1fr_300px] gap-8 md:gap-12">

                                {/* LEFT: Description + Gallery */}
                                <div className="space-y-8">
                                    {/* Section header */}
                                    <div className="flex items-center gap-3">
                                        <div className="h-5 w-1 rounded-full bg-neon-pink shadow-[0_0_8px_rgba(255,0,128,0.8)]" />
                                        <h3 className="text-[11px] font-black text-neon-pink uppercase tracking-[0.3em]">Deskripsi Event</h3>
                                    </div>

                                    {/* Description */}
                                    {loading ? (
                                        <div className="space-y-3">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className={`h-4 rounded-full bg-white/5 animate-pulse ${i === 3 ? "w-2/3" : "w-full"}`} style={{ animationDelay: `${i * 100}ms` }} />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-white/70 leading-relaxed text-sm font-medium">
                                            {displayDescription}
                                        </p>
                                    )}

                                    {/* Gallery preview */}
                                    <div className="space-y-4 pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-5 w-1 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                                            <h3 className="text-[11px] font-black text-neon-cyan uppercase tracking-[0.3em]">Gallery</h3>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                "1470225620780",
                                                "1492684223066",
                                                "1501281668745-f7f57925c3b4",
                                            ].map((id, i) => (
                                                <div key={i} className="aspect-video rounded-xl overflow-hidden border border-white/5 group/gal cursor-pointer hover:border-neon-pink/40 transition-all duration-300">
                                                    <img
                                                        src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=400`}
                                                        className="w-full h-full object-cover grayscale opacity-40 group-hover/gal:grayscale-0 group-hover/gal:opacity-100 transition-all duration-500"
                                                        alt="gallery"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: Metadata sidebar */}
                                <div className="space-y-6">
                                    {/* Info card */}
                                    <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-6 space-y-6">
                                        {/* Kategori */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
                                                <Star size={10} className="text-neon-yellow" />
                                                Kategori
                                            </div>
                                            <p className="text-sm font-black text-white uppercase tracking-wide">
                                                {event.genres?.join(", ") || "Umum"}
                                            </p>
                                        </div>

                                        <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

                                        {/* Lokasi */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
                                                <MapPin size={10} className="text-neon-pink" />
                                                Lokasi
                                            </div>
                                            <p className="text-sm font-bold text-white leading-snug">{event.location}</p>
                                        </div>

                                        <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

                                        {/* Tanggal */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/30">
                                                <Clock size={10} className="text-neon-cyan" />
                                                Tanggal
                                            </div>
                                            <p className="text-sm font-bold text-white">{event.date}</p>
                                        </div>

                                        <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

                                        {/* Price */}
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Harga Mulai</p>
                                            <p className="text-4xl font-black text-neon-yellow tabular-nums drop-shadow-[0_0_14px_rgba(255,230,0,0.7)] leading-none">
                                                ${event.price}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="space-y-3">
                                        <Link
                                            href={`/checkout/${event.id}`}
                                            className="relative group/cta flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl overflow-hidden font-black text-sm uppercase tracking-widest transition-all duration-300 bg-neon-pink text-white shadow-[0_0_24px_rgba(255,0,128,0.4)] hover:shadow-[0_0_40px_rgba(255,0,128,0.7)]"
                                        >
                                            <Ticket size={16} />
                                            <span className="relative z-10">Reservasi Tiket</span>
                                            <ArrowRight size={14} className="relative z-10 group-hover/cta:translate-x-1 transition-transform duration-300" />
                                            {/* Shine sweep */}
                                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-500" />
                                        </Link>

                                        <div className="flex gap-3">
                                            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-transparent border border-white/10 text-white/50 hover:text-neon-pink hover:border-neon-pink/40 transition-all text-xs font-black uppercase tracking-widest">
                                                <Heart size={14} />
                                                Simpan
                                            </button>
                                            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-transparent border border-white/10 text-white/50 hover:text-neon-cyan hover:border-neon-cyan/40 transition-all text-xs font-black uppercase tracking-widest">
                                                <Plus size={14} />
                                                Wishlist
                                            </button>
                                        </div>
                                    </div>

                                    {/* Availability note */}
                                    <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-green-500/5 border border-green-500/15">
                                        <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse shrink-0 mt-1" />
                                        <p className="text-[11px] text-green-400/80 font-medium leading-relaxed">
                                            Slot tiket masih tersedia. Segera reservasi sebelum habis!
                                        </p>
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
