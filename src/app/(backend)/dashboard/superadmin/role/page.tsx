"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Plus,
    Edit2,
    Trash2,
    Shield,
    Calendar,
    Search,
    Loader2,
    X,
    Activity,
    Users,
    Info,
    ArrowRight,
    Zap,
    RefreshCw,
    ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import { getAllRoles, deleteRole, createRole, updateRole } from "@/services/roleService";
import { Role } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";

export default function RolePage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk Edit Modal (Hanya untuk Edit)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    // State untuk Form
    const [newRoleName, setNewRoleName] = useState("");
    const [editFormData, setEditFormData] = useState({ name: "" });

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const response = await getAllRoles();
            setRoles(response.data);
            setError("");
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data peran");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus peran ini?")) return;
        try {
            await deleteRole(id);
            setRoles(roles.filter(r => r.id !== id));
        } catch (err: any) {
            alert(err.message || "Gagal menghapus peran");
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRoleName.trim()) return;
        setSubmitting(true);
        try {
            const response = await createRole({ name: newRoleName });
            setRoles([...roles, response.data]);
            setNewRoleName("");
            fetchRoles();
        } catch (err: any) {
            alert(err.message || "Gagal membuat peran");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditOpen = (role: Role) => {
        setEditingRole(role);
        setEditFormData({ name: role.name });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingRole) return;
        setSubmitting(true);
        try {
            const response = await updateRole(editingRole.id, {
                name: editFormData.name,
            });
            setRoles(roles.map(r => r.id === editingRole.id ? response.data : r));
            setIsEditModalOpen(false);
            fetchRoles();
        } catch (err: any) {
            alert(err.message || "Gagal memperbarui peran");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-8 pb-20"
        >
            {/* Header & Deskripsi */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-[2rem] bg-linear-to-br from-primary to-emerald-500 flex items-center justify-center text-white shadow-[0_0_30px_-5px_rgba(var(--color-primary),0.5)]">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                            Manajemen <span className="text-primary italic">Peran</span>
                        </h1>
                        <p className="text-glass-text/40 text-lg mt-2 font-medium">Pengaturan Tingkat Otoritas Sistem</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Total Peran</p>
                        <h3 className="text-2xl font-black text-white leading-none">{roles.length}</h3>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Status</p>
                        <h3 className="text-sm font-black text-white leading-none uppercase tracking-tighter flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Aktif
                        </h3>
                    </div>
                </div>
            </div>

            {/* Layout Utama: Horizontal Rapi & Estetik */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Bagian Kiri: Form Input Langsung Peran */}
                <div className="lg:col-span-4 space-y-4">
                    <GlassCard className="p-8 border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                            <Shield size={200} />
                        </div>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                <Plus size={18} />
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Peran Baru</h3>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 ml-1">
                                    Nama Peran
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="CONTOH: MODERATOR_ACARA"
                                        value={newRoleName}
                                        onChange={(e) => setNewRoleName(e.target.value.toUpperCase())}
                                        className="w-full bg-black/60 border border-white/10 rounded-2xl py-4 px-5 text-white font-bold outline-none focus:border-primary/50 focus:bg-black/80 transition-all placeholder:text-white/5 shadow-inner text-lg"
                                        required
                                    />
                                    <Users className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/20" size={20} />
                                </div>
                                <p className="text-[10px] text-white/20 italic leading-relaxed px-1">
                                    * Gunakan nama yang jelas untuk tingkatan otoritas pengguna.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting || !newRoleName}
                                className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-base tracking-tight"
                            >
                                {submitting ? (
                                    <Loader2 size={24} className="animate-spin" />
                                ) : (
                                    <>Inisialisasi Peran <ArrowRight size={20} /></>
                                )}
                            </button>
                        </form>
                    </GlassCard>

                    <div className="p-6 bg-linear-to-br from-white/5 to-transparent rounded-[2rem] border border-white/10 flex items-start gap-4 shadow-xl">
                        <Info size={20} className="text-primary shrink-0 mt-1" />
                        <div>
                            <p className="text-sm font-bold text-white/80 mb-1">Sistem Otoritas</p>
                            <p className="text-xs text-glass-text/40 leading-relaxed font-medium">
                                Peran digunakan untuk mengelompokkan izin akses. Setiap peran dapat memiliki beberapa izin untuk mengontrol fungsionalitas aplikasi.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bagian Kanan: Pencarian & Tabel Peran */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Bar Kontrol Kompak */}
                    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] p-2 shadow-2xl">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-glass-text/30 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari nama peran dalam sistem..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black/40 border-none rounded-xl py-3 pl-12 pr-4 text-sm text-white font-medium outline-none focus:bg-black/60 transition-all placeholder:text-glass-text/20"
                            />
                        </div>
                        <button
                            onClick={fetchRoles}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-primary transition-all border border-white/5 shadow-inner"
                            title="Segarkan Data"
                        >
                            <RefreshCw className={cn("transition-transform duration-500", loading && "animate-spin")} size={18} />
                        </button>
                    </div>

                    {/* Tabel Registri Peran */}
                    <motion.div variants={slideUp}>
                        {loading && roles.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl">
                                <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                                <p className="text-lg font-bold text-white/40 tracking-tight">Sinkronisasi Data Peran...</p>
                            </div>
                        ) : (
                            <div className="glass-card overflow-hidden border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                                <DataTable
                                    title="Registri Otoritas Peran"
                                    data={filteredRoles}
                                    columns={[
                                        {
                                            header: "IDENTITAS PERAN",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-4 py-2">
                                                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center text-primary border border-white/5 shadow-sm">
                                                        <ShieldCheck size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-white text-base tracking-tight leading-none block">{item.name}</span>
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
                                                        className="h-10 w-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl text-glass-text/40 hover:text-primary transition-all border border-white/5 shadow-sm active:scale-90"
                                                        title="Ubah Peran"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-10 w-10 flex items-center justify-center bg-white/5 hover:bg-rose-500/10 rounded-xl text-glass-text/40 hover:text-rose-500 transition-all border border-white/5 shadow-sm active:scale-90"
                                                        title="Hapus Peran"
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

            {/* Modal Edit Peran (Bahasa Indonesia & Estetik) */}
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
                            className="relative w-full max-w-md glass-card rounded-[3rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border-white/15 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary via-emerald-500 to-transparent" />

                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="absolute top-8 right-8 text-glass-text/30 hover:text-white bg-white/5 p-2 rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-10 text-center">
                                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-xl border border-primary/10">
                                    <ShieldCheck size={28} />
                                </div>
                                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Ubah Peran</h2>
                                <p className="text-glass-text/40 font-medium">Perbarui identitas tingkat otoritas sistem.</p>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                        Nama Peran Baru
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value.toUpperCase() })}
                                        className="w-full bg-black/60 border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-xl outline-none focus:border-primary/50 transition-all text-center shadow-inner"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all border border-white/5 active:scale-95"
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