"use client";

import { Bell, Search, Menu, User, Sun, Moon, QrCode, Grid } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useTheme } from "next-themes";
import { QrScannerModal } from "../ui/QrScannerModal";
import Script from "next/script";

interface NavbarProps {
    isSidebarCollapsed: boolean;
    onToggleSidebar: () => void;
    onScanOpen: () => void;
}

export function Navbar({ isSidebarCollapsed, onToggleSidebar, onScanOpen }: NavbarProps) {
    const [mounted, setMounted] = useState(false);
    const { user } = useUser();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
    };

    return (
        <header className="sticky top-0 z-30 flex w-full bg-[var(--glass-surface)] border-b border-[var(--glass-border)] drop-shadow-sm transition-colors duration-500 overflow-visible">
            <Script src="https://unpkg.com/html5-qrcode" strategy="lazyOnload" />
            <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    <button
                        onClick={onToggleSidebar}
                        className="z-50 block rounded-sm border border-[var(--glass-border)] bg-[var(--background)] p-1.5 shadow-sm lg:hidden hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <div className="hidden sm:block">
                    <div className="relative group flex items-center gap-2">
                        <button className="absolute left-0 top-1/2 -translate-y-1/2 p-2">
                            <Search className="text-[var(--muted-foreground)] group-focus-within:text-[var(--primary)] transition-colors" size={20} />
                        </button>
                        <input
                            type="text"
                            placeholder="Search or type command..."
                            className="w-full bg-transparent pl-10 pr-16 py-2 text-[var(--foreground)] focus:outline-none xl:w-125 placeholder:text-[var(--muted-foreground)] text-sm"
                        />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-70 group-focus-within:opacity-100 transition-opacity pointer-events-none bg-[var(--muted)] px-2 py-1 rounded-md border border-[var(--glass-border)]">
                            <span className="text-[10px] text-[var(--muted-foreground)] font-semibold">⌘</span>
                            <span className="text-[10px] text-[var(--muted-foreground)] font-semibold">K</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7 ml-auto">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <li>
                            <button
                                onClick={onScanOpen}
                                className="flex h-[38px] items-center gap-2 px-4 rounded-full bg-primary text-white hover:brightness-110 transition-all shadow-lg shadow-primary/20 active:scale-95 group"
                                aria-label="Scan Ticket QR"
                            >
                                <QrCode size={18} className="group-hover:rotate-12 transition-transform" />
                                <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Scan QR</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={toggleTheme}
                                className="relative flex h-[34px] w-[34px] items-center justify-center rounded-full border-[0.5px] border-[var(--glass-border)] bg-[var(--glass-hover)] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                                aria-label="Toggle Theme"
                            >
                                {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
                            </button>
                        </li>
                        <li>
                            <button className="relative flex h-[34px] w-[34px] items-center justify-center rounded-full border-[0.5px] border-[var(--glass-border)] bg-[var(--glass-hover)] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-[#DC3545]">
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-[#DC3545] opacity-75"></span>
                                </span>
                                <Bell size={18} />
                            </button>
                        </li>
                    </ul>

                    <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity pl-2 border-l border-[var(--glass-border)]">
                        <span className="h-10 w-10 rounded-full bg-[var(--primary)] text-white overflow-hidden flex items-center justify-center font-bold text-lg shadow-inner">
                            {mounted ? (user?.name?.[0] || user?.username?.[0] || "U").toUpperCase() : "U"}
                        </span>

                        <span className="hidden lg:flex lg:items-center lg:gap-2">
                            <span className="block text-sm font-semibold text-[var(--foreground)]">
                                {mounted ? (user?.name || user?.username || "Admin") : "User"}
                            </span>
                            <svg className="hidden fill-current sm:block text-[var(--muted-foreground)]" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
