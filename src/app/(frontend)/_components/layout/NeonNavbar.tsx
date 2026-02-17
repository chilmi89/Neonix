"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
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
            scrolled ? "bg-background/80 backdrop-blur-md py-3 shadow-lg border-b border-white/5" : "bg-transparent"
        )}>
            <div className="w-full flex items-center justify-between gap-8 px-8 md:px-12 lg:px-16">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <div className="w-9 h-9 bg-neon-cyan rounded-full flex items-center justify-center shadow-lg shadow-neon-cyan/20">
                        <i className="fas fa-bolt text-black text-xs"></i>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-foreground">
                        TIX<span className="text-neon-pink">NEON</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <Link href="/" className="text-sm font-bold text-foreground uppercase tracking-wider hover:text-neon-pink transition-colors">Home</Link>
                    <Link href="/explorer" className="text-sm font-bold text-foreground uppercase tracking-wider hover:text-neon-pink transition-colors">Explorer</Link>
                    <Link href="/member" className="text-sm font-bold text-foreground uppercase tracking-wider hover:text-neon-pink transition-colors">Dashboard</Link>
                    <Link href="/vip-access" className="text-sm font-bold text-neon-yellow hover:brightness-125 transition-all uppercase tracking-wider">VIP Access</Link>
                    <Link href="/about" className="text-sm font-medium text-foreground/40 hover:text-foreground transition-all font-inter uppercase tracking-wider">About</Link>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                    <Link href="/member" className="text-sm font-bold text-foreground hover:text-neon-pink transition-colors uppercase tracking-wider">Account</Link>
                </div>
            </div>
        </nav>
    );
}
