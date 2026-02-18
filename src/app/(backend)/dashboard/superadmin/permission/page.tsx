"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Plus,
    Edit2,
    Trash2,
    Key,
    Calendar,
    Search,
    Loader2,
    X,
    ShieldCheck,
    Lock,
    Activity,
    Info,
    ArrowRight,
    Zap,
    RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import { getAllPermissions, deletePermission, createPermission, updatePermission } from "@/services/permissionService";
import { Permission } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";

export default function PermissionPage() {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk Edit Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPermission, setEditingPermission] = useState<Permission | null>(null);

    // State untuk Form
    const [newPermissionName, setNewPermissionName] = useState("");
    const [editFormData, setEditFormData] = useState({ name: "" });

    const fetchPermissions = async () => {
        try {
            setLoading(true);
            const response = await getAllPermissions();
            setPermissions(response.data);
            setError("");
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data izin");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus izin ini?")) return;
        try {
            await deletePermission(id);
            setPermissions(permissions.filter(p => p.id !== id));
        } catch (err: any) {
            alert(err.message || "Gagal menghapus izin");
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPermissionName.trim()) return;
        setSubmitting(true);
        try {
            const response = await createPermission({ name: newPermissionName });
            setPermissions([...permissions, response.data]);
            setNewPermissionName("");
            fetchPermissions();
        } catch (err: any) {
            alert(err.message || "Gagal membuat izin");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditOpen = (permission: Permission) => {
        setEditingPermission(permission);
        setEditFormData({ name: permission.name });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPermission) return;
        setSubmitting(true);
        try {
            const response = await updatePermission(editingPermission.id, {
                name: editFormData.name
            });
            setPermissions(permissions.map(p => p.id === editingPermission.id ? response.data : p));
            setIsEditModalOpen(false);
            fetchPermissions();
        } catch (err: any) {
            alert(err.message || "Gagal memperbarui izin");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredPermissions = permissions.filter(permission =>
        permission.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <div className="h-16 w-16 rounded-[2rem] bg-linear-to-br from-primary to-sky-500 flex items-center justify-center text-white shadow-[0_0_30px_-5px_var(--color-primary)]">
                        <Key size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none">
                            Manajemen <span className="text-primary italic">Izin</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium">Pusat Kendali Akses & Keamanan Sistem</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-muted border border-glass-border backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Total Izin</p>
                        <h3 className="text-2xl font-black text-glass-text leading-none">{permissions.length}</h3>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-muted border border-glass-border backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-sky-500 mb-1">Status</p>
                        <h3 className="text-sm font-black text-glass-text leading-none uppercase tracking-tighter flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> TERHUBUNG
                        </h3>
                    </div>
                </div>
            </div>

            {/* Layout Utama: Horizontal Rapi & Estetik */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Bagian Kiri: Form Input Langsung */}
                <div className="lg:col-span-4 space-y-4">
                    <GlassCard className="p-8 border-glass-border shadow-2xl relative overflow-hidden group">
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-glass-text">
                            <Zap size={200} />
                        </div>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                <Plus size={18} />
                            </div>
                            <h3 className="text-xl font-bold text-glass-text tracking-tight">Kunci Baru</h3>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 ml-1">
                                    Identitas Izin
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="CONTOH: AKSES_DATA_INTI"
                                        value={newPermissionName}
                                        onChange={(e) => setNewPermissionName(e.target.value.toUpperCase())}
                                        className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-2xl py-4 px-5 text-glass-text font-black outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-black/60 transition-all placeholder:text-glass-text/30 shadow-xs text-lg"
                                        required
                                    />
                                    <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/60" size={20} />
                                </div>
                                <p className="text-[10px] text-glass-text/40 italic leading-relaxed px-1">
                                    * Gunakan huruf kapital dan garis bawah untuk konsistensi sistem keamanan.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting || !newPermissionName}
                                className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-base tracking-tight"
                            >
                                {submitting ? (
                                    <Loader2 size={24} className="animate-spin" />
                                ) : (
                                    <>Buat Izin Baru <ArrowRight size={20} /></>
                                )}
                            </button>
                        </form>
                    </GlassCard>

                    <div className="p-6 bg-muted rounded-[2rem] border border-glass-border flex items-start gap-4 shadow-xl">
                        <Info size={20} className="text-primary shrink-0 mt-1" />
                        <div>
                            <p className="text-sm font-black text-glass-text mb-1">Informasi</p>
                            <p className="text-xs text-glass-text/60 leading-relaxed font-bold">
                                Izin yang dibuat akan langsung tersedia di mesin pengaturan peran. Pastikan penamaan deskriptif untuk keamanan optimal.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bagian Kanan: Pencarian & Tabel Registri */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Bar Kontrol Kompak */}
                    <div className="flex items-center gap-4 bg-muted border border-glass-border rounded-[1.5rem] p-2 shadow-2xl">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-glass-text/30 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari identitas izin dalam registri..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-background/50 border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm text-glass-text font-medium outline-none focus:bg-background/80 transition-all placeholder:text-glass-text/20"
                            />
                        </div>
                        <button
                            onClick={fetchPermissions}
                            className="p-3 bg-glass-surface hover:bg-glass-hover rounded-xl text-primary transition-all border border-glass-border shadow-inner"
                            title="Segarkan Data"
                        >
                            <RefreshCw className={cn("transition-transform duration-500", loading && "animate-spin")} size={18} />
                        </button>
                    </div>

                    {/* Registri Izin (Tabel) */}
                    <motion.div variants={slideUp}>
                        {loading && permissions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-[2.5rem] border border-glass-border shadow-2xl">
                                <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                                <p className="text-lg font-bold text-glass-text/40 tracking-tight">Sinkronisasi Registri...</p>
                            </div>
                        ) : (
                            <div className="glass-card overflow-hidden border-glass-border rounded-[2.5rem] shadow-2xl">
                                <DataTable
                                    title="Registri Kunci Keamanan"
                                    data={filteredPermissions}
                                    columns={[
                                        {
                                            header: "IDENTITAS IZIN",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-4 py-2">
                                                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-sky-500/20 flex items-center justify-center text-primary border border-white/5 shadow-sm">
                                                        <Lock size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-glass-text text-base tracking-tight leading-none block">{item.name}</span>
                                                        <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest mt-1 block">ID: #{item.id}</span>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            header: "OPERASI",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleEditOpen(item)}
                                                        className="h-10 w-10 flex items-center justify-center bg-white/10 dark:bg-white/5 hover:bg-glass-hover rounded-xl text-glass-text/40 hover:text-primary transition-all border border-glass-border shadow-sm active:scale-90"
                                                        title="Edit Identitas"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-10 w-10 flex items-center justify-center bg-white/5 hover:bg-rose-500/10 rounded-xl text-glass-text/40 hover:text-rose-500 transition-all border border-white/5 shadow-sm active:scale-90"
                                                        title="Hapus Izin"
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

            {/* Modal Edit (Bahasa Indonesia & Estetik) */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-md bg-background border border-glass-border rounded-[3rem] p-10 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary via-sky-500 to-transparent" />

                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="absolute top-8 right-8 text-glass-text/30 hover:text-white bg-white/5 p-2 rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-10 text-center">
                                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-xl border border-primary/10">
                                    <Edit2 size={28} />
                                </div>
                                <h2 className="text-3xl font-black text-glass-text mb-2 tracking-tight">Perbarui Kunci</h2>
                                <p className="text-glass-text/40 font-medium">Modifikasi parameter identitas izin sistem.</p>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                        Identitas Baru
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value.toUpperCase() })}
                                        className="w-full bg-white/50 dark:bg-black/60 border border-glass-border rounded-2xl py-4 px-6 text-glass-text font-black text-xl outline-none focus:border-primary/50 transition-all text-center shadow-inner"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 bg-muted hover:bg-glass-hover text-glass-text font-bold py-4 rounded-2xl transition-all border border-glass-border active:scale-95"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-[1.5] bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-95 hover:brightness-110"
                                    >
                                        {submitting ? <Loader2 size={24} className="animate-spin mx-auto" /> : "Simpan Perubahan"}
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
