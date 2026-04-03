"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ChevronDown, Check, X } from "lucide-react";
import { NeonNavbar } from "../_components/layout/NeonNavbar";
import { NeonFooter } from "../_components/layout/NeonFooter";
import { NeonEventDetailModal } from "@/app/(frontend)/_components/ui/NeonEventDetailModal";
import { NeonEventCard } from "@/app/(frontend)/_components/ui/NeonEventCard";
import { NeonTicketCard } from "@/app/(frontend)/_components/ui/NeonTicketCard";
import { GenreSection } from "@/app/(frontend)/(home)/_components/GenreSection";
import { MobileMockupWidget } from "@/app/(frontend)/_components/ui/MobileMockupWidget";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { getPublicEvents, PublicEvent } from "@/services/publicService";
import { getImageUrl } from "@/config/api.config";


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
                console.log("Fetching events...");
                const response = await getPublicEvents();
                console.log("API Response:", response);
                if (response.status === "success" && Array.isArray(response.data)) {
                    console.log(`Successfully fetched ${response.data.length} events`);
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

        const name = event.name || event.title || "";
        const locName = event.locationName || event.location || "";
        const categoryName = event.categoryName || "";
        const city = event.city || "";
        const startDateStr = event.startDate || "";
        const dateObj = startDateStr ? new Date(startDateStr) : null;
        const isDateValid = dateObj && !isNaN(dateObj.getTime());
        const eventYear = isDateValid ? dateObj.getFullYear().toString() : "";

        const price = Number(event.startingPrice) || 0;

        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            locName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        const matchesCategory = category === "All (VIP & Standard)" ||
            (category === "VIP Only" && price > 200) ||
            (category === "Standard Only" && price <= 200);

        return matchesSearch && matchesLocation && matchesDate && matchesPrice && matchesGenre && matchesCategory;
    });

    console.log("Total events:", events.length, "Filtered events:", filteredEvents.length);

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
            title: event.name || event.title || "Unnamed Event",
            image: getImageUrl(event.posterUrl),
            location: `${event.city || ""} - ${event.locationName || event.location || ""}`,
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
                            Explorer<span className="text-primary">.</span>
                        </motion.h1>
                        <p className="text-muted-foreground max-w-lg text-sm font-medium leading-relaxed">
                            Telusuri ratusan event VIP dan standar dengan filter lokasi, tanggal, harga, dan kategori dalam satu layar.
                        </p>
                    </div>

                    <div className="w-full md:max-w-md relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search event, artist, or venue..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-border rounded-full py-5 pl-14 pr-8 text-sm outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground font-bold shadow-sm"
                        />
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-white border border-border rounded-[2.5rem] p-4 flex flex-col lg:flex-row items-center gap-4 shadow-xl mb-16 relative">
                    <div className="flex items-center gap-2 px-6 border-r border-border">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Search Filters</span>
                    </div>

                    <div className="flex flex-1 flex-wrap items-center gap-4 px-4 w-full relative">
                        {/* Location */}
                        <div className="relative flex-1 min-w-[200px]">
                            <div
                                onClick={() => toggleDropdown('location')}
                                className={cn(
                                    "bg-muted/50 border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all hover:border-primary/50",
                                    openDropdown === 'location' ? "border-primary ring-1 ring-primary/20 bg-white" : "border-border"
                                )}
                            >
                                <span className="text-[8px] font-black text-foreground/30 uppercase tracking-[0.2em] px-1">Location</span>
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-xs font-black truncate">{location === "All Locations" ? "All Locations" : location}</span>
                                    <ChevronDown size={14} className={cn("text-foreground/20 transition-transform duration-300", openDropdown === 'location' && "rotate-180 text-primary")} />
                                </div>
                            </div>
                            <AnimatePresence>
                                {openDropdown === 'location' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-border rounded-2xl p-2 shadow-2xl z-[100] max-h-60 overflow-y-auto"
                                    >
                                        {locations.map((loc) => (
                                            <div
                                                key={loc}
                                                onClick={() => { setLocation(loc); setOpenDropdown(null); }}
                                                className={cn(
                                                    "px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-between group cursor-pointer",
                                                    location === loc ? "bg-primary text-white" : "text-foreground/40 hover:bg-muted hover:text-foreground"
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
                                    "bg-muted/50 border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all hover:border-primary/50",
                                    openDropdown === 'date' ? "border-primary ring-1 ring-primary/20 bg-white" : "border-border"
                                )}
                            >
                                <span className="text-[8px] font-black text-foreground/30 uppercase tracking-[0.2em] px-1">Year</span>
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-xs font-black">{date}</span>
                                    <ChevronDown size={14} className={cn("text-foreground/20 transition-transform duration-300", openDropdown === 'date' && "rotate-180 text-primary")} />
                                </div>
                            </div>
                            <AnimatePresence>
                                {openDropdown === 'date' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-border rounded-2xl p-2 shadow-2xl z-[100]"
                                    >
                                        {dates.map((d) => (
                                            <div
                                                key={d}
                                                onClick={() => { setDate(d); setOpenDropdown(null); }}
                                                className={cn(
                                                    "px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-between group cursor-pointer",
                                                    date === d ? "bg-primary text-white" : "text-foreground/40 hover:bg-muted hover:text-foreground"
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
                                    "bg-muted/50 border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all hover:border-primary/50",
                                    openDropdown === 'price' ? "border-primary ring-1 ring-primary/20 bg-white" : "border-border"
                                )}
                            >
                                <span className="text-[8px] font-black text-foreground/30 uppercase tracking-[0.2em] px-1">Price</span>
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-xs font-black">{priceRange}</span>
                                    <ChevronDown size={14} className={cn("text-foreground/20 transition-transform duration-300", openDropdown === 'price' && "rotate-180 text-primary")} />
                                </div>
                            </div>
                            <AnimatePresence>
                                {openDropdown === 'price' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-border rounded-2xl p-2 shadow-2xl z-[100]"
                                    >
                                        {priceRanges.map((pr) => (
                                            <div
                                                key={pr}
                                                onClick={() => { setPriceRange(pr); setOpenDropdown(null); }}
                                                className={cn(
                                                    "px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-between group cursor-pointer",
                                                    priceRange === pr ? "bg-primary text-white" : "text-foreground/40 hover:bg-muted hover:text-foreground"
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
                                    "bg-white border rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all shadow-sm",
                                    openDropdown === 'category' ? "border-primary ring-1 ring-primary/20 bg-white" : "border-border hover:border-primary/50"
                                )}
                            >
                                <span className="text-[8px] font-black text-foreground/30 uppercase tracking-[0.2em] px-1">Category</span>
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-xs font-black text-primary">{category}</span>
                                    <ChevronDown size={14} className={cn("text-primary/40 transition-transform duration-300", openDropdown === 'category' && "rotate-180 text-primary")} />
                                </div>
                            </div>
                            <AnimatePresence>
                                {openDropdown === 'category' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-border rounded-2xl p-2 shadow-2xl z-[100]"
                                    >
                                        {categories.map((cat) => (
                                            <div
                                                key={cat}
                                                onClick={() => { setCategory(cat); setOpenDropdown(null); }}
                                                className={cn(
                                                    "px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-between group cursor-pointer",
                                                    category === cat ? "bg-primary text-white" : "text-foreground/40 hover:bg-muted hover:text-foreground"
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
                        className="text-[10px] font-black text-foreground/30 hover:text-primary transition-colors uppercase tracking-[0.2em] px-8 group flex items-center gap-2"
                    >
                        <X size={14} className="group-hover:rotate-90 transition-transform" />
                        Clear filters
                    </button>
                </div>

                {/* Browse by Genre */}
                <GenreSection
                    activeGenre={activeGenre ?? undefined}
                    onGenreClick={(genre) => setActiveGenre(activeGenre === genre ? null : genre)}
                />

                {/* Results Section */}
                <div className="space-y-12">
                    <div className="flex items-center justify-between border-b border-border pb-8">
                        <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">
                            Displaying {filteredEvents.length} events for current filters
                        </p>
                        <div className="flex items-center gap-4 cursor-pointer group">
                            <span className="text-[10px] font-black text-foreground/30 group-hover:text-primary transition-colors uppercase tracking-[0.2em]">Sort by</span>
                            <div className="bg-white px-6 py-2.5 rounded-xl flex items-center gap-3 border border-border shadow-sm">
                                <span className="text-[10px] font-black uppercase tracking-widest">Trending</span>
                                <ChevronDown size={14} className="text-foreground/20" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 min-h-[400px]">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-pink"></div>
                                <p className="mt-4 text-muted-foreground font-bold tracking-widest uppercase text-[10px]">Memuat Event...</p>
                            </div>
                        ) : filteredEvents.length > 0 ? (
                            filteredEvents.map((event, i) => {
                                // Safe date formatting
                                const dateObj = event.startDate ? new Date(event.startDate) : null;
                                const isDateValid = dateObj && !isNaN(dateObj.getTime());

                                const eventDate = isDateValid ? dateObj.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: 'short',
                                }) : "TBA";

                                const eventTime = isDateValid ? dateObj.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                }) : "";

                                const startingPrice = Number(event.startingPrice) || 0;
                                const eventName = event.name || event.title || "Unnamed Event";
                                const locationName = event.locationName || event.location || "Unknown Location";
                                const city = event.city || "Unknown City";

                                const posterUrl = getImageUrl(event.posterUrl);
                                const categoryName = event.categoryName || "Uncategorized";

                                // Determine Type & Tag based on data or simple logic for now
                                const type = i % 3 === 0 ? "VIP" : "STANDARD";
                                const customTag = i % 5 === 0 ? "Limited Seats" :
                                    i % 4 === 0 ? "Includes Backstage Tour" :
                                        undefined;

                                return (
                                    <NeonTicketCard
                                        key={event.id || `event-${i}`}
                                        image={posterUrl}
                                        title={eventName}
                                        location={`${locationName} · ${city}`}
                                        date={eventDate}
                                        time={eventTime}
                                        price={startingPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        category={categoryName}
                                        type={type}
                                        tag={customTag}
                                        onClick={() => handleEventClick(event)}
                                    />
                                );
                            })
                        ) : (
                            <div className="flex flex-col items-center justify-center py-48 text-center space-y-6">
                                <div className="w-24 h-24 bg-muted border border-border rounded-[2rem] flex items-center justify-center text-foreground/10 mb-2">
                                    <Search size={40} />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight">No Events Found</h3>
                                <p className="text-muted-foreground text-sm max-w-[340px] font-medium leading-relaxed">Try adjusting your filters or use different keywords to find your dream event.</p>
                                <button onClick={resetFilters} className="px-10 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all mt-4 shadow-xl shadow-primary/20">
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Background elements refined for light theme */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-20">
                <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full animate-pulse delay-1000" />
            </div>

            <NeonEventDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
            />

            <NeonFooter />
            <MobileMockupWidget />
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
