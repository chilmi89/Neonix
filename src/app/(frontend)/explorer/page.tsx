"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ChevronDown, Check, X } from "lucide-react";
import { NeonNavbar } from "../_components/layout/NeonNavbar";
import { NeonFooter } from "../_components/layout/NeonFooter";
import { NeonEventDetailModal } from "../_components/ui/NeonEventDetailModal";
import { GenreSection } from "@/app/(frontend)/(home)/_components/GenreSection";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { getPublicEvents, PublicEvent } from "@/services/publicService";


const locations = ["All Locations", "Indonesia", "Singapore", "Japan", "USA", "UK"];
const dates = ["All Years", "2024", "2025", "2026"];
const priceRanges = ["All Prices", "< $100", "$100 - $300", "$300 - $600", "> $600"];
const categories = ["All (VIP & Standard)", "VIP Only", "Standard Only"];

function ExplorerPageContent() {
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<PublicEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [location, setLocation] = useState("All Locations");
    const [date, setDate] = useState("All Years");
    const [priceRange, setPriceRange] = useState("All Prices");
    const [category, setCategory] = useState("All (VIP & Standard)");

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [activeGenre, setActiveGenre] = useState<string | null>(null);

    // Fetch Events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getPublicEvents();
                if (response.status === "success" && Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    console.warn("API success but data is not an array:", response.data);
                    setEvents([]);
                }
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Read search query and location from URL on mount
    useEffect(() => {
        const q = searchParams.get("q");
        if (q) setSearchQuery(q);
        const loc = searchParams.get("location");
        if (loc && locations.includes(loc)) setLocation(loc);
    }, [searchParams]);

    // Filter Logic
    const filteredEvents = (events || []).filter(event => {
        if (!event) return false;

        const name = event.name || "";
        const locationName = event.locationName || "";
        const categoryName = event.categoryName || "";
        const city = event.city || "";
        const startDateStr = event.startDate || "";
        const dateObj = startDateStr ? new Date(startDateStr) : null;
        const isDateValid = dateObj && !isNaN(dateObj.getTime());
        const eventYear = isDateValid ? dateObj.getFullYear().toString() : "";

        const price = Number(event.startingPrice) || 0;

        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            categoryName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLocation = location === "All Locations" || city.toLowerCase() === location.toLowerCase();

        const matchesDate = date === "All Years" || eventYear === date;

        let matchesPrice = true;
        if (priceRange === "< $100") matchesPrice = price < 100;
        else if (priceRange === "$100 - $300") matchesPrice = price >= 100 && price <= 300;
        else if (priceRange === "$300 - $600") matchesPrice = price > 300 && price <= 600;
        else if (priceRange === "> $600") matchesPrice = price > 600;

        // Genre mapping matching API categories
        const matchesGenre = !activeGenre || (categoryName.toUpperCase() === activeGenre.toUpperCase());

        // Note: isVip placeholder logic
        let matchesCategory = true;
        if (category === "VIP Only") matchesCategory = false;
        else if (category === "Standard Only") matchesCategory = true;

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

    const handleEventClick = (event: PublicEvent) => {
        if (!event) return;

        const dateObj = event.startDate ? new Date(event.startDate) : null;
        const isDateValid = dateObj && !isNaN(dateObj.getTime());

        const mappedEvent = {
            id: event.id?.toString() || "",
            title: event.name || "Unnamed Event",
            image: event.posterUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
            location: `${event.city || ""} - ${event.locationName || ""}`,
            date: isDateValid ? dateObj.toLocaleDateString('id-ID', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : "TBA",
            price: (Number(event.startingPrice) || 0).toString(),
            genres: [event.categoryName || "Uncategorized"],
        };
        setSelectedEvent(mappedEvent);
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
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-pink"></div>
                                <p className="mt-4 text-muted-foreground font-bold tracking-widest uppercase text-[10px]">Memuat Event...</p>
                            </div>
                        ) : filteredEvents.length > 0 ? (
                            filteredEvents.map((event, i) => {
                                // Safe date formatting to prevent hydration mismatch and RangeError
                                const dateObj = event.startDate ? new Date(event.startDate) : null;
                                const isDateValid = dateObj && !isNaN(dateObj.getTime());

                                const eventDate = isDateValid ? dateObj.toLocaleDateString('id-ID', {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }) : "TBA";

                                const startingPrice = Number(event.startingPrice) || 0;
                                const eventName = event.name || "Unnamed Event";
                                const locationName = event.locationName || "Unknown Location";
                                const city = event.city || "Unknown City";
                                const posterUrl = event.posterUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800";
                                const categoryName = event.categoryName || "Uncategorized";

                                return (
                                    <motion.div
                                        key={event.id || `event-${i}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: (i % 4) * 0.05 }}
                                        onClick={() => handleEventClick(event)}
                                        className="bg-[#0C0C0C] border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center gap-6 p-4 group hover:border-white/10 transition-all hover:bg-[#111111] cursor-pointer"
                                    >
                                        <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden shrink-0 relative">
                                            <img src={posterUrl} alt={eventName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-neon-yellow/10 backdrop-blur-md text-neon-yellow text-[7px] font-black uppercase tracking-widest rounded-md border border-neon-yellow/20">
                                                VIP
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-2 w-full text-left">
                                            <h3 className="text-base font-black tracking-tight text-white group-hover:text-neon-pink transition-colors">{eventName}</h3>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">
                                                    {locationName} · {city}
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{eventDate}</span>
                                                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{categoryName}</span>
                                                    <span className="px-2 py-0.5 bg-neon-yellow/5 border border-neon-yellow/10 text-neon-yellow text-[8px] font-black uppercase tracking-widest rounded-full">
                                                        Limited Seats
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-auto flex flex-row md:flex-row items-center justify-between md:justify-end gap-12 px-2">
                                            <div className="text-right">
                                                <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest leading-none mb-1">Mulai dari</p>
                                                <div className="text-2xl font-black tracking-tighter text-neon-yellow">${startingPrice.toFixed(2)}</div>
                                            </div>
                                            <button className="px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 bg-neon-cyan text-black hover:shadow-[0_0_20px_rgba(0,255,242,0.4)] shadow-lg">
                                                Buy VIP
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })
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

export default function ExplorerPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin text-neon-pink">Loading Explorer...</div>
            </div>
        }>
            <ExplorerPageContent />
        </Suspense>
    );
}
