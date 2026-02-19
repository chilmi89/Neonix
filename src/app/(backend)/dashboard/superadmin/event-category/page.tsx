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

    // State untuk Edit Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-primary to-sky-500 flex items-center justify-center text-white shadow-[0_0_30px_-5px_var(--color-primary)] overflow-hidden relative group">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Bagian Kiri: Form Registrasi Baru */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
                    <GlassCard className="p-8 border-primary/20 bg-primary/5 relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

                        <div className="mb-8">
                            <h2 className="text-xl font-black text-glass-text tracking-tight flex items-center gap-2">
                                <Plus size={20} className="text-primary" />
                                Kategori Baru
                            </h2>
                            <p className="text-glass-text/40 font-medium text-sm mt-1">Tambahkan tipe event baru ke database.</p>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 ml-1">
                                    Label Kategori
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="CONTOH: WORKSHOP"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value.toUpperCase())}
                                        className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-2xl py-4 px-5 text-glass-text font-bold outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-black/60 transition-all placeholder:text-glass-text/30 shadow-xs text-lg"
                                        required
                                    />
                                    <Tags className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/60" size={20} />
                                </div>
                                <p className="text-[10px] text-glass-text/40 italic leading-relaxed px-1">
                                    * Nama kategori akan tampil di pilihan filter event.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting || !newCategoryName}
                                className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-base tracking-tight"
                            >
                                {submitting ? (
                                    <Loader2 size={24} className="animate-spin" />
                                ) : (
                                    <>Simpan Kategori <ArrowRight size={20} /></>
                                )}
                            </button>
                        </form>
                    </GlassCard>

                    <div className="p-6 bg-muted rounded-4xl border border-glass-border flex items-start gap-4 shadow-xl">
                        <Info size={20} className="text-primary shrink-0 mt-1" />
                        <div>
                            <p className="text-sm font-black text-glass-text mb-1">Informasi Kategori</p>
                            <p className="text-xs text-glass-text/60 leading-relaxed font-bold">
                                Gunakan penamaan yang konsisten untuk memudahkan user melakukan pencarian event berdasarkan kategori.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bagian Kanan: Pencarian & Tabel Kategori */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Bar Kontrol Kompak */}
                    <div className="flex items-center gap-4 bg-muted border border-glass-border rounded-3xl p-2 shadow-2xl">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-glass-text/30 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari kategori event..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm text-glass-text font-bold outline-none focus:bg-white dark:focus:bg-black/60 transition-all placeholder:text-glass-text/30"
                            />
                        </div>
                        <button
                            onClick={fetchCategories}
                            className="p-3 bg-glass-surface hover:bg-glass-hover rounded-xl text-primary transition-all border border-glass-border shadow-inner"
                            title="Segarkan Data"
                        >
                            <RefreshCw className={cn("transition-transform duration-500", loading && "animate-spin")} size={18} />
                        </button>
                    </div>

                    {/* Tabel Registri Kategori */}
                    <motion.div variants={slideUp}>
                        {loading && categories.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-4xl border border-glass-border shadow-2xl">
                                <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                                <p className="text-lg font-bold text-glass-text/40 tracking-tight">Sinkronisasi Katalog Kategori...</p>
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
                                                    <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/20 to-sky-500/20 flex items-center justify-center text-primary border border-white/5 shadow-sm">
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
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-glass-text/40 hover:text-primary transition-all border border-glass-border shadow-sm active:scale-90 group"
                                                        title="Ubah Kategori"
                                                    >
                                                        <Edit2 size={16} className="group-hover:rotate-12 transition-transform" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-glass-text/40 hover:text-rose-500 transition-all border border-glass-border shadow-sm active:scale-90"
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

            {/* Modal Edit Kategori */}
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
                                className="absolute top-8 right-8 text-glass-text/20 hover:text-glass-text transition-all"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-10 text-center">
                                <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 border border-primary/5">
                                    <Edit2 size={32} />
                                </div>
                                <h2 className="text-3xl font-black text-glass-text tracking-tight mb-2 uppercase">Rename Kategori</h2>
                                <p className="text-glass-text/40 font-medium tracking-tight">Perbarui label klasifikasi event sistem.</p>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                        Nama Kategori Baru
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ name: e.target.value.toUpperCase() })}
                                        className="w-full bg-background/80 border border-glass-border rounded-2xl py-4 px-6 text-glass-text font-black text-xl outline-none focus:border-primary/50 transition-all text-center shadow-inner"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="flex-1 bg-muted hover:bg-glass-hover text-glass-text font-bold py-4 rounded-2xl transition-all border border-glass-border uppercase text-[10px] tracking-widest"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
                                    >
                                        {submitting ? <Loader2 size={16} className="animate-spin" /> : <>Update <CheckCircle2 size={14} /></>}
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
