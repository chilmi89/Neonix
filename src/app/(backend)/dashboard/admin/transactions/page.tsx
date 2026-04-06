"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(backend)/_components/data-display/DataTable";
import {
    ShoppingBag,
    Search,
    Loader2,
    RefreshCw,
    Filter,
    TrendingUp,
    Users,
    DollarSign,
    Calendar,
    Mail,
    CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { containerStagger, slideUp } from "@/lib/motion";
import { apiGet } from "@/config/api.config";
import { API } from "@/config/api.config";
import { ApiResponse } from "@/types/auth";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import { getAllEvents } from "@/services/eventService";
import { Event } from "@/types/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Transaction {
    id: number;
    tenantId: number;
    eventId: number;
    eventName: string;
    ticketId: number;
    ticketName: string;
    categoryName: string;
    buyerName: string;
    buyerEmail: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purchasedAt: string;
}

interface TransactionSummary {
    totalOrders: number;
    totalRevenue: number;
    totalTicketsSold: number;
    byEvent: Array<{
        eventId: number;
        eventName: string;
        orderCount: number;
        ticketsSold: number;
        revenue: number;
    }>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatIDR(amount: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TransactionsPage() {
    const { user } = useUser();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<TransactionSummary | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const url =
                selectedEvent === "all"
                    ? API.transactions.getAll
                    : API.transactions.getByEvent(selectedEvent);

            const [txRes, summaryRes, eventsRes] = await Promise.all([
                apiGet<ApiResponse<Transaction[]>>(url),
                apiGet<ApiResponse<TransactionSummary>>(API.transactions.summary),
                getAllEvents(),
            ]);

            setTransactions(txRes.data || []);
            setSummary(summaryRes.data || null);
            setEvents(eventsRes.data || []);
        } catch (err: any) {
            setError(err.message || "Gagal mengambil data transaksi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedEvent]);

    const filtered = transactions.filter(
        (t) =>
            t.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.eventName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.ticketName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-6 pb-12"
        >
            {/* ── Header ─────────────────────────────────────────────────────── */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-glass-border pb-6">
                <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-4xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-[var(--foreground)] shadow-[0_0_30px_-5px_#10b981]">
                        <ShoppingBag size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-glass-text tracking-tighter leading-none uppercase italic">
                            Penjualan <span className="text-emerald-500">Tiket</span>
                        </h1>
                        <p className="text-glass-text/60 text-lg mt-2 font-medium tracking-tight">
                            Rekap semua transaksi pembelian tiket event kamu
                        </p>
                    </div>
                </div>
                <button
                    onClick={fetchData}
                    className="flex items-center gap-2 bg-glass-surface border border-glass-border hover:bg-glass-hover rounded-2xl px-6 py-3 text-glass-text font-bold uppercase text-xs tracking-widest transition-all"
                >
                    <RefreshCw className={cn(loading && "animate-spin")} size={16} />
                    Refresh
                </button>
            </div>

            {/* ── Summary Cards ──────────────────────────────────────────────── */}
            {summary && (
                <motion.div 
                    variants={containerStagger}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        {
                            label: "Total Transaksi",
                            value: summary.totalOrders.toLocaleString("id-ID"),
                            icon: ShoppingBag,
                            color: "from-emerald-500 to-teal-500",
                            glow: "#10b981",
                        },
                        {
                            label: "Total Tiket Terjual",
                            value: summary.totalTicketsSold.toLocaleString("id-ID"),
                            icon: Users,
                            color: "from-primary to-sky-500",
                            glow: "var(--color-primary)",
                        },
                        {
                            label: "Total Revenue",
                            value: formatIDR(Number(summary.totalRevenue)),
                            icon: DollarSign,
                            color: "from-violet-500 to-purple-600",
                            glow: "#8b5cf6",
                        },
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={slideUp}
                            className="bg-muted border border-glass-border rounded-3xl p-6 flex items-center gap-6"
                        >
                            <div
                                className={`h-14 w-14 rounded-2xl bg-linear-to-br ${stat.color} flex items-center justify-center text-[var(--foreground)] shrink-0`}
                                style={{ boxShadow: `0 0 24px -4px ${stat.glow}` }}
                            >
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)] mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-black text-glass-text tracking-tight">
                                    {stat.value}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* ── Revenue by Event ───────────────────────────────────────────── */}
            {summary && summary.byEvent && summary.byEvent.length > 0 && (
                <motion.div
                    variants={slideUp}
                    initial="initial"
                    animate="animate"
                    className="bg-muted border border-glass-border rounded-3xl p-6 space-y-5"
                >
                    <div className="flex items-center gap-3">
                        <TrendingUp size={20} className="text-emerald-500" />
                        <h2 className="font-black text-glass-text uppercase tracking-tight text-sm">
                            Revenue per Event
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {[...summary.byEvent]
                            .sort((a, b) => Number(b.revenue) - Number(a.revenue))
                            .map((ev) => {
                                const maxRevenue = Math.max(
                                    ...summary.byEvent.map((e) => Number(e.revenue))
                                );
                                const pct = maxRevenue > 0
                                    ? (Number(ev.revenue) / maxRevenue) * 100
                                    : 0;
                                return (
                                    <div key={ev.eventId} className="space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-bold text-glass-text truncate max-w-xs">
                                                {ev.eventName || `Event #${ev.eventId}`}
                                            </span>
                                            <span className="font-black text-emerald-500 shrink-0 ml-4">
                                                {formatIDR(Number(ev.revenue))}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-glass-surface rounded-full overflow-hidden border border-glass-border">
                                                <div
                                                    className="h-full bg-linear-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] text-[var(--muted-foreground)] font-black shrink-0">
                                                {ev.orderCount} order · {ev.ticketsSold} tiket
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </motion.div>
            )}

            {/* ── Filters ────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-muted border border-glass-border rounded-3xl p-3 shadow-2xl">
                <div className="md:col-span-2 relative">
                    <Search
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Cari nama pembeli, email, atau event..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/70 dark:bg-[var(--background)]/40 border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm text-glass-text font-bold outline-none"
                    />
                </div>
                <div className="relative">
                    <Filter
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"
                        size={16}
                    />
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="w-full bg-white/70 dark:bg-[var(--background)]/40 border border-glass-border rounded-xl py-3 pl-10 pr-4 text-sm text-glass-text font-bold outline-none appearance-none"
                    >
                        <option value="all">Semua Event</option>
                        {events.map((ev) => (
                            <option key={ev.id} value={ev.id}>
                                {ev.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-center bg-glass-surface border border-glass-border rounded-xl px-4 text-[10px] font-black text-[var(--muted-foreground)] uppercase tracking-widest">
                    {filtered.length} transaksi
                </div>
            </div>

            {/* ── Table ──────────────────────────────────────────────────────── */}
            <motion.div variants={slideUp}>
                {loading && transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-muted rounded-4xl border border-glass-border">
                        <Loader2 className="animate-spin mb-6 text-emerald-500" size={48} />
                        <p className="text-lg font-bold text-[var(--muted-foreground)]">
                            Memuat data transaksi…
                        </p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-12 bg-muted rounded-4xl border border-red-500/20 text-red-400">
                        <p className="font-bold">Gagal memuat: {error}</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-muted rounded-4xl border border-glass-border">
                        <ShoppingBag size={48} className="text-glass-text/10 mb-6" />
                        <p className="text-lg font-bold text-[var(--muted-foreground)]">
                            Belum ada transaksi ditemukan
                        </p>
                        <p className="text-sm text-glass-text/20 mt-2">
                            Transaksi akan muncul setelah user membeli tiket
                        </p>
                    </div>
                ) : (
                    <div className="glass-card overflow-hidden border-glass-border rounded-4xl shadow-2xl">
                        <DataTable
                            title="Riwayat Pembelian Tiket"
                            data={filtered}
                            columns={[
                                {
                                    header: "PEMBELI",
                                    accessor: (t: Transaction) => (
                                        <div className="space-y-1 py-2">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20 text-xs font-black">
                                                    {t.buyerName?.charAt(0).toUpperCase() ?? "?"}
                                                </div>
                                                <span className="font-black text-glass-text text-sm leading-none">
                                                    {t.buyerName}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 pl-10">
                                                <Mail size={10} className="text-[var(--muted-foreground)]" />
                                                <span className="text-[10px] text-[var(--muted-foreground)] font-medium">
                                                    {t.buyerEmail}
                                                </span>
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    header: "EVENT & TIKET",
                                    accessor: (t: Transaction) => (
                                        <div className="space-y-1">
                                            <span className="font-black text-glass-text text-sm block leading-tight">
                                                {t.eventName || `Event #${t.eventId}`}
                                            </span>
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded inline-block">
                                                {t.ticketName}
                                            </span>
                                            {t.categoryName && (
                                                <span className="ml-1.5 text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
                                                    · {t.categoryName}
                                                </span>
                                            )}
                                        </div>
                                    ),
                                },
                                {
                                    header: "QTY",
                                    accessor: (t: Transaction) => (
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-xl bg-glass-surface border border-glass-border flex items-center justify-center font-black text-glass-text text-sm">
                                                {t.quantity}
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    header: "TOTAL",
                                    accessor: (t: Transaction) => (
                                        <div className="space-y-0.5">
                                            <p className="font-black text-emerald-500 text-base tracking-tight">
                                                {formatIDR(Number(t.totalPrice))}
                                            </p>
                                            <p className="text-[10px] text-[var(--muted-foreground)] font-medium">
                                                @{formatIDR(Number(t.unitPrice))}/tiket
                                            </p>
                                        </div>
                                    ),
                                },
                                {
                                    header: "TANGGAL",
                                    accessor: (t: Transaction) => (
                                        <div className="flex items-center gap-2 text-glass-text/60">
                                            <Calendar size={14} className="text-primary/40 shrink-0" />
                                            <span className="text-xs font-bold">
                                                {formatDate(t.purchasedAt)}
                                            </span>
                                        </div>
                                    ),
                                },
                                {
                                    header: "STATUS",
                                    accessor: () => (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                            <CheckCircle2 size={10} />
                                            Sukses
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
