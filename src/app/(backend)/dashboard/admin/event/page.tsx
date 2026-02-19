"use client";

import { useEffect, useState, useRef } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Calendar,
    Search,
    Loader2,
    Plus,
    Edit2,
    Trash2,
    X,
    Info,
    ArrowRight,
    RefreshCw,
    Image as ImageIcon,
    MapPin,
    Clock,
    Map,
    Eye,
    EyeOff,
    Upload,
    CheckCircle2,
    Building2,
    Tags
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp, fadeIn } from "@/lib/motion";
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "@/services/eventService";
import { getAllEventCategories } from "@/services/eventCategoryService";
import { Event, EventCategory } from "@/types/auth";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

export default function AdminEventPage() {
    const { user } = useUser();
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<EventCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk Modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    // Form States
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        locationName: "",
        city: "",
        address: "",
        categoryId: "",
        startDate: "",
        endDate: "",
        isPublished: true,
        tenantId: user?.tenantId || ""
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [eventsRes, catsRes] = await Promise.all([
                getAllEvents(),
                getAllEventCategories()
            ]);
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
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            locationName: "",
            city: "",
            address: "",
            categoryId: "",
            startDate: "",
            endDate: "",
            isPublished: true,
            tenantId: user?.tenantId || ""
        });
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const handleSubmit = async (e: React.FormEvent, isUpdate = false) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value.toString());
            });
            if (selectedFile) {
                data.append("poster", selectedFile);
            }

            if (isUpdate && editingEvent) {
                await updateEvent(editingEvent.id, data);
                setIsEditModalOpen(false);
            } else {
                await createEvent(data);
                setIsCreateModalOpen(false);
            }

            fetchData();
            resetForm();
        } catch (err: any) {
            alert(err.message || "Gagal menyimpan event");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditOpen = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            name: event.name || "",
            description: event.description || "",
            locationName: event.locationName || "",
            city: event.city || "",
            address: event.address || "",
            categoryId: event.categoryId?.toString() || "",
            startDate: event.startDate ? event.startDate.substring(0, 16) : "",
            endDate: event.endDate ? event.endDate.substring(0, 16) : "",
            isPublished: event.isPublished ?? true,
            tenantId: event.tenantId?.toString() || ""
        });
        setPreviewUrl(event.posterUrl || null);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Hapus event ini?")) return;
        try {
            await deleteEvent(id);
            fetchData();
        } catch (err: any) {
            alert(err.message || "Gagal menghapus");
        }
    };

    const filteredEvents = events.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.locationName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div variants={containerStagger} initial="initial" animate="animate" className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-glass-border pb-8">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-primary to-sky-500 flex items-center justify-center text-white shadow-[0_0_30px_-5px_var(--color-primary)]">
                        <Calendar size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none">
                            Manajemen <span className="text-primary italic">Events</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium tracking-tight">Kelola publikasi dan detail acara Anda</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-muted px-6 py-4 rounded-4xl border border-glass-border backdrop-blur-md flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Total Events</p>
                            <h3 className="text-2xl font-black text-glass-text leading-none">{events.length}</h3>
                        </div>
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsCreateModalOpen(true); }}
                        className="bg-primary text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Plus size={20} /> Event Baru
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 bg-muted border border-glass-border rounded-3xl p-2 shadow-2xl">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-glass-text/30" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nama event atau lokasi..."
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
                {loading && events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-muted rounded-4xl border border-glass-border">
                        <Loader2 className="animate-spin mb-6 text-primary" size={48} />
                        <p className="text-lg font-bold text-glass-text/40">Menyelaraskan Agenda...</p>
                    </div>
                ) : (
                    <div className="glass-card overflow-hidden border-glass-border rounded-4xl shadow-2xl">
                        <DataTable
                            title="Daftar Event"
                            data={filteredEvents}
                            columns={[
                                {
                                    header: "EVENT & POSTER",
                                    accessor: (item) => (
                                        <div className="flex items-center gap-4 py-2">
                                            <div className="h-14 w-20 rounded-xl bg-muted border border-glass-border overflow-hidden relative group">
                                                {item.posterUrl ? (
                                                    <img src={item.posterUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-glass-text/20">
                                                        <ImageIcon size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <span className="font-black text-glass-text text-base leading-none block uppercase">{item.name}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-black text-primary/60 uppercase bg-primary/5 px-2 py-0.5 rounded-sm">{item.categoryName || 'Tanpa Kategori'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    header: "LOKASI & WAKTU",
                                    accessor: (item) => (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-glass-text/60 font-bold text-xs uppercase tracking-tight">
                                                <MapPin size={12} className="text-primary" /> {item.city}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-glass-text/40 font-bold text-[10px]">
                                                <Clock size={12} /> {new Date(item.startDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    header: "STATUS",
                                    accessor: (item) => (
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                            item.isPublished
                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                        )}>
                                            {item.isPublished ? <CheckCircle2 size={10} /> : <EyeOff size={10} />}
                                            {item.isPublished ? "Published" : "Draft"}
                                        </div>
                                    )
                                },
                                {
                                    header: "OPERASI",
                                    accessor: (item) => (
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => handleEditOpen(item)} className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-glass-hover rounded-xl text-glass-text/40 hover:text-primary transition-all border border-glass-border">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="h-10 w-10 flex items-center justify-center bg-muted hover:bg-rose-500/10 rounded-xl text-glass-text/40 hover:text-rose-500 transition-all border border-glass-border">
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

            {/* Modals Implemented similarly to other pages with full forms */}
            <AnimatePresence>
                {(isCreateModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 overflow-y-auto">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }} className="fixed inset-0 bg-black/90 backdrop-blur-2xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-2xl bg-background border border-glass-border rounded-[3rem] p-10 shadow-2xl my-auto">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary to-sky-500" />
                            <button onClick={() => { setIsCreateModalOpen(false); setIsEditModalOpen(false); }} className="absolute top-8 right-8 text-glass-text/20 hover:text-white transition-all"><X size={24} /></button>

                            <div className="mb-8">
                                <h2 className="text-3xl font-black text-glass-text tracking-tight uppercase italic">{isEditModalOpen ? 'Edit' : 'Create'} <span className="text-primary">Event</span></h2>
                                <p className="text-glass-text/40 font-medium tracking-tight">Lengkapi detail manifestasi acara sistem.</p>
                            </div>

                            <form onSubmit={(e) => handleSubmit(e, isEditModalOpen)} className="grid grid-cols-2 gap-6">
                                {/* Basic Info */}
                                <div className="col-span-2 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Nama Event</label>
                                        <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-sm font-bold text-glass-text outline-none focus:border-primary/50" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Deskripsi</label>
                                        <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-sm font-bold text-glass-text outline-none focus:border-primary/50 resize-none" required />
                                    </div>
                                </div>

                                {/* Poster Upload */}
                                <div className="col-span-2 flex items-center gap-6 p-4 bg-muted/30 border border-dashed border-glass-border rounded-2xl">
                                    <div className="h-32 w-48 rounded-xl bg-muted border border-glass-border overflow-hidden relative group shrink-0">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-glass-text/20 gap-2">
                                                <ImageIcon size={32} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">No Poster</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <h4 className="text-sm font-black text-glass-text uppercase tracking-tight">Poster Event</h4>
                                        <p className="text-[10px] text-glass-text/40 font-bold leading-relaxed">Format: JPG, PNG, WEBP. Maks 5MB. Gunakan rasio 16:9 untuk hasil terbaik.</p>
                                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                                        <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-glass-surface hover:bg-glass-hover text-primary font-black px-4 py-2 rounded-lg border border-glass-border text-[10px] flex items-center gap-2 uppercase tracking-widest transition-all">
                                            <Upload size={14} /> {selectedFile || previewUrl ? 'Ganti Poster' : 'Upload Poster'}
                                        </button>
                                    </div>
                                </div>

                                {/* Location & Category */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Kota</label>
                                        <input type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-sm font-bold text-glass-text outline-none" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Kategori</label>
                                        <select value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-sm font-bold text-glass-text outline-none appearance-none" required>
                                            <option value="">Pilih Kategori</option>
                                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Nama Lokasi</label>
                                        <input type="text" value={formData.locationName} onChange={e => setFormData({ ...formData, locationName: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-sm font-bold text-glass-text outline-none" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Status Publikasi</label>
                                        <div className="flex gap-4">
                                            <button type="button" onClick={() => setFormData({ ...formData, isPublished: true })} className={cn("flex-1 py-3 px-4 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all", formData.isPublished ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted border-glass-border text-glass-text/40")}>Published</button>
                                            <button type="button" onClick={() => setFormData({ ...formData, isPublished: false })} className={cn("flex-1 py-3 px-4 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all", !formData.isPublished ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : "bg-muted border-glass-border text-glass-text/40")}>Draft</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Mulai</label>
                                    <input type="datetime-local" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-sm font-bold text-glass-text outline-none" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Selesai</label>
                                    <input type="datetime-local" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} className="w-full bg-muted border border-glass-border rounded-xl py-3 px-4 text-sm font-bold text-glass-text outline-none" required />
                                </div>

                                <div className="col-span-2 pt-6">
                                    <button type="submit" disabled={submitting} className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-all text-base tracking-tight disabled:opacity-50">
                                        {submitting ? <Loader2 className="animate-spin" size={24} /> : <>{isEditModalOpen ? 'Update' : 'Create'} Event <ArrowRight size={20} /></>}
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
