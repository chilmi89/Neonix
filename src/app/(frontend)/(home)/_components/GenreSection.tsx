"use client";

import { Music2, Mic2, Piano, Disc, Theater, Trophy } from "lucide-react";
import { GenreCard } from "@/app/(frontend)/_components/ui/GenreCard";

const genres = [
    { icon: Music2, label: "Electronic" },
    { icon: Mic2, label: "Hip Hop" },
    { icon: Piano, label: "Jazz" },
    { icon: Disc, label: "Rock" },
    { icon: Theater, label: "Comedy" },
    { icon: Trophy, label: "Sports" },
];

interface GenreSectionProps {
    activeGenre?: string;
    onGenreClick?: (genre: string) => void;
}

export function GenreSection({ activeGenre, onGenreClick }: GenreSectionProps) {
    return (
        <section className="w-full mt-2 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {genres.map((genre, i) => (
                    <GenreCard
                        key={i}
                        {...genre}
                        isActive={activeGenre === genre.label}
                        onClick={() => onGenreClick?.(genre.label)}
                    />
                ))}
            </div>
        </section>
    );
}
