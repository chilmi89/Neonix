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
    const isLoggedIn = !!localUser;

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
        <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden font-inter relative">
            <PlasmaBackground />
            <NeonNavbar />

            <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Back link */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-neon-cyan transition-colors group"
                    >
                        <ChevronLeft
                            size={18}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        <span className="text-xs font-black uppercase tracking-widest">Back to Events</span>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-start">
                    {/* ── Left Column: Order Summary & Info ────────────────── */}
                    <div className="lg:sticky lg:top-32 space-y-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
                                {displayName}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-white/40 text-xs font-bold uppercase tracking-wider">
                                {publicEvent?.city && (
                                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                        <MapPin size={14} className="text-neon-cyan" />
                                        {publicEvent.locationName ?? publicEvent.location} · {publicEvent.city}
                                    </div>
                                )}
                                {publicEvent?.startDate && (
                                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                        <Calendar size={14} className="text-neon-cyan" />
                                        {formatDate(publicEvent.startDate)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Summary Box */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-10">
                            <h2 className="text-xl font-black uppercase tracking-tight mb-8">Order Summary</h2>

                            <div className="space-y-6 mb-10">
                                {cartLines.length === 0 ? (
                                    <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-2xl">
                                        <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em]">
                                            No tickets selected
                                        </p>
                                    </div>
                                ) : (
                                    cartLines.map(({ ticket, qty }) => (
                                        <div key={ticket.id} className="flex justify-between items-start group">
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                                                    {ticket.name}
                                                </p>
                                                <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">
                                                    QTY: {qty} × {formatIDR(ticket.price)}
                                                </p>
                                            </div>
                                            <p className="text-sm font-black">
                                                {formatIDR(ticket.price * qty)}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="border-t border-white/10 pt-8 flex items-end justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.2em] mb-1">Total Amount</p>
                                    <p className="text-white/20 text-[10px] font-bold">Inc. all applicable taxes</p>
                                </div>
                                <p className="text-4xl font-black tracking-tighter">
                                    {formatIDR(subtotal)}
                                </p>
                            </div>
                        </div>

                        {/* Security Hint */}
                        <div className="flex items-center gap-3 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <CheckCircle2 size={16} className="text-neon-cyan/50" />
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em] leading-relaxed">
                                Guaranteed safe checkout with 256-bit SSL encryption
                            </p>
                        </div>
                    </div>

                    {/* ── Right Column: Ticket Selection & Payment ─────────── */}
                    <div className="space-y-12">
                        {/* Select Tickets */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-neon-cyan/10 rounded-lg">
                                    <Ticket className="text-neon-cyan" size={20} />
                                </div>
                                <h2 className="text-lg font-black uppercase tracking-widest">Selection</h2>
                            </div>

                            <div className="space-y-4">
                                {ticketGroups.map((group, gi) => {
                                    const accent = CATEGORY_COLORS[gi % CATEGORY_COLORS.length];
                                    return (
                                        <div key={group.categoryId} className="space-y-3">
                                            <div className="flex items-center gap-3 px-2">
                                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${accent}`}>
                                                    {group.categoryName}
                                                </span>
                                                <div className="flex-1 h-px bg-white/5" />
                                            </div>
                                            {group.tickets.map((ticket) => {
                                                const qty = getQty(ticket.id);
                                                const remaining = ticket.quota - ticket.sold;
                                                return (
                                                    <div
                                                        key={ticket.id}
                                                        className={cn(
                                                            "flex items-center justify-between p-6 rounded-2xl border transition-all duration-300",
                                                            qty > 0
                                                                ? "bg-white/[0.04] border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.02)]"
                                                                : "bg-white/[0.02] border-white/5 hover:border-white/10"
                                                        )}
                                                    >
                                                        <div className="flex-1 mr-6">
                                                            <p className="font-bold text-base mb-1">{ticket.name}</p>
                                                            <p className="text-lg font-black text-white/90">
                                                                {formatIDR(ticket.price)}
                                                            </p>
                                                        </div>
                                                        {remaining > 0 ? (
                                                            <div className="flex items-center gap-4 bg-black/40 p-1.5 rounded-xl border border-white/10">
                                                                <button
                                                                    onClick={() => changeQty(ticket.id, -1)}
                                                                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-20"
                                                                    disabled={qty === 0}
                                                                >
                                                                    <Minus size={14} />
                                                                </button>
                                                                <span className="text-sm font-black w-4 text-center">
                                                                    {qty}
                                                                </span>
                                                                <button
                                                                    onClick={() => qty < remaining && changeQty(ticket.id, 1)}
                                                                    disabled={qty >= remaining}
                                                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-20"
                                                                >
                                                                    <Plus size={14} />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-red-400/50 border border-red-400/10 px-4 py-2 rounded-xl">
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

                        {/* Customer Information & Payment */}
                        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-neon-cyan/10 rounded-lg">
                                    <ShoppingBag className="text-neon-cyan" size={20} />
                                </div>
                                <h2 className="text-lg font-black uppercase tracking-widest">Buyer Details</h2>
                            </div>

                            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                                        CONTACT NAME
                                    </label>
                                    <input
                                        type="text"
                                        value={buyerName}
                                        onChange={(e) => setBuyerName(e.target.value)}
                                        placeholder="Full Name"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-neon-cyan/50 focus:bg-neon-cyan/5 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                                        EMAIL ADDRESS
                                    </label>
                                    <input
                                        type="email"
                                        value={buyerEmail}
                                        onChange={(e) => setBuyerEmail(e.target.value)}
                                        placeholder="email@example.com"
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-neon-cyan/50 focus:bg-neon-cyan/5 transition-all"
                                    />
                                    {isLoggedIn && (
                                        <p className="text-[9px] font-black uppercase tracking-widest text-neon-cyan/40 px-1 pt-1">
                                            ✓ Automatically filled from account
                                        </p>
                                    )}
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCheckout}
                                    disabled={!isFormValid || purchasing}
                                    className="w-full bg-neon-cyan text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-[0_20px_40px_rgba(0,255,255,0.15)] uppercase tracking-[0.2em] text-xs mt-10 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    {purchasing ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Complete Purchase — {formatIDR(subtotal)}
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </motion.button>

                                {!isFormValid && subtotal > 0 && (
                                    <p className="text-[9px] text-white/20 text-center uppercase tracking-widest font-black">
                                        Please provide contact details to continue
                                    </p>
                                )}
                            </div>
                        </section>
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
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <Loader2 className="animate-spin text-neon-cyan" size={48} />
                </div>
            }
        >
            <CheckoutInner paramsPromise={paramsPromise} />
        </Suspense>
    );
}
