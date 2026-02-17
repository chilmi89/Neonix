"use client";

import { Music2, Mic2, Piano, Disc, Theater, Trophy } from "lucide-react";
import { GenreCard } from "../ui/GenreCard";

const genres = [
    { icon: Music2, label: "Electronic" },
    { icon: Mic2, label: "Hip Hop" },
    { icon: Piano, label: "Jazz" },
    { icon: Disc, label: "Rock" },
    { icon: Theater, label: "Comedy" },
    { icon: Trophy, label: "Sports" },
];

export function GenreSection() {
    return (
        <section className="py-20 px-8 md:px-12 lg:px-16 w-full space-y-12">
            <h2 className="text-3xl font-black text-foreground text-center uppercase tracking-tighter">Browse by Genre</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {genres.map((genre, i) => (
                    <GenreCard key={i} {...genre} />
                ))}
            </div>
        </section>
    );
}
