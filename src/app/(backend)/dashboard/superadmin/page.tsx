"use client";

import { StatisticCard } from "@/app/(backend)/_components/data-display/StatisticCard";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import { GlassBadge } from "@/app/(frontend)/_components/ui/GlassBadge";
import {
    Server,
    Database,
    ShieldAlert,
    Globe,
    Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { containerStagger, slideUp } from "@/lib/motion";

const superAdminStats = [
    { label: "Total Revenue", value: "$120,450", trend: 20.5, icon: Globe, description: "Global earnings", color: "blue" },
    { label: "Server Load", value: "34%", trend: -1.2, icon: Server, description: "Optimal performance", color: "emerald" },
    { label: "Database Size", value: "4.2 GB", trend: 0.5, icon: Database, description: "Stable growth", color: "amber" },
    { label: "Security Incidents", value: "0", trend: 0, icon: ShieldAlert, description: "System secure", color: "rose" },
];

const systemLogs = [
    { id: 1, action: "Database Backup", user: "System", timestamp: "2023-10-25 02:00:00", status: "Success" },
    { id: 2, action: "Role Updated", user: "Admin User", timestamp: "2023-10-24 15:30:45", status: "Audit" },
    { id: 3, action: "Failed Login Attempt", user: "Unknown IP", timestamp: "2023-10-24 14:20:10", status: "Warning" },
    { id: 4, action: "New Admin Created", user: "Superadmin", timestamp: "2023-10-23 09:15:00", status: "Audit" },
    { id: 5, action: "System Update", user: "System", timestamp: "2023-10-22 23:59:59", status: "Success" },
];

export default function SuperAdminDashboardPage() {
    return (
        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-glass-text">Superadmin Overview</h1>
                    <p className="text-glass-text/60">Global system monitoring and configuration.</p>
                </div>
                <button className="bg-rose-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-rose-500/30 flex items-center gap-2 hover:brightness-110 mb-transition">
                    <Activity size={18} /> System Status
                </button>
            </div>

            <motion.div
                variants={containerStagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {superAdminStats.map((stat, i) => (
                    <motion.div key={i} variants={slideUp}>
                        <StatisticCard {...(stat as any)} />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div variants={slideUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <DataTable
                        title="System Logs & Audit"
                        data={systemLogs}
                        columns={[
                            { header: "Action", accessor: "action" },
                            { header: "User/Source", accessor: "user" },
                            { header: "Timestamp", accessor: "timestamp" },
                            {
                                header: "Status",
                                accessor: (item) => (
                                    <GlassBadge variant={item.status === "Success" ? "success" : item.status === "Warning" ? "warning" : "info"}>
                                        {item.status}
                                    </GlassBadge>
                                )
                            },
                        ]}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
