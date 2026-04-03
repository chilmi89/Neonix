"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function NeonNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        // Check login status
        try {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");
            if (token && userData) {
                setIsLoggedIn(true);
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/explorer", label: "Events" },
        { href: "/vip-access", label: "EO Register" },
        { href: "/about", label: "About" },
        ...(isLoggedIn ? [{ href: "/member", label: "Member" }] : []),
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
            scrolled ? "bg-background/90 backdrop-blur-md py-3 shadow-sm border-b border-border/50" : "bg-transparent"
        )}>
            <div className="w-full flex items-center justify-between gap-8 px-8 md:px-12 lg:px-16">
                <Link href="/" className="flex items-center gap-2 shrink-0 group">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                        <i className="fas fa-bolt text-white text-xs"></i>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-foreground">
                        NEON<span className="text-primary">IX</span>
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
                                    ? "text-primary"
                                    : "text-foreground/60 hover:text-primary"
                            )}
                        >
                            {link.label}
                            {isActive(link.href) && (
                                <motion.span
                                    layoutId="nav-active"
                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-6 shrink-0">
                    {isLoggedIn ? (
                        <Link href="/member" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-muted border-2 border-primary/20 p-0.5 group-hover:border-primary transition-all">
                                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
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
                            <Link href="/login" className="text-sm font-bold text-foreground hover:text-primary transition-colors uppercase tracking-wider bg-primary/5 px-6 py-2 rounded-full border border-primary/20 hover:bg-primary hover:text-white">
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
