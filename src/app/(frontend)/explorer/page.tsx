"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Calendar, DollarSign, Layers, ChevronDown, Filter, SlidersHorizontal } from "lucide-react";
import { NeonNavbar } from "../_components/layout/NeonNavbar";
import { NeonFooter } from "../_components/layout/NeonFooter";
import { NeonEventDetailModal } from "../_components/ui/NeonEventDetailModal";
import { useState } from "react";
import { cn } from "@/lib/utils";

const events = [
    {
        title: "Neon Sky VIP Rooftop Party",
        venue: "Skyline Tower - Jakarta",
        date: "Fri, 25 Oct - 21:00",
        type: "Konser",
        status: "Limited Seats",
        price: "320.00",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
        isVip: true
    },
    {
        title: "Night League Finals: Jakarta vs Surabaya",
        venue: "National Arena - Jakarta",
        date: "Sat, 02 Nov - 19:30",
        type: "Sport",
        status: "Kategori: Standard",
        price: "75.00",
        image: "https://images.unsplash.com/photo-1540575861501-7ad058bf3efb?auto=format&fit=crop&q=80&w=800",
        isVip: false
    },
    {
        title: "Phantom of the Opera - Royal Box",
        venue: "Grand Theater Hall - Jakarta",
        date: "Sun, 10 Nov - 20:00",
        type: "Theater",
        status: "Includes Backstage Tour",
        price: "540.00",
        image: "https://images.unsplash.com/photo-1514525253344-a8135a43cf3e?auto=format&fit=crop&q=80&w=800",
        isVip: true
    },
    {
        title: "FutureTech Summit 2025",
        venue: "Convention Center - Jakarta",
        date: "Thu, 05 Dec - 09:00",
        type: "Konferensi",
        status: "All Access Pass",
        price: "260.00",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800",
        isVip: false
    }
];

export default function ExplorerPage() {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEventClick = (event: any) => {
        // Transform explorer event data to match modal props if needed
        const transformedEvent = {
            ...event,
            id: event.id || Math.random().toString(),
            location: event.venue,
            price: event.price.replace("$", "").split(".")[0]
        };
        setSelectedEvent(transformedEvent);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-inter">
            <NeonNavbar />

            <main className="w-full px-8 md:px-12 lg:px-16 pt-32 pb-40">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4">
                            Explorer<span className="text-neon-pink">.</span>
                        </h1>
                        <p className="text-muted-foreground max-w-lg text-sm font-medium leading-relaxed">
                            Telusuri ratusan event VIP dan standar dengan filter lokasi, tanggal, harga, dan kategori dalam satu layar.
                        </p>
                    </div>

                    <div className="w-full md:max-w-md relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-neon-pink transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Cari event, artis, atau venue..."
                            className="w-full bg-muted border border-glass-border rounded-full py-5 pl-14 pr-8 text-sm outline-none focus:border-neon-pink/50 transition-all placeholder:text-muted-foreground font-medium"
                        />
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-muted border border-glass-border rounded-[2.5rem] p-4 flex flex-col lg:flex-row items-center gap-4 shadow-2xl mb-16">
                    <div className="flex items-center gap-2 px-6 border-r border-glass-border">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Filter pencarian</span>
                    </div>

                    <div className="flex flex-1 flex-wrap items-center gap-4 px-4 w-full">
                        {/* Location */}
                        <div className="flex-1 min-w-[150px] bg-background border border-glass-border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer hover:border-glass-border transition-all">
                            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest px-1">Location</span>
                            <div className="flex items-center justify-between px-1">
                                <span className="text-xs font-bold">Jakarta, ID</span>
                                <ChevronDown size={14} className="text-muted-foreground" />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex-1 min-w-[150px] bg-background border border-glass-border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer hover:border-glass-border transition-all">
                            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest px-1">Date</span>
                            <div className="flex items-center justify-between px-1">
                                <span className="text-xs font-bold">This month</span>
                                <ChevronDown size={14} className="text-muted-foreground" />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex-1 min-w-[150px] bg-background border border-glass-border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer hover:border-glass-border transition-all">
                            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest px-1">Price</span>
                            <div className="flex items-center justify-between px-1">
                                <span className="text-xs font-bold">$25 - $500</span>
                                <ChevronDown size={14} className="text-muted-foreground" />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="flex-1 min-w-[180px] bg-black border border-neon-pink/50 rounded-2xl p-4 flex flex-col gap-1 cursor-pointer shadow-[0_0_20px_rgba(255,0,255,0.1)]">
                            <span className="text-[8px] font-bold text-neon-pink uppercase tracking-widest px-1">Category</span>
                            <div className="flex items-center justify-between px-1">
                                <span className="text-xs font-bold text-neon-pink">All (VIP & Standard)</span>
                                <ChevronDown size={14} className="text-neon-pink/40" />
                            </div>
                        </div>
                    </div>

                    <button className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest px-8">
                        Reset filter
                    </button>
                </div>

                {/* Results Section */}
                <div className="space-y-12">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Menampilkan 24 event untuk filter saat ini</p>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-widest">Sort by</span>
                            <div className="bg-muted px-4 py-2 rounded-lg flex items-center gap-2 border border-glass-border">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Trending</span>
                                <ChevronDown size={12} className="text-muted-foreground" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Repeat results to match screenshot */}
                        {[...events, ...events, ...events].map((event, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i % 4) * 0.1 }}
                                onClick={() => handleEventClick(event)}
                                className="bg-muted border border-glass-border rounded-[2rem] overflow-hidden flex items-center gap-8 p-4 group hover:border-glass-border transition-all hover:shadow-2xl cursor-pointer"
                            >
                                <div className="w-48 h-32 rounded-2xl overflow-hidden shrink-0 relative">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    {event.isVip && (
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-neon-pink text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full">
                                            VIP
                                        </div>
                                    )}
                                    {!event.isVip && (
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10">
                                            STANDARD
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 space-y-3">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black tracking-tight leading-none group-hover:text-neon-pink transition-colors">{event.title}</h3>
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{event.venue}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                            <Calendar size={12} className="text-neon-pink/50" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                            <span className="px-2 py-0.5 bg-background border border-glass-border rounded text-[8px]">{event.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-neon-yellow uppercase tracking-widest">
                                            {event.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right px-6 flex flex-col items-end gap-3 shrink-0">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">Mulai dari</p>
                                        <div className="text-2xl font-black tracking-tighter text-neon-yellow dark:text-neon-yellow light:text-neon-pink">${event.price}</div>
                                    </div>
                                    <button className={cn(
                                        "px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                                        event.isVip
                                            ? "bg-neon-cyan text-black hover:bg-neon-pink hover:text-white shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                                            : "bg-muted text-foreground hover:bg-foreground hover:text-background border border-glass-border"
                                    )}>
                                        Detail
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <NeonEventDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
            />

            <NeonFooter />
        </div>
    );
}
