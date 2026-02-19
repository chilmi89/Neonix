"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const locationOptions = [
    { label: "All Locations", value: "" },
    { label: "Jakarta, ID", value: "Indonesia" },
    { label: "Singapore", value: "Singapore" },
    { label: "Tokyo, JP", value: "Japan" },
    { label: "Los Angeles, US", value: "USA" },
    { label: "London, UK", value: "UK" },
];

export function NeonHero() {
    const [query, setQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(locationOptions[1]); // default Jakarta
    const [locationOpen, setLocationOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown on click outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setLocationOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        const trimmed = query.trim();
        if (trimmed) params.set("q", trimmed);
        if (selectedLocation.value) params.set("location", selectedLocation.value);
        const qs = params.toString();
        router.push(`/explorer${qs ? `?${qs}` : ""}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20">
            {/* Content */}
            <div className="w-full text-center relative z-10 py-20 px-8 md:px-12 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-[950] leading-[0.85] tracking-tighter uppercase text-white">
                        EXPERIENCE THE<br />
                        <span className="text-neon-pink drop-shadow-[0_0_30px_rgba(255,0,255,0.4)]">Extraordinary</span>
                    </h1>
                </motion.div>

                <p className="max-w-2xl mx-auto text-white/60 text-base md:text-lg font-medium leading-relaxed mt-8">
                    Your gateway to the most electrifying live performances, exclusive gatherings, and unforgettable nights.
                </p>

                {/* Search Bar */}
                <div className="max-w-[800px] mx-auto mt-20 bg-black/60 backdrop-blur-3xl border border-white/10 p-2.5 rounded-full flex flex-col md:flex-row items-center gap-2 shadow-2xl relative">
                    <div className="flex-1 w-full px-8 py-3 flex items-center gap-4 border-r border-white/5">
                        <Search className="text-white/40" size={20} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search events, artists..."
                            className="bg-transparent border-none outline-none text-white w-full text-sm font-bold placeholder:text-white/20"
                        />
                    </div>

                    {/* Location Dropdown */}
                    <div ref={dropdownRef} className="relative w-full md:w-auto">
                        <div
                            onClick={() => setLocationOpen(!locationOpen)}
                            className="w-full md:w-auto px-8 py-3 flex items-center gap-4 cursor-pointer group"
                        >
                            <MapPin className={cn("transition-colors", locationOpen ? "text-neon-cyan" : "text-white/40 group-hover:text-neon-cyan")} size={20} />
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Location</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-sm font-black uppercase tracking-wider">{selectedLocation.label}</span>
                                    <ChevronDown size={10} className={cn("text-white/20 transition-transform duration-300", locationOpen && "rotate-180 text-neon-cyan")} />
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {locationOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-[calc(100%+12px)] left-0 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-[100]"
                                >
                                    {locationOptions.map((loc) => (
                                        <div
                                            key={loc.label}
                                            onClick={() => { setSelectedLocation(loc); setLocationOpen(false); }}
                                            className={cn(
                                                "px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer",
                                                selectedLocation.label === loc.label
                                                    ? "bg-neon-cyan text-black"
                                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                                            )}
                                        >
                                            {loc.label}
                                            {selectedLocation.label === loc.label && <Check size={14} />}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={handleSearch}
                        className="w-full md:w-auto bg-neon-pink text-white font-black text-sm px-10 h-14 rounded-full shadow-lg shadow-neon-pink/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                    >
                        Find Events
                    </button>
                </div>
            </div>
        </section >
    );
}
