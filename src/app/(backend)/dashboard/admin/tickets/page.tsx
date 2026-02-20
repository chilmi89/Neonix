"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Tags as TicketIcon,
    Search,
    Loader2,
    Plus,
    Edit2,
    Trash2,
    X,
    RefreshCw,
    ArrowRight,
    Calendar,
    DollarSign,
    Hash,
    CheckCircle2,
    EyeOff,
    Filter,
    Layers,
    Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp } from "@/lib/motion";
import {
    getAllTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketsByEvent
} from "@/services/ticketService";
import { getAllEvents } from "@/services/eventService";
import { getAllTicketCategories } from "@/services/ticketCategoryService";
import { Ticket, Event, TicketCategory } from "@/types/auth";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

export default function TicketManagementPage() {
    const { user } = useUser();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<TicketCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEventFilter, setSelectedEventFilter] = useState<string>("all");

    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

    // Form States
    const [formData, setFormData] = useState({
        eventId: "",
        categoryId: "",
        name: "",
        description: "",
        price: "",
        quota: "",
        saleStart: "",
        saleEnd: "",
        isActive: true
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [ticketsRes, eventsRes, catsRes] = await Promise.all([
                selectedEventFilter === "all" ? getAllTickets() : getTicketsByEvent(selectedEventFilter),
                getAllEvents(),
                getAllTicketCategories()
            ]);
            setTickets(ticketsRes.data || []);
            setEvents(eventsRes.data || []);
            setCategories(catsRes.data || []);
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedEventFilter]);

    const resetForm = () => {
        setFormData({
            eventId: "",
            categoryId: "",
            name: "",
            description: "",
            price: "",
            quota: "",
            saleStart: "",
            saleEnd: "",
            isActive: true
        });
        setEditingTicket(null);
    };

    const handleSubmit = async (e: React.FormEvent, isUpdate = false) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            ...formData,
            eventId: parseInt(formData.eventId),
            categoryId: parseInt(formData.categoryId),
            price: parseFloat(formData.price),
            quota: parseInt(formData.quota),
            // Backend handles saleStart and saleEnd as LocalDateTime string
        };

        try {
            if (isUpdate && editingTicket) {
                await updateTicket(editingTicket.id, payload);
                setIsEditModalOpen(false);
            } else {
                await createTicket(payload);
                setIsCreateModalOpen(false);
            }

            fetchData();
            resetForm();
        } catch (err: any) {
            alert(err.message || "Gagal menyimpan tiket");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditOpen = (ticket: Ticket) => {
        setEditingTicket(ticket);
        setFormData({
            eventId: ticket.eventId.toString(),
            categoryId: ticket.categoryId.toString(),
            name: ticket.name,
            description: ticket.description || "",
            price: ticket.price.toString(),
            quota: ticket.quota.toString(),
            saleStart: ticket.saleStart ? ticket.saleStart.substring(0, 16) : "",
            saleEnd: ticket.saleEnd ? ticket.saleEnd.substring(0, 16) : "",
            isActive: ticket.isActive
        });
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Hapus tiket ini? Penjualan yang sudah terjadi tidak akan terpengaruh.")) return;
        try {
            await deleteTicket(id);
            fetchData();
        } catch (err: any) {
            alert(err.message || "Gagal menghapus tiket");
        }
    };

    const filteredTickets = tickets.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.categoryName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <motion.div variants={containerStagger} initial="initial" animate="animate" className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-glass-border pb-8">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-primary to-sky-500 flex items-center justify-center text-white shadow-[0_0_30px_-5px_var(--color-primary)]">
                        <TicketIcon size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none uppercase italic">
                            Manajemen <span className="text-primary">Tiket</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium tracking-tight">Atur harga, kuota, dan masa berlaku tiket event</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-muted px-6 py-4 rounded-4xl border border-glass-border backdrop-blur-md flex items-center gap-4 text-right">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Total Varian Tiket</p>
                            <h3 className="text-2xl font-black text-glass-text leading-none">{tickets.length}</h3>
                        </div>
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsCreateModalOpen(true); }}
                        className="bg-primary text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Plus size={20} /> Buat Tiket
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-muted border border-glass-border rounded-3xl p-3 shadow-2xl">
                <div className="md:col-span-2 relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-glass-text/30" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nama tiket atau kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm text-glass-text font-bold outline-none"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                    <select
                        value={selectedEventFilter}
                        onChange={(e) => setSelectedEventFilter(e.target.value)}
                        className="w-full bg-white/70 dark:bg-black/40 border border-glass-border rounded-xl py-3 pl-10 pr-4 text-sm text-glass-text font-bold outline-none appearance-none"
                    >
                        <option value="all">Semua Event</option>
                        {events.map(event => (
                            <option key={event.id} value={event.id}>{event.name}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={fetchData}
                    className="flex items-center justify-center gap-2 p-3 bg-glass-surface hover:bg-glass-hover rounded-xl text-primary transition-all border border-glass-border font-bold uppercase text-[10px] tracking-widest"
                >
                    <RefreshCw className={cn(loading && "animate-spin")} size={16} /> Refresh
                </button>
            </div>

            {/* Table */}
            <motion.div variants={slideUp}>
                {loading && tickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-4xl border border-glass-border">
                        <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                        <p className="text-lg font-bold text-glass-text/40">Menghubungkan ke Pusat Penjualan...</p>
                    </div>
                ) : (
                    <div className="glass-card overflow-hidden border-glass-border rounded-4xl shadow-2xl">
                        <DataTable
                            title="Daftar Tiket Aktif"
                            data={filteredTickets}
                            columns={[
                                {
                                    header: "TIKET & KATEGORI",
                                    accessor: (item) => (
                                        <div className="flex items-center gap-4 py-2">
                                            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary/10 to-sky-500/10 flex items-center justify-center text-primary border border-primary/20">
                                                <TicketIcon size={18} />
                                            </div>
                                            <div>
                                                <span className="font-black text-glass-text text-base leading-none block uppercase tracking-tight">{item.name}</span>
                                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded mt-1 inline-block">
                                                    {item.categoryName || 'Tanpa Kategori'}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    header: "HARGA",
                                    accessor: (item) => (
                                        <div className="font-black text-glass-text text-base tracking-tighter">
                                            {formatCurrency(item.price)}
                                        </div>
                                    )
                                },
                                {
                                    header: "STOK / TERJUAL",
                                    accessor: (item) => (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black text-glass-text">{item.sold} / {item.quota}</span>
                                                <span className="text-[10px] text-glass-text/40 font-bold uppercase tracking-widest">Sisa: {item.quota - item.sold}</span>
                                            </div>
                                            <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden border border-glass-border">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${Math.min((item.sold / item.quota) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    header: "STATUS",
                                    accessor: (item) => (
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                            item.isActive
                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                        )}>
                                            {item.isActive ? <CheckCircle2 size={10} /> : <EyeOff size={10} />}
                                            {item.isActive ? "Aktif" : "Non-Aktif"}
                                        </div>
                                    )
                                },
                                {
                                    header: "AKSI",
                                    accessor: (item) => (
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleEditOpen(item)}
                                                className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-glass-text/40 hover:text-primary transition-all border border-glass-border"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-glass-text/40 hover:text-rose-500 transition-all border border-glass-border"
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

            {/* Modal */}
            <AnimatePresence>
                {(isCreateModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 overflow-y-auto">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }} className="fixed inset-0 bg-black/95 backdrop-blur-2xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-2xl bg-background border border-glass-border rounded-[3rem] p-10 shadow-2xl my-auto">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary to-sky-400" />
                            <button onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }} className="absolute top-8 right-8 text-glass-text/20 hover:text-white transition-all"><X size={24} /></button>

                            <div className="mb-8">
                                <h2 className="text-3xl font-black text-glass-text tracking-tight uppercase italic">{isEditModalOpen ? 'Edit' : 'Buat'} <span className="text-primary">Tiket</span></h2>
                                <p className="text-glass-text/40 font-medium tracking-tight">Konfigurasi parameter penjualan dan akses tiket.</p>
                            </div>

                            <form onSubmit={(e) => handleSubmit(e, isEditModalOpen)} className="grid grid-cols-2 gap-6">
                                {/* Basic Info */}
                                <div className="col-span-2 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Nama Tiket</label>
                                            <div className="relative">
                                                <TicketIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-glass-text/20" size={16} />
                                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-glass-text outline-none focus:border-primary/50" placeholder="Contoh: Premium Early Access" required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Status</label>
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => setFormData({ ...formData, isActive: true })} className={cn("flex-1 py-3 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all", formData.isActive ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted border-glass-border text-glass-text/40")}>Aktif</button>
                                                <button type="button" onClick={() => setFormData({ ...formData, isActive: false })} className={cn("flex-1 py-3 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all", !formData.isActive ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : "bg-muted border-glass-border text-glass-text/40")}>Mati</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Deskripsi Tiket</label>
                                        <textarea rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-sm font-bold text-glass-text outline-none focus:border-primary/50 resize-none" placeholder="Apa saja yang didapatkan dengan tiket ini?" />
                                    </div>
                                </div>

                                {/* Relationships */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Event</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                                        <select value={formData.eventId} onChange={e => setFormData({ ...formData, eventId: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-glass-text outline-none appearance-none" required>
                                            <option value="">Pilih Event</option>
                                            {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name} ({ev.city})</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Kategori Tiket</label>
                                    <div className="relative">
                                        <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                                        <select value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-glass-text outline-none appearance-none" required>
                                            <option value="">Pilih Kategori</option>
                                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Numbers */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Harga Satuan (IDR)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                        <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-glass-text outline-none" placeholder="0" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Kuota Tiket</label>
                                    <div className="relative">
                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                        <input type="number" value={formData.quota} onChange={e => setFormData({ ...formData, quota: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-glass-text outline-none" placeholder="Maksimal tiket terjual" required />
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Mulai Penjualan</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                                        <input type="datetime-local" value={formData.saleStart} onChange={e => setFormData({ ...formData, saleStart: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 pl-12 pr-4 text-[10px] font-bold text-glass-text outline-none" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Selesai Penjualan</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                                        <input type="datetime-local" value={formData.saleEnd} onChange={e => setFormData({ ...formData, saleEnd: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 pl-12 pr-4 text-[10px] font-bold text-glass-text outline-none" required />
                                    </div>
                                </div>

                                <div className="col-span-2 pt-6">
                                    <button type="submit" disabled={submitting} className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-all text-base tracking-tight disabled:opacity-50 uppercase">
                                        {submitting ? <Loader2 className="animate-spin" size={24} /> : <>{isEditModalOpen ? 'Simpan Perubahan' : 'Terbitkan Tiket'} <ArrowRight size={20} /></>}
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
