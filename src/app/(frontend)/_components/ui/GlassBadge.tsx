import { cn } from "@/lib/utils";

interface GlassBadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "danger" | "info";
    className?: string;
}

export function GlassBadge({ children, variant = "default", className }: GlassBadgeProps) {
    const variants = {
        default: "bg-white/10 text-glass-text border-white/20",
        success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        danger: "bg-rose-500/10 text-rose-500 border-rose-500/20",
        info: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    };

    return (
        <span
            className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
