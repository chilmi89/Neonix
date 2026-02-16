"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function NeonNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
            scrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                        <i className="fas fa-bolt text-black text-xs"></i>
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-white">
                        TIX<span className="text-neon-pink">NEON</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <Link href="/" className="text-sm font-medium text-neon-pink transition-all">Home</Link>
                    <Link href="#" className="text-sm font-medium text-white/40 hover:text-white transition-all font-inter">Explorer</Link>
                    <Link href="#" className="text-sm font-medium text-neon-yellow hover:brightness-125 transition-all">VIP Access</Link>
                    <Link href="#" className="text-sm font-medium text-white/40 hover:text-white transition-all font-inter">About</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-white hover:text-neon-pink transition-colors">Sign In</Link>
                </div>
            </div>
        </nav>
    );
}
