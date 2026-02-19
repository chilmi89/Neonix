"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, MapPin, ChevronDown } from "lucide-react";

export function NeonNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname();

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

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/explorer", label: "Explorer" },
        { href: "/vip-access", label: "VIP Access" },
        { href: "/about", label: "About" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

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
                        NEON<span className="text-neon-pink">IX</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-bold uppercase tracking-wider transition-all relative",
                                isActive(link.href)
                                    ? link.href === "/vip-access"
                                        ? "text-neon-yellow"
                                        : "text-neon-pink"
                                    : link.href === "/vip-access"
                                        ? "text-neon-yellow/50 hover:text-neon-yellow"
                                        : "text-foreground/50 hover:text-neon-pink"
                            )}
                        >
                            {link.label}
                            {isActive(link.href) && (
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-full h-0.5 rounded-full",
                                    link.href === "/vip-access" ? "bg-neon-yellow" : "bg-neon-pink"
                                )} />
                            )}
                        </Link>
                    ))}
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
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm font-bold text-foreground hover:text-neon-pink transition-colors uppercase tracking-wider border border-white/10 px-6 py-2 rounded-full hover:border-neon-pink/50">
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
