"use client";


import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { motion } from "framer-motion";
import { fadeIn, containerStagger, slideUp } from "@/lib/motion";
import { BarChart3, LineChart, PieChart } from "lucide-react";

export default function AnalyticsPage() {
    return (

        <motion.div
            variants={containerStagger}
            initial="initial"
            animate="animate"
            className="space-y-6"
        >
            <div>
                <h1 className="text-3xl font-bold text-glass-text">Analytics Overview</h1>
                <p className="text-glass-text/60">Deep dive into your performance metrics and user behavior.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={slideUp}>
                    <GlassCard className="h-[400px] flex flex-col justify-center items-center text-glass-text/40">
                        <LineChart size={48} className="mb-4 opacity-20" />
                        <p className="font-medium">User Growth Trend</p>
                        <p className="text-xs italic">(Chart placeholder)</p>
                    </GlassCard>
                </motion.div>
                <motion.div variants={slideUp}>
                    <GlassCard className="h-[400px] flex flex-col justify-center items-center text-glass-text/40">
                        <BarChart3 size={48} className="mb-4 opacity-20" />
                        <p className="font-medium">Monthly Revenue</p>
                        <p className="text-xs italic">(Chart placeholder)</p>
                    </GlassCard>
                </motion.div>
            </div>

            <motion.div variants={slideUp}>
                <GlassCard className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-primary mb-2">85%</p>
                        <p className="text-glass-text/60 text-sm">Conversion Rate</p>
                    </div>
                    <div className="text-center border-x border-glass-border">
                        <p className="text-4xl font-bold text-emerald-500 mb-2">1.2m</p>
                        <p className="text-glass-text/60 text-sm">Total Reach</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-amber-500 mb-2">4.8s</p>
                        <p className="text-glass-text/60 text-sm">Avg. Load Time</p>
                    </div>
                </GlassCard>
            </motion.div>
        </motion.div>

    );
}
