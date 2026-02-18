"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function NeonNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        // Check login status
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={cn(
<<<<<<< Updated upstream
            "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
            scrolled ? "bg-background/80 backdrop-blur-md py-3 shadow-lg border-b border-white/5" : "bg-transparent"
        )}>
            <div className="w-full flex items-center justify-between gap-8 px-8 md:px-12 lg:px-16">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <div className="w-9 h-9 bg-neon-cyan rounded-full flex items-center justify-center shadow-lg shadow-neon-cyan/20">
                        <i className="fas fa-bolt text-black text-xs"></i>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-foreground">
                        NEON<span className="text-neon-pink">IX</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <Link href="/" className="text-sm font-bold text-foreground uppercase tracking-wider hover:text-neon-pink transition-colors">Home</Link>
                    <Link href="/explorer" className="text-sm font-bold text-foreground uppercase tracking-wider hover:text-neon-pink transition-colors">Explorer</Link>
                    <Link href="/vip-access" className="text-sm font-bold text-neon-yellow hover:brightness-125 transition-all uppercase tracking-wider">VIP Access</Link>
                    <Link href="/about" className="text-sm font-medium text-foreground/40 hover:text-foreground transition-all font-inter uppercase tracking-wider">About</Link>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                    {isLoggedIn ? (
                        <Link href="/member" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-neon-cyan p-0.5 group-hover:shadow-[0_0_15px_rgba(255,0,255,0.4)] transition-all">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link href="/login" className="text-sm font-bold text-foreground hover:text-neon-pink transition-colors uppercase tracking-wider border border-white/10 px-6 py-2 rounded-full hover:border-neon-pink/50">
                            Sign In
                        </Link>
                    )}
=======
            "fixed top-0 w-full z-50 transition-all duration-300 py-4",
            scrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg border-b border-white/5" : "bg-transparent"
        )}>
            <div className="w-full flex items-center justify-between gap-8 px-8 md:px-12 lg:px-16">
                <div className="flex items-center gap-8 flex-1">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                            <i className="fas fa-bolt text-black text-xs"></i>
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-white">
                            TIX<span className="text-neon-pink">NEON</span>
                        </span>
                    </Link>

                    {/* Navbar Search Bar */}
                    <div className="hidden lg:flex items-center flex-1 max-w-2xl bg-muted/20 border border-white/10 rounded-full px-4 py-1.5 focus-within:bg-muted/30 focus-within:border-neon-pink/50 transition-all">
                        <div className="flex items-center gap-2 flex-1 px-2 border-r border-white/10">
                            <Search size={16} className="text-white/40" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/20 font-inter"
                            />
                        </div>
                        <div className="flex items-center gap-2 px-4 cursor-pointer group whitespace-nowrap">
                            <MapPin size={16} className="text-white/40 group-hover:text-neon-cyan transition-colors" />
                            <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors">Surabaya</span>
                            <ChevronDown size={12} className="text-white/20" />
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8 shrink-0">
                    <Link href="/" className="text-sm font-bold text-neon-pink transition-all uppercase tracking-wider">Find Events</Link>
                    <Link href="/vip-access" className="text-sm font-bold text-neon-yellow hover:brightness-125 transition-all uppercase tracking-wider">VIP Access</Link>
                    <Link href="/about" className="text-sm font-medium text-white/40 hover:text-white transition-all font-inter">Help</Link>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                    <ThemeToggle />
                    <Link href="/login" className="text-sm font-bold text-white hover:text-neon-pink transition-colors uppercase tracking-wider">Log In</Link>
                    <Link href="/register" className="hidden sm:block text-sm font-bold text-white hover:text-neon-pink transition-colors uppercase tracking-wider">Sign Up</Link>
>>>>>>> Stashed changes
                </div>
            </div>
        </nav>
    );
}
