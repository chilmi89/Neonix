"use client";

<<<<<<< Updated upstream
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, DollarSign, Layers, ChevronDown, Filter, SlidersHorizontal } from "lucide-react";
import { NeonNavbar } from "../_components/layout/NeonNavbar";
import { NeonFooter } from "../_components/layout/NeonFooter";
import { NeonEventDetailModal } from "../_components/ui/NeonEventDetailModal";
import { useState } from "react";

const events = [
    {
        title: "Neon Sky VIP Rooftop Party",
        venue: "Skyline Tower - Jakarta",
        date: "Fri, 25 Oct - 21:00",
        type: "Konser",
        status: "Limited Seats",
        price: "$320.00",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
        isVip: true
    },
    {
        title: "Night League Finals: Jakarta vs Surabaya",
        venue: "National Arena - Jakarta",
        date: "Sat, 02 Nov - 19:30",
        type: "Sport",
        status: "Kategori: Standard",
        price: "$75.00",
        image: "https://images.unsplash.com/photo-1540575861501-7ad058bf3efb?auto=format&fit=crop&q=80&w=800",
        isVip: false
    },
    {
        title: "Phantom of the Opera - Royal Box",
        venue: "Grand Theater Hall - Jakarta",
        date: "Sun, 10 Nov - 20:00",
        type: "Theater",
        status: "Includes Backstage Tour",
        price: "$540.00",
        image: "https://images.unsplash.com/photo-1514525253344-a8135a43cf3e?auto=format&fit=crop&q=80&w=800",
        isVip: true
    },
    {
        title: "FutureTech Summit 2025",
        venue: "Convention Center - Jakarta",
        date: "Thu, 05 Dec - 09:00",
        type: "Konferensi",
        status: "All Access Pass",
        price: "$260.00",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800",
        isVip: false
=======
import { useState } from "react";
import { ChevronDown, Search, Calendar, MapPin, DollarSign, SlidersHorizontal } from "lucide-react";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EVENTS = [
    {
        id: 1,
        title: "Neon Sky VIP Rooftop Party",
        venue: "Skyline Tower - Jakarta",
        date: "Fri, 25 Oct - 21:00",
        category: "Konser",
        tag: "Limited Seats",
        tagStyle: "yellow",
        price: "320.00",
        isVip: true,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Night League Finals: Jakarta vs Surabaya",
        venue: "National Arena - Jakarta",
        date: "Sat, 02 Nov - 19:30",
        category: "Sport",
        tag: "Kategori: Standard",
        tagStyle: "grey",
        price: "75.00",
        isVip: false,
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Phantom of the Opera - Royal Box",
        venue: "Grand Theater Hall - Jakarta",
        date: "Sun, 10 Nov - 20:00",
        category: "Theater",
        tag: "Includes Backstage Tour",
        tagStyle: "magenta",
        price: "540.00",
        isVip: true,
        image: "https://images.unsplash.com/photo-1503095396549-807759c4c30b?w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "FutureTech Summit 2025",
        venue: "Convention Center - Jakarta",
        date: "Thu, 05 Dec - 09:00",
        category: "Konferensi",
        tag: "All Access Pass",
        tagStyle: "grey",
        price: "260.00",
        isVip: false,
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1000&auto=format&fit=crop"
>>>>>>> Stashed changes
    }
];

export default function ExplorerPage() {
<<<<<<< Updated upstream
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
=======
    return (
        <div className="min-h-screen bg-background text-foreground font-inter transition-colors duration-500">
            <NeonNavbar />

            <main className="w-full px-8 md:px-12 lg:px-16 pb-20">
                {/* Explorer Hero - Full Height */}
                <section className="min-h-screen flex flex-col justify-center items-center text-center max-w-5xl mx-auto py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white uppercase leading-none">
                            Discover <span className="text-neon-pink">Events</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
                            Browse hundreds of VIP and standard events with location, date, price, and category filters.
                        </p>

                        {/* Search Quick Bar */}
                        <div className="w-full max-w-2xl mx-auto relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neon-cyan transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by event, artist, or venue..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-8 text-base outline-none focus:border-neon-pink/50 transition-all placeholder:text-white/20 font-inter"
                            />
                        </div>
                    </motion.div>
                </section>

                {/* Filters Section */}
                <section className="bg-muted/10 border border-white/5 rounded-3xl p-6 mb-16 shadow-lg backdrop-blur-sm transition-colors duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                            <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#00FFFF]" />
                            Search Filters
                        </div>
                        <button className="text-xs font-bold text-white/40 hover:text-white transition-colors">Reset filter</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-white/40 ml-1">Location</label>
                            <div className="relative group">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-neon-cyan transition-colors" size={14} />
                                <select className="w-full bg-background border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:border-neon-cyan/50 appearance-none cursor-pointer text-white">
                                    <option>All Locations</option>
                                    <option>Jakarta</option>
                                    <option>Bali</option>
                                    <option>Bandung</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={12} />
>>>>>>> Stashed changes
                            </div>
                        </div>

                        {/* Date */}
<<<<<<< Updated upstream
                        <div className="flex-1 min-w-[150px] bg-background border border-glass-border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer hover:border-glass-border transition-all">
                            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest px-1">Date</span>
                            <div className="flex items-center justify-between px-1">
                                <span className="text-xs font-bold">This month</span>
                                <ChevronDown size={14} className="text-muted-foreground" />
=======
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-white/40 ml-1">Date</label>
                            <div className="relative group">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-neon-pink transition-colors" size={14} />
                                <select className="w-full bg-background border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:border-neon-pink/50 appearance-none cursor-pointer text-white">
                                    <option>This Month</option>
                                    <option>This Week</option>
                                    <option>Tomorrow</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={12} />
>>>>>>> Stashed changes
                            </div>
                        </div>

                        {/* Price */}
<<<<<<< Updated upstream
                        <div className="flex-1 min-w-[150px] bg-background border border-glass-border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer hover:border-glass-border transition-all">
                            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest px-1">Price</span>
                            <div className="flex items-center justify-between px-1">
                                <span className="text-xs font-bold">$25 - $500</span>
                                <ChevronDown size={14} className="text-muted-foreground" />
=======
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-white/40 ml-1">Price</label>
                            <div className="relative group">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-neon-yellow transition-colors" size={14} />
                                <select className="w-full bg-background border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:border-neon-yellow/50 appearance-none cursor-pointer text-white">
                                    <option>All Prices</option>
                                    <option>$0 - $50</option>
                                    <option>$50 - $200</option>
                                    <option>$200+</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={12} />
>>>>>>> Stashed changes
                            </div>
                        </div>

                        {/* Category */}
<<<<<<< Updated upstream
                        <div className="flex-1 min-w-[180px] bg-black border border-neon-pink/50 rounded-2xl p-4 flex flex-col gap-1 cursor-pointer shadow-[0_0_20px_rgba(255,0,255,0.1)]">
                            <span className="text-[8px] font-bold text-neon-pink uppercase tracking-widest px-1">Category</span>
                            <div className="flex items-center justify-between px-1">
                                <span className="text-xs font-bold text-neon-pink">All (VIP & Standard)</span>
                                <ChevronDown size={14} className="text-neon-pink/40" />
=======
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-white/40 ml-1">Category</label>
                            <div className="relative group">
                                <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-neon-pink transition-colors" size={14} />
                                <select className="w-full bg-background border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:border-neon-pink/50 appearance-none cursor-pointer text-white">
                                    <option>All Events</option>
                                    <option>Concerts</option>
                                    <option>Sports</option>
                                    <option>Theater</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={12} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Event Results Section */}
                <section className="w-full pb-40">
                    {/* Results Metadata */}
                    <div className="flex items-center justify-between mb-8 overflow-x-auto">
                        <p className="text-sm text-muted-foreground font-medium font-inter whitespace-nowrap">
                            Menampilkan <span className="text-foreground font-bold">24 event</span> untuk filter saat ini
                        </p>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Sort by</span>
                            <div className="bg-muted border border-glass-border rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-muted/80 transition-colors">
                                <span className="text-xs font-bold">Trending</span>
                                <ChevronDown size={14} className="text-muted-foreground" />
>>>>>>> Stashed changes
                            </div>
                        </div>
                    </div>

<<<<<<< Updated upstream
                    <button className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest px-8">
                        Reset filter
                    </button>
                </div>

                {/* Results Section */}
                <div className="space-y-12">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Menampilkan 24 event untuk filter saat ini</p>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <span className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">Sort by</span>
                            <div className="bg-[#111] px-4 py-2 rounded-lg flex items-center gap-2 border border-white/5">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Trending</span>
                                <ChevronDown size={12} className="text-white/20" />
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
                                        <div className="text-2xl font-black tracking-tighter text-neon-yellow dark:text-neon-yellow light:text-neon-pink">{event.price}</div>
                                    </div>
                                    <button className={cn(
                                        "px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                                        event.isVip
                                            ? "bg-neon-cyan text-black hover:bg-neon-pink hover:text-white shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                                            : "bg-muted text-foreground hover:bg-foreground hover:text-background border border-glass-border"
                                    )}>
                                        Detail
=======
                    {/* Event List */}
                    <div className="grid grid-cols-1 gap-4">
                        {[...EVENTS, ...EVENTS, ...EVENTS].map((event, idx) => (
                            <motion.div
                                key={`${event.id}-${idx}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-muted/20 hover:bg-muted/40 border border-glass-border hover:border-neon-pink/20 rounded-[2rem] p-4 flex flex-col md:flex-row items-center gap-6 transition-all duration-300"
                            >
                                {/* Image Thumbnail */}
                                <div className="relative w-full md:w-64 h-40 rounded-2xl overflow-hidden shrink-0">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={cn(
                                        "absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest",
                                        event.isVip ? "bg-neon-pink text-white shadow-[0_0_15px_rgba(255,0,255,0.5)]" : "bg-black/60 backdrop-blur-md text-white border border-white/10"
                                    )}>
                                        {event.isVip ? "VIP" : "STANDARD"}
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="flex-1 space-y-2 text-center md:text-left py-2 font-inter">
                                    <h3 className="text-xl font-bold group-hover:text-neon-pink transition-colors">{event.title}</h3>
                                    <div className="text-xs text-muted-foreground font-medium tracking-tight">
                                        {event.venue}
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                                        <div>{event.date}</div>
                                        <div className="px-2 py-0.5 rounded bg-muted text-muted-foreground border border-glass-border">
                                            {event.category}
                                        </div>
                                        <div className={cn(
                                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                                            event.tagStyle === "yellow" && "text-neon-yellow border border-neon-yellow/10 bg-neon-yellow/5",
                                            event.tagStyle === "magenta" && "bg-neon-pink text-white",
                                            event.tagStyle === "grey" && "text-muted-foreground"
                                        )}>
                                            {event.tag}
                                        </div>
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="flex flex-col items-center md:items-end gap-2 px-6 shrink-0 border-t md:border-t-0 md:border-l border-glass-border pt-6 md:pt-0 font-inter">
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground/40">Mulai dari</span>
                                    <span className="text-2xl font-black text-neon-yellow tracking-tighter">${event.price}</span>
                                    <button className="mt-2 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest bg-neon-cyan text-black shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:brightness-110 active:scale-95 transition-all">
                                        {event.isVip ? "Buy VIP" : "Buy"}
>>>>>>> Stashed changes
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
<<<<<<< Updated upstream
                </div>
            </main>

            <NeonEventDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
            />
=======

                    {/* Load More Option */}
                    <div className="mt-16 flex justify-center">
                        <button className="px-12 py-4 bg-muted border border-glass-border rounded-full text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:border-neon-pink/30 hover:shadow-[0_0_30px_rgba(255,0,255,0.1)] transition-all">
                            Load More Events
                        </button>
                    </div>
                </section>
            </main>

>>>>>>> Stashed changes
            <NeonFooter />
        </div>
    );
}
<<<<<<< Updated upstream

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
=======
>>>>>>> Stashed changes
