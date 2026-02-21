"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    ShieldCheck,
    UserCircle,
    Key,
    Lock,
    Building2,
    Layers,
    Calendar,
    Tags,
    ChevronDown,
    Activity,
    Database,
    Fingerprint,
    MoreVertical,
    User
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useUser } from "@/context/UserContext";

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

interface MenuItem {
    icon: any;
    label: string;
    href: string;
}

interface MenuSection {
    label: string;
    items: MenuItem[];
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [sections, setSections] = useState<MenuSection[]>([]);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user } = useUser();
    const dropupRef = useRef<HTMLDivElement>(null);

    // Toggle section expansion
    const toggleSection = (label: string) => {
        setExpandedSections(prev =>
            prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
        );
    };

    // Close dropup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropupRef.current && !dropupRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!user) return;

        const permissions: string[] = user.permissions || [];
        const roleNames: string[] = (user.roles || []).map((r: any) => {
            if (typeof r === 'string') return r.toLowerCase();
            if (typeof r === 'object' && r !== null) return (r.name || r.roleName || "").toLowerCase();
            return "";
        }).filter((r: string) => r.length > 0);

        const hasSuperAccess = permissions.includes("view dashboard superadmin") ||
            roleNames.some((r: string) => r === "superadmin" || r === "superadminevent" || r.includes("superadmin"));

        const hasAdminAccess = permissions.includes("view dashboard admin") ||
            roleNames.some((r: string) => r === "admin" || r.includes("admin"));

        let newSections: MenuSection[] = [];

        if (hasSuperAccess) {
            newSections = [
                {
                    label: "Overview",
                    items: [
                        { icon: ShieldCheck, label: "Superadmin Dash", href: "/dashboard/superadmin" },
                        { icon: Building2, label: "Tenants Registry", href: "/dashboard/superadmin/tenant" },
                    ]
                },
                {
                    label: "Management",
                    items: [
                        { icon: Users, label: "Users Registry", href: "/dashboard/superadmin/users" },
                        { icon: Activity, label: "Analytics", href: "/dashboard" },
                    ]
                },
                {
                    label: "Event Grid",
                    items: [
                        { icon: Calendar, label: "Events Catalog", href: "/dashboard/admin/event" },
                        { icon: Layers, label: "Categories", href: "/dashboard/superadmin/event-category" },
                        { icon: Tags, label: "Ticket Master", href: "/dashboard/admin/tickets" },
                        { icon: Database, label: "Ticket Categories", href: "/dashboard/admin/ticket-category" },
                    ]
                },
                {
                    label: "Security",
                    items: [
                        { icon: Fingerprint, label: "Role Definitions", href: "/dashboard/superadmin/role" },
                        { icon: Key, label: "Permission Sets", href: "/dashboard/superadmin/permission" },
                        { icon: UserCircle, label: "Assign Roles", href: "/dashboard/superadmin/users-role" },
                        { icon: Lock, label: "Grant Permissions", href: "/dashboard/superadmin/role-permission" }
                    ]
                }
            ];
        } else if (hasAdminAccess) {
            newSections = [
                {
                    label: "Overview",
                    items: [{ icon: UserCircle, label: "Admin Dashboard", href: "/dashboard/admin" }]
                },
                {
                    label: "Operations",
                    items: [
                        { icon: Calendar, label: "My Events", href: "/dashboard/admin/event" },
                        { icon: Tags, label: "Ticket Types", href: "/dashboard/admin/ticket-category" },
                        { icon: Database, label: "Inventory", href: "/dashboard/admin/tickets" }
                    ]
                }
            ];
        }

        setSections(newSections);
        if (!isCollapsed) {
            setExpandedSections(newSections.map(s => s.label));
        }
    }, [user, isCollapsed]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/");
    };

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 260 }}
            className={cn(
                "h-screen sticky top-0 z-40 flex flex-col bg-[#080808] border-r border-white/5 overflow-hidden shadow-2xl transition-all duration-500"
            )}
        >
            {/* Header Area */}
            <div className="p-6 pb-8 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <span className="text-xl font-black bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-pink bg-clip-text text-transparent tracking-tighter">
                            NEONIX.
                        </span>
                        <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em] mt-0.5">Control Grid</span>
                    </motion.div>
                )}
                <button
                    onClick={onToggle}
                    className="p-2.5 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10 text-white/20 hover:text-white"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Main Navigation - Scrollable Area */}
            <nav className={cn(
                "flex-1 px-4 py-2 space-y-6 overflow-x-hidden transition-all overflow-y-auto custom-scrollbar",
                isCollapsed && "scrollbar-hide"
            )}>
                {sections.map((section) => {
                    const isExpanded = expandedSections.includes(section.label);
                    const hasActiveChild = section.items.some(item => pathname === item.href);

                    return (
                        <div key={section.label} className="space-y-2">
                            {!isCollapsed && (
                                <button
                                    onClick={() => toggleSection(section.label)}
                                    className="flex items-center justify-between w-full px-3 mb-1 group"
                                >
                                    <span className={cn(
                                        "text-[9px] font-black uppercase tracking-[0.3em] transition-colors",
                                        hasActiveChild ? "text-neon-pink" : "text-white/15 group-hover:text-white/30"
                                    )}>
                                        {section.label}
                                    </span>
                                    <ChevronDown
                                        size={12}
                                        className={cn(
                                            "text-white/10 transition-transform duration-500",
                                            isExpanded ? "rotate-180" : "rotate-0",
                                            hasActiveChild && "text-neon-pink/40"
                                        )}
                                    />
                                </button>
                            )}

                            <AnimatePresence initial={false}>
                                {(isExpanded || isCollapsed) && (
                                    <motion.div
                                        initial={isCollapsed ? { opacity: 1 } : { height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        className="space-y-1"
                                    >
                                        {section.items.map((item) => {
                                            const isActive = pathname === item.href;
                                            const Icon = item.icon;

                                            return (
                                                <Link key={item.href} href={item.href}>
                                                    <div className={cn(
                                                        "flex items-center p-2 rounded-xl transition-all duration-300 group relative",
                                                        isActive
                                                            ? "bg-neon-pink/5 text-neon-pink border border-neon-pink/10"
                                                            : "text-white/30 hover:text-white hover:bg-white/[0.03] border border-transparent"
                                                    )}>
                                                        <div className={cn(
                                                            "p-2 rounded-lg transition-all duration-300",
                                                            isActive
                                                                ? "bg-neon-pink text-black scale-105 shadow-[0_0_15px_rgba(255,0,255,0.3)]"
                                                                : "bg-white/5 group-hover:bg-white/10"
                                                        )}>
                                                            <Icon size={16} />
                                                        </div>

                                                        {!isCollapsed && (
                                                            <motion.span
                                                                initial={{ opacity: 0, x: -5 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                className="ml-3 font-bold text-[11px] whitespace-nowrap tracking-tight"
                                                            >
                                                                {item.label}
                                                            </motion.span>
                                                        )}

                                                        {isCollapsed && (
                                                            <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#0A0A0A] border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-2xl text-[9px] font-black uppercase tracking-widest text-white">
                                                                {item.label}
                                                            </div>
                                                        )}

                                                        {isActive && !isCollapsed && (
                                                            <motion.div
                                                                layoutId="active-nav-dot"
                                                                className="absolute right-3 w-1 h-1 rounded-full bg-neon-pink shadow-[0_0_10px_#ff00ff]"
                                                            />
                                                        )}
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </nav>

            {/* Bottom Account Section with Dropup */}
            <div className="p-4 mt-auto border-t border-white/5 bg-[#0A0A0A]/50 relative" ref={dropupRef}>
                <AnimatePresence>
                    {isProfileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: -8, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={cn(
                                "absolute bottom-full left-4 bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl p-2 z-[60] mb-2",
                                isCollapsed ? "min-w-[48px]" : "min-w-[228px]"
                            )}
                        >
                            <Link href="/dashboard/settings" onClick={() => setIsProfileOpen(false)}>
                                <div className="flex items-center gap-3 p-2.5 hover:bg-white/5 rounded-xl transition-all group">
                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-neon-cyan group-hover:text-black transition-all">
                                        <Settings size={16} />
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-[11px] font-bold text-white/50 group-hover:text-white">Settings</span>
                                    )}
                                </div>
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsProfileOpen(false);
                                }}
                                className="flex items-center gap-3 p-2.5 hover:bg-rose-500/10 rounded-xl transition-all group w-full"
                            >
                                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                                    <LogOut size={16} />
                                </div>
                                {!isCollapsed && (
                                    <span className="text-[11px] font-bold text-white/50 group-hover:text-rose-500">Log Out</span>
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={cn(
                        "w-full flex items-center gap-3 p-2 rounded-2xl transition-all border border-transparent",
                        isProfileOpen ? "bg-white/5 border-white/10" : "hover:bg-white/5"
                    )}
                >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-pink/20 to-neon-cyan/20 border border-white/10 flex items-center justify-center shrink-0">
                        <User size={20} className="text-white/40" />
                    </div>

                    {!isCollapsed && (
                        <div className="flex-1 flex flex-col items-start overflow-hidden">
                            <span className="text-[11px] font-bold text-white truncate w-full text-left">
                                {user?.username || "Admin User"}
                            </span>
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none">
                                {user?.roles?.[0]?.name || "System Core"}
                            </span>
                        </div>
                    )}

                    {!isCollapsed && (
                        <MoreVertical size={14} className={cn(
                            "text-white/20 transition-transform",
                            isProfileOpen ? "rotate-90 text-white" : ""
                        )} />
                    )}
                </button>
            </div>
        </motion.aside>
    );
}
