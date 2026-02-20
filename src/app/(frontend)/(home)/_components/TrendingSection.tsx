"use client";

import { useEffect, useState } from "react";
import { NeonEventCard } from "@/app/(frontend)/_components/ui/NeonEventCard";
import { NeonEventDetailModal } from "@/app/(frontend)/_components/ui/NeonEventDetailModal";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { getPublicEvents, PublicEvent } from "@/services/publicService";

export function TrendingSection() {
    const [events, setEvents] = useState<PublicEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await getPublicEvents();
                if (res.status === "success" && res.data) {
                    setEvents(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch public events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'decimal',
            minimumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleEventClick = (event: PublicEvent) => {
        // Map PublicEvent to the format expected by NeonEventDetailModal
        const mappedEvent = {
            id: event.id.toString(),
            title: event.name,
            image: event.posterUrl,
            location: `${event.city} - ${event.locationName}`,
            date: formatDate(event.startDate),
            price: formatPrice(event.startingPrice),
            description: "", // Public API doesn't seem to return description yet
            genres: [event.categoryName],
        };
        setSelectedEvent(mappedEvent);
        setIsModalOpen(true);
    };

    return (
        <section className="pt-32 pb-16 px-8 md:px-12 lg:px-16 w-full space-y-10">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-black text-foreground mb-4 uppercase tracking-tighter">Trending Events</h2>
                    <p className="text-muted-foreground text-sm font-medium">Discover what everyone is talking about.</p>
                </div>
                <Link href="/explorer" className="text-neon-pink text-sm font-black flex items-center group uppercase tracking-widest hover:opacity-80 transition-opacity">
                    View all events <ArrowRight className="ml-2 group-hover:translate-x-1 transition-all" size={14} />
                </Link>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-neon-cyan" size={48} />
                    <p className="text-neon-pink font-black uppercase tracking-widest animate-pulse">Scanning the Grid...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, index) => (
                        <NeonEventCard
                            key={event.id}
                            image={event.posterUrl}
                            title={event.name}
                            location={`${event.city} - ${event.locationName}`}
                            date={formatDate(event.startDate)}
                            price={formatPrice(event.startingPrice)}
                            tag={index === 0 ? "trending" : index === 1 ? "hot" : undefined}
                            onClick={() => handleEventClick(event)}
                        />
                    ))}
                    {events.length === 0 && (
                        <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5">
                            <p className="text-muted-foreground font-medium">No active events found in the matrix.</p>
                        </div>
                    )}
                </div>
            )}

            <NeonEventDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
            />
        </section>
    );
}
