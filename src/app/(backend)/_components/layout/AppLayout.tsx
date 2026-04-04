"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { user, loading } = useUser();
    const pathname = usePathname();

    const isSuperAdmin = pathname?.startsWith("/dashboard/superadmin");

    return (
        <div className={cn(
            "min-h-screen flex transition-colors duration-500",
            isSuperAdmin ? "superadmin-theme bg-[var(--background)] text-[var(--foreground)]" : "dark bg-transparent text-foreground"
        )}>
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Navbar
                    isSidebarCollapsed={isSidebarCollapsed}
                    onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
