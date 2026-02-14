"use client";

import { StatisticCard } from "@/app/(backend)/_components/data-display/StatisticCard";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import { GlassBadge } from "@/app/(frontend)/_components/ui/GlassBadge";
import {
    Users,
    FileText,
    AlertCircle,
    CheckCircle,
    Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { containerStagger, slideUp } from "@/lib/motion";

const adminStats = [
    { label: "Pending Approvals", value: "12", trend: 5.4, icon: Clock, description: "Requires attention", color: "amber" },
    { label: "Active Users", value: "2,350", trend: 15.2, icon: Users, description: "+180 since yesterday", color: "emerald" },
    { label: "Reports Resolved", value: "45", trend: 12.5, icon: CheckCircle, description: "In the last 7 days", color: "blue" },
    { label: "System Alerts", value: "3", trend: -2.1, icon: AlertCircle, description: "Low severity", color: "rose" },
];

const pendingContent = [
    { id: 1, title: "New Event Submission", author: "Community Group A", date: "2023-10-25", status: "Pending" },
    { id: 2, title: "User Report #1234", author: "System", date: "2023-10-24", status: "High Priority" },
    { id: 3, title: "Blog Post Review", author: "Editor B", date: "2023-10-24", status: "Pending" },
    { id: 4, title: "Account Verification", author: "John Doe", date: "2023-10-23", status: "Pending" },
    { id: 5, title: "Comment Moderation", author: "Bot", date: "2023-10-23", status: "Low Priority" },
];

export default function AdminDashboardPage() {
    return (
        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-glass-text">Admin Dashboard</h1>
                    <p className="text-glass-text/60">Manage content, users, and approvals.</p>
                </div>
                <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/30 flex items-center gap-2 hover:brightness-110 mb-transition">
                    View All Tasks
                </button>
            </div>

            <motion.div
                variants={containerStagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {adminStats.map((stat, i) => (
                    <motion.div key={i} variants={slideUp}>
                        <StatisticCard {...(stat as any)} />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div variants={slideUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <DataTable
                        title="Pending Actions"
                        data={pendingContent}
                        columns={[
                            { header: "Title", accessor: "title" },
                            { header: "Author/Source", accessor: "author" },
                            { header: "Date", accessor: "date" },
                            {
                                header: "Status",
                                accessor: (item) => (
                                    <GlassBadge variant={item.status === "Pending" ? "warning" : item.status === "High Priority" ? "danger" : "info"}>
                                        {item.status}
                                    </GlassBadge>
                                )
                            },
                        ]}
                    />
                </div>

                <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-glass-text mb-6">Quick Actions</h3>
                    <div className="space-y-4">
                        <button className="w-full p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-3 font-medium">
                            <FileText size={18} /> Review New Posts
                        </button>
                        <button className="w-full p-3 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors flex items-center gap-3 font-medium">
                            <Users size={18} /> Approve New Users
                        </button>
                        <button className="w-full p-3 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors flex items-center gap-3 font-medium">
                            <AlertCircle size={18} /> Check Reports
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
