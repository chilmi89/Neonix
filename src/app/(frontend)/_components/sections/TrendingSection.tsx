"use client";

import { NeonEventCard } from "../ui/NeonEventCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const featuredEvents = [
    {
        id: 1,
        title: "Neon Lights Festival 2024",
        date: "Aug 12 - 14, 2024",
        location: "GBK Stadium, Jakarta",
        image: "https://images.unsplash.com/photo-1540575861501-7ad058bf3efb?auto=format&fit=crop&q=80&w=800",
        price: "150",
        tag: "trending" as const
    },
    {
        id: 2,
        title: "Midnight Jazz Session",
        date: "Sep 05, 2024",
        location: "Blue Note, Tokyo",
        image: "https://images.unsplash.com/photo-1514525253361-bee243870eb2?auto=format&fit=crop&q=80&w=800",
        price: "45",
    },
    {
        id: 3,
        title: "Underground Techno Rave",
        date: "Oct 31, 2024",
        location: "Warehouse 51, LA",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
        price: "80",
        tag: "hot" as const
    }
];

export function TrendingSection() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Trending Events</h2>
                    <p className="text-white/40 font-medium">Discover what everyone is talking about.</p>
                </div>
                <Link href="#" className="flex items-center gap-2 text-neon-pink font-bold text-sm uppercase tracking-widest hover:brightness-125 transition-all group italic">
                    View all events <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredEvents.map((event) => (
                    <NeonEventCard key={event.id} {...event} />
                ))}
            </div>
        </section>
    );
}
