"use client";

import { useState, useEffect } from "react";
import { Music2, Mic2, Piano, Disc, Theater, Trophy, GraduationCap, Gamepad2 } from "lucide-react";
import { GenreCard } from "@/app/(frontend)/_components/ui/GenreCard";
import { getEventCategories } from "@/services/eventService";
import { EventCategory } from "@/types/auth";

const ICON_MAP: Record<string, any> = {
    "PENDIDIKAN": GraduationCap,
    "OLAHRAGA": Trophy,
    "GAMING": Gamepad2,
    "ELECTRONIC": Music2,
    "HIP HOP": Mic2,
    "JAZZ": Piano,
    "ROCK": Disc,
    "COMEDY": Theater,
};

const DEFAULT_ICON = Music2;


const STATIC_GENRES = [
    { id: "s1", name: "ELECTRONIC" },
    { id: "s2", name: "HIP HOP" },
    { id: "s3", name: "JAZZ" },
    { id: "s4", name: "ROCK" },
    { id: "s5", name: "COMEDY" },
    { id: "s6", name: "OLAHRAGA" },
];

interface GenreSectionProps {
    activeGenre?: string;
    onGenreClick?: (genre: string) => void;
}

export function GenreSection({ activeGenre, onGenreClick }: GenreSectionProps) {
    const [categories, setCategories] = useState<{ id: number | string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getEventCategories();
                if (response.status === "success" && Array.isArray(response.data) && response.data.length > 0) {
                    setCategories(response.data);
                } else {
                    // Fallback if empty or unexpected status
                    setCategories(STATIC_GENRES);
                }
            } catch (error: any) {
                console.warn("Failed to fetch event categories, using static fallback:", error.message);
                setCategories(STATIC_GENRES);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="w-full mt-2 mb-8 flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <section className="w-full mt-2 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => {
                    const Icon = ICON_MAP[category.name] || DEFAULT_ICON;
                    // Format label: capitalize first letter or keep as is if desired
                    const label = category.name.charAt(0) + category.name.slice(1).toLowerCase();

                    return (
                        <GenreCard
                            key={category.id}
                            icon={Icon}
                            label={label}
                            isActive={activeGenre === category.name}
                            onClick={() => onGenreClick?.(category.name)}
                        />
                    );
                })}
            </div>
        </section>
    );
}
