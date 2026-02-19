"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ChevronDown, Check, X } from "lucide-react";
import { NeonNavbar } from "../_components/layout/NeonNavbar";
import { NeonFooter } from "../_components/layout/NeonFooter";
import { NeonEventDetailModal } from "../_components/ui/NeonEventDetailModal";
import { GenreSection } from "@/app/(frontend)/(home)/_components/GenreSection";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const events = [
    {
        id: "1",
        title: "Neon Sky VIP Rooftop Party",
        venue: "Skyline Tower - Jakarta",
        country: "Indonesia",
        city: "Jakarta",
        date: "Fri, 25 Oct 2025 - 21:00",
        year: "2025",
        type: "Konser",
        status: "Limited Seats",
        price: "320.00",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
        isVip: true
    },
    {
        id: "2",
        title: "Night League Finals: Jakarta vs Surabaya",
        venue: "National Arena - Jakarta",
        country: "Indonesia",
        city: "Jakarta",
        date: "Sat, 02 Nov 2024 - 19:30",
        year: "2024",
        type: "Sport",
        status: "Kategori: Standard",
        price: "75.00",
        image: "https://images.unsplash.com/photo-1540575861501-7ad058bf3efb?auto=format&fit=crop&q=80&w=800",
        isVip: false
    },
    {
        id: "3",
        title: "Phantom of the Opera - Royal Box",
        venue: "Grand Theater Hall - Jakarta",
        country: "Indonesia",
        city: "Jakarta",
        date: "Sun, 10 Nov 2024 - 20:00",
        year: "2024",
        type: "Theater",
        status: "Includes Backstage Tour",
        price: "540.00",
        image: "https://images.unsplash.com/photo-1514525253344-a8135a43cf3e?auto=format&fit=crop&q=80&w=800",
        isVip: true
    },
    {
        id: "4",
        title: "FutureTech Summit 2025",
        venue: "Convention Center - Jakarta",
        country: "Indonesia",
        city: "Jakarta",
        date: "Thu, 05 Dec 2025 - 09:00",
        year: "2025",
        type: "Konferensi",
        status: "All Access Pass",
        price: "260.00",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800",
        isVip: false
    },
    {
        id: "5",
        title: "Cyberpunk Tokyo Night",
        venue: "Shibuya Crossing Arena - Tokyo",
        country: "Japan",
        city: "Tokyo",
        date: "Wed, 12 Mar 2026 - 22:00",
        year: "2026",
        type: "Party",
        status: "Neon Access Only",
        price: "450.00",
        image: "https://images.unsplash.com/photo-1540959733332-e94e7bf71f0d?auto=format&fit=crop&q=80&w=800",
        isVip: true
    },
    {
        id: "6",
        title: "Formula E Singapore Grand Prix",
        venue: "Marina Bay Circuit - Singapore",
        country: "Singapore",
        city: "Singapore",
        date: "Sat, 20 Sep 2025 - 18:00",
        year: "2025",
        type: "Sport",
        status: "VIP Lounge Available",
        price: "850.00",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800",
        isVip: true
    },
    {
        id: "7",
        title: "Silicon Valley AI Expo",
        venue: "Maron Center - Los Angeles",
        country: "USA",
        city: "Los Angeles",
        date: "Mon, 15 Jul 2024 - 10:00",
        year: "2024",
        type: "Konferensi",
        status: "Free for Students",
        price: "45.00",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        isVip: false
    },
    {
        id: "8",
        title: "Glastonbury Music Festival 2026",
        venue: "Worthy Farm - London",
        country: "UK",
        city: "London",
        date: "Fri, 26 Jun 2026 - 12:00",
        year: "2026",
        type: "Music",
        status: "Tickets Selling Fast",
        price: "1200.00",
        image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800",
        isVip: true
    }
];

const locations = ["All Locations", "Indonesia", "Singapore", "Japan", "USA", "UK"];
const dates = ["All Years", "2024", "2025", "2026"];
const priceRanges = ["All Prices", "< $100", "$100 - $300", "$300 - $600", "> $600"];
const categories = ["All (VIP & Standard)", "VIP Only", "Standard Only"];

export default function ExplorerPage() {
    const searchParams = useSearchParams();
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [location, setLocation] = useState("All Locations");
    const [date, setDate] = useState("All Years");
    const [priceRange, setPriceRange] = useState("All Prices");
    const [category, setCategory] = useState("All (VIP & Standard)");

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [activeGenre, setActiveGenre] = useState<string | null>(null);

    // Read search query and location from URL on mount
    useEffect(() => {
        const q = searchParams.get("q");
        if (q) setSearchQuery(q);
        const loc = searchParams.get("location");
        if (loc && locations.includes(loc)) setLocation(loc);
    }, [searchParams]);

    // Filter Logic
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.type.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLocation = location === "All Locations" || event.country === location;
        const matchesDate = date === "All Years" || event.year === date;

        const price = parseFloat(event.price);
        let matchesPrice = true;
        if (priceRange === "< $100") matchesPrice = price < 100;
        else if (priceRange === "$100 - $300") matchesPrice = price >= 100 && price <= 300;
        else if (priceRange === "$300 - $600") matchesPrice = price > 300 && price <= 600;
        else if (priceRange === "> $600") matchesPrice = price > 600;

        let matchesCategory = true;
        if (category === "VIP Only") matchesCategory = event.isVip;
        else if (category === "Standard Only") matchesCategory = !event.isVip;

        // Genre mapping
        const genreMap: Record<string, string[]> = {
            "Electronic": ["Konser", "Party"],
            "Hip Hop": ["Konser", "Music"],
            "Jazz": ["Konser", "Music"],
            "Rock": ["Konser", "Music"],
            "Comedy": ["Theater"],
            "Sports": ["Sport"],
        };
        const matchesGenre = !activeGenre || (genreMap[activeGenre]?.includes(event.type) ?? false);

        return matchesSearch && matchesLocation && matchesDate && matchesPrice && matchesCategory && matchesGenre;
    });

    const resetFilters = () => {
        setSearchQuery("");
        setLocation("All Locations");
        setDate("All Years");
        setPriceRange("All Prices");
        setCategory("All (VIP & Standard)");
        setActiveGenre(null);
    };

    const handleEventClick = (event: any) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-inter relative overflow-x-hidden">
            <NeonNavbar />

            <main className="w-full px-8 md:px-12 lg:px-16 pt-32 pb-40 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4"
                        >
                            Explorer<span className="text-neon-pink">.</span>
                        </motion.h1>
                        <p className="text-muted-foreground max-w-lg text-sm font-medium leading-relaxed">
                            Telusuri ratusan event VIP dan standar dengan filter lokasi, tanggal, harga, dan kategori dalam satu layar.
                        </p>
                    </div>

                    <div className="w-full md:max-w-md relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-neon-pink transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Cari event, artis, atau venue..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-muted border border-glass-border rounded-full py-5 pl-14 pr-8 text-sm outline-none focus:border-neon-pink/50 transition-all placeholder:text-muted-foreground font-medium"
                        />
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-muted border border-glass-border rounded-[2.5rem] p-4 flex flex-col lg:flex-row items-center gap-4 shadow-2xl mb-16 relative">
                    <div className="flex items-center gap-2 px-6 border-r border-glass-border">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Filter pencarian</span>
                    </div>

                    <div className="flex flex-1 flex-wrap items-center gap-4 px-4 w-full relative">
                        {/* Location */}
                        <div className="relative flex-1 min-w-[200px]">
                            <div
                                onClick={() => toggleDropdown('location')}
                                className={cn(
                                    "bg-background border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all hover:border-neon-cyan/50",
                                    openDropdown === 'location' ? "border-neon-cyan ring-1 ring-neon-cyan/20" : "border-glass-border"
                                )}
                            >
                                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest px-1">Location</span>
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-xs font-bold truncate">{location === "All Locations" ? "All Locations" : location}</span>
                                    <ChevronDown size={14} className={cn("text-muted-foreground transition-transform duration-300", openDropdown === 'location' && "rotate-180 text-neon-cyan")} />
                                </div>
                            </div>
                            <AnimatePresence>
                                {openDropdown === 'location' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-[calc(100%+8px)] left-0 w-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-[100] max-h-60 overflow-y-auto"
                                    >
                                        {locations.map((loc) => (
                                            <div
                                                key={loc}
                                                onClick={() => { setLocation(loc); setOpenDropdown(null); }}
                                                className={cn(
                                                    "px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer",
                                                    location === loc ? "bg-neon-cyan text-black" : "text-white/60 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                {loc}
                                                {location === loc && <Check size={14} />}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Date */}
                        <div className="relative flex-1 min-w-[150px]">
                            <div
                                onClick={() => toggleDropdown('date')}
                                className={cn(
                                    "bg-background border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all hover:border-neon-pink/50",
                                    openDropdown === 'date' ? "border-neon-pink ring-1 ring-neon-pink/20" : "border-glass-border"
                                )}
                            >
                                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest px-1">Year</span>
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-xs font-bold">{date}</span>
                                    <ChevronDown size={14} className={cn("text-muted-foreground transition-transform duration-300", openDropdown === 'date' && "rotate-180 text-neon-pink")} />
                                </div>
                            </div>
                            <AnimatePresence>
                                {openDropdown === 'date' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-[calc(100%+8px)] left-0 w-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-[100]"
                                    >
                                        {dates.map((d) => (
                                            <div
                                                key={d}
                                                onClick={() => { setDate(d); setOpenDropdown(null); }}
                                                className={cn(
                                                    "px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer",
                                                    date === d ? "bg-neon-pink text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                {d}
                                                {date === d && <Check size={14} />}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Price */}
                        <div className="relative flex-1 min-w-[180px]">
                            <div
                                onClick={() => toggleDropdown('price')}
                                className={cn(
                                    "bg-background border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all hover:border-neon-yellow/50",
                                    openDropdown === 'price' ? "border-neon-yellow ring-1 ring-neon-yellow/20" : "border-glass-border"
                                )}
                            >
                                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest px-1">Price</span>
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-xs font-bold">{priceRange}</span>
                                    <ChevronDown size={14} className={cn("text-muted-foreground transition-transform duration-300", openDropdown === 'price' && "rotate-180 text-neon-yellow")} />
                                </div>
                            </div>
                            <AnimatePresence>
                                {openDropdown === 'price' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-[calc(100%+8px)] left-0 w-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-[100]"
                                    >
                                        {priceRanges.map((pr) => (
                                            <div
                                                key={pr}
                                                onClick={() => { setPriceRange(pr); setOpenDropdown(null); }}
                                                className={cn(
                                                    "px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer",
                                                    priceRange === pr ? "bg-neon-yellow text-black" : "text-white/60 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                {pr}
                                                {priceRange === pr && <Check size={14} />}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Category */}
                        <div className="relative flex-1 min-w-[220px]">
                            <div
                                onClick={() => toggleDropdown('category')}
                                className={cn(
                                    "bg-black border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all shadow-[0_0_20px_rgba(255,0,255,0.05)]",
                                    openDropdown === 'category' ? "border-neon-pink ring-1 ring-neon-pink/20" : "border-neon-pink/30 hover:border-neon-pink/50"
                                )}
                            >
                                <span className="text-[8px] font-bold text-neon-pink uppercase tracking-widest px-1">Category</span>
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-xs font-bold text-neon-pink">{category}</span>
                                    <ChevronDown size={14} className={cn("text-neon-pink/40 transition-transform duration-300", openDropdown === 'category' && "rotate-180 text-neon-pink")} />
                                </div>
                            </div>
                            <AnimatePresence>
                                {openDropdown === 'category' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-[calc(100%+8px)] left-0 w-full bg-black/90 backdrop-blur-xl border border-neon-pink/20 rounded-2xl p-2 shadow-2xl z-[100]"
                                    >
                                        {categories.map((cat) => (
                                            <div
                                                key={cat}
                                                onClick={() => { setCategory(cat); setOpenDropdown(null); }}
                                                className={cn(
                                                    "px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group cursor-pointer",
                                                    category === cat ? "bg-neon-pink text-white" : "text-neon-pink/60 hover:bg-neon-pink/10 hover:text-neon-pink"
                                                )}
                                            >
                                                {cat}
                                                {category === cat && <Check size={14} />}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <button
                        onClick={resetFilters}
                        className="text-[10px] font-bold text-muted-foreground hover:text-neon-pink transition-colors uppercase tracking-widest px-8 group flex items-center gap-2"
                    >
                        <X size={14} className="group-hover:rotate-90 transition-transform" />
                        Reset filter
                    </button>
                </div>

                {/* Browse by Genre */}
                <GenreSection
                    activeGenre={activeGenre ?? undefined}
                    onGenreClick={(genre) => setActiveGenre(activeGenre === genre ? null : genre)}
                />

                {/* Results Section */}
                <div className="space-y-12">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            Menampilkan {filteredEvents.length} event untuk filter saat ini
                        </p>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-widest">Sort by</span>
                            <div className="bg-muted px-4 py-2 rounded-lg flex items-center gap-2 border border-glass-border">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Trending</span>
                                <ChevronDown size={12} className="text-muted-foreground" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 min-h-[400px]">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (i % 4) * 0.05 }}
                                    onClick={() => handleEventClick(event)}
                                    className="bg-muted/50 backdrop-blur-sm border border-glass-border rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center gap-8 p-4 group hover:border-glass-border transition-all hover:shadow-2xl cursor-pointer"
                                >
                                    <div className="w-full md:w-64 h-40 rounded-2xl overflow-hidden shrink-0 relative">
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        {event.isVip ? (
                                            <div className="absolute top-3 left-3 px-3 py-1 bg-neon-pink text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(255,0,255,0.4)]">
                                                VIP
                                            </div>
                                        ) : (
                                            <div className="absolute top-3 left-3 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10">
                                                STANDARD
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-4 w-full">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[8px] font-black bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/40 uppercase tracking-widest">{event.type}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                                <span className="text-[8px] font-bold text-neon-cyan uppercase tracking-widest">{event.city}, {event.country}</span>
                                            </div>
                                            <h3 className="text-xl font-black tracking-tight leading-none group-hover:text-neon-pink transition-colors">{event.title}</h3>
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{event.venue}</p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-black/20 px-3 py-2 rounded-xl">
                                                <Calendar size={12} className="text-neon-pink/50" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-neon-yellow uppercase tracking-widest bg-neon-yellow/5 border border-neon-yellow/10 px-3 py-2 rounded-xl">
                                                {event.status}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto text-right px-6 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0">
                                        <div className="space-y-0.5">
                                            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none">Mulai dari</p>
                                            <div className="text-3xl font-black tracking-tighter text-white">${event.price}</div>
                                        </div>
                                        <button className={cn(
                                            "px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg",
                                            event.isVip
                                                ? "bg-neon-cyan text-black hover:bg-neon-pink hover:text-white shadow-neon-cyan/20"
                                                : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                        )}>
                                            Detail
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-40 text-center space-y-4">
                                <div className="w-20 h-20 bg-muted border border-glass-border rounded-full flex items-center justify-center text-muted-foreground mb-4">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight">Tidak Ada Event</h3>
                                <p className="text-muted-foreground text-sm max-w-xs font-medium">Cobalah reset filter atau gunakan kata kunci lain untuk menemukan event impianmu.</p>
                                <button onClick={resetFilters} className="px-8 py-3 bg-neon-pink text-white rounded-full text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all mt-4">
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Background elements to make it "Neon" */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-30">
                <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-neon-pink/20 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-neon-cyan/20 blur-[150px] rounded-full animate-pulse delay-1000" />
            </div>

            <NeonEventDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
            />

            <NeonFooter />
        </div>
    );
}
