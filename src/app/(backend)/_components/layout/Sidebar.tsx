"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Library,
    ShieldCheck,
    UserCircle,
    Key
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

interface MenuItem {
    icon: any;
    label: string;
    href: string;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [dynamicMenuItems, setDynamicMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const baseItems = [
            { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
            { icon: Users, label: "Users", href: "/dashboard/users" },
            { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
            { icon: Library, label: "Library", href: "/dashboard/library" },
            { icon: Settings, label: "Settings", href: "/dashboard/settings" },
        ];

        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                const roleNames = user.roles?.map((r: any) => r.name.toLowerCase()) || [];

                const isSuperAdmin = roleNames.includes("superadminevent");
                const isAdmin = roleNames.includes("admin") || roleNames.includes("adminevent");

                if (isSuperAdmin) {
                    baseItems[0] = { icon: ShieldCheck, label: "Superadmin Dash", href: "/dashboard/superadmin" };
                    // Insert role and permission management
                    baseItems.splice(2, 0,
                        { icon: ShieldCheck, label: "Roles", href: "/dashboard/superadmin/role" },
                        { icon: Key, label: "Permissions", href: "/dashboard/superadmin/permission" }
                    );
                } else if (isAdmin) {
                    baseItems[0] = { icon: UserCircle, label: "Admin Dash", href: "/dashboard/admin" };
                }
            } catch (e) {
                console.error("Error parsing user from localStorage", e);
            }
        }
        setDynamicMenuItems(baseItems);
    }, []); // Only run once on mount

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
                "h-screen sticky top-0 z-40 flex flex-col glass-card border-l-0 rounded-none md:rounded-r-2xl border-y-0 overflow-hidden"
            )}
        >
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold bg-linear-to-r from-primary to-sky-400 bg-clip-text text-transparent"
                    >
                        ADMN.
                    </motion.span>
                )}
                <button
                    onClick={onToggle}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-glass-text"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {dynamicMenuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={cn(
                                "flex items-center p-3 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-glass-text hover:bg-white/10"
                            )}>
                                <Icon size={24} className={cn(isActive ? "text-white" : "text-glass-text/70 group-hover:text-glass-text")} />
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="ml-4 font-medium whitespace-nowrap overflow-hidden"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-4 px-2 py-1 bg-glass-surface backdrop-blur-md border border-glass-border rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                        {item.label}
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                >
                    <LogOut size={24} />
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="ml-4 font-medium whitespace-nowrap overflow-hidden"
                        >
                            Logout
                        </motion.span>
                    )}
                </button>
            </div>
        </motion.aside>
    );
}
