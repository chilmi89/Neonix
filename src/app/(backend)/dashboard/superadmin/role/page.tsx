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
    ShieldCheck,
    Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import { getAllRoles, deleteRole, createRole, updateRole } from "@/services/roleService";
import { getAllTenants } from "@/services/tenantService";
import { Role, Tenant } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";

export default function RolePage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk Edit Modal (Hanya untuk Edit)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    // State untuk Form
    const [newRoleData, setNewRoleData] = useState({ name: "", tenantId: "" });
    const [editFormData, setEditFormData] = useState({ name: "", tenantId: "" });

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

    const fetchTenants = async () => {
        try {
            const response = await getAllTenants();
            setTenants(response.data);
        } catch (err: any) {
            console.error("Gagal mengambil data tenant", err);
        }
    };

    useEffect(() => {
        fetchRoles();
        fetchTenants();
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
        if (!newRoleData.name.trim()) return;
        setSubmitting(true);
        try {
            const dataToSubmit: any = { name: newRoleData.name };
            if (newRoleData.tenantId) {
                dataToSubmit.tenantId = parseInt(newRoleData.tenantId);
            }
            const response = await createRole(dataToSubmit);
            setRoles([...roles, response.data]);
            setNewRoleData({ name: "", tenantId: "" });
            setIsCreateModalOpen(false);
            fetchRoles();
        } catch (err: any) {
            alert(err.message || "Gagal membuat peran");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditOpen = (role: Role) => {
        setEditingRole(role);
        setEditFormData({
            name: role.name,
            tenantId: role.tenantId?.toString() || ""
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingRole) return;
        setSubmitting(true);
        try {
            const dataToSubmit: any = { name: editFormData.name };
            dataToSubmit.tenantId = editFormData.tenantId ? parseInt(editFormData.tenantId) : null;

            const response = await updateRole(editingRole.id, dataToSubmit);
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
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-glass-border pb-8">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-[2rem] bg-linear-to-br from-primary to-emerald-500 flex items-center justify-center text-[var(--foreground)] shadow-[0_0_30px_-5px_var(--color-primary)]">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none">
                            Manajemen <span className="text-primary italic">Peran</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium">Pengaturan Tingkat Otoritas Sistem</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-muted border border-glass-border backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Total Peran</p>
                        <h3 className="text-2xl font-black text-glass-text leading-none">{roles.length}</h3>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-muted border border-glass-border backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Status</p>
                        <h3 className="text-sm font-black text-glass-text leading-none uppercase tracking-tighter flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Aktif
                        </h3>
                    </div>
                </div>
            </div>

            {/* Layout Utama: Horizontal Rapi & Estetik */}
            <div className="grid grid-cols-1 gap-8 items-start">
                
                {/* Tabel Peran Full Width */}
                <div className="space-y-6">
                    {/* Bar Kontrol */}
                    <div className="flex flex-wrap items-center gap-4 bg-[var(--background)] border border-[var(--glass-border)] rounded-2xl p-2 md:p-3 shadow-sm">
                        <div className="relative flex-1 group min-w-[200px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari nama peran dalam sistem..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[var(--muted)] border border-[var(--glass-border)] rounded-xl py-3 pl-12 pr-4 text-sm text-[var(--foreground)] font-medium outline-none focus:bg-[var(--glass-surface)] transition-all placeholder:text-[var(--muted-foreground)]"
                            />
                        </div>
                        <button
                            onClick={fetchRoles}
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
                            <span className="hidden sm:inline">Tambah Peran</span>
                        </button>
                    </div>

                    {/* Tabel Registri Peran */}
                    <motion.div variants={slideUp}>
                        {loading && roles.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-[2.5rem] border border-glass-border shadow-2xl">
                                <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                                <p className="text-lg font-bold text-[var(--muted-foreground)] tracking-tight">Sinkronisasi Data Peran...</p>
                            </div>
                        ) : (
                            <div className="glass-card overflow-hidden border-glass-border rounded-[2.5rem] shadow-2xl">
                                <DataTable
                                    title="Registri Otoritas Peran"
                                    data={filteredRoles}
                                    columns={[
                                        {
                                            header: "IDENTITAS PERAN",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-4 py-2">
                                                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center text-primary border border-[var(--glass-border)] shadow-sm">
                                                        <ShieldCheck size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-glass-text text-base tracking-tight leading-none block">{item.name}</span>
                                                        <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest mt-1 block">ID: #{item.id}</span>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            header: "TENANT",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-2">
                                                    {item.tenantName ? (
                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                            <Building2 size={10} />
                                                            {item.tenantName}
                                                        </div>
                                                    ) : (
                                                        <span className="text-[var(--muted-foreground)] text-[10px] uppercase font-black tracking-widest italic">Global</span>
                                                    )}
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
                                                        title="Ubah Peran"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-[var(--muted-foreground)] hover:text-rose-500 transition-all border border-glass-border shadow-sm active:scale-90"
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
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Peran Baru</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm">Tambahkan level otoritas baru di sistem.</p>
                                </div>
                            </div>

                            <form onSubmit={handleCreateSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Nama Peran</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="CONTOH: MODERATOR"
                                            value={newRoleData.name}
                                            onChange={(e) => setNewRoleData({ ...newRoleData, name: e.target.value.toUpperCase() })}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all font-bold"
                                            required
                                        />
                                        <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Tenant (Opsional)</label>
                                    <div className="relative">
                                        <select
                                            value={newRoleData.tenantId}
                                            onChange={(e) => setNewRoleData({ ...newRoleData, tenantId: e.target.value })}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all appearance-none"
                                        >
                                            <option value="">Global (Tanpa Tenant)</option>
                                            {tenants.map((tenant) => (
                                                <option key={tenant.id} value={tenant.id.toString()}>
                                                    {tenant.name}
                                                </option>
                                            ))}
                                        </select>
                                        <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none" size={18} />
                                    </div>
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
                                        disabled={submitting || !newRoleData.name}
                                        className="flex-[1.5] bg-[var(--primary)] text-white font-semibold py-3 rounded-xl shadow-md transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {submitting ? <Loader2 size={20} className="animate-spin" /> : "Buat Peran"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal Edit Peran */}
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
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Ubah Peran</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm">Perbarui identitas otoritas.</p>
                                </div>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-5 text-left">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Nama Peran Baru</label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value.toUpperCase() })}
                                        className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all font-bold"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Tenant Admin</label>
                                    <div className="relative">
                                        <select
                                            value={editFormData.tenantId}
                                            onChange={(e) => setEditFormData({ ...editFormData, tenantId: e.target.value })}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all appearance-none"
                                        >
                                            <option value="">Global (Tanpa Tenant)</option>
                                            {tenants.map((tenant) => (
                                                <option key={tenant.id} value={tenant.id.toString()}>
                                                    {tenant.name}
                                                </option>
                                            ))}
                                        </select>
                                        <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none" size={18} />
                                    </div>
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