"use client";

import Link from "next/link";
import { NeonButton } from "./NeonButton";
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
                    <div className="w-8 h-8 bg-neon-cyan rounded flex items-center justify-center">
                        <div className="w-4 h-4 bg-black rotate-45" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">
                        TIX<span className="text-neon-pink">NEON</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#" className="text-sm font-bold text-white uppercase tracking-tight hover:text-neon-pink transition-colors">Home</Link>
                    <Link href="#" className="text-sm font-bold text-white/70 uppercase tracking-tight hover:text-white transition-colors">Explorer</Link>
                    <Link href="#" className="text-sm font-bold text-neon-yellow uppercase tracking-tight hover:brightness-125 transition-all">VIP Access</Link>
                    <Link href="#" className="text-sm font-bold text-white/70 uppercase tracking-tight hover:text-white transition-colors">About</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="#" className="text-sm font-bold text-white hover:text-neon-pink transition-colors px-4 py-2">Sign In</Link>
                </div>
            </div>
        </nav>
    );
}
