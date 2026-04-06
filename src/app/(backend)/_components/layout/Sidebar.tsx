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
    User,
    ShoppingBag,
    CreditCard
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
                        { icon: CreditCard, label: "Subscription Plans", href: "/dashboard/superadmin/subscription-plan" },
                        { icon: Activity, label: "User Subscriptions", href: "/dashboard/superadmin/user-subscription" },
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
                        { icon: Database, label: "Inventory", href: "/dashboard/admin/tickets" },
                        { icon: ShoppingBag, label: "Transaksi", href: "/dashboard/admin/transactions" },
                        { icon: Users, label: "Users", href: "/dashboard/users" },
                    ]
                }
            ];
        } else {
            // Member or other users
            newSections = [
                {
                    label: "My Activity",
                    items: [
                        { icon: LayoutDashboard, label: "Member Dash", href: "/dashboard/member" },
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
            animate={{ width: isCollapsed ? 80 : 280 }}
            className={cn(
                "h-screen sticky top-0 z-40 flex flex-col border-r overflow-hidden transition-colors duration-500",
                "bg-[var(--glass-surface)] border-[var(--glass-border)] drop-shadow-1"
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
                        <span className="text-2xl font-black text-[var(--foreground)] tracking-tighter">
                            TailAdmin
                        </span>
                        <span className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.4em] mt-0.5">Control Grid</span>
                    </motion.div>
                )}
                <button
                    onClick={onToggle}
                    className="p-2.5 hover:bg-[var(--glass-hover)] rounded-xl transition-all border border-transparent hover:border-[var(--glass-border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Main Navigation - Scrollable Area */}
            <nav className={cn(
                "flex-1 px-4 py-2 space-y-6 overflow-x-hidden transition-all overflow-y-auto scrollbar-hide",
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
                                        "text-sm font-semibold uppercase tracking-wider transition-colors",
                                        hasActiveChild ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]"
                                    )}>
                                        {section.label}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={cn(
                                            "text-[var(--muted-foreground)] transition-transform duration-500 group-hover:text-[var(--foreground)]",
                                            isExpanded ? "rotate-180" : "rotate-0",
                                            hasActiveChild && "text-[var(--foreground)]"
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
                                                        "flex items-center p-2 rounded transition-colors duration-300 group relative",
                                                        isActive
                                                            ? "bg-[var(--muted)] text-[var(--primary)]"
                                                            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--glass-hover)]"
                                                    )}>
                                                        <div className={cn(
                                                            "p-2 rounded transition-colors duration-300 flex items-center justify-center",
                                                            isActive
                                                                ? "text-[var(--primary)]"
                                                                : "group-hover:text-[var(--foreground)]"
                                                        )}>
                                                            <Icon size={20} />
                                                        </div>

                                                        {!isCollapsed && (
                                                            <motion.span
                                                                initial={{ opacity: 0, x: -5 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                className="ml-3 font-medium text-base whitespace-nowrap"
                                                            >
                                                                {item.label}
                                                            </motion.span>
                                                        )}

                                                        {isCollapsed && (
                                                            <div className="absolute left-full ml-4 px-3 py-1.5 bg-[var(--glass-surface)] border border-[var(--glass-border)] rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 text-xs font-semibold text-[var(--foreground)] shadow-lg">
                                                                {item.label}
                                                            </div>
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
            <div className="p-4 mt-auto border-t border-[var(--glass-border)] bg-[var(--glass-surface)] relative transition-colors duration-500" ref={dropupRef}>
                <AnimatePresence>
                    {isProfileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: -8, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={cn(
                                "absolute bottom-full left-4 bg-[var(--glass-surface)] border border-[var(--glass-border)] rounded shadow-2xl p-2 z-[60] mb-2",
                                isCollapsed ? "min-w-[48px]" : "min-w-[228px]"
                            )}
                        >
                            <Link href="/dashboard/settings" onClick={() => setIsProfileOpen(false)}>
                                <div className="flex items-center gap-3 p-2.5 hover:bg-[var(--glass-hover)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded transition-all group">
                                    <Settings size={20} />
                                    {!isCollapsed && (
                                        <span className="text-base font-medium">Settings</span>
                                    )}
                                </div>
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsProfileOpen(false);
                                }}
                                className="flex items-center gap-3 p-2.5 hover:bg-[var(--glass-hover)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded transition-all group w-full"
                            >
                                <LogOut size={20} />
                                {!isCollapsed && (
                                    <span className="text-base font-medium">Log Out</span>
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={cn(
                        "w-full flex items-center gap-3 p-2 rounded transition-all border border-transparent",
                        isProfileOpen ? "bg-[var(--muted)] text-[var(--foreground)]" : "hover:bg-[var(--glass-hover)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    )}
                >
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center shrink-0">
                        <User size={20} />
                    </div>

                    {!isCollapsed && (
                        <div className="flex-1 flex flex-col items-start overflow-hidden">
                            <span className="text-base font-medium text-[var(--foreground)] truncate w-full text-left">
                                {user?.name || user?.username || "Admin User"}
                            </span>
                            <span className="text-sm text-[var(--muted-foreground)] truncate w-full text-left">
                                {user?.roles?.[0]?.name || "System Core"}
                            </span>
                        </div>
                    )}

                    {!isCollapsed && (
                        <MoreVertical size={18} className={cn(
                            "transition-transform",
                            isProfileOpen ? "rotate-90 text-[var(--foreground)]" : ""
                        )} />
                    )}
                </button>
            </div>
        </motion.aside>
    );
}
