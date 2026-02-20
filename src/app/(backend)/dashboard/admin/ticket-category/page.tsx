"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Tags,
    Search,
    Loader2,
    Plus,
    Edit2,
    Trash2,
    X,
    RefreshCw,
    ArrowRight,
    Info,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import {
    getAllTicketCategories,
    createTicketCategory,
    updateTicketCategory,
    deleteTicketCategory
} from "@/services/ticketCategoryService";
import { TicketCategory } from "@/types/auth";
import { cn } from "@/lib/utils";

export default function TicketCategoryPage() {
    const [categories, setCategories] = useState<TicketCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk Modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<TicketCategory | null>(null);

    // Form States
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getAllTicketCategories();
            setCategories(res.data || []);
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data kategori tiket");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setFormData({
            name: "",
            description: ""
        });
        setEditingCategory(null);
    };

    const handleSubmit = async (e: React.FormEvent, isUpdate = false) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (isUpdate && editingCategory) {
                await updateTicketCategory(editingCategory.id, formData);
                setIsEditModalOpen(false);
            } else {
                await createTicketCategory(formData);
                setIsCreateModalOpen(false);
            }

            fetchData();
            resetForm();
        } catch (err: any) {
            alert(err.message || "Gagal menyimpan kategori tiket");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditOpen = (category: TicketCategory) => {
        setEditingCategory(category);
        setFormData({
            name: category.name || "",
            description: category.description || ""
        });
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Hapus kategori tiket ini? Tindakan ini tidak dapat dibatalkan.")) return;
        try {
            await deleteTicketCategory(id);
            fetchData();
        } catch (err: any) {
            alert(err.message || "Gagal menghapus kategori");
        }
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div variants={containerStagger} initial="initial" animate="animate" className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-glass-border pb-8">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-primary to-sky-500 flex items-center justify-center text-white shadow-[0_0_30px_-5px_var(--color-primary)]">
                        <Tags size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none uppercase italic">
                            Kategori <span className="text-primary">Tiket</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium tracking-tight">Kelola jenis tiket (VIP, Reguler, dll) untuk event Anda</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-muted px-6 py-4 rounded-4xl border border-glass-border backdrop-blur-md flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Total Kategori</p>
                            <h3 className="text-2xl font-black text-glass-text leading-none">{categories.length}</h3>
                        </div>
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsCreateModalOpen(true); }}
                        className="bg-primary text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Plus size={20} /> Tambah Kategori
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 bg-muted border border-glass-border rounded-3xl p-2 shadow-2xl">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-glass-text/30" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nama atau deskripsi kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm text-glass-text font-bold outline-none"
                    />
                </div>
                <button
                    onClick={fetchData}
                    className="p-3 bg-glass-surface hover:bg-glass-hover rounded-xl text-primary transition-all border border-glass-border"
                >
                    <RefreshCw className={cn(loading && "animate-spin")} size={18} />
                </button>
            </div>

            {/* Table */}
            <motion.div variants={slideUp}>
                {loading && categories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-4xl border border-glass-border">
                        <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                        <p className="text-lg font-bold text-glass-text/40">Menarik Data Kategori...</p>
                    </div>
                ) : (
                    <div className="glass-card overflow-hidden border-glass-border rounded-4xl shadow-2xl">
                        <DataTable
                            title="List Kategori Tiket"
                            data={filteredCategories}
                            columns={[
                                {
                                    header: "NAMA KATEGORI",
                                    accessor: (item) => (
                                        <div className="flex items-center gap-4 py-2">
                                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 font-black">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="font-black text-glass-text text-base leading-none block uppercase italic tracking-tight">{item.name}</span>
                                                <span className="text-[10px] font-bold text-glass-text/40 uppercase tracking-widest mt-1 block">ID: #{item.id}</span>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    header: "DESKRIPSI",
                                    accessor: (item) => (
                                        <p className="text-sm font-medium text-glass-text/60 max-w-xs line-clamp-2">
                                            {item.description || "Tidak ada deskripsi"}
                                        </p>
                                    )
                                },
                                {
                                    header: "OPERASI",
                                    accessor: (item) => (
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleEditOpen(item)}
                                                className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-glass-text/40 hover:text-primary transition-all border border-glass-border"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-glass-text/40 hover:text-rose-500 transition-all border border-glass-border"
                                                title="Hapus"
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

            {/* Modals */}
            <AnimatePresence>
                {(isCreateModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-lg bg-background border border-glass-border rounded-[3rem] p-10 shadow-2xl my-auto"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary to-sky-500" />
                            <button
                                onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }}
                                className="absolute top-8 right-8 text-glass-text/20 hover:text-white transition-all"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-8">
                                <h2 className="text-3xl font-black text-glass-text tracking-tight uppercase italic">
                                    {isEditModalOpen ? 'Update' : 'Tambah'} <span className="text-primary">Kategori</span>
                                </h2>
                                <p className="text-glass-text/40 font-medium tracking-tight">Tentukan identitas dan deskripsi kategori tiket baru.</p>
                            </div>

                            <form onSubmit={(e) => handleSubmit(e, isEditModalOpen)} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Nama Kategori</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: VIP, Regular, Early Bird"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-muted border border-glass-border rounded-xl py-4 px-6 text-sm font-bold text-glass-text outline-none focus:border-primary/50 transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Deskripsi</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Berikan detail mengenai akses atau benefit kategori ini..."
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-muted border border-glass-border rounded-xl py-4 px-6 text-sm font-bold text-glass-text outline-none focus:border-primary/50 resize-none transition-all"
                                        required
                                    />
                                </div>

                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-all text-lg tracking-tight disabled:opacity-50"
                                    >
                                        {submitting ? (
                                            <Loader2 className="animate-spin" size={24} />
                                        ) : (
                                            <>
                                                {isEditModalOpen ? 'Update' : 'Konfirmasi'} Kategori <ArrowRight size={20} />
                                            </>
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
