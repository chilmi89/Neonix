import { Metadata } from "next";

export const metadata: Metadata = {
    title: "NEONIX - Home",
    description: "Experience the Extraordinary - Your gateway to the most electrifying live performances.",
};

import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonHero } from "@/app/(frontend)/_components/sections/NeonHero";
import { GenreSection } from "@/app/(frontend)/_components/sections/GenreSection";
import { TrendingSection } from "@/app/(frontend)/_components/sections/TrendingSection";
import { VipSection } from "@/app/(frontend)/_components/sections/VipSection";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";

export default function Homepage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-pink/30 overflow-x-hidden font-inter">
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
