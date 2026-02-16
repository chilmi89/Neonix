"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import { GlassBadge } from "@/app/(frontend)/_components/ui/GlassBadge";
import {
    Plus,
    Edit2,
    Trash2,
    Shield,
    Calendar,
    Search,
    Loader2,
    X,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp } from "@/lib/motion";
import { getAllRoles, deleteRole, createRole, updateRole } from "@/services/roleService";
import { Role } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";

export default function RolePage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [formData, setFormData] = useState({
        name: ""
    });

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const response = await getAllRoles();
            setRoles(response.data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch roles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this role?")) return;
        try {
            await deleteRole(id);
            setRoles(roles.filter(r => r.id !== id));
        } catch (err: any) {
            alert(err.message || "Failed to delete role");
        }
    };

    const handleOpenModal = (role?: Role) => {
        if (role) {
            setEditingRole(role);
            setFormData({
                name: role.name
            });
        } else {
            setEditingRole(null);
            setFormData({
                name: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingRole) {
                const response = await updateRole(editingRole.id, {
                    name: formData.name,
                    // If your backend handles permissions in update, send them here
                    // backend_event might need a separate call for each permission or a list
                });
                setRoles(roles.map(r => r.id === editingRole.id ? response.data : r));
            } else {
                const response = await createRole({
                    name: formData.name,
                    // permissionIds: formData.permissionIds // Check if backend supports this in create
                });
                setRoles([...roles, response.data]);
            }
            setIsModalOpen(false);
            fetchRoles();
        } catch (err: any) {
            alert(err.message || "Failed to save role");
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
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-glass-text">Role Management</h1>
                    <p className="text-glass-text/60">Manage system access levels and permissions.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/30 flex items-center gap-2 hover:brightness-110 mb-transition"
                >
                    <Plus size={18} /> Add New Role
                </button>
            </div>

            {/* Filters and Search */}
            <GlassCard className="p-4">
                <div className="relative group max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-glass-text/20 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search roles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/20 border border-glass-border rounded-xl py-2.5 pl-12 pr-4 text-sm text-glass-text outline-none focus:border-primary/50 transition-all placeholder:text-glass-text/20"
                    />
                </div>
            </GlassCard>

            {/* Error Message */}
            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                    {error}
                </div>
            )}

            {/* Table Content */}
            <motion.div variants={slideUp}>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-glass-text/40">
                        <Loader2 className="animate-spin mb-4" size={32} />
                        <p>Loading roles data...</p>
                    </div>
                ) : (
                    <DataTable
                        title="Available Roles"
                        data={filteredRoles}
                        columns={[
                            {
                                header: "Role Name",
                                accessor: (item) => (
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Shield size={18} />
                                        </div>
                                        <span className="font-semibold">{item.name}</span>
                                    </div>
                                )
                            },
                            {
                                header: "Created At",
                                accessor: (item) => (
                                    <div className="flex items-center gap-2 text-glass-text/60">
                                        <Calendar size={14} />
                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </div>
                                )
                            },
                            {
                                header: "Actions",
                                accessor: (item) => (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenModal(item)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-glass-text/60 hover:text-primary transition-all"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-lg text-glass-text/60 hover:text-red-500 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )
                            },
                        ]}
                    />
                )}
            </motion.div>

            {/* Modal - Create/Edit Role */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-xl glass-card rounded-3xl p-8 shadow-2xl border-white/10"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-glass-text/40 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl font-bold text-glass-text mb-2">
                                {editingRole ? "Edit Role" : "Create New Role"}
                            </h2>
                            <p className="text-glass-text/60 mb-8">
                                {editingRole ? `Update details for ${editingRole.name}` : "Configure a new system access level"}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-glass-text/40 ml-1">
                                        Role Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Moderator"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/40 border border-glass-border rounded-xl py-3 px-4 text-glass-text outline-none focus:border-primary/50 focus:bg-black/60 transition-all"
                                        required
                                    />
                                </div>


                                <div className="pt-4 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-glass-text font-bold py-3 rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {submitting ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            editingRole ? "Save Changes" : "Create Role"
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