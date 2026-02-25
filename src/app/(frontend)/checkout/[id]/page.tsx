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
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-inter relative">
            <PlasmaBackground />
            <NeonNavbar />

            <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
                {/* Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
                >
                    <ChevronLeft
                        size={20}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span className="text-sm font-bold uppercase tracking-wider">Back</span>
                </Link>

                <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-10">
                    Ticket <span className="text-neon-cyan">Checkout</span>
                </h1>

                <div className="grid lg:grid-cols-[1fr_360px] gap-8">
                    {/* ── Left ─────────────────────────────────────────────── */}
                    <div className="space-y-6">
                        {/* Event info */}
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
                            {displayPoster && (
                                <img
                                    src={getImageUrl(displayPoster)}
                                    alt={displayName}
                                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                                />
                            )}
                            <div>
                                <h2 className="font-black text-xl uppercase tracking-tight">
                                    {displayName}
                                </h2>
                                {publicEvent?.city && (
                                    <div className="flex items-center gap-1.5 mt-1 text-white/40 text-xs font-bold">
                                        <MapPin size={12} />
                                        {publicEvent.locationName ?? publicEvent.location} ·{" "}
                                        {publicEvent.city}
                                    </div>
                                )}
                                {publicEvent?.startDate && (
                                    <div className="flex items-center gap-1.5 mt-1 text-white/40 text-xs font-bold">
                                        <Calendar size={12} />
                                        {formatDate(publicEvent.startDate)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pilih tiket */}
                        <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Ticket className="text-neon-cyan" size={20} />
                                <h3 className="text-lg font-black uppercase tracking-tight">
                                    Pilih Tiket
                                </h3>
                            </div>

                            {ticketGroups.length === 0 ? (
                                <p className="text-white/30 text-sm font-bold text-center py-10">
                                    Tidak ada tiket tersedia.
                                </p>
                            ) : (
                                <div className="space-y-8">
                                    {ticketGroups.map((group, gi) => {
                                        const accent = CATEGORY_COLORS[gi % CATEGORY_COLORS.length];
                                        return (
                                            <div key={group.categoryId}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span
                                                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 ${accent}`}
                                                    >
                                                        {group.categoryName}
                                                    </span>
                                                    <div className="flex-1 h-px bg-white/5" />
                                                </div>
                                                <div className="space-y-3">
                                                    {group.tickets.map((ticket) => {
                                                        const qty = getQty(ticket.id);
                                                        const remaining = ticket.quota - ticket.sold;
                                                        return (
                                                            <div
                                                                key={ticket.id}
                                                                className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5"
                                                            >
                                                                <div className="flex-1 mr-4">
                                                                    <p className="font-bold text-base">
                                                                        {ticket.name}
                                                                    </p>
                                                                    {ticket.description && (
                                                                        <p className="text-xs text-white/40 mt-0.5">
                                                                            {ticket.description}
                                                                        </p>
                                                                    )}
                                                                    <p className={`text-xl font-black mt-2 ${accent}`}>
                                                                        {formatIDR(ticket.price)}
                                                                    </p>
                                                                    <p className="text-[10px] text-white/30 uppercase font-black tracking-wider mt-0.5">
                                                                        {remaining > 0
                                                                            ? `${remaining} sisa`
                                                                            : "Habis"}
                                                                    </p>
                                                                </div>
                                                                {remaining > 0 ? (
                                                                    <div className="flex items-center gap-3 bg-black/40 p-2 rounded-xl border border-white/10 shrink-0">
                                                                        <button
                                                                            onClick={() => changeQty(ticket.id, -1)}
                                                                            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                                                                        >
                                                                            <Minus size={15} />
                                                                        </button>
                                                                        <span className="text-lg font-black w-6 text-center">
                                                                            {qty}
                                                                        </span>
                                                                        <button
                                                                            onClick={() =>
                                                                                qty < remaining &&
                                                                                changeQty(ticket.id, 1)
                                                                            }
                                                                            disabled={qty >= remaining}
                                                                            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 bg-white/5 transition-colors disabled:opacity-30"
                                                                        >
                                                                            <Plus size={15} />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400/60 border border-red-400/20 px-3 py-2 rounded-xl">
                                                                        Sold Out
                                                                    </span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        {/* Form buyer */}
                        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-black uppercase tracking-tight">
                                    Data Pembeli
                                </h3>
                                {isLoggedIn && (
                                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                                        ✓ Diambil dari akun
                                    </span>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-black tracking-widest text-white/40">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={buyerName}
                                    onChange={(e) => setBuyerName(e.target.value)}
                                    placeholder="Nama Lengkap"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-neon-cyan/50 transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-black tracking-widest text-white/40">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={buyerEmail}
                                    onChange={(e) => setBuyerEmail(e.target.value)}
                                    placeholder="email@example.com"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-neon-cyan/50 transition-colors"
                                />
                            </div>

                            {!isLoggedIn && (
                                <p className="text-[10px] text-white/20 font-bold uppercase tracking-wider pt-1">
                                    💡 Login untuk mengisi otomatis
                                </p>
                            )}
                        </section>
                    </div>

                    {/* ── Right: Order Summary ──────────────────────────────── */}
                    <div className="lg:sticky lg:top-32 self-start">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
                            <h3 className="font-black text-lg uppercase tracking-tight">
                                Ringkasan
                            </h3>

                            {/* Cart lines */}
                            <div className="space-y-3 min-h-[60px]">
                                {cartLines.length === 0 ? (
                                    <p className="text-white/20 text-xs font-bold uppercase tracking-widest text-center py-4">
                                        Belum ada tiket dipilih
                                    </p>
                                ) : (
                                    cartLines.map(({ ticket, qty }) => (
                                        <div
                                            key={ticket.id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-white/60">
                                                {ticket.name} ×{qty}
                                            </span>
                                            <span className="font-bold">
                                                {formatIDR(ticket.price * qty)}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Total */}
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                <p className="text-[10px] uppercase font-black tracking-widest text-white/40">
                                    Total
                                </p>
                                <p className="text-3xl font-black text-neon-cyan">
                                    {formatIDR(subtotal)}
                                </p>
                            </div>

                            {/* Checkout button */}
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleCheckout}
                                disabled={!isFormValid || purchasing}
                                className="w-full bg-neon-cyan text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg shadow-neon-cyan/20 uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {purchasing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Memproses…
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={20} />
                                        Checkout Sekarang
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </motion.button>

                            {/* Hint */}
                            {!isFormValid && (
                                <p className="text-[10px] text-white/30 text-center uppercase tracking-wider">
                                    {subtotal === 0
                                        ? "Pilih minimal 1 tiket"
                                        : "Lengkapi nama & email"}
                                </p>
                            )}

                            {/* Info */}
                            <div className="flex items-center gap-2 text-white/20 rounded-xl p-3 bg-white/3">
                                <CheckCircle2
                                    size={14}
                                    className="text-neon-cyan/40 shrink-0"
                                />
                                <p className="text-[9px] font-bold uppercase tracking-wide leading-relaxed">
                                    Setelah checkout, data masuk ke log transaksi admin
                                </p>
                            </div>
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
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <Loader2 className="animate-spin text-neon-cyan" size={48} />
                </div>
            }
        >
            <CheckoutInner paramsPromise={paramsPromise} />
        </Suspense>
    );
}
