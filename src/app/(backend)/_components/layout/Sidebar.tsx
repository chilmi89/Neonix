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
    Key,
    Lock,
    Building2,
    Layers,
    Calendar,
    Tags
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [dynamicMenuItems, setDynamicMenuItems] = useState<MenuItem[]>([]);
    const { user } = useUser();

    useEffect(() => {
        const baseItems = [
            { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
            { icon: Settings, label: "Settings", href: "/dashboard/settings" },
        ];

        if (user) {
            try {
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

                if (hasSuperAccess) {
                    baseItems[0] = { icon: ShieldCheck, label: "Superadmin Dash", href: "/dashboard/superadmin" };
                    // Insert role and permission management
                    baseItems.splice(1, 0,
                        { icon: Building2, label: "Tenants", href: "/dashboard/superadmin/tenant" },
                        { icon: Users, label: "Users Management", href: "/dashboard/superadmin/users" },
                        { icon: Layers, label: "Event Categories", href: "/dashboard/superadmin/event-category" },
                        { icon: Tags, label: "Tickets Registry", href: "/dashboard/admin/tickets" },
                        { icon: Calendar, label: "Events Registry", href: "/dashboard/admin/event" },
                        { icon: ShieldCheck, label: "Roles", href: "/dashboard/superadmin/role" },
                        { icon: Tags, label: "Ticket Categories", href: "/dashboard/admin/ticket-category" },
                        { icon: Key, label: "Permissions", href: "/dashboard/superadmin/permission" },
                        { icon: UserCircle, label: "Give Role", href: "/dashboard/superadmin/users-role" },
                        { icon: Lock, label: "Give Permission", href: "/dashboard/superadmin/role-permission" }
                    );
                } else if (hasAdminAccess) {
                    baseItems[0] = { icon: UserCircle, label: "Admin Dash", href: "/dashboard/admin" };
                    baseItems.splice(1, 0,
                        { icon: Calendar, label: "Event Management", href: "/dashboard/admin/event" },
                        { icon: Tags, label: "Ticket Categories", href: "/dashboard/admin/ticket-category" },
                        { icon: Tags, label: "Ticket Management", href: "/dashboard/admin/tickets" }
                    );
                }
            } catch (e) {
                console.error("Error setting menu items based on user", e);
            }
        }
        setDynamicMenuItems(baseItems);
    }, [user]); // Re-run when user prop changes

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
                    className="p-2 hover:bg-glass-hover rounded-lg transition-colors text-glass-text"
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
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "text-glass-text hover:bg-glass-hover"
                            )}>
                                <Icon size={24} className={cn(isActive ? "text-primary-foreground" : "opacity-70 group-hover:opacity-100 transition-opacity")} />
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
