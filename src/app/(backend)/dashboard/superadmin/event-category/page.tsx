"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Tags,
    ShieldCheck,
    Search,
    Loader2,
    Plus,
    Edit2,
    Trash2,
    X,
    Info,
    ArrowRight,
    RefreshCw,
    Layers,
    Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import {
    getAllEventCategories,
    deleteEventCategory,
    createEventCategory,
    updateEventCategory
} from "@/services/eventCategoryService";
import { EventCategory } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";

export default function EventCategoryPage() {
    const [categories, setCategories] = useState<EventCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk Modals
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<EventCategory | null>(null);

    // State untuk Form
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editFormData, setEditFormData] = useState({ name: "" });

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await getAllEventCategories();
            setCategories(response.data || []);
            setError("");
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data kategori");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus kategori ini?")) return;

        try {
            await deleteEventCategory(id);
            setCategories(categories.filter(c => c.id !== id));
        } catch (err: any) {
            alert(err.message || "Gagal menghapus kategori");
        }
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        setSubmitting(true);
        try {
            const response = await createEventCategory({ name: newCategoryName });
            setCategories([...categories, response.data]);
            setNewCategoryName("");
            setIsCreateModalOpen(false);
            fetchCategories(); // Refresh to ensure synchronization
        } catch (err: any) {
            alert(err.message || "Gagal membuat kategori");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditOpen = (category: EventCategory) => {
        setEditingCategory(category);
        setEditFormData({ name: category.name });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;
        setSubmitting(true);
        try {
            const response = await updateEventCategory(editingCategory.id, {
                name: editFormData.name,
            });
            setCategories(categories.map(c => c.id === editingCategory.id ? response.data : c));
            setIsEditModalOpen(false);
            fetchCategories();
        } catch (err: any) {
            alert(err.message || "Gagal memperbarui kategori");
        } finally {
            setSubmitting(false);
        }
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-primary to-sky-500 flex items-center justify-center text-[var(--foreground)] shadow-[0_0_30px_-5px_var(--color-primary)] overflow-hidden relative group">
                        <div className="absolute inset-0 bg-[var(--glass-hover)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <Layers size={32} className="relative z-10" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none">
                            Kelola <span className="text-primary italic">Kategori Event</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium tracking-tight">Klasifikasi & Taksonomi Acara Sistem</p>
                    </div>
                </div>

                <div className="bg-muted px-6 py-4 rounded-4xl border border-glass-border backdrop-blur-md flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Total Kategori</p>
                        <h3 className="text-2xl font-black text-glass-text leading-none">{categories.length}</h3>
                    </div>
                    <div className="h-10 w-px bg-glass-border mx-2" />
                    <Zap className="text-amber-500" size={24} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 items-start">
                {/* Tabel Layar Penuh */}
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4 bg-[var(--background)] border border-[var(--glass-border)] rounded-2xl p-2 md:p-3 shadow-sm">
                        <div className="relative flex-1 group min-w-[200px]">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari kategori event..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[var(--muted)] border border-[var(--glass-border)] rounded-xl py-3 pl-12 pr-4 text-sm text-[var(--foreground)] font-medium outline-none focus:bg-[var(--glass-surface)] transition-all placeholder:text-[var(--muted-foreground)]"
                            />
                        </div>
                        <button
                            onClick={fetchCategories}
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
                            <span className="hidden sm:inline">Tambah Kategori</span>
                        </button>
                    </div>

                    {/* Tabel Registri Kategori */}
                    <motion.div variants={slideUp}>
                        {loading && categories.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-4xl border border-glass-border shadow-2xl">
                                <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                                <p className="text-lg font-bold text-[var(--muted-foreground)] tracking-tight">Sinkronisasi Katalog Kategori...</p>
                            </div>
                        ) : (
                            <div className="glass-card overflow-hidden border-glass-border rounded-4xl shadow-2xl">
                                <DataTable
                                    title="Daftar Kategori Terdaftar"
                                    data={filteredCategories}
                                    columns={[
                                        {
                                            header: "IDENTITAS KATEGORI",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-4 py-2">
                                                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-sky-500/20 flex items-center justify-center text-primary border border-[var(--glass-border)] shadow-sm">
                                                        <Tags size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-glass-text text-base tracking-tight leading-none block uppercase">{item.name}</span>
                                                        <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest mt-1 block">CAT-ID: #{item.id}</span>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            header: "STATUS",
                                            accessor: () => (
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                    <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                                                    Aktif
                                                </div>
                                            )
                                        },
                                        {
                                            header: "OPERASI",
                                            accessor: (item) => (
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleEditOpen(item)}
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-[var(--muted-foreground)] hover:text-primary transition-all border border-glass-border shadow-sm active:scale-90 group"
                                                        title="Ubah Kategori"
                                                    >
                                                        <Edit2 size={16} className="group-hover:rotate-12 transition-transform" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-[var(--muted-foreground)] hover:text-rose-500 transition-all border border-glass-border shadow-sm active:scale-90"
                                                        title="Hapus Kategori"
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

            {/* Modal Tambah Kategori */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--background)]/90 backdrop-blur-[2px]">
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
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Tambah Kategori</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm">Tambahkan klasifikasi event baru.</p>
                                </div>
                            </div>

                            <form onSubmit={handleCreateSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Nama Kategori</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="CONTOH: WORKSHOP"
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value.toUpperCase())}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all font-bold"
                                            required
                                        />
                                        <Tags className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
                                    </div>
                                    <p className="text-[11px] text-[var(--muted-foreground)]">* Nama kategori akan ditampilkan di pilihan filter event.</p>
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
                                        disabled={submitting || !newCategoryName}
                                        className="flex-[1.5] bg-[var(--primary)] text-white font-semibold py-3 rounded-xl shadow-md transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {submitting ? <Loader2 size={20} className="animate-spin" /> : "Simpan Kategori"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal Edit Kategori */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--background)]/90 backdrop-blur-[2px]">
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
                                    <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Ubah Kategori</h2>
                                    <p className="text-[var(--muted-foreground)] text-sm">Modifikasi nama kategori event.</p>
                                </div>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-5 text-left">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[var(--foreground)]">Nama Kategori Baru</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={editFormData.name}
                                            onChange={(e) => setEditFormData({ name: e.target.value.toUpperCase() })}
                                            className="w-full bg-[var(--background)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-all font-bold"
                                            required
                                            autoFocus
                                        />
                                        <Tags className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
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

function CheckCircle2({ size, className }: { size?: number; className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
