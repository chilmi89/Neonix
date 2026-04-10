"use client";

import { motion } from "framer-motion";
import { containerStagger, slideUp } from "@/lib/motion";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getTenantById } from "@/services/tenantService";
import { getAdminTransactions, getTransactionSummary, TransactionDTO } from "@/services/transactionService";
import { getAllEvents } from "@/services/eventService";
import { getAllUsers } from "@/services/userService";
import { Calendar, RefreshCw, ShoppingCart, DollarSign, Users, AlertCircle, FileText, Loader2, Building2, User, Globe, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tenant, User as UserType } from "@/types/auth";
import { StatisticCard } from "@/app/(backend)/_components/data-display/StatisticCard";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import { GlassBadge } from "@/app/(frontend)/_components/ui/GlassBadge";

export default function AdminDashboardPage() {
    const { user, syncProfile } = useUser();
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
    const [tenantUsers, setTenantUsers] = useState<UserType[]>([]);
    const [summary, setSummary] = useState<any>(null);
    const [eventCount, setEventCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            // First, sync profile to ensure we have the latest tenantId mapping from backend
            await syncProfile();
            
            // Fallback to localStorage if context is not yet updated
            const savedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {};
            const activeTenantId = user?.tenantId || savedUser?.tenantId;

            // Fetch Tenant Info
            if (activeTenantId) {
                const tenantRes = await getTenantById(activeTenantId);
                setTenant(tenantRes.data);
            }

            // Fetch Summary Stats
            const summaryRes = await getTransactionSummary();
            setSummary(summaryRes.data);

            // Fetch Recent Transactions
            const txRes = await getAdminTransactions();
            setTransactions(txRes.data || []);

            // Fetch Tenant Users
            const usersRes = await getAllUsers();
            setTenantUsers(usersRes.data || []);

            // Fetch Event Count
            const eventRes = await getAllEvents();
            setEventCount(eventRes.data?.length || 0);

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMounted(true);
        fetchData();
    }, [user?.tenantId]);

    if (!mounted) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="animate-spin text-primary" size={32} />
        </div>
    );

    const stats = [
        { 
            label: "Total Pendapatan", 
            value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(summary?.totalRevenue || 0), 
            trend: 12.5, 
            icon: DollarSign, 
            description: "Total penjualan tiket", 
            color: "emerald" 
        },
        { 
            label: "Tiket Terjual", 
            value: summary?.totalTicketsSold || 0, 
            trend: 8.2, 
            icon: ShoppingCart, 
            description: "Across all events", 
            color: "blue" 
        },
        { 
            label: "Total Event", 
            value: eventCount, 
            trend: 4.1, 
            icon: Calendar, 
            description: "Events created by you", 
            color: "amber" 
        },
        { 
            label: "Total Peserta", 
            value: summary?.totalAttendees || 0, 
            trend: 10.5, 
            icon: Users, 
            description: "Confirmed attendees", 
            color: "violet" 
        },
    ];

    return (
        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-8"
        >
            <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-primary via-[#4F46E5] to-[#7C3AED] p-8 md:p-12 shadow-2xl shadow-primary/10 border border-white/10">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 shrink-0">
                            <span className="text-4xl font-black italic">{(tenant?.name?.[0] || 'A').toUpperCase()}</span>
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-tight">
                                {tenant?.name ? (tenant.name.toUpperCase().startsWith('PT') ? tenant.name : `PT. ${tenant.name}`) : "Admin Corporate"} <span className="text-primary font-light not-italic">HQ</span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md text-white/70 text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 flex items-center gap-2">
                                    <Globe size={12} className="text-primary" /> Global Enterprise Center
                                </span>
                                <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md text-white/70 text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 flex items-center gap-2">
                                    <User size={12} className="text-primary" /> Principal: {user?.name || "Operator"}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20">
                                    Operational Active
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-[2rem] backdrop-blur-sm border border-white/10">
                        <button
                            onClick={fetchData}
                            className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl transition-all active:scale-95 border border-white/5"
                            title="Sync Database"
                        >
                            <RefreshCw className={cn(loading && "animate-spin")} size={22} />
                        </button>
                        <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-primary/20">
                            Create New Event
                        </button>
                    </div>
                </div>
            </div>

            <motion.div
                variants={containerStagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat, i) => (
                    <motion.div key={i} variants={slideUp}>
                        <StatisticCard 
                            {...(stat as any)} 
                            color={i === 0 ? "emerald" : i === 1 ? "blue" : i === 2 ? "amber" : "violet"}
                        />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div variants={slideUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <DataTable
                        title="Transaksi Terbaru"
                        data={transactions.slice(0, 5)}
                        columns={[
                            { header: "Pembeli", accessor: (t: TransactionDTO) => (
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-900 dark:text-slate-100">{t.buyerName}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{t.buyerEmail}</span>
                                </div>
                            )},
                            { header: "Event", accessor: "eventName" },
                            { header: "Tiket", accessor: (t: TransactionDTO) => (
                                <div className="flex flex-col">
                                    <span className="text-xs font-black">{t.ticketName}</span>
                                    <span className="text-[9px] text-primary font-black uppercase tracking-widest">{t.categoryName}</span>
                                </div>
                            )},
                            { header: "Total", accessor: (t: TransactionDTO) => (
                                <span className="font-black text-slate-900 dark:text-slate-100">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(t.totalPrice)}
                                </span>
                            )},
                            {
                                header: "Status",
                                accessor: (item) => (
                                    <GlassBadge variant={item.status === "SUCCESS" ? "success" : "warning"}>
                                        {item.status}
                                    </GlassBadge>
                                )
                            },
                        ]}
                    />
                </div>

                <div className="glass-card rounded-3xl p-8 border-[var(--glass-border)] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors">
                        <Users size={120} strokeWidth={0.5} />
                    </div>
                    
                    <h3 className="text-xl font-black text-glass-text mb-2 italic">Anggota <span className="text-primary">Tenant</span></h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-8">Registered users for this company</p>
                    
                    <div className="space-y-4 relative z-10">
                        {tenantUsers.slice(0, 5).map((u) => (
                            <div key={u.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group/item">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary text-xs italic border border-primary/10">
                                        {u.name[0].toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-glass-text group-hover/item:text-primary transition-colors">{u.name}</span>
                                        <span className="text-[10px] text-slate-500 font-medium">{u.email}</span>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-600 group-hover/item:text-primary transition-colors" />
                            </div>
                        ))}

                        {tenantUsers.length === 0 && (
                            <div className="text-center py-8 text-slate-500 text-xs font-bold uppercase tracking-widest bg-white/5 rounded-3xl border border-dashed border-white/10 italic">
                                No registered members yet
                            </div>
                        )}
                        
                        <button className="w-full mt-4 p-4 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-500 flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] border border-primary/20">
                            Kelola Semua Anggota <Users size={14} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
