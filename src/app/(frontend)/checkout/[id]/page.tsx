"use client";

import { motion } from "framer-motion";
import {
    ChevronLeft,
    Minus,
    Plus,
    ArrowRight,
    MapPin,
    Calendar,
    Ticket,
    Loader2,
    AlertCircle,
    CheckCircle2,
    ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect, use, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PlasmaBackground } from "@/app/(frontend)/_components/ui/PlasmaBackground";
import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import {
    getPublicEventById,
    getPublicTicketsByTenantAndEvent,
    getPublicTicketsByEvent,
    purchaseTicket,
    PublicEvent,
    TicketPurchaseRequest,
} from "@/services/publicService";
import { Ticket as TicketType } from "@/types/auth";
import { getImageUrl } from "@/config/api.config";

// ─── Hook: baca user dari localStorage (aman di public pages tanpa UserProvider) ──

function useLocalUser() {
    const [localUser, setLocalUser] = useState<{
        name?: string;
        username?: string;
        email?: string;
    } | null>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("user");
            if (raw) setLocalUser(JSON.parse(raw));
        } catch {
            /* ignore parse error */
        }
    }, []);

    return localUser;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface TicketGroup {
    categoryId: number;
    categoryName: string;
    tickets: TicketType[];
}

interface CartItem {
    ticketId: number;
    quantity: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function groupTicketsByCategory(tickets: TicketType[]): TicketGroup[] {
    const map = new Map<number, TicketGroup>();
    for (const t of tickets) {
        const catId = t.categoryId ?? 0;
        if (!map.has(catId)) {
            map.set(catId, {
                categoryId: catId,
                categoryName: t.categoryName ?? "Uncategorized",
                tickets: [],
            });
        }
        map.get(catId)!.tickets.push(t);
    }
    return Array.from(map.values());
}

function formatDate(dateStr?: string) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function formatIDR(n: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(n);
}

const CATEGORY_COLORS = [
    "text-neon-cyan",
    "text-neon-pink",
    "text-purple-400",
    "text-yellow-400",
    "text-green-400",
];

// ─── Inner Page ───────────────────────────────────────────────────────────────

function CheckoutInner({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const eventId = params.id;
    const router = useRouter();
    const searchParams = useSearchParams();
    const tenantIdFromUrl = searchParams.get("tenantId");
    const localUser = useLocalUser(); // baca dari localStorage, aman tanpa UserProvider

    const [publicEvent, setPublicEvent] = useState<PublicEvent | null>(null);
    const [ticketGroups, setTicketGroups] = useState<TicketGroup[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [buyerName, setBuyerName] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [purchasing, setPurchasing] = useState(false);
    // Tambahkan state untuk data pengunjung per tiket
    const [attendeesData, setAttendeesData] = useState<Record<number, { name: string; email: string }[]>>({});

    // ── Auto-fill dari user login ──────────────────────────────────────────────
    useEffect(() => {
        if (!localUser || buyerName || buyerEmail) return;
        if (localUser.name) setBuyerName(localUser.name);
        else if (localUser.username) setBuyerName(localUser.username);
        if (localUser.email) setBuyerEmail(localUser.email);
    }, [localUser, buyerName, buyerEmail]);

    // ── Fetch event + tiket ───────────────────────────────────────────────────
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                let resolvedTenantId = tenantIdFromUrl;

                try {
                    const pubRes = await getPublicEventById(eventId);
                    if (pubRes.status === "success" && pubRes.data) {
                        setPublicEvent(pubRes.data);
                        if (!resolvedTenantId && pubRes.data.tenantId)
                            resolvedTenantId = String(pubRes.data.tenantId);
                    }
                } catch (e) {
                    console.warn("[Checkout] event detail:", e);
                }

                let tickets: TicketType[] = [];
                try {
                    if (resolvedTenantId) {
                        const res = await getPublicTicketsByTenantAndEvent(resolvedTenantId, eventId);
                        tickets = res.data || [];
                    } else {
                        const res = await getPublicTicketsByEvent(eventId);
                        tickets = res.data || [];
                    }
                } catch (e) {
                    console.error("[Checkout] tickets:", e);
                }

                setTicketGroups(groupTicketsByCategory(tickets));
                setCart(tickets.map((t) => ({ ticketId: t.id, quantity: 0 })));
            } catch (err: any) {
                setError(err?.message ?? "Terjadi kesalahan.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [eventId, tenantIdFromUrl]);

    // ── Update Attendees Data when cart changes ────────────────────────────────
    useEffect(() => {
        setAttendeesData(prev => {
            const next = { ...prev };
            cartLines.forEach(({ ticket, qty }) => {
                if (!next[ticket.id] || next[ticket.id].length !== qty) {
                    const current = next[ticket.id] || [];
                    const updated = Array.from({ length: qty }, (_, i) => 
                        current[i] || { name: i === 0 ? buyerName : "", email: i === 0 ? buyerEmail : "" }
                    );
                    next[ticket.id] = updated;
                }
            });
            return next;
        });
    }, [cart, buyerName, buyerEmail]);

    // ── Cart helpers ──────────────────────────────────────────────────────────
    const getQty = (ticketId: number) =>
        cart.find((c) => c.ticketId === ticketId)?.quantity ?? 0;

    const changeQty = (ticketId: number, delta: number) =>
        setCart((prev) =>
            prev.map((c) =>
                c.ticketId === ticketId
                    ? { ...c, quantity: Math.max(0, c.quantity + delta) }
                    : c
            )
        );

    const allTickets = ticketGroups.flatMap((g) => g.tickets);
    const cartLines = allTickets
        .filter((t) => getQty(t.id) > 0)
        .map((t) => ({ ticket: t, qty: getQty(t.id) }));
    const subtotal = cartLines.reduce(
        (sum, { ticket, qty }) => sum + ticket.price * qty,
        0
    );

    // ── Purchase ──────────────────────────────────────────────────────────────
    const handleCheckout = async () => {
        if (subtotal === 0 || !buyerName.trim() || !buyerEmail.trim()) return;
        setPurchasing(true);
        try {
            for (const { ticket, qty } of cartLines) {
                const req: TicketPurchaseRequest = {
                    buyerName: buyerName.trim(),
                    buyerEmail: buyerEmail.trim(),
                    quantity: qty,
                    attendees: attendeesData[ticket.id]?.map(a => ({
                        name: a.name.trim() || buyerName.trim(),
                        email: a.email.trim() || buyerEmail.trim()
                    }))
                };
                await purchaseTicket(ticket.id, req);
            }
            router.push("/member");
        } catch (err: any) {
            alert("Checkout gagal: " + (err?.message ?? "Terjadi kesalahan"));
        } finally {
            setPurchasing(false);
        }
    };

    const displayName = publicEvent?.name ?? publicEvent?.title ?? `Event #${eventId}`;
    const displayPoster = publicEvent?.posterUrl;
    const isFormValid = subtotal > 0 && buyerName.trim() && buyerEmail.trim();
    // Validasi apakah semua nama attendee sudah diisi jika QTY > 1 (Opsional, tapi bagus untuk UX)
    const isAttendeesValid = cartLines.every(({ ticket }) => 
        attendeesData[ticket.id]?.every(a => a.name.trim() !== "" && a.email.trim() !== "")
    );

    const isLoggedIn = !!localUser;

    // ── Loading / Error states ─────────────────────────────────────────────────
// ... rest of code (I'll keep skipping irrelevant parts for brevity in my thought, but use correct lines in the call)

    // ── Loading / Error states ─────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center font-inter relative">
                <PlasmaBackground />
                <NeonNavbar />
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-neon-cyan" size={48} />
                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">
                        Memuat tiket…
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center font-inter relative">
                <PlasmaBackground />
                <NeonNavbar />
                <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
                    <AlertCircle className="text-red-400" size={48} />
                    <p className="text-white font-black text-2xl uppercase">Gagal Memuat</p>
                    <p className="text-white/60 text-sm">{error}</p>
                    <Link
                        href="/"
                        className="mt-4 inline-flex items-center gap-2 bg-neon-cyan text-black font-black px-6 py-3 rounded-xl uppercase tracking-wider"
                    >
                        Kembali
                    </Link>
                </div>
            </div>
        );
    }

    // ── Main render ───────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#F1F5F9] text-[#1C2434] overflow-x-hidden font-inter relative selection:bg-neon-cyan/20">
            <PlasmaBackground />
            <NeonNavbar />

            <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Back link */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group"
                    >
                        <ChevronLeft
                            size={18}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        <span className="text-xs font-black uppercase tracking-widest">Back to Events</span>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 items-start">
                    {/* ── Left Column: Ticket Selection & Attendee Info ─────────── */}
                    <div className="space-y-12 order-2 lg:order-1">
                        {/* Select Tickets */}
                        <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-primary/10 rounded-xl">
                                    <Ticket className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-widest leading-none text-slate-900">Select Tickets</h2>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">Pick your experience</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {ticketGroups.map((group, gi) => {
                                    return (
                                        <div key={group.categoryId} className="space-y-4">
                                            <div className="flex items-center gap-3 px-2 pt-4">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                                    {group.categoryName}
                                                </span>
                                                <div className="flex-1 h-px bg-slate-100" />
                                            </div>
                                            {group.tickets.map((ticket) => {
                                                const qty = getQty(ticket.id);
                                                const remaining = ticket.quota - ticket.sold;
                                                return (
                                                    <div
                                                        key={ticket.id}
                                                        className={cn(
                                                            "flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl border transition-all duration-300 group/item",
                                                            qty > 0
                                                                ? "bg-primary/[0.02] border-primary/20 shadow-[0_10px_30px_rgba(60,80,224,0.05)]"
                                                                : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                                                        )}
                                                    >
                                                        <div className="flex-1 mb-4 md:mb-0">
                                                            <p className="font-bold text-lg text-slate-900 mb-1 group-hover/item:text-primary transition-colors">{ticket.name}</p>
                                                            <p className="text-xl font-black text-slate-900">
                                                                {formatIDR(ticket.price)}
                                                            </p>
                                                            {remaining < 10 && remaining > 0 && (
                                                                <p className="text-[10px] font-bold text-amber-600 mt-1 uppercase">Only {remaining} left!</p>
                                                            )}
                                                        </div>
                                                        {remaining > 0 ? (
                                                            <div className="flex items-center gap-5 bg-[#F8FAFC] p-2 rounded-2xl border border-slate-200">
                                                                <button
                                                                    onClick={() => changeQty(ticket.id, -1)}
                                                                    className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors disabled:opacity-20 active:scale-90 text-slate-600"
                                                                    disabled={qty === 0}
                                                                >
                                                                    <Minus size={16} />
                                                                </button>
                                                                <span className="text-lg font-black w-6 text-center tabular-nums text-slate-900">
                                                                    {qty}
                                                                </span>
                                                                <button
                                                                    onClick={() => qty < remaining && changeQty(ticket.id, 1)}
                                                                    disabled={qty >= remaining}
                                                                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-100 transition-colors disabled:opacity-20 active:scale-90 text-slate-600"
                                                                >
                                                                    <Plus size={16} />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 bg-red-50 border border-red-100 px-6 py-3 rounded-2xl">
                                                                Sold Out
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Customer Information & Attendee details */}
                        {subtotal > 0 && (
                            <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-primary/10 rounded-xl">
                                        <ShoppingBag className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black uppercase tracking-widest leading-none text-slate-900">Checkout Details</h2>
                                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">Complete your order</p>
                                    </div>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 space-y-10 shadow-sm">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">
                                                Buyer Name
                                            </label>
                                            <input
                                                type="text"
                                                value={buyerName}
                                                onChange={(e) => setBuyerName(e.target.value)}
                                                placeholder="Full Name"
                                                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 text-slate-900"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={buyerEmail}
                                                onChange={(e) => setBuyerEmail(e.target.value)}
                                                placeholder="email@example.com"
                                                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 text-slate-900"
                                            />
                                        </div>
                                    </div>

                                    {isLoggedIn && (
                                        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl w-fit">
                                            <CheckCircle2 size={12} className="text-emerald-600" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700/80">
                                                Automatically filled from account
                                            </span>
                                        </div>
                                    )}

                                    {/* Dynamic Attendee Forms */}
                                    {cartLines.map(({ ticket, qty }) => (
                                        <div key={`att-section-${ticket.id}`} className="space-y-8 pt-10 border-t border-slate-100">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                                    Attendee Info: <span className="text-primary">{ticket.name}</span>
                                                </h3>
                                                <span className="text-[10px] font-bold text-slate-300 uppercase">{qty} Ticket{qty > 1 ? 's' : ''}</span>
                                            </div>
                                            
                                            <div className="grid gap-6">
                                                {attendeesData[ticket.id]?.map((attendee, idx) => (
                                                    <div key={`att-${ticket.id}-${idx}`} className="group/att relative bg-[#F8FAFC] hover:bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all">
                                                        <div className="absolute -top-3 left-6 px-3 py-1 bg-white border border-slate-200 rounded-lg text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                                            P{idx + 1}
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <input
                                                                type="text"
                                                                value={attendee.name}
                                                                onChange={(e) => {
                                                                    const next = [...(attendeesData[ticket.id] || [])];
                                                                    next[idx] = { ...next[idx], name: e.target.value };
                                                                    setAttendeesData({ ...attendeesData, [ticket.id]: next });
                                                                }}
                                                                placeholder="Full Name"
                                                                className="w-full bg-white border border-slate-100 rounded-xl px-5 py-3 text-xs font-bold focus:outline-none focus:border-primary/40 transition-all text-slate-900"
                                                            />
                                                            <input
                                                                type="email"
                                                                value={attendee.email}
                                                                onChange={(e) => {
                                                                    const next = [...(attendeesData[ticket.id] || [])];
                                                                    next[idx] = { ...next[idx], email: e.target.value };
                                                                    setAttendeesData({ ...attendeesData, [ticket.id]: next });
                                                                }}
                                                                placeholder="Email"
                                                                className="w-full bg-white border border-slate-100 rounded-xl px-5 py-3 text-xs font-bold focus:outline-none focus:border-primary/40 transition-all text-slate-900"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleCheckout}
                                        disabled={!isFormValid || !isAttendeesValid || purchasing}
                                        className="w-full bg-primary text-white font-black py-6 rounded-3xl flex items-center justify-center gap-4 hover:brightness-110 transition-all shadow-[0_20px_60px_rgba(60,80,224,0.1)] uppercase tracking-[0.3em] text-sm mt-6 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-3xl" />
                                        <span className="relative z-10">
                                            {purchasing ? (
                                                <div className="flex items-center gap-3">
                                                    <Loader2 className="animate-spin" size={20} />
                                                    Processing...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    Confirm Purchase
                                                    <ArrowRight size={18} />
                                                </div>
                                            )}
                                        </span>
                                    </motion.button>

                                    {!isFormValid && subtotal > 0 && (
                                        <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-black flex items-center justify-center gap-2">
                                            <AlertCircle size={12} />
                                            Please provide details to unlock purchase
                                        </p>
                                    )}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* ── Right Column: Order Summary ────────────────── */}
                    <div className="lg:sticky lg:top-32 space-y-8 order-1 lg:order-2">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6 leading-none text-slate-900">
                                {displayName}
                            </h1>
                            <div className="flex flex-wrap gap-3">
                                {publicEvent?.city && (
                                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                                        <MapPin size={14} className="text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            {publicEvent.locationName ?? publicEvent.location} · {publicEvent.city}
                                        </span>
                                    </div>
                                )}
                                {publicEvent?.startDate && (
                                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                                        <Calendar size={14} className="text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            {formatDate(publicEvent.startDate)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Summary Box */}
                        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-md">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -mr-10 -mt-10" />
                            
                            <h2 className="text-xl font-black uppercase tracking-widest mb-10 text-slate-900 flex items-center gap-3">
                                <ShoppingBag size={20} className="text-primary" />
                                Summary
                            </h2>

                            <div className="space-y-8 mb-12 min-h-[100px]">
                                {cartLines.length === 0 ? (
                                    <div className="py-16 text-center border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center gap-4">
                                        <Ticket className="text-slate-200" size={32} />
                                        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">
                                            No tickets selected
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {cartLines.map(({ ticket, qty }) => (
                                            <div key={ticket.id} className="flex justify-between items-start animate-in fade-in slide-in-from-right-4 duration-300">
                                                <div className="space-y-1.5">
                                                    <p className="text-sm font-black text-slate-700 uppercase tracking-wider">
                                                        {ticket.name}
                                                    </p>
                                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest">
                                                        {qty} × {formatIDR(ticket.price)}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-black text-slate-900 tabular-nums">
                                                    {formatIDR(ticket.price * qty)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-slate-100 pt-10">
                                <div className="flex items-end justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Total Payment</p>
                                        <p className="text-slate-400 text-[8px] font-bold uppercase tracking-widest">Inc. all applicable taxes</p>
                                    </div>
                                    <p className="text-4xl font-black tracking-tighter text-slate-900 tabular-nums">
                                        {formatIDR(subtotal)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Security Hint */}
                        <div className="flex items-center gap-4 px-8 py-5 bg-white border border-slate-100 rounded-3xl shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] leading-relaxed">
                                Guaranteed safe checkout secured with <span className="text-slate-600">256-bit SSL</span> encryption
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function CheckoutPage({
    params: paramsPromise,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-primary animate-pulse">Initializing Checkout</p>
                    </div>
                </div>
            }
        >
            <CheckoutInner paramsPromise={paramsPromise} />
        </Suspense>
    );
}

