import { Metadata } from "next";

export const metadata: Metadata = {
    title: "NEONIX - Home",
    description: "Experience the Extraordinary - Your gateway to the most electrifying live performances.",
};

import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonHero } from "./_components/NeonHero";
import { GenreSection } from "./_components/GenreSection";
import { TrendingSection } from "./_components/TrendingSection";
import { VipSection } from "./_components/VipSection";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";
import { LiquidBackground } from "@/app/(frontend)/_components/ui/LiquidBackground";

export default function Homepage() {
    return (
<<<<<<< Updated upstream:src/app/(frontend)/(home)/page.tsx
        <div className="min-h-screen bg-background text-foreground selection:bg-neon-pink/30 overflow-x-hidden font-inter relative">
            <LiquidBackground />
=======
        <div className="min-h-screen bg-background text-foreground selection:bg-neon-pink/30 overflow-x-hidden font-inter transition-colors duration-500">
>>>>>>> Stashed changes:src/app/(frontend)/page.tsx
            <NeonNavbar />

            <main>
                <NeonHero />
                <GenreSection />
                <TrendingSection />
                <VipSection />
            </main>

            <NeonFooter />
        </div>
    );
}
