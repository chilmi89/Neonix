"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatisticCardProps {
    label: string;
    value: string;
    trend: number;
    icon: React.ElementType;
    description: string;
    color?: "blue" | "emerald" | "amber" | "rose" | "violet";
}

export function StatisticCard({
    label,
    value,
    trend,
    icon: Icon,
    description,
    color = "blue"
}: StatisticCardProps) {
    const isPositive = trend >= 0;

    const colors = {
        blue: "text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-blue-500/10",
        emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10",
        amber: "text-amber-500 bg-amber-500/10 border-amber-500/20 shadow-amber-500/10",
        rose: "text-rose-500 bg-rose-500/10 border-rose-500/20 shadow-rose-500/10",
        violet: "text-violet-500 bg-violet-500/10 border-violet-500/20 shadow-violet-500/10",
    };

    return (
        <GlassCard className="group relative overflow-hidden">
            {/* Visual Accent */}
            <div className={cn(
                "absolute -top-12 -right-12 w-24 h-24 blur-3xl rounded-full opacity-20 transition-all duration-500 group-hover:scale-150",
                color === "blue" && "bg-blue-500",
                color === "emerald" && "bg-emerald-500",
                color === "amber" && "bg-amber-500",
                color === "rose" && "bg-rose-500",
                color === "violet" && "bg-violet-500",
            )} />

            <div className="flex justify-between items-start mb-6">
                <div className={cn(
                    "p-3.5 rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl",
                    colors[color]
                )}>
                    <Icon size={24} />
                </div>
                <div className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                    isPositive 
                        ? "text-emerald-500 bg-emerald-500/5 border-emerald-500/20" 
                        : "text-rose-500 bg-rose-500/5 border-rose-500/20"
                )}>
                    {isPositive ? <TrendingUp size={12} strokeWidth={3} /> : <TrendingDown size={12} strokeWidth={3} />}
                    {Math.abs(trend)}%
                </div>
            </div>

            <div className="relative z-10">
                <p className="text-glass-text/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
                <h3 className="text-4xl font-black text-glass-text tracking-tighter italic">
                    {value}
                </h3>
                <div className="h-1 w-8 bg-primary/20 rounded-full mt-3 group-hover:w-full transition-all duration-700" />
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-4 leading-relaxed line-clamp-1">
                    {description}
                </p>
            </div>
        </GlassCard>
    );
}
