"use client";

import { NeonNavbar } from "@/app/(frontend)/_components/layout/NeonNavbar";
import { NeonHero } from "@/app/(frontend)/_components/sections/NeonHero";
import { GenreSection } from "@/app/(frontend)/_components/sections/GenreSection";
import { TrendingSection } from "@/app/(frontend)/_components/sections/TrendingSection";
import { VipSection } from "@/app/(frontend)/_components/sections/VipSection";
import { NeonFooter } from "@/app/(frontend)/_components/layout/NeonFooter";
import { motion } from "framer-motion";
import { containerStagger } from "@/lib/motion";

export default function Homepage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-neon-pink/30 overflow-x-hidden">
            <NeonNavbar />

            <main>
                <motion.div
                    variants={containerStagger}
                    initial="initial"
                    animate="animate"
                >
                    <NeonHero />
                    <GenreSection />
                    <TrendingSection />
                    <VipSection />
                </motion.div>
            </main>

            <NeonFooter />
        </div>
    );
}
