"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    User,
    Ticket,
    Settings,
    LogOut,
    ChevronRight,
    Search,
    Bell
} from "lucide-react";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";
import { LiquidBackground } from "@/app/(frontend)/_components/ui/LiquidBackground";
import { ProfileSection } from "./_components/ProfileSection";
import { TicketsHistory } from "./_components/TicketsHistory";
import { SettingsSection } from "./_components/SettingsSection";

export default function DashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"profile" | "tickets" | "settings">("tickets");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
            router.push("/login");
            return;
        }

        setUser(JSON.parse(userData));
    }, [router]);

    const menuItems = [
        { id: "profile", label: "Profile", icon: User },
        { id: "tickets", label: "My Tickets", icon: Ticket },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    if (!user) return null; // Avoid flicker before redirect

    return (
        <div className="min-h-screen bg-black text-white selection:bg-neon-pink/30 overflow-x-hidden font-inter relative">
            <LiquidBackground />
            <NeonNavbar />

            <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[280px_1fr] gap-12">
                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-cyan p-0.5">
                                <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center overflow-hidden">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Alex'}`}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="font-black text-lg uppercase tracking-tight">{user?.name || 'Alex Morgan'}</h2>
                                <p className="text-[10px] text-neon-cyan font-bold uppercase tracking-widest">VIP Member</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id as any)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${activeTab === item.id
                                        ? "bg-neon-pink/10 border border-neon-pink/20 text-white"
                                        : "hover:bg-white/5 text-white/40 border border-transparent"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} className={activeTab === item.id ? "text-neon-pink" : "group-hover:text-white transition-colors"} />
                                        <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
                                    </div>
                                    <ChevronRight size={16} className={activeTab === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-40 transition-opacity"} />
                                </button>
                            ))}

                            <div className="pt-4 mt-4 border-t border-white/5">
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("user");
                                        window.location.href = "/";
                                    }}
                                    className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-500/60 hover:bg-red-500/10 hover:text-red-500 transition-all"
                                >
                                    <LogOut size={20} />
                                    <span className="text-sm font-bold uppercase tracking-wider">Sign Out</span>
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <div className="space-y-8">
                        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                                {activeTab === "profile" ? "General Profile" : activeTab === "tickets" ? "Ticket History" : "Account Settings"}
                            </h1>

                            <div className="flex items-center gap-4">
                                <div className="relative group flex-1 md:flex-none">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-cyan transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search activities..."
                                        className="w-full md:w-64 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium focus:outline-none focus:border-neon-cyan/50 transition-all"
                                    />
                                </div>
                                <button className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <Bell size={20} className="text-white/60" />
                                    <span className="absolute top-3 right-3 w-2 h-2 bg-neon-pink rounded-full border-2 border-black" />
                                </button>
                            </div>
                        </header>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {activeTab === "profile" ? (
                                    <ProfileSection />
                                ) : activeTab === "tickets" ? (
                                    <TicketsHistory />
                                ) : (
                                    <SettingsSection />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <NeonFooter />
        </div>
    );
}
