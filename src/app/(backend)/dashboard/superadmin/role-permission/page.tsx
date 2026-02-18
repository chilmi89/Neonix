"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    ShieldCheck,
    Key,
    Search,
    Loader2,
    X,
    Info,
    RefreshCw,
    CheckCircle2,
    Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp } from "@/lib/motion";
import { getAllRoles, getRolePermissions, updateRolePermissions } from "@/services/roleService";
import { getAllPermissions } from "@/services/permissionService";
import { Role, Permission } from "@/types/auth";
import { cn } from "@/lib/utils";

export default function RolePermissionPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // State for Permission Assignment Modal
    const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [roleAssignedPermissionIds, setRoleAssignedPermissionIds] = useState<number[]>([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [rolesRes, permsRes] = await Promise.all([
                getAllRoles(),
                getAllPermissions()
            ]);

            const rawRoles = rolesRes.data || [];
            const allAvailablePerms = permsRes.data || [];
            setAllPermissions(allAvailablePerms);

            // Enrich roles with their permissions fetching them in parallel
            const enrichedRoles = await Promise.all(
                rawRoles.map(async (role: Role) => {
                    try {
                        const permsRes = await getRolePermissions(role.id);
                        return { ...role, permissions: permsRes.data || [] };
                    } catch {
                        return { ...role, permissions: [] };
                    }
                })
            );

            setRoles(enrichedRoles);
            setError("");
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenAssignment = (role: Role) => {
        setSelectedRole(role);
        setIsAssignmentModalOpen(true);
        // Use permissions from enriched role data
        setRoleAssignedPermissionIds(role.permissions?.map(p => p.id) || []);
    };

    const togglePermission = (permId: number) => {
        setRoleAssignedPermissionIds(prev =>
            prev.includes(permId)
                ? prev.filter(id => id !== permId)
                : [...prev, permId]
        );
    };

    const handleAssignmentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) return;

        setSubmitting(true);
        try {
            await updateRolePermissions(selectedRole.id, roleAssignedPermissionIds);
            setIsAssignmentModalOpen(false);
            fetchData();
        } catch (err: any) {
            alert(err.message || "Gagal memperbarui izin peran");
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
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-primary to-sky-500 flex items-center justify-center text-white shadow-[0_0_30px_-5px_rgba(var(--color-primary),0.5)]">
                        <Lock size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                            Kelola <span className="text-primary italic">Izin Peran</span>
                        </h1>
                        <p className="text-glass-text/40 text-lg mt-2 font-medium">Pemetaan Hak Akses Sistem</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Total Peran</p>
                        <h3 className="text-2xl font-black text-white leading-none">{roles.length}</h3>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-1">Izin Tersedia</p>
                        <h3 className="text-2xl font-black text-white leading-none">{allPermissions.length}</h3>
                    </div>
                </div>
            </div>

            {/* Layout Utama */}
            <div className="space-y-6">
                {/* Bar Kontrol Kompak */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-2 shadow-2xl">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-glass-text/30 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Cari peran..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/40 dark:bg-black/40 border-none rounded-xl py-3 pl-12 pr-4 text-sm text-glass-text font-medium outline-none focus:bg-white/60 dark:focus:bg-black/60 transition-all placeholder:text-glass-text/20"
                        />
                    </div>
                    <button
                        onClick={fetchData}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-primary transition-all border border-white/5 shadow-inner"
                        title="Segarkan Data"
                    >
                        <RefreshCw className={cn("transition-transform duration-500", loading && "animate-spin")} size={18} />
                    </button>
                </div>

                {/* Tabel Peran */}
                <motion.div variants={slideUp}>
                    {loading && roles.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-4xl border border-white/10 shadow-2xl">
                            <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                            <p className="text-lg font-bold text-white/40 tracking-tight">Menghubungkan ke Pusat Data...</p>
                        </div>
                    ) : (
                        <div className="glass-card overflow-hidden border-white/10 rounded-4xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                            <DataTable
                                title="Registri Izin Peran"
                                data={filteredRoles}
                                columns={[
                                    {
                                        header: "PERAN",
                                        accessor: (item) => (
                                            <div className="flex items-center gap-4 py-2">
                                                <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-sky-500/20 flex items-center justify-center text-primary border border-white/5 shadow-sm">
                                                    <ShieldCheck size={18} />
                                                </div>
                                                <div>
                                                    <span className="font-black text-white text-base tracking-tight leading-none block uppercase">{item.name}</span>
                                                    <span className="text-[10px] font-medium text-glass-text/40 block mt-1 tracking-widest">ID: #{item.id}</span>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        header: "JUMLAH IZIN",
                                        accessor: (item) => (
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 min-w-[32px] px-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                                    <span className="text-xs font-black text-white">{item.permissions?.length || 0}</span>
                                                </div>
                                                <div className="flex -space-x-2">
                                                    {[...Array(Math.min(3, item.permissions?.length || 0))].map((_, i) => (
                                                        <div key={i} className="h-6 w-6 rounded-full border border-black bg-primary/20 flex items-center justify-center">
                                                            <Key size={10} className="text-primary" />
                                                        </div>
                                                    ))}
                                                    {(item.permissions?.length || 0) > 3 && (
                                                        <div className="h-6 w-6 rounded-full border border-black bg-white/10 flex items-center justify-center text-[8px] font-black text-white/40">
                                                            +{(item.permissions?.length || 0) - 3}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        header: "AKSI",
                                        accessor: (item) => (
                                            <button
                                                onClick={() => handleOpenAssignment(item)}
                                                className="flex items-center gap-3 px-5 py-2.5 bg-white/10 dark:bg-white/5 hover:bg-primary/20 hover:text-primary rounded-2xl text-glass-text/40 transition-all border border-glass-border shadow-sm active:scale-95 group"
                                            >
                                                <Key size={16} className="group-hover:scale-110 transition-transform" />
                                                <span className="text-xs font-black uppercase tracking-tight">Atur Izin</span>
                                            </button>
                                        )
                                    },
                                ]}
                            />
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Modal Penugasan Izin (Refined & Compact) */}
            <AnimatePresence>
                {isAssignmentModalOpen && selectedRole && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAssignmentModalOpen(false)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-sm glass-card rounded-[2.5rem] p-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-white/10 overflow-hidden"
                        >
                            {/* Header Modal */}
                            <div className="p-6 border-b border-white/5 relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-sky-500 to-transparent" />

                                <button
                                    onClick={() => setIsAssignmentModalOpen(false)}
                                    className="absolute top-6 right-6 text-glass-text/30 hover:text-white transition-all"
                                >
                                    <X size={18} />
                                </button>

                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                                        <Key size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white tracking-tight leading-none">Hak Akses</h2>
                                        <p className="text-[10px] text-glass-text/40 font-bold uppercase tracking-wider mt-1.5">{selectedRole.name}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Body Modal */}
                            <form onSubmit={handleAssignmentSubmit}>
                                <div className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between px-1">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
                                                Konfigurasi Izin
                                            </label>
                                            <span className="text-[10px] text-glass-text/20 font-bold">
                                                {roleAssignedPermissionIds.length} Aktif
                                            </span>
                                        </div>

                                        <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden max-h-[320px] overflow-y-auto custom-scrollbar">
                                            {allPermissions.length > 0 ? (
                                                allPermissions.map((perm) => {
                                                    const isSelected = roleAssignedPermissionIds.includes(perm.id);
                                                    return (
                                                        <div
                                                            key={perm.id}
                                                            onClick={() => togglePermission(perm.id)}
                                                            className={cn(
                                                                "px-5 py-4 flex items-center justify-between cursor-pointer transition-all border-b border-white/5 last:border-0",
                                                                isSelected
                                                                    ? "bg-primary/5 text-primary"
                                                                    : "text-white/40 hover:bg-white/5"
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={cn(
                                                                    "h-7 w-7 rounded-xl flex items-center justify-center transition-all",
                                                                    isSelected ? "bg-primary/20 text-primary" : "bg-white/5 text-transparent"
                                                                )}>
                                                                    <Key size={14} />
                                                                </div>
                                                                <div>
                                                                    <span className="font-bold text-xs tracking-tight uppercase block">{perm.name}</span>
                                                                </div>
                                                            </div>
                                                            {isSelected && <CheckCircle2 size={18} className="text-primary animate-in fade-in zoom-in duration-300" />}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="p-10 text-center text-white/10 italic text-xs">Registri Izin Kosong.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Modal */}
                                <div className="p-6 bg-black/40 border-t border-white/5 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsAssignmentModalOpen(false)}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-all border border-white/5 text-[10px] uppercase tracking-widest"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-[1.5] bg-primary text-white font-black py-4 rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-95 hover:scale-[1.02] flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
                                    >
                                        {submitting ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <>Update Izin <CheckCircle2 size={14} /></>
                                        )}
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
