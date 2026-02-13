"use client";

import { useState } from "react";
import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { GlassButton } from "@/app/(frontend)/_components/ui/GlassButton";
import { Check, Copy, Code2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComponentShowcaseProps {
    title: string;
    description: string;
    code: string;
    children: React.ReactNode;
}

export function ComponentShowcase({ title, description, code, children }: ComponentShowcaseProps) {
    const [view, setView] = useState<"preview" | "code">("preview");
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-glass-text">{title}</h3>
                    <p className="text-sm text-glass-text/60">{description}</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-glass-border">
                    <button
                        onClick={() => setView("preview")}
                        className={cn(
                            "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                            view === "preview" ? "bg-primary text-white shadow-lg" : "text-glass-text/60 hover:text-glass-text"
                        )}
                    >
                        <Eye size={16} /> Preview
                    </button>
                    <button
                        onClick={() => setView("code")}
                        className={cn(
                            "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                            view === "code" ? "bg-primary text-white shadow-lg" : "text-glass-text/60 hover:text-glass-text"
                        )}
                    >
                        <Code2 size={16} /> Code
                    </button>
                </div>
            </div>

            <GlassCard className="p-0 overflow-hidden min-h-[200px] flex flex-col">
                {view === "preview" ? (
                    <div className="p-8 flex items-center justify-center flex-1 bg-white/2">
                        {children}
                    </div>
                ) : (
                    <div className="relative flex-1 flex flex-col">
                        <button
                            onClick={copyToClipboard}
                            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white z-20"
                        >
                            {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                        </button>
                        <pre className="p-6 text-sm text-sky-200 bg-slate-950/80 overflow-auto max-h-[400px] font-mono leading-relaxed">
                            <code>{code}</code>
                        </pre>
                    </div>
                )}
            </GlassCard>
        </div>
    );
}
