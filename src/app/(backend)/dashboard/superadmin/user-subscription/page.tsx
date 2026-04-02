"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Activity,
    CreditCard,
    Search,
    Loader2,
    Plus,
    Trash2,
    X,
    Info,
    ArrowRight,
    RefreshCw,
    Calendar,
    Users,
    Building2,
    CheckCircle2,
    Clock,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp } from "@/lib/motion";
import {
    getAllUserSubscriptions,
    deleteUserSubscription,
    updateUserSubscriptionStatus,
    manualCreateUserSubscription
} from "@/services/userSubscriptionService";
import { UserSubscription } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";

export default function UserSubscriptionAdminPage() {
    const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk Modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [selectedSub, setSelectedSub] = useState<UserSubscription | null>(null);

    // State untuk Form Manual Create
    const [newSub, setNewSub] = useState<Partial<UserSubscription>>({
        userId: 0,
        tenantId: 0,
        planId: 0,
        roleId: 0,
        status: "ACTIVE"
    });

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const response = await getAllUserSubscriptions();
            setSubscriptions(response.data || []);
        } catch (err: any) {
            alert(err.message || "Gagal mengambil data langganan");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Hapus permanen record langganan ini?")) return;
        try {
            await deleteUserSubscription(id);
            setSubscriptions(subscriptions.filter(s => s.id !== id));
        } catch (err: any) {
            alert(err.message || "Gagal menghapus langganan");
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await manualCreateUserSubscription(newSub);
            setIsCreateModalOpen(false);
            fetchSubscriptions();
        } catch (err: any) {
            alert(err.message || "Gagal membuat langganan");
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateStatus = async (status: string) => {
        if (!selectedSub) return;
        setSubmitting(true);
        try {
            await updateUserSubscriptionStatus(selectedSub.id, status);
            setIsStatusModalOpen(false);
            fetchSubscriptions();
        } catch (err: any) {
            alert(err.message || "Gagal mengupdate status");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredSubs = subscriptions.filter(sub =>
        (sub.userName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (sub.tenantName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (sub.planName?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status?.toUpperCase()) {
            case "ACTIVE": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "CANCELLED": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
            case "EXPIRED": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            default: return "bg-blue-500/10 text-blue-500 border-blue-500/20";
        }
    };

    const formatRelativeDate = (dateStr: string) => {
        try {
            return new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }).format(new Date(dateStr));
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-8 pb-20"
        >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-glass-border pb-8">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-[0_0_30px_-5px_var(--color-indigo-500)] overflow-hidden relative group">
                        <Activity size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none">
                            User <span className="text-indigo-500 italic">Subscriptions</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium tracking-tight">Katalog & Manajemen Berlangganan Global</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-primary text-white px-6 py-3 rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center gap-2 hover:brightness-110 transition-all"
                    >
                        <Plus size={20} /> Tambah Manual
                    </button>
                    <div className="bg-muted px-6 py-4 rounded-4xl border border-glass-border backdrop-blur-md flex items-center gap-4 text-right">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Total Record</p>
                            <h3 className="text-2xl font-black text-glass-text leading-none">{subscriptions.length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-4 bg-muted border border-glass-border rounded-3xl p-2 shadow-2xl">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-glass-text/30 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Cari user, tenant, atau plan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm text-glass-text font-bold outline-none focus:bg-white dark:focus:bg-black/60 transition-all"
                        />
                    </div>
                    <button
                        onClick={fetchSubscriptions}
                        className="p-3 bg-glass-surface hover:bg-glass-hover rounded-xl text-primary transition-all border border-glass-border"
                    >
                        <RefreshCw className={cn("transition-transform duration-500", loading && "animate-spin")} size={18} />
                    </button>
                </div>

                <motion.div variants={slideUp}>
                    {loading && subscriptions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-4xl border border-glass-border shadow-2xl">
                            <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                            <p className="text-lg font-bold text-glass-text/40">Mengambil database langganan...</p>
                        </div>
                    ) : (
                        <div className="glass-card overflow-hidden border-glass-border rounded-4xl shadow-2xl">
                            <DataTable
                                title="Aliran Langganan Aktif"
                                data={filteredSubs}
                                columns={[
                                    {
                                        header: "USER & TENANT",
                                        accessor: (item) => (
                                            <div className="flex flex-col gap-1 py-1">
                                                <div className="flex items-center gap-2">
                                                    <Users size={12} className="text-primary" />
                                                    <span className="font-black text-glass-text text-sm uppercase">{item.userName || `User #${item.userId}`}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Building2 size={12} className={cn("text-glass-text/40", !item.tenantName && "text-rose-400/40")} />
                                                    <span className={cn("text-[10px] font-bold", item.tenantName ? "text-glass-text/40 italic" : "text-rose-400 uppercase tracking-widest")}>
                                                        {item.tenantName || "Waiting for Tenant Registration"}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        header: "PLAN",
                                        accessor: (item) => (
                                            <div className="flex items-center gap-2">
                                                <CreditCard size={14} className="text-indigo-400" />
                                                <span className="font-black text-sm text-indigo-400">{item.planName}</span>
                                            </div>
                                        )
                                    },
                                    {
                                        header: "VALIDITY",
                                        accessor: (item) => (
                                            <div className="flex flex-col text-[10px] font-bold text-glass-text/40">
                                                <span className="flex items-center gap-1"><Calendar size={10} /> {formatRelativeDate(item.startDate)}</span>
                                                <span className="flex items-center gap-1 text-rose-400/60"><Clock size={10} /> {formatRelativeDate(item.endDate)}</span>
                                            </div>
                                        )
                                    },
                                    {
                                        header: "STATUS",
                                        accessor: (item) => (
                                            <button
                                                onClick={() => { setSelectedSub(item); setIsStatusModalOpen(true); }}
                                                className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95", getStatusColor(item.status))}
                                            >
                                                {item.status}
                                            </button>
                                        )
                                    },
                                    {
                                        header: "OPERASI",
                                        accessor: (item) => (
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="h-9 w-9 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-glass-text/40 hover:text-rose-500 transition-all border border-glass-border"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )
                                    },
                                ]}
                            />
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Modal Manual Create */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-lg bg-background border border-glass-border rounded-[2.5rem] p-10 shadow-2xl"
                        >
                            <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-all"><X size={24} /></button>
                            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Manual Subscription</h2>
                            <form onSubmit={handleCreateSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">User ID</label>
                                        <input type="number" onChange={(e)=>setNewSub({...newSub, userId: Number(e.target.value)})} className="w-full bg-muted border border-glass-border rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-primary/50" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Tenant ID</label>
                                        <input type="number" onChange={(e)=>setNewSub({...newSub, tenantId: Number(e.target.value)})} className="w-full bg-muted border border-glass-border rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-primary/50" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Plan ID</label>
                                        <input type="number" onChange={(e)=>setNewSub({...newSub, planId: Number(e.target.value)})} className="w-full bg-muted border border-glass-border rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-indigo-500/50" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Role ID</label>
                                        <input type="number" onChange={(e)=>setNewSub({...newSub, roleId: Number(e.target.value)})} className="w-full bg-muted border border-glass-border rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-indigo-500/50" required />
                                    </div>
                                </div>
                                <button type="submit" disabled={submitting} className="w-full bg-primary text-white font-black py-4 rounded-xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                    {submitting ? <Loader2 className="animate-spin" /> : <>Buat Langganan <CheckCircle2 size={20} /></>}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal Update Status */}
            <AnimatePresence>
                {isStatusModalOpen && selectedSub && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-sm bg-background border border-glass-border rounded-[2.5rem] p-10 shadow-2xl text-center"
                        >
                            <h3 className="text-xl font-black text-white mb-2 uppercase">Update Status</h3>
                            <p className="text-xs text-white/40 mb-8">Ubah status langganan untuk <span className="text-primary">{selectedSub.userName}</span></p>
                            <div className="grid grid-cols-1 gap-3">
                                {["ACTIVE", "CANCELLED", "EXPIRED"].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => handleUpdateStatus(status)}
                                        disabled={submitting}
                                        className={cn(
                                            "w-full py-4 rounded-2xl font-black transition-all active:scale-[0.98] flex items-center justify-center gap-3 border",
                                            status === selectedSub.status ? "bg-white/5 border-white/20 text-white/20 pointer-events-none" : "hover:bg-primary hover:text-white border-transparent bg-muted"
                                        )}
                                    >
                                        {status} {status === "ACTIVE" ? <CheckCircle2 size={16} /> : status === "EXPIRED" ? <AlertCircle size={16} /> : <X size={16} />}
                                    </button>
                                ))}
                            </div>
                            <button onClick={()=>setIsStatusModalOpen(false)} className="mt-6 text-[10px] font-black uppercase text-white/30 hover:text-white tracking-widest transition-all">Tutup</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
