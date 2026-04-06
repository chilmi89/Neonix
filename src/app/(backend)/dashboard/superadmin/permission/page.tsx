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

    // State untuk Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
            setIsCreateModalOpen(false);
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
                    <div className="h-16 w-16 rounded-[2rem] bg-linear-to-br from-primary to-sky-500 flex items-center justify-center text-[var(--foreground)] shadow-[0_0_30px_-5px_var(--color-primary)]">
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

            {/* Layout Utama */}
            <div className="grid grid-cols-1 gap-8 items-start">
                
                {/* Tabel Izin Full Width */}
                <div className="space-y-6">
                    {/* Bar Kontrol */}
                    <div className="flex flex-wrap items-center gap-4 bg-[var(--background)] border border-[var(--glass-border)] rounded-2xl p-2 md:p-3 shadow-sm">
                        <div className="relative flex-1 group min-w-[200px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari identitas izin dalam registri..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[var(--muted)] border border-[var(--glass-border)] rounded-xl py-3 pl-12 pr-4 text-sm text-[var(--foreground)] font-medium outline-none focus:bg-[var(--glass-surface)] transition-all placeholder:text-[var(--muted-foreground)]"
                            />
                        </div>
                        <button
                            onClick={fetchPermissions}
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
                            <span className="hidden sm:inline">Tambah Izin</span>
                        </button>
                    </div>

                    {/* Registri Izin (Tabel) */}
                    <motion.div variants={slideUp}>
                        {loading && permissions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-[2.5rem] border border-glass-border shadow-2xl">
                                <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                                <p className="text-lg font-bold text-[var(--muted-foreground)] tracking-tight">Sinkronisasi Registri...</p>
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
                                                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-sky-500/20 flex items-center justify-center text-primary border border-[var(--glass-border)] shadow-sm">
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
                                                        className="h-10 w-10 flex items-center justify-center bg-[var(--glass-hover)] dark:bg-[var(--glass-hover)] hover:bg-glass-hover rounded-xl text-[var(--muted-foreground)] hover:text-primary transition-all border border-glass-border shadow-sm active:scale-90"
                                                        title="Edit Identitas"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-10 w-10 flex items-center justify-center bg-[var(--glass-hover)] hover:bg-rose-500/10 rounded-xl text-[var(--muted-foreground)] hover:text-rose-500 transition-all border border-[var(--glass-border)] shadow-sm active:scale-90"
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
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Tambah Izin (Permission)</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm">Tambahkan titik kontrol akses baru.</p>
                                </div>
                            </div>

                            <form onSubmit={handleCreateSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Identitas Izin</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="CONTOH: MANAGE_USERS"
                                            value={newPermissionName}
                                            onChange={(e) => setNewPermissionName(e.target.value.toUpperCase())}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all font-bold"
                                            required
                                        />
                                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
                                    </div>
                                    <p className="text-[11px] text-[var(--muted-foreground)]">* Gunakan format uppercase dengan underscore (_).</p>
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
                                        disabled={submitting || !newPermissionName}
                                        className="flex-[1.5] bg-[var(--primary)] text-white font-semibold py-3 rounded-xl shadow-md transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {submitting ? <Loader2 size={20} className="animate-spin" /> : "Buat Izin"}
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
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Ubah Izin</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm">Modifikasi parameter identitas izin sistem.</p>
                                </div>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-5 text-left">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Identitas Baru</label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value.toUpperCase() })}
                                        className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all font-bold"
                                        required
                                        autoFocus
                                    />
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
