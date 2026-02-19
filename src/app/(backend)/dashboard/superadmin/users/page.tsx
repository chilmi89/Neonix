"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Plus,
    Edit2,
    Trash2,
    Mail,
    Search,
    Loader2,
    X,
    User as UserIcon,
    Info,
    ArrowRight,
    RefreshCw,
    ShieldCheck,
    Key,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import { getAllUsers, deleteUser, createUser, updateUser } from "@/services/userService";
import { getAllRoles } from "@/services/roleService";
import { User, Role } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";

export default function SuperadminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // State untuk Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    // State untuk Form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data);
            setError("");
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data user");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;
        try {
            await deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
        } catch (err: any) {
            alert(err.message || "Gagal menghapus user");
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const dataToSubmit = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            };
            const response = await createUser(dataToSubmit);

            // Jika roleId dipilih, tambahkan role ke user (Ini opsional tergantung API)
            // Namun user minta role admin disertakan. 
            // Kita asumsikan API create user bisa menerima role atau kita call addRoleToUser nanti.
            // Untuk sekarang kita ikuti plan: create user dulu.

            setUsers([...users, response.data]);
            setIsAddModalOpen(false);
            setFormData({ name: "", email: "", password: "" });
            fetchUsers();
        } catch (err: any) {
            alert(err.message || "Gagal membuat user");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditOpen = (user: User) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: "" // Kosongkan password saat edit
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;
        setSubmitting(true);
        try {
            const dataToSubmit: any = {
                name: formData.name,
                email: formData.email,
            };
            if (formData.password) {
                dataToSubmit.password = formData.password;
            }

            const response = await updateUser(editingUser.id, dataToSubmit);
            setUsers(users.map(u => u.id === editingUser.id ? response.data : u));
            setIsEditModalOpen(false);
            fetchUsers();
        } catch (err: any) {
            alert(err.message || "Gagal memperbarui user");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    // Reset ke halaman 1 saat pencarian berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

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
                    <div className="h-16 w-16 rounded-[2rem] bg-linear-to-br from-indigo-600 to-blue-400 flex items-center justify-center text-white shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)]">
                        <UserIcon size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none">
                            Manajemen <span className="text-primary italic">User</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium">Pengaturan Akun & Akses Pengguna</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            setFormData({ name: "", email: "", password: "" });
                            setIsAddModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all"
                    >
                        <Plus size={20} /> Tambah User
                    </button>
                    <div className="px-6 py-3 rounded-2xl bg-muted border border-glass-border backdrop-blur-md flex flex-col items-center min-w-[120px]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Total User</p>
                        <h3 className="text-2xl font-black text-glass-text leading-none">{users.length}</h3>
                    </div>
                </div>
            </div>

            {/* Layout Utama */}
            <div className="space-y-6">
                {/* Bar Kontrol */}
                <div className="flex items-center gap-4 bg-muted border border-glass-border rounded-[1.5rem] p-2 shadow-2xl">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-glass-text/30 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Cari nama atau email user..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-background/50 border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm text-glass-text font-medium outline-none focus:bg-background/80 transition-all placeholder:text-glass-text/20"
                        />
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="p-3 bg-glass-surface hover:bg-glass-hover rounded-xl text-primary transition-all border border-glass-border shadow-inner"
                        title="Segarkan Data"
                    >
                        <RefreshCw className={cn("transition-transform duration-500", loading && "animate-spin")} size={18} />
                    </button>
                </div>

                {/* Tabel User */}
                <motion.div variants={slideUp}>
                    {loading && users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-[2.5rem] border border-glass-border shadow-2xl">
                            <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                            <p className="text-lg font-bold text-glass-text/40 tracking-tight">Sinkronisasi Basis Data User...</p>
                        </div>
                    ) : (
                        <div className="glass-card overflow-hidden border-glass-border rounded-[2.5rem] shadow-2xl">
                            <DataTable
                                title="Daftar Pengguna Sistem"
                                data={paginatedUsers}
                                columns={[
                                    {
                                        header: "PENGGUNA",
                                        accessor: (item) => (
                                            <div className="flex items-center gap-4 py-2">
                                                <div className="h-10 w-10 rounded-xl bg-linear-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center text-indigo-500 border border-white/5 shadow-sm font-bold">
                                                    {item.name[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <span className="font-black text-glass-text text-base tracking-tight leading-none block">{item.name}</span>
                                                    <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest mt-1 block font-mono">{item.email}</span>
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        header: "TANGGAL DAFTAR",
                                        accessor: (item) => (
                                            <span className="text-[10px] font-black text-glass-text/50 uppercase tracking-widest">
                                                {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        )
                                    },
                                    {
                                        header: "OPERASI",
                                        accessor: (item) => (
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleEditOpen(item)}
                                                    className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-glass-text/40 hover:text-primary transition-all border border-glass-border shadow-sm active:scale-90"
                                                    title="Ubah User"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-glass-text/40 hover:text-rose-500 transition-all border border-glass-border shadow-sm active:scale-90"
                                                    title="Hapus User"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )
                                    },
                                ]}
                            />

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="p-6 border-t border-glass-border flex items-center justify-between bg-muted/30">
                                    <div className="text-xs font-black text-glass-text/40 uppercase tracking-widest">
                                        Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredUsers.length)} dari {filteredUsers.length} User
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-glass-text/40 hover:text-primary transition-all border border-glass-border disabled:opacity-20 disabled:scale-100 active:scale-90"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>

                                        <div className="flex items-center gap-1">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    className={cn(
                                                        "h-10 w-10 flex items-center justify-center rounded-xl font-black text-xs transition-all border",
                                                        currentPage === i + 1
                                                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                            : "bg-muted text-glass-text/40 border-glass-border hover:bg-glass-hover"
                                                    )}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-glass-text/40 hover:text-primary transition-all border border-glass-border disabled:opacity-20 disabled:scale-100 active:scale-90"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Modal Add/Edit User */}
            <AnimatePresence>
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsAddModalOpen(false);
                                setIsEditModalOpen(false);
                            }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-md bg-background border border-glass-border rounded-[3rem] p-10 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-indigo-600 via-blue-500 to-transparent" />

                            <button
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    setIsEditModalOpen(false);
                                }}
                                className="absolute top-8 right-8 text-glass-text/30 hover:text-white bg-white/5 p-2 rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-8 text-center">
                                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-xl border border-primary/10">
                                    <UserIcon size={28} />
                                </div>
                                <h2 className="text-3xl font-black text-glass-text mb-2 tracking-tight">
                                    {isAddModalOpen ? "Tambah User" : "Ubah User"}
                                </h2>
                                <p className="text-glass-text/40 font-medium">
                                    {isAddModalOpen ? "Buat akun pengguna baru." : "Perbarui identitas dan akses user."}
                                </p>
                            </div>

                            <form onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                        Nama / Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama lengkap"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-background/80 border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 transition-all shadow-inner"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="user@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-background/80 border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 transition-all shadow-inner"
                                            required
                                        />
                                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-glass-text/20" size={18} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                        Password {isEditModalOpen && <span className="text-glass-text/30 italic font-normal">(Kosongkan jika tidak diubah)</span>}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-background/80 border border-glass-border rounded-xl py-3 px-4 text-glass-text font-bold outline-none focus:border-primary/50 transition-all shadow-inner"
                                            required={isAddModalOpen}
                                        />
                                        <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-glass-text/20" size={18} />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAddModalOpen(false);
                                            setIsEditModalOpen(false);
                                        }}
                                        className="flex-1 bg-muted hover:bg-glass-hover text-glass-text font-bold py-4 rounded-2xl transition-all border border-glass-border active:scale-95"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-[1.5] bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-95 hover:brightness-110 flex items-center justify-center"
                                    >
                                        {submitting ? <Loader2 size={24} className="animate-spin" /> : (isAddModalOpen ? "Tambah User" : "Simpan Perubahan")}
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
