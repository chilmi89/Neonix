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
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
            setIsCreateModalOpen(false);
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
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-primary to-sky-500 flex items-center justify-center text-[var(--foreground)] shadow-[0_0_30px_-5px_var(--color-primary)] overflow-hidden relative group">
                        <div className="absolute inset-0 bg-[var(--glass-hover)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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

            <div className="grid grid-cols-1 gap-8 items-start">
                {/* Tabel Layar Penuh */}
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4 bg-[var(--background)] border border-[var(--glass-border)] rounded-2xl p-2 md:p-3 shadow-sm">
                        <div className="relative flex-1 group min-w-[200px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari paket langganan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[var(--muted)] border border-[var(--glass-border)] rounded-xl py-3 pl-12 pr-4 text-sm text-[var(--foreground)] font-medium outline-none focus:bg-[var(--glass-surface)] transition-all placeholder:text-[var(--muted-foreground)]"
                            />
                        </div>
                        <button
                            onClick={fetchPlans}
                            className="p-3.5 bg-[var(--muted)] hover:bg-[var(--glass-hover)] rounded-xl text-[var(--primary)] transition-all border border-[var(--glass-border)]"
                            title="Segarkan Data"
                        >
                            <RefreshCw className={cn("transition-transform duration-500", loading && "animate-spin")} size={18} />
                        </button>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3.5 bg-[var(--primary)] text-white hover:opacity-90 rounded-xl font-bold shadow-sm transition-all"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Tambah Paket</span>
                        </button>
                    </div>

                    <motion.div variants={slideUp}>
                        {loading && plans.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-4xl border border-glass-border shadow-2xl">
                                <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                                <p className="text-lg font-bold text-[var(--muted-foreground)] tracking-tight">Sinkronisasi Katalog Paket...</p>
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
                                                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-sky-500/20 flex items-center justify-center text-primary border border-[var(--glass-border)] shadow-sm">
                                                        <CreditCard size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-glass-text text-base tracking-tight leading-none block uppercase">{item.name}</span>
                                                        <span className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest mt-1 block line-clamp-1 max-w-[200px]">{item.description}</span>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            header: "HARGA / DURASI",
                                            accessor: (item) => (
                                                <div>
                                                    <span className="font-black text-primary text-sm block">{formatCurrency(item.price)}</span>
                                                    <span className="text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest block">{item.durationDays} Hari</span>
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
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-[var(--muted-foreground)] hover:text-primary transition-all border border-glass-border shadow-sm active:scale-90 group"
                                                        title="Ubah Paket"
                                                    >
                                                        <Edit2 size={16} className="group-hover:rotate-12 transition-transform" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-[var(--muted-foreground)] hover:text-rose-500 transition-all border border-glass-border shadow-sm active:scale-90"
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

            {/* Modal Tambah Paket */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--background)]/90 backdrop-blur-[2px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] rounded-2xl p-8 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="absolute top-6 right-6 text-[var(--muted-foreground)] hover:text-[var(--foreground)] bg-[var(--muted)] p-2 rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <Plus size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Tambah Paket</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm">Buat skema penagihan langganan baru.</p>
                                </div>
                            </div>

                            <form onSubmit={handleCreateSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Nama Paket</label>
                                    <input
                                        type="text"
                                        placeholder="PREMIUM EDITION"
                                        value={newPlan.name}
                                        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                                        className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] outline-none focus:border-[var(--primary)] transition-all font-bold"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Deskripsi</label>
                                    <textarea
                                        placeholder="Tuliskan spesifikasi produk..."
                                        value={newPlan.description}
                                        onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                                        className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] outline-none focus:border-[var(--primary)] transition-all h-20 resize-none font-medium text-sm"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[var(--foreground)]">Harga (IDR)</label>
                                        <input
                                            type="number"
                                            value={newPlan.price === 0 ? "" : newPlan.price}
                                            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value === "" ? 0 : Number(e.target.value) })}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] outline-none focus:border-[var(--primary)] transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[var(--foreground)]">Durasi (Hari)</label>
                                        <input
                                            type="number"
                                            value={newPlan.durationDays === 0 ? "" : newPlan.durationDays}
                                            onChange={(e) => setNewPlan({ ...newPlan, durationDays: e.target.value === "" ? 0 : Number(e.target.value) })}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] outline-none focus:border-[var(--primary)] transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-xl border border-[var(--glass-border)] mt-2">
                                    <span className="text-sm font-bold text-[var(--foreground)]">Langsung Aktifkan</span>
                                    <button
                                        type="button"
                                        onClick={() => setNewPlan({ ...newPlan, isActive: !newPlan.isActive })}
                                        className={cn(
                                            "relative w-12 h-6 rounded-full transition-colors duration-300 shadow-inner",
                                            newPlan.isActive ? "bg-emerald-500" : "bg-[var(--glass-surface)] border border-[var(--glass-border)]"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                                            newPlan.isActive ? "translate-x-6" : "translate-x-0"
                                        )} />
                                    </button>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="flex-1 bg-[var(--muted)] hover:bg-[var(--glass-hover)] text-[var(--foreground)] font-semibold py-3 rounded-xl transition-all border border-[var(--glass-border)]"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting || !newPlan.name}
                                        className="flex-[1.5] bg-[var(--primary)] text-white font-semibold py-3 rounded-xl shadow-md transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {submitting ? <Loader2 size={20} className="animate-spin" /> : "Buat Paket"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal Edit */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--background)]/90 backdrop-blur-[2px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] rounded-2xl p-8 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="absolute top-6 right-6 text-[var(--muted-foreground)] hover:text-[var(--foreground)] bg-[var(--muted)] p-2 rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <Edit2 size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Ubah Paket</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm">Modifikasi subscription plan.</p>
                                </div>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Nama Paket</label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] outline-none focus:border-[var(--primary)] transition-all font-bold"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Deskripsi</label>
                                    <textarea
                                        value={editFormData.description}
                                        onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                        className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] outline-none focus:border-[var(--primary)] transition-all h-20 resize-none text-sm"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[var(--foreground)]">Harga (IDR)</label>
                                        <input
                                            type="number"
                                            value={editFormData.price === 0 ? "" : editFormData.price}
                                            onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value === "" ? 0 : Number(e.target.value) })}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] outline-none focus:border-[var(--primary)] transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[var(--foreground)]">Durasi (Hari)</label>
                                        <input
                                            type="number"
                                            value={editFormData.durationDays === 0 ? "" : editFormData.durationDays}
                                            onChange={(e) => setEditFormData({ ...editFormData, durationDays: e.target.value === "" ? 0 : Number(e.target.value) })}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] outline-none focus:border-[var(--primary)] transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-xl border border-[var(--glass-border)] mt-2">
                                    <span className="text-sm font-bold text-[var(--foreground)]">Status Aktivasi</span>
                                    <button
                                        type="button"
                                        onClick={() => setEditFormData({ ...editFormData, isActive: !editFormData.isActive })}
                                        className={cn(
                                            "relative w-12 h-6 rounded-full transition-colors duration-300 shadow-inner",
                                            editFormData.isActive ? "bg-emerald-500" : "bg-[var(--glass-surface)] border border-[var(--glass-border)]"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                                            editFormData.isActive ? "translate-x-6" : "translate-x-0"
                                        )} />
                                    </button>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 bg-[var(--muted)] hover:bg-[var(--glass-hover)] text-[var(--foreground)] font-semibold py-3 rounded-xl transition-all border border-[var(--glass-border)]"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-[1.5] bg-[var(--primary)] text-white font-semibold py-3 rounded-xl shadow-md transition-all hover:opacity-90 flex items-center justify-center gap-2"
                                    >
                                        {submitting ? <Loader2 size={20} className="animate-spin" /> : "Simpan"}
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
