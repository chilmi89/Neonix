"use client";


import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import { GlassBadge } from "@/app/(frontend)/_components/ui/GlassBadge";
import { GlassButton } from "@/app/(frontend)/_components/ui/GlassButton";
import { Plus, MoreVertical, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/userService";
import { User } from "@/types/auth";
import { Loader2, AlertCircle } from "lucide-react";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                if (response.status === "success") {
                    setUsers(response.data || []);
                } else {
                    setError(response.message || "Gagal mengambil data user");
                }
            } catch (err: any) {
                setError(err.message || "Terjadi kesalahan saat menghubungkan ke server");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (

        <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-glass-text tracking-tight uppercase italic">
                        User <span className="text-emerald-500">Management</span>
                    </h1>
                    <p className="text-glass-text/60">Manage your team members and their account permissions.</p>
                </div>
                <GlassButton className="flex items-center gap-2">
                    <Plus size={18} /> Add User
                </GlassButton>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-4xl border border-glass-border">
                    <Loader2 className="animate-spin mb-6 text-emerald-500" size={48} />
                    <p className="text-lg font-bold text-[var(--muted-foreground)]">
                        Memuat data user…
                    </p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-24 bg-muted rounded-4xl border border-red-500/20 text-red-500">
                    <AlertCircle size={48} className="mb-4" />
                    <p className="font-bold">Gagal memuat: {error}</p>
                </div>
            ) : (
                <DataTable
                    data={users}
                    columns={[
                        {
                            header: "User",
                            accessor: (user: User) => (
                                <div className="flex items-center gap-3 py-2">
                                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-emerald-500 font-black border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                                        {user.name?.charAt(0).toUpperCase() ?? "?"}
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-glass-text leading-none">{user.name}</p>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <Mail size={10} className="text-[var(--muted-foreground)]" />
                                            <p className="text-[10px] text-[var(--muted-foreground)] font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            header: "Role",
                            accessor: (user: User) => (
                                <div className="flex flex-wrap gap-1.5">
                                    {(user.roles || []).map((role: any) => (
                                        <span key={role.id || role} className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-[var(--glass-hover)] border border-[var(--glass-border)] rounded-lg text-glass-text/60 italic">
                                            {typeof role === 'string' ? role : role.name}
                                        </span>
                                    ))}
                                    {(user.roles || []).length === 0 && (
                                        <span className="text-[10px] font-bold text-glass-text/20 uppercase">No Role</span>
                                    )}
                                </div>
                            )
                        },
                        {
                            header: "Join Date",
                            accessor: (user: User) => (
                                <span className="text-xs font-bold text-[var(--muted-foreground)]">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    }) : '-'}
                                </span>
                            )
                        },
                        {
                            header: "Actions",
                            accessor: () => (
                                <div className="flex items-center gap-2">
                                    <GlassButton variant="ghost" size="sm" className="p-2 h-9 w-9 rounded-xl">
                                        <MoreVertical size={16} />
                                    </GlassButton>
                                </div>
                            ),
                            className: "text-right"
                        }
                    ]}
                />
            )}
        </motion.div>

    );
}
