"use client";

import { Bell, Search, Menu, User, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassButton } from "@/app/(frontend)/_components/ui/GlassButton";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

interface NavbarProps {
    isSidebarCollapsed: boolean;
    onToggleSidebar: () => void;
}

export function Navbar({ isSidebarCollapsed, onToggleSidebar }: NavbarProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <header className="sticky top-0 z-30 w-full p-4 md:px-8">
            <div className="glass-card rounded-2xl h-16 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className="md:hidden p-2 hover:bg-glass-hover rounded-lg text-glass-text transition-colors"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="relative hidden md:block group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-glass-text/40 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="bg-muted border border-glass-border rounded-xl pl-10 pr-4 py-2 w-64 focus:w-80 transition-all outline-none focus:border-primary text-glass-text"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <GlassButton
                        variant="ghost"
                        size="sm"
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </GlassButton>

                    <div className="relative">
                        <GlassButton variant="ghost" size="sm" className="relative p-2 rounded-full">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-glass-surface" />
                        </GlassButton>
                    </div>

                    <div className="h-8 w-px bg-glass-border mx-2" />

                    <div className="flex items-center gap-3 pl-2">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-semibold text-glass-text leading-tight">
                                {mounted ? (user?.name || "User") : "User"}
                            </p>
                            <p className="text-xs text-glass-text/60 leading-tight">
                                {mounted ? (user?.roles?.[0] || "Member") : "Member"}
                            </p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary to-sky-400 flex items-center justify-center text-white shadow-lg border border-white/20">
                            <User size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
