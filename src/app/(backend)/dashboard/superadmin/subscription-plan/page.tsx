"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    CreditCard,
    ShieldCheck,
    Search,
    Loader2,
    Plus,
    Edit2,
    Trash2,
    X,
    Info,
    ArrowRight,
    RefreshCw,
    Zap,
    Calendar,
    DollarSign,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import {
    getAllSubscriptionPlans,
    deleteSubscriptionPlan,
    createSubscriptionPlan,
    updateSubscriptionPlan
} from "@/services/subscriptionPlanService";
import { SubscriptionPlan } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";

export default function SubscriptionPlanPage() {
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk Modals
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

    // State untuk Form Registrasi Baru
    const [newPlan, setNewPlan] = useState<Partial<SubscriptionPlan>>({
        name: "",
        description: "",
        price: 0,
        durationDays: 30,
        isActive: true
    });

    // State untuk Form Edit
    const [editFormData, setEditFormData] = useState<Partial<SubscriptionPlan>>({});

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const response = await getAllSubscriptionPlans();
            setPlans(response.data || []);
            setError("");
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data paket langganan");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus paket langganan ini?")) return;

        try {
            await deleteSubscriptionPlan(id);
            setPlans(plans.filter(p => p.id !== id));
        } catch (err: any) {
            alert(err.message || "Gagal menghapus paket");
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await createSubscriptionPlan(newPlan);
            setPlans([...plans, response.data]);
            setNewPlan({
                name: "",
                description: "",
                price: 0,
                durationDays: 30,
                isActive: true
            });
            fetchPlans();
        } catch (err: any) {
            alert(err.message || "Gagal membuat paket langganan");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditOpen = (plan: SubscriptionPlan) => {
        setEditingPlan(plan);
        setEditFormData({ 
            name: plan.name,
            description: plan.description,
            price: plan.price,
            durationDays: plan.durationDays,
            isActive: plan.isActive
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPlan) return;
        setSubmitting(true);
        try {
            await updateSubscriptionPlan(editingPlan.id, editFormData);
            setIsEditModalOpen(false);
            fetchPlans();
        } catch (err: any) {
            alert(err.message || "Gagal memperbarui paket langganan");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredPlans = plans.filter(plan =>
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-8 pb-20"
        >
            {/* Header & Deskripsi */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-glass-border pb-8">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-primary to-sky-500 flex items-center justify-center text-white shadow-[0_0_30px_-5px_var(--color-primary)] overflow-hidden relative group">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <CreditCard size={32} className="relative z-10" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none">
                            Kelola <span className="text-primary italic">Subscription Plan</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium tracking-tight">Manajemen Paket Berlangganan & Pricing</p>
                    </div>
                </div>

                <div className="bg-muted px-6 py-4 rounded-4xl border border-glass-border backdrop-blur-md flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Total Paket</p>
                        <h3 className="text-2xl font-black text-glass-text leading-none">{plans.length}</h3>
                    </div>
                    <div className="h-10 w-px bg-glass-border mx-2" />
                    <Zap className="text-amber-500" size={24} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Bagian Kiri: Form Baru */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
                    <GlassCard className="p-8 border-primary/20 bg-primary/5 relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

                        <div className="mb-8">
                            <h2 className="text-xl font-black text-glass-text tracking-tight flex items-center gap-2">
                                <Plus size={20} className="text-primary" />
                                Paket Baru
                            </h2>
                            <p className="text-glass-text/40 font-medium text-sm mt-1">Tambahkan skema berlangganan baru.</p>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 ml-1">
                                    Nama Paket
                                </label>
                                <input
                                    type="text"
                                    placeholder="CONTOH: PREMIUM MONTHLY"
                                    value={newPlan.name}
                                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                                    className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-black/60 transition-all placeholder:text-glass-text/30"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 ml-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    placeholder="Jelaskan keuntungan paket ini..."
                                    value={newPlan.description}
                                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                                    className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-black/60 transition-all placeholder:text-glass-text/30 h-24 resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 ml-1">
                                        Harga (IDR)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={newPlan.price === 0 ? "" : newPlan.price}
                                            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value === "" ? 0 : Number(e.target.value) })}
                                            className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-black/60 transition-all"
                                            required
                                        />
                                        <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 ml-1">
                                        Durasi (Hari)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={newPlan.durationDays === 0 ? "" : newPlan.durationDays}
                                            onChange={(e) => setNewPlan({ ...newPlan, durationDays: e.target.value === "" ? 0 : Number(e.target.value) })}
                                            className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-black/60 transition-all"
                                            required
                                        />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 px-1">
                                <input
                                    type="checkbox"
                                    id="is-active-new"
                                    checked={newPlan.isActive}
                                    onChange={(e) => setNewPlan({ ...newPlan, isActive: e.target.checked })}
                                    className="h-5 w-5 rounded border-glass-border text-primary focus:ring-primary/20"
                                />
                                <label htmlFor="is-active-new" className="text-sm font-bold text-glass-text cursor-pointer">
                                    Langsung Aktifkan
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting || !newPlan.name}
                                className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-base tracking-tight mt-4"
                            >
                                {submitting ? (
                                    <Loader2 size={24} className="animate-spin" />
                                ) : (
                                    <>Simpan Paket <ArrowRight size={20} /></>
                                )}
                            </button>
                        </form>
                    </GlassCard>
                </div>

                {/* Bagian Kanan: Pencarian & Tabel */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center gap-4 bg-muted border border-glass-border rounded-3xl p-2 shadow-2xl">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-glass-text/30 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari paket langganan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm text-glass-text font-bold outline-none focus:bg-white dark:focus:bg-black/60 transition-all placeholder:text-glass-text/30"
                            />
                        </div>
                        <button
                            onClick={fetchPlans}
                            className="p-3 bg-glass-surface hover:bg-glass-hover rounded-xl text-primary transition-all border border-glass-border shadow-inner"
                            title="Segarkan Data"
                        >
                            <RefreshCw className={cn("transition-transform duration-500", loading && "animate-spin")} size={18} />
                        </button>
                    </div>

                    <motion.div variants={slideUp}>
                        {loading && plans.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-4xl border border-glass-border shadow-2xl">
                                <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                                <p className="text-lg font-bold text-glass-text/40 tracking-tight">Sinkronisasi Katalog Paket...</p>
                            </div>
                        ) : (
                            <div className="glass-card overflow-hidden border-glass-border rounded-4xl shadow-2xl">
                                <DataTable
                                    title="Daftar Subscription Plan"
                                    data={filteredPlans}
                                    columns={[
                                        {
                                            header: "PAKET & DESKRIPSI",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-4 py-2">
                                                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-sky-500/20 flex items-center justify-center text-primary border border-white/5 shadow-sm">
                                                        <CreditCard size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-glass-text text-base tracking-tight leading-none block uppercase">{item.name}</span>
                                                        <span className="text-[10px] font-black text-glass-text/40 uppercase tracking-widest mt-1 block line-clamp-1 max-w-[200px]">{item.description}</span>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            header: "HARGA / DURASI",
                                            accessor: (item) => (
                                                <div>
                                                    <span className="font-black text-primary text-sm block">{formatCurrency(item.price)}</span>
                                                    <span className="text-[10px] font-black text-glass-text/40 uppercase tracking-widest block">{item.durationDays} Hari</span>
                                                </div>
                                            )
                                        },
                                        {
                                            header: "STATUS",
                                            accessor: (item) => (
                                                <div className={cn(
                                                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                                    item.isActive 
                                                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                                                        : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                                )}>
                                                    <div className={cn("h-1 w-1 rounded-full", item.isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500")} />
                                                    {item.isActive ? "Aktif" : "Non-Aktif"}
                                                </div>
                                            )
                                        },
                                        {
                                            header: "OPERASI",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleEditOpen(item)}
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-glass-text/40 hover:text-primary transition-all border border-glass-border shadow-sm active:scale-90 group"
                                                        title="Ubah Paket"
                                                    >
                                                        <Edit2 size={16} className="group-hover:rotate-12 transition-transform" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-glass-text/40 hover:text-rose-500 transition-all border border-glass-border shadow-sm active:scale-90"
                                                        title="Hapus Paket"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            )
                                        },
                                    ]}
                                />
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Modal Edit */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-lg bg-background border border-glass-border rounded-[3rem] p-10 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary via-sky-500 to-transparent" />

                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="absolute top-8 right-8 text-glass-text/20 hover:text-glass-text transition-all"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-10 text-center">
                                <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 border border-primary/5">
                                    <Edit2 size={32} />
                                </div>
                                <h2 className="text-3xl font-black text-glass-text tracking-tight mb-2 uppercase">Ubah Paket</h2>
                                <p className="text-glass-text/40 font-medium tracking-tight">Perbarui konfigurasi subscription plan.</p>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                        Nama Paket
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 transition-all shadow-inner"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        value={editFormData.description}
                                        onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                        className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 transition-all shadow-inner h-24 resize-none"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                            Harga
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={editFormData.price === 0 ? "" : editFormData.price}
                                            onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value === "" ? 0 : Number(e.target.value) })}
                                            className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 transition-all shadow-inner"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                            Durasi (Hari)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={editFormData.durationDays === 0 ? "" : editFormData.durationDays}
                                            onChange={(e) => setEditFormData({ ...editFormData, durationDays: e.target.value === "" ? 0 : Number(e.target.value) })}
                                            className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 transition-all shadow-inner"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 px-1">
                                    <input
                                        type="checkbox"
                                        id="is-active-edit"
                                        checked={editFormData.isActive}
                                        onChange={(e) => setEditFormData({ ...editFormData, isActive: e.target.checked })}
                                        className="h-5 w-5 rounded border-glass-border text-primary focus:ring-primary/20"
                                    />
                                    <label htmlFor="is-active-edit" className="text-sm font-bold text-glass-text cursor-pointer">
                                        Aktifkan Paket
                                    </label>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 bg-muted hover:bg-glass-hover text-glass-text font-bold py-4 rounded-2xl transition-all border border-glass-border uppercase text-[10px] tracking-widest"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
                                    >
                                        {submitting ? <Loader2 size={16} className="animate-spin" /> : <>Update <CheckCircle2 size={14} /></>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
