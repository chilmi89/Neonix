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

    const displayDescription = fullDetail?.description || event.description || "Detailed information for this event will be updated soon by the organizer via the Neonix platform.";

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
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 32 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 32 }}
                        transition={{ type: "spring", stiffness: 260, damping: 24 }}
                        className="relative w-full max-w-5xl max-h-[92vh] rounded-[3rem] overflow-hidden shadow-[0_32px_128px_rgba(0,0,0,0.15)] border border-border flex flex-col bg-background shadow-2xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all border border-border shadow-lg"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20">

                            {/* ── HERO SECTION ── */}
                            <div className="relative h-[340px] md:h-[420px] overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Cinematic gradients */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

                                {/* Hero content */}
                                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-3/4">
                                    {/* Genre chips */}
                                    {event.genres && event.genres.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {event.genres.map((g, i) => (
                                                <span key={i} className="px-3 py-1 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Title — high contrast */}
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-3xl md:text-6xl font-black text-foreground leading-tight tracking-tighter mb-6"
                                    >
                                        {event.title}
                                    </motion.h2>

                                    {/* Status badges */}
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-[10px] font-black uppercase tracking-widest">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Available
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                                            <Zap size={10} fill="currentColor" />
                                            Live Experience
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border text-foreground/40 text-[10px] font-black uppercase tracking-widest">
                                            Exclusive
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── BODY ── */}
                            <div className="px-6 md:px-10 py-10 grid md:grid-cols-[1fr_320px] gap-8 md:gap-16">

                                {/* LEFT: Description + Gallery */}
                                <div className="space-y-10">
                                    {/* Section header */}
                                    <div className="flex items-center gap-3">
                                        <div className="h-6 w-1.5 rounded-full bg-primary shadow-sm" />
                                        <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.3em]">Event Description</h3>
                                    </div>

                                    {/* Description */}
                                    {loading ? (
                                        <div className="space-y-4">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className={`h-4 rounded-full bg-muted animate-pulse ${i === 3 ? "w-2/3" : "w-full"}`} style={{ animationDelay: `${i * 100}ms` }} />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-foreground/70 leading-relaxed text-sm font-bold">
                                            {displayDescription}
                                        </p>
                                    )}

                                    {/* Gallery preview */}
                                    <div className="space-y-6 pt-10 border-t border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="h-6 w-1.5 rounded-full bg-sky-400 shadow-sm" />
                                            <h3 className="text-[11px] font-black text-sky-500 uppercase tracking-[0.3em]">Gallery</h3>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                "1470225620780",
                                                "1492684223066",
                                                "1501281668745-f7f57925c3b4",
                                            ].map((id, i) => (
                                                <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-border group/gal cursor-pointer hover:border-primary/40 transition-all duration-300">
                                                    <img
                                                        src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=400`}
                                                        className="w-full h-full object-cover grayscale opacity-60 group-hover/gal:grayscale-0 group-hover/gal:opacity-100 transition-all duration-500"
                                                        alt="gallery"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: Metadata sidebar */}
                                <div className="space-y-8">
                                    {/* Info card */}
                                    <div className="rounded-[2.5rem] border border-border bg-muted/30 backdrop-blur-sm p-8 space-y-8 shadow-sm">
                                        {/* Kategori */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-foreground/30">
                                                <Star size={12} className="text-amber-500" />
                                                Category
                                            </div>
                                            <p className="text-sm font-black text-foreground uppercase tracking-wide">
                                                {event.genres?.join(", ") || "General"}
                                            </p>
                                        </div>

                                        <div className="h-px bg-border" />

                                        {/* Lokasi */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-foreground/30">
                                                <MapPin size={12} className="text-primary" />
                                                Location
                                            </div>
                                            <p className="text-sm font-black text-foreground leading-snug">{event.location}</p>
                                        </div>

                                        <div className="h-px bg-border" />

                                        {/* Tanggal */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-foreground/30">
                                                <Calendar size={12} className="text-sky-500" />
                                                Schedule
                                            </div>
                                            <p className="text-sm font-black text-foreground">{event.date}</p>
                                        </div>

                                        <div className="h-px bg-border" />

                                        {/* Price */}
                                        <div className="space-y-1.5">
                                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/30">From</p>
                                            <p className="text-5xl font-black text-primary tabular-nums leading-none tracking-tighter">
                                                ${event.price}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="space-y-4">
                                        <Link
                                            href={`/checkout/${event.id}${(fullDetail as any)?.tenantId ? `?tenantId=${(fullDetail as any).tenantId}` : ""}`}
                                            className="relative group/cta flex items-center justify-center gap-3 w-full py-5 rounded-[1.5rem] overflow-hidden font-black text-sm uppercase tracking-widest transition-all duration-300 bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95"
                                        >
                                            <Ticket size={18} />
                                            <span className="relative z-10">Reserve Seats</span>
                                            <ArrowRight size={16} className="relative z-10 group-hover/cta:translate-x-1 transition-transform duration-300" />
                                        </Link>

                                        <div className="flex gap-4">
                                            <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border border-border text-foreground/40 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-widest">
                                                <Heart size={14} />
                                                Save
                                            </button>
                                            <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border border-border text-foreground/40 hover:text-sky-500 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all text-[10px] font-black uppercase tracking-widest">
                                                <Plus size={14} />
                                                Wishlist
                                            </button>
                                        </div>
                                    </div>

                                    {/* Availability note */}
                                    <div className="flex items-start gap-2.5 px-5 py-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#4ade80] animate-pulse shrink-0 mt-1" />
                                        <p className="text-[11px] text-green-600 font-bold leading-relaxed">
                                            Tickets are still available. Reserve now before they run out!
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
