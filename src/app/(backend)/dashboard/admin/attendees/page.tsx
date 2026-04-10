"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    Users,
    Search,
    Loader2,
    RefreshCw,
    Filter,
    Calendar,
    Mail,
    CheckCircle2,
    QrCode,
    Ticket,
    AlertCircle,
    UserCheck,
    History,
    ArrowRightCircle,
    Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { containerStagger, slideUp } from "@/lib/motion";
import { apiGet, apiPost } from "@/config/api.config";
import { API } from "@/config/api.config";
import { ApiResponse } from "@/types/auth";
import { cn } from "@/lib/utils";
import { getAllEvents } from "@/services/eventService";
import { Event } from "@/types/auth";
import { TransactionDTO, AttendeeTicketDTO } from "@/services/transactionService";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AttendeeRow extends AttendeeTicketDTO {
    transactionId: number;
    eventName: string;
    ticketName: string;
    buyerName: string;
    buyerEmail: string;
}

interface CheckInLogItem {
    id: number;
    attendeeName: string;
    attendeeEmail: string;
    ticketName: string;
    scanTime: string;
    type: 'CHECK_IN' | 'CHECK_OUT';
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr?: string) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatTime(dateStr?: string) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AttendeesMonitoringPage() {
    const [attendees, setAttendees] = useState<AttendeeRow[]>([]);
    const [history, setHistory] = useState<CheckInLogItem[]>([]);
    const [activeTab, setActiveTab] = useState<'attendees' | 'history'>('attendees');
    const [events, setEvents] = useState<Event[]>([]);
    
    const [selectedEvent, setSelectedEvent] = useState<string>("all");
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            // Fetch events first to know dates
            const eventsRes = await getAllEvents();
            setEvents(eventsRes.data || []);

            if (activeTab === 'attendees') {
                const url = selectedEvent === "all"
                    ? API.transactions.getAll
                    : API.transactions.getByEvent(selectedEvent);

                const txRes = await apiGet<ApiResponse<TransactionDTO[]>>(url);

                const allAttendees: AttendeeRow[] = [];
                (txRes.data || []).forEach(tx => {
                    if (tx.attendees) {
                        tx.attendees.forEach(att => {
                            allAttendees.push({
                                ...att,
                                transactionId: tx.id,
                                eventName: tx.eventName,
                                ticketName: tx.ticketName,
                                buyerName: tx.buyerName,
                                buyerEmail: tx.buyerEmail
                            });
                        });
                    }
                });
                setAttendees(allAttendees);
            } else {
                // Fetch History
                if (selectedEvent === "all") {
                    setError("Pilih event terlebih dahulu untuk melihat riwayat harian");
                    setHistory([]);
                } else {
                    const historyRes = await apiGet<ApiResponse<CheckInLogItem[]>>(
                        `${API.transactions.checkIn}/history?eventId=${selectedEvent}&date=${selectedDate}`
                    );
                    setHistory(historyRes.data || []);
                }
            }
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data peserta");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedEvent, selectedDate, activeTab]);

    const handleCheckIn = async (qrCode: string) => {
        try {
            await apiPost(API.transactions.checkIn, { qrCode });
            setSuccessMsg("Check-in berhasil!");
            setTimeout(() => setSuccessMsg(""), 3000);
            fetchData();
        } catch (err: any) {
            setError("Gagal Check-in: " + err.message);
            setTimeout(() => setError(""), 5000);
        }
    };

    const filteredAttendees = attendees.filter(
        (a) =>
            a.attendeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.attendeeEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.buyerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredHistory = history.filter(
        (h) =>
            h.attendeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            h.attendeeEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-6 pb-20"
        >
            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-r from-[#3C50E0] to-[#6366F1] p-8 md:p-12 shadow-2xl shadow-primary/20">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="h-20 w-20 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/30 shadow-xl">
                            <Users size={40} />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-tight">
                                Monitoring <span className="opacity-80">Kehadiran</span>
                            </h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
                                    Event Intelligence Center
                                </span>
                                {selectedEvent !== "all" && (
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/30">
                                        Active Tracking
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-black/10 p-2 rounded-[2rem] backdrop-blur-sm border border-white/5">
                        <button
                            onClick={fetchData}
                            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-2xl transition-all active:scale-95 border border-white/10"
                            title="Refresh Data"
                        >
                            <RefreshCw className={cn(loading && "animate-spin")} size={24} />
                        </button>
                        <button className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-slate-50 active:scale-95 shadow-lg">
                            <Download size={18} /> Export Data
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Status Bar ─────────────────────────────────────────────────── */}
            <AnimatePresence>
                {error && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="bg-red-500 text-white px-6 py-4 rounded-3xl flex items-center gap-3 font-bold shadow-2xl shadow-red-500/20"
                    >
                        <AlertCircle size={20} /> {error}
                    </motion.div>
                )}
                {successMsg && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="bg-emerald-500 text-white px-6 py-4 rounded-3xl flex items-center gap-3 font-bold shadow-2xl shadow-emerald-500/20"
                    >
                        <CheckCircle2 size={20} /> {successMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Tabs & Stats ───────────────────────────────────────────────── */}
            <div className="flex flex-col xl:flex-row items-end gap-6 justify-between">
                {/* Tabs */}
                <div className="bg-slate-50 dark:bg-slate-950 p-1.5 rounded-[2rem] flex gap-2 w-fit border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-500">
                    <button
                        onClick={() => setActiveTab('attendees')}
                        className={cn(
                            "px-8 py-3.5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest transition-all flex items-center gap-3",
                            activeTab === 'attendees' 
                                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                                : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                        )}
                    >
                        <Users size={16} /> Daftar Peserta
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={cn(
                            "px-8 py-3.5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest transition-all flex items-center gap-3",
                            activeTab === 'history' 
                                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                                : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                        )}
                    >
                        <History size={16} /> Log Harian
                    </button>
                </div>

                {/* Counter Stats */}
                <div className="flex gap-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-3xl flex items-center gap-4 shadow-sm border-b-4 border-b-primary transition-colors duration-500">
                        <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-2xl text-primary">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Total Peserta</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white leading-none">{filteredAttendees.length}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-3xl flex items-center gap-4 shadow-sm border-b-4 border-b-emerald-500 transition-colors duration-500">
                        <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-3 rounded-2xl text-emerald-500">
                            <UserCheck size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">Check-In Hari Ini</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                                {activeTab === 'attendees' ? filteredAttendees.filter(a => a.isCheckedIn).length : history.filter(h => h.type === 'CHECK_IN').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Filters ────────────────────────────────────────────────────── */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-black/[0.01] grid grid-cols-1 md:grid-cols-12 gap-5 transition-colors duration-500">
                <div className="md:col-span-12 lg:col-span-5 relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                    />
                </div>
                
                <div className="md:col-span-6 lg:col-span-4 relative group">
                    <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-10 text-sm font-bold text-slate-900 dark:text-slate-100 outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-primary/10 transition-all"
                    >
                        <option value="all">Semua Event</option>
                        {events.map((ev) => (
                            <option key={ev.id} value={ev.id}>{ev.name}</option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-6 lg:col-span-3 relative group">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                </div>
            </div>

            {/* ── Table Content ──────────────────────────────────────────────── */}
            <motion.div variants={slideUp}>
                {loading ? (
                    <div className="py-32 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 transition-colors duration-500">
                        <Loader2 className="animate-spin text-primary mb-6" size={48} />
                        <p className="text-sm font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">Sinkronisasi Data...</p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-black/[0.01] overflow-hidden transition-colors duration-500">
                        {activeTab === 'attendees' ? (
                            <DataTable
                                title="Data Peserta Terdaftar"
                                data={filteredAttendees}
                                columns={[
                                    {
                                        header: "PESERTA",
                                        accessor: (a: AttendeeRow) => (
                                            <div className="flex items-center gap-4 py-3">
                                                <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-sm shadow-inner transition-colors duration-500">
                                                    {a.attendeeName?.[0]}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-slate-900 dark:text-slate-100 text-sm leading-none mb-1">{a.attendeeName}</span>
                                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-tight">{a.attendeeEmail}</span>
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        header: "TIKET",
                                        accessor: (a: AttendeeRow) => (
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-black text-slate-700 dark:text-slate-300 leading-none">{a.eventName}</span>
                                                <span className="text-[9px] font-black uppercase text-primary tracking-widest bg-primary/5 dark:bg-primary/20 w-fit px-2 py-0.5 rounded-md border border-primary/10">
                                                    {a.ticketName}
                                                </span>
                                            </div>
                                        ),
                                    },
                                    {
                                        header: "STATUS",
                                        accessor: (a: AttendeeRow) => (
                                            <div className={cn(
                                                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all",
                                                a.isCheckedIn 
                                                    ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                                                    : "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                            )}>
                                                {a.isCheckedIn ? "Siap Hadir" : "Tertunda"}
                                            </div>
                                        ),
                                    },
                                    {
                                        header: "AKSI",
                                        accessor: (a: AttendeeRow) => (
                                            <button
                                                onClick={() => handleCheckIn(a.qrCode)}
                                                className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
                                            >
                                                <UserCheck size={14} /> Check-In
                                            </button>
                                        ),
                                    },
                                ]}
                            />
                        ) : (
                            <DataTable
                                title={`Log Kehadiran: ${selectedDate}`}
                                data={filteredHistory}
                                columns={[
                                    {
                                        header: "PESERTA",
                                        accessor: (h: CheckInLogItem) => (
                                            <div className="flex items-center gap-4 py-3">
                                                <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center font-black text-indigo-500 text-sm">
                                                    {h.attendeeName?.[0]}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-slate-900 dark:text-slate-100 text-sm leading-none mb-1">{h.attendeeName}</span>
                                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-tight">{h.attendeeEmail}</span>
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        header: "JENIS SCAN",
                                        accessor: (h: CheckInLogItem) => (
                                            <div className={cn(
                                                "inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                                                h.type === 'CHECK_IN' 
                                                    ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                                                    : "bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/20"
                                            )}>
                                                {h.type === 'CHECK_IN' ? 'MASUK' : 'KELUAR'}
                                            </div>
                                        ),
                                    },
                                    {
                                        header: "WAKTU",
                                        accessor: (h: CheckInLogItem) => (
                                            <div className="flex flex-col leading-none">
                                                <span className="text-sm font-black text-slate-800 dark:text-slate-200">{formatTime(h.scanTime)}</span>
                                                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-600 mt-1 uppercase">WIB</span>
                                            </div>
                                        )
                                    },
                                ]}
                            />
                        )}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
