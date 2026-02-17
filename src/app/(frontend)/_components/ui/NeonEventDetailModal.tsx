"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ThumbsUp, MapPin, Calendar, Ticket, ChevronRight, Minus } from "lucide-react";
import Link from "next/link";

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
        match?: string;
        year?: string;
        rating?: string;
        duration?: string;
    };
}

export function NeonEventDetailModal({ isOpen, onClose, event }: NeonEventDetailModalProps) {
    if (!event) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-[#121212] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-neon-pink transition-colors border border-white/10"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {/* Hero Header */}
                            <div className="relative h-[400px]">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                                        {event.title}
                                    </h2>

                                    <div className="flex flex-wrap items-center gap-4 mb-8">
                                        <span className="text-green-500 font-bold">{event.match || "98% Match"}</span>
                                        <span className="text-white/40 font-bold">{event.year || "2024"}</span>
                                        <span className="px-2 py-0.5 rounded border border-white/10 text-[10px] font-bold text-white/40 uppercase">
                                            {event.rating || "18+"}
                                        </span>
                                        <span className="text-white/40 font-bold">{event.duration || "3 Days"}</span>
                                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white uppercase">HD</span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={`/checkout/${event.id}`}
                                            className="flex items-center gap-2 bg-neon-cyan text-black font-black px-8 py-3.5 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-neon-cyan/20"
                                        >
                                            <Ticket size={18} />
                                            BUY TICKET
                                        </Link>
                                        <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                                            <Plus size={20} />
                                        </button>
                                        <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                                            <ThumbsUp size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Details Content */}
                            <div className="p-8 md:p-12 grid md:grid-cols-[1fr_300px] gap-12">
                                <div className="space-y-8">
                                    <p className="text-pink-500 font-bold flex items-center gap-2">
                                        <span className="text-xl">📈</span> #1 in Music Festivals Today
                                    </p>
                                    <p className="text-lg text-white/80 leading-relaxed font-medium">
                                        {event.description || "Experience the most electrifying weekend of the year. The Neon Lights Festival returns to Jakarta with a lineup that defies expectations. Immerse yourself in a world of pulsating beats, stunning visual art installations, and a community of music lovers."}
                                    </p>

                                    <div className="pt-8">
                                        <h3 className="text-xl font-bold text-white mb-6">More Like This</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="group cursor-pointer">
                                                    <div className="aspect-video rounded-xl overflow-hidden mb-3 relative">
                                                        <img
                                                            src={`https://images.unsplash.com/photo-1470225620780?auto=format&fit=crop&q=80&w=400&sig=${i}`}
                                                            alt="Related"
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                                <Ticket size={14} className="text-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs font-bold text-white line-clamp-1">Related Event {i}</p>
                                                    <p className="text-[10px] text-white/40">Sep 05</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Genres:</p>
                                        <p className="text-sm text-white font-medium">{event.genres?.join(", ") || "Electronic, Dance, Pop"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Location:</p>
                                        <p className="text-sm text-white font-medium">{event.location}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Date:</p>
                                        <p className="text-sm text-white font-medium">{event.date}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Price:</p>
                                        <p className="text-xl text-neon-yellow font-black">From ${event.price}</p>
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
