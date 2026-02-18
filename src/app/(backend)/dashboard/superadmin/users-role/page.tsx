"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Users,
    ShieldCheck,
    Search,
    Loader2,
    X,
    Info,
    ArrowRight,
    RefreshCw,
    UserPlus,
    CheckCircle2,
    Circle,
    UserCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import { getAllUsers, getUserRoles, updateUserRoles } from "@/services/userService";
import { getAllRoles } from "@/services/roleService";
import { User, Role } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";

export default function UsersRolePage() {
    const [users, setUsers] = useState<User[]>([]);
    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // State for Role Assignment Modal
    const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userAssignedRoleIds, setUserAssignedRoleIds] = useState<number[]>([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [usersRes, rolesRes] = await Promise.all([
                getAllUsers(),
                getAllRoles()
            ]);

            const rawUsers = usersRes.data || [];
            const allAvailableRoles = rolesRes.data || [];
            setAllRoles(allAvailableRoles);

            // Enrich users with their roles fetching them in parallel
            // This fixes "Status Peran" being empty if not included in user list
            const enrichedUsers = await Promise.all(
                rawUsers.map(async (user: User) => {
                    try {
                        const rolesRes = await getUserRoles(user.id);
                        return { ...user, roles: rolesRes.data || [] };
                    } catch {
                        return { ...user, roles: [] };
                    }
                })
            );

            setUsers(enrichedUsers);
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

    const handleOpenAssignment = async (user: User) => {
        setSelectedUser(user);
        setIsAssignmentModalOpen(true);
        setUserAssignedRoleIds(user.roles?.map(r => r.id) || []);
    };

    const toggleRole = (roleId: number) => {
        setUserAssignedRoleIds(prev =>
            prev.includes(roleId)
                ? prev.filter(id => id !== roleId)
                : [...prev, roleId]
        );
    };

    const handleAssignmentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;

        setSubmitting(true);
        try {
            await updateUserRoles(selectedUser.id, userAssignedRoleIds);
            setIsAssignmentModalOpen(false);
            // Refresh users to show updated roles if included in user list
            fetchData();
        } catch (err: any) {
            alert(err.message || "Gagal memperbarui peran pengguna");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-primary to-amber-500 flex items-center justify-center text-white shadow-[0_0_30px_-5px_rgba(var(--color-primary),0.5)]">
                        <UserCircle2 size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                            Kelola <span className="text-primary italic">Peran Pengguna</span>
                        </h1>
                        <p className="text-glass-text/40 text-lg mt-2 font-medium">Penugasan Otoritas & Akses Personel</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Total Pengguna</p>
                        <h3 className="text-2xl font-black text-white leading-none">{users.length}</h3>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Peran Tersedia</p>
                        <h3 className="text-2xl font-black text-white leading-none">{allRoles.length}</h3>
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
                            placeholder="Cari nama atau email pengguna..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/40 dark:bg-black/40 border-none rounded-xl py-3 pl-12 pr-4 text-sm text-glass-text font-medium outline-none focus:bg-white/60 dark:focus:bg-black/60 transition-all placeholder:text-glass-text/20"
                        />
                    </div>
                    <button
                        onClick={fetchData}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-primary transition-all border border-white/5 shadow-inner"
                    >
                        <RefreshCw className={cn("transition-transform duration-500", loading && "animate-spin")} size={18} />
                    </button>
                </div>

                {/* Tabel Pengguna */}
                <motion.div variants={slideUp}>
                    {loading && users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-4xl border border-white/10 shadow-2xl">
                            <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                            <p className="text-lg font-bold text-white/40 tracking-tight">Menghubungkan ke Pusat Data...</p>
                        </div>
                    ) : (
                        <div className="glass-card overflow-hidden border-white/10 rounded-4xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                            <DataTable
                                title="Registri Akses Pengguna"
                                data={filteredUsers}
                                columns={[
                                    {
                                        header: "PENGGUNA",
                                        accessor: (item) => (
                                            <div className="flex items-center gap-4 py-2">
                                                <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-amber-500/20 flex items-center justify-center text-primary border border-white/5 shadow-sm">
                                                    <Users size={18} />
                                                </div>
                                                <div>
                                                    <span className="font-black text-white text-base tracking-tight leading-none block">{item.name}</span>
                                                    <span className="text-xs font-medium text-glass-text/40 block mt-1">{item.email}</span>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        header: "STATUS PERAN",
                                        accessor: (item) => (
                                            <div className="flex flex-wrap gap-2">
                                                {item.roles && item.roles.length > 0 ? (
                                                    item.roles.map((role: any) => (
                                                        <span key={role.id} className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest shadow-sm">
                                                            {role.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                                        Tanpa Peran
                                                    </span>
                                                )}
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
                                                <ShieldCheck size={16} className="group-hover:scale-110 transition-transform" />
                                                <span className="text-xs font-black uppercase tracking-tight">Atur Peran</span>
                                            </button>
                                        )
                                    },
                                ]}
                            />
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Modal Penugasan Peran (Refined & Compact) */}
            <AnimatePresence>
                {isAssignmentModalOpen && selectedUser && (
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
                                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-amber-500 to-transparent" />

                                <button
                                    onClick={() => setIsAssignmentModalOpen(false)}
                                    className="absolute top-6 right-6 text-glass-text/30 hover:text-white transition-all"
                                >
                                    <X size={18} />
                                </button>

                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white tracking-tight leading-none">Hak Akses</h2>
                                        <p className="text-[10px] text-glass-text/40 font-bold uppercase tracking-wider mt-1.5">{selectedUser.name}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Body Modal */}
                            <form onSubmit={handleAssignmentSubmit}>
                                <div className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between px-1">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
                                                Konfigurasi Peran
                                            </label>
                                            <span className="text-[10px] text-glass-text/20 font-bold">
                                                {userAssignedRoleIds.length} Aktif
                                            </span>
                                        </div>

                                        <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden max-h-[280px] overflow-y-auto custom-scrollbar">
                                            {allRoles.length > 0 ? (
                                                allRoles.map((role) => {
                                                    const isSelected = userAssignedRoleIds.includes(role.id);
                                                    return (
                                                        <div
                                                            key={role.id}
                                                            onClick={() => toggleRole(role.id)}
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
                                                                    <ShieldCheck size={14} />
                                                                </div>
                                                                <span className="font-bold text-xs tracking-tight uppercase">{role.name}</span>
                                                            </div>
                                                            {isSelected && <CheckCircle2 size={18} className="text-primary animate-in fade-in zoom-in duration-300" />}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="p-10 text-center text-white/10 italic text-xs">Registri Peran Kosong.</div>
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
                                            <>Update Akses <CheckCircle2 size={14} /></>
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
