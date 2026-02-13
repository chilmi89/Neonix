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
    color?: "blue" | "emerald" | "amber" | "rose";
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
        blue: "text-blue-500 bg-blue-500/10",
        emerald: "text-emerald-500 bg-emerald-500/10",
        amber: "text-amber-500 bg-amber-500/10",
        rose: "text-rose-500 bg-rose-500/10",
    };

    return (
        <GlassCard className="group">
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", colors[color])}>
                    <Icon size={24} />
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    isPositive ? "text-emerald-500" : "text-rose-500"
                )}>
                    {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {Math.abs(trend)}%
                </div>
            </div>

            <div>
                <p className="text-glass-text/60 text-sm font-medium">{label}</p>
                <h3 className="text-2xl font-bold text-glass-text mt-1">{value}</h3>
                <p className="text-xs text-glass-text/40 mt-2">{description}</p>
            </div>
        </GlassCard>
    );
}
