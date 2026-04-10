"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { QrScannerModal } from "../ui/QrScannerModal";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const { user, loading } = useUser();
    const pathname = usePathname();

    const isSuperAdmin = pathname?.startsWith("/dashboard/superadmin");

    return (
        <div className={cn(
            "min-h-screen flex transition-colors duration-500",
            "bg-[var(--background)] text-[var(--foreground)]"
        )}>
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Navbar
                    isSidebarCollapsed={isSidebarCollapsed}
                    onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    onScanOpen={() => setIsQrModalOpen(true)}
                />

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* Global UI Components */}
            <QrScannerModal 
                isOpen={isQrModalOpen}
                onClose={() => setIsQrModalOpen(false)}
            />
        </div>
    );
}
