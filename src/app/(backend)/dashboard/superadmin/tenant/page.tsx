"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Plus,
    Edit2,
    Trash2,
    Globe,
    Search,
    Loader2,
    X,
    Activity,
    Info,
    ArrowRight,
    RefreshCw,
    Building2,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import { getAllTenants, deleteTenant, createTenant, updateTenant } from "@/services/tenantService";
import { Tenant } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";

export default function TenantPage() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);

    // State untuk Form
    const [newTenantData, setNewTenantData] = useState({ name: "", slug: "" });
    const [editFormData, setEditFormData] = useState({ name: "", slug: "", isActive: true });

    const fetchTenants = async () => {
        try {
            setLoading(true);
            const response = await getAllTenants();
            setTenants(response.data);
            setError("");
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data tenant");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTenants();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus tenant ini?")) return;
        try {
            await deleteTenant(id);
            setTenants(tenants.filter(t => t.id !== id));
        } catch (err: any) {
            alert(err.message || "Gagal menghapus tenant");
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTenantData.name.trim() || !newTenantData.slug.trim()) return;
        setSubmitting(true);
        try {
            const response = await createTenant(newTenantData);
            setTenants([...tenants, response.data]);
            setNewTenantData({ name: "", slug: "" });
            setIsCreateModalOpen(false);
            fetchTenants();
        } catch (err: any) {
            alert(err.message || "Gagal membuat tenant");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditOpen = (tenant: Tenant) => {
        setEditingTenant(tenant);
        setEditFormData({
            name: tenant.name,
            slug: tenant.slug,
            isActive: tenant.isActive ?? true
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTenant) return;
        setSubmitting(true);
        try {
            const response = await updateTenant(editingTenant.id, editFormData);
            setTenants(tenants.map(t => t.id === editingTenant.id ? response.data : t));
            setIsEditModalOpen(false);
            fetchTenants();
        } catch (err: any) {
            alert(err.message || "Gagal memperbarui tenant");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredTenants = tenants.filter(tenant =>
        tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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
                    <div className="h-16 w-16 rounded-[2rem] bg-linear-to-br from-indigo-600 to-blue-400 flex items-center justify-center text-[var(--foreground)] shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)]">
                        <Building2 size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none">
                            Manajemen <span className="text-primary italic">Tenant</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium">Pengaturan Entitas Bisnis & Organisasi</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-muted border border-glass-border backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Total Tenant</p>
                        <h3 className="text-2xl font-black text-glass-text leading-none">{tenants.length}</h3>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-muted border border-glass-border backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Infrastruktur</p>
                        <h3 className="text-sm font-black text-glass-text leading-none uppercase tracking-tighter flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Cloud
                        </h3>
                    </div>
                </div>
            </div>

            {/* Layout Utama */}
            <div className="grid grid-cols-1 gap-8 items-start">
                
                {/* Tabel Tenant Full Width */}
                <div className="space-y-6">
                    {/* Bar Kontrol */}
                    <div className="flex flex-wrap items-center gap-4 bg-[var(--background)] border border-[var(--glass-border)] rounded-2xl p-2 md:p-3 shadow-sm">
                        <div className="relative flex-1 group min-w-[200px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari nama atau slug tenant..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[var(--muted)] border border-[var(--glass-border)] rounded-xl py-3 pl-12 pr-4 text-sm text-[var(--foreground)] font-medium outline-none focus:bg-[var(--glass-surface)] transition-all placeholder:text-[var(--muted-foreground)]"
                            />
                        </div>
                        <button
                            onClick={fetchTenants}
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
                            <span className="hidden sm:inline">Tambah Tenant</span>
                        </button>
                    </div>

                    {/* Tabel Tenant */}
                    <motion.div variants={slideUp}>
                        {loading && tenants.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-[2.5rem] border border-glass-border shadow-2xl">
                                <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                                <p className="text-lg font-bold text-[var(--muted-foreground)] tracking-tight">Sinkronisasi Registri Tenant...</p>
                            </div>
                        ) : (
                            <div className="glass-card overflow-hidden border-glass-border rounded-[2.5rem] shadow-2xl">
                                <DataTable
                                    title="Registri Tenant Sistem"
                                    data={filteredTenants}
                                    columns={[
                                        {
                                            header: "INDENTITAS TENANT",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-4 py-2">
                                                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center text-indigo-500 border border-[var(--glass-border)] shadow-sm">
                                                        <Building2 size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-glass-text text-base tracking-tight leading-none block">{item.name}</span>
                                                        <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest mt-1 block">SLUG: {item.slug}</span>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            header: "STATUS",
                                            accessor: (item) => (
                                                <div className={cn(
                                                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                                    item.isActive
                                                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                        : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                                )}>
                                                    <div className={cn("h-1.5 w-1.5 rounded-full", item.isActive ? "bg-emerald-500" : "bg-rose-500")} />
                                                    {item.isActive ? "Aktif" : "Nonaktif"}
                                                </div>
                                            )
                                        },
                                        {
                                            header: "OPERASI",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleEditOpen(item)}
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-[var(--muted-foreground)] hover:text-primary transition-all border border-glass-border shadow-sm active:scale-90"
                                                        title="Ubah Tenant"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-[var(--muted-foreground)] hover:text-rose-500 transition-all border border-glass-border shadow-sm active:scale-90"
                                                        title="Hapus Tenant"
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

            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCreateModalOpen(false)}
                            className="absolute inset-0 bg-[var(--background)]/90 backdrop-blur-[2px]"
                        />
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
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Tambah Tenant</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm">Registrasi entitas klien baru.</p>
                                </div>
                            </div>

                            <form onSubmit={handleCreateSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Nama Perusahaan / Organisasi</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Contoh: PT. Maju Jaya"
                                            value={newTenantData.name}
                                            onChange={(e) => {
                                                const name = e.target.value;
                                                setNewTenantData({
                                                    ...newTenantData,
                                                    name,
                                                    slug: generateSlug(name)
                                                });
                                            }}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all"
                                            required
                                        />
                                        <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Tenant Slug (Domain Identifier)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="maju-jaya"
                                            value={newTenantData.slug}
                                            onChange={(e) => setNewTenantData({ ...newTenantData, slug: e.target.value.toLowerCase() })}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all"
                                            required
                                        />
                                        <Globe className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
                                    </div>
                                    <p className="text-[11px] text-[var(--muted-foreground)]">* Identitas unik untuk URL sistem.</p>
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
                                        disabled={submitting || !newTenantData.name || !newTenantData.slug}
                                        className="flex-[1.5] bg-[var(--primary)] text-white font-semibold py-3 rounded-xl shadow-md transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {submitting ? <Loader2 size={20} className="animate-spin" /> : "Buat Tenant"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal Edit Tenant */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute inset-0 bg-[var(--background)]/90 backdrop-blur-[2px]"
                        />
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
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Ubah Tenant</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm">Perbarui identitas dan status tenant.</p>
                                </div>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Nama Tenant</label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Slug</label>
                                    <input
                                        type="text"
                                        value={editFormData.slug}
                                        onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value.toLowerCase() })}
                                        className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all"
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-[var(--muted)] rounded-xl border border-[var(--glass-border)]">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-[var(--foreground)]">Status Aktivasi</span>
                                        <span className="text-xs text-[var(--muted-foreground)]">Tentukan apakah tenant aktif</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setEditFormData({ ...editFormData, isActive: !editFormData.isActive })}
                                        className={cn(
                                            "relative w-14 h-7 rounded-full transition-colors duration-300 shadow-inner",
                                            editFormData.isActive ? "bg-emerald-500" : "bg-[var(--glass-surface)] border border-[var(--glass-border)]"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300",
                                            editFormData.isActive ? "translate-x-7" : "translate-x-0"
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
                                        {submitting ? <Loader2 size={20} className="animate-spin" /> : "Simpan Perubahan"}
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
