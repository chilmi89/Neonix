"use client";

import { StatisticCard } from "@/app/(backend)/_components/data-display/StatisticCard";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import { GlassBadge } from "@/app/(frontend)/_components/ui/GlassBadge";
import {
    Server,
    Database,
    ShieldAlert,
    Globe,
    Activity,
    Cpu,
    ShieldCheck,
    Zap,
    Info,
    History
} from "lucide-react";
import { motion } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";

const superAdminStats = [
    { label: "Pendapatan Global", value: "$120,450", trend: 20.5, icon: Globe, description: "Total pendapatan platform", color: "blue" },
    { label: "Beban Komputasi", value: "34%", trend: -1.2, icon: Cpu, description: "Performa cluster", color: "emerald" },
    { label: "Operasi Penyimpanan", value: "4.2 GB", trend: 0.5, icon: Database, description: "Pertumbuhan database stabil", color: "amber" },
    { label: "Registri Keamanan", value: "Aman", trend: 0, icon: ShieldCheck, description: "Tidak ada ancaman aktif", color: "rose" },
];

const systemLogs = [
    { id: 1, action: "Cadangan Kernel", user: "SISTEM", timestamp: "2023-10-25 02:00:00", status: "Success" },
    { id: 2, action: "Sinkronisasi Peran", user: "AdminX", timestamp: "2023-10-24 15:30:45", status: "Audit" },
    { id: 3, action: "Blokir IP (Trigger)", user: "Sentinel", timestamp: "2023-10-24 14:20:10", status: "Warning" },
    { id: 4, action: "Rotasi Kunci Root", user: "SuperAdmin", timestamp: "2023-10-23 09:15:00", status: "Audit" },
    { id: 5, action: "Deploy Pipeline", user: "SISTEM", timestamp: "2023-10-22 23:59:59", status: "Success" },
];

export default function SuperAdminDashboardPage() {
    return (
        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-10 pb-20"
        >
            {/* Header Premium Baru */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest leading-none">
                        <Zap size={12} fill="currentColor" /> Inti Sistem
                    </motion.div>
                    <h1 className="text-5xl font-black text-glass-text tracking-tighter">
                        Neonix <span className="text-primary italic">System</span>
                    </h1>
                    <p className="text-glass-text/70 max-w-xl text-lg leading-relaxed">
                        Pengawasan global dan konfigurasi infrastruktur. Pantau performa, keamanan, dan operasi administratif secara real-time.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex-1 lg:flex-none bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 px-6 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-rose-500/5">
                        <ShieldAlert size={18} /> Kunci Darurat
                    </button>
                    <button className="flex-1 lg:flex-none bg-primary text-white px-6 py-3 rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all">
                        <Activity size={18} /> Lihat Status
                    </button>
                </div>
            </div>

            {/* Grid Statistik Modern */}
            <motion.div
                variants={containerStagger}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {superAdminStats.map((stat, i) => (
                    <motion.div key={i} variants={slideUp}>
                        <StatisticCard {...(stat as any)} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Bagian Inteligensi Sistem */}
            <div className="grid grid-cols-1 gap-10">
                <motion.div variants={slideUp} className="group">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-lg group-hover:scale-110 transition-transform">
                                <History size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-glass-text tracking-tight">Aliran Log Sistem</h3>
                                <p className="text-xs text-glass-text/60">Log audit langsung dari inti platform</p>
                            </div>
                        </div>
                        <button className="text-xs font-bold text-primary/60 hover:text-primary transition-colors flex items-center gap-1.5 uppercase tracking-widest">
                            Ekspor Log <Info size={14} />
                        </button>
                    </div>

                    <div className="glass-card overflow-hidden border-white/10 rounded-3xl shadow-2xl">
                        <DataTable
                            title="Registri Audit Global"
                            data={systemLogs}
                            columns={[
                                {
                                    header: "OPERASI",
                                    accessor: (item) => (
                                        <span className="font-bold text-glass-text tracking-wide">{item.action}</span>
                                    )
                                },
                                {
                                    header: "SUBJEK",
                                    accessor: (item) => (
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary/40 animate-pulse" />
                                            <span className="text-glass-text/60 font-medium">{item.user}</span>
                                        </div>
                                    )
                                },
                                {
                                    header: "WAKTU",
                                    accessor: (item) => (
                                        <span className="text-xs text-glass-text/40 font-mono tracking-tight">{item.timestamp}</span>
                                    )
                                },
                                {
                                    header: "VEKTOR",
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
            </div>
        </motion.div>
    );
}
