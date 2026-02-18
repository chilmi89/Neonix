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
        image: "https://images.unsplash.com/photo-1540575861501-7ad058bf3efb?w=800&auto=format&fit=crop",
        price: "150",
        tag: "trending" as const
    },
    {
        id: 2,
        title: "Midnight Jazz Session",
        date: "Sep 05, 2024",
        location: "Blue Note, Tokyo",
        image: "https://images.unsplash.com/photo-1514525253361-bee243870eb2?w=800&auto=format&fit=crop",
        price: "45",
    },
    {
        id: 3,
        title: "Underground Techno Rave",
        date: "Oct 31, 2024",
        location: "Warehouse 51, LA",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop",
        price: "80",
        tag: "hot" as const
    }
];

export function TrendingSection() {
    return (
        <section className="py-16 px-8 md:px-12 lg:px-16 w-full space-y-10">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Trending Events</h2>
                    <p className="text-muted-foreground text-sm font-medium">Discover what everyone is talking about.</p>
                </div>
                <Link href="#" className="text-neon-pink text-xs font-bold flex items-center group">
                    View all events <ArrowRight className="ml-2 group-hover:translate-x-1 transition-all" size={14} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map((event) => (
                    <NeonEventCard key={event.id} {...event} />
                ))}
            </div>
        </section>
    );
}
