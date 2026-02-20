"use client";

import { motion } from "framer-motion";
import { CreditCard, Wallet, Landmark, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PAYMENT_METHODS = [
    {
        id: "ewallet",
        name: "E-Wallet",
        desc: "Instant & Secure",
        icon: Wallet,
    },
    {
        id: "bank",
        name: "Bank Transfer",
        desc: "2-3 Min Verification",
        icon: Landmark,
    },
    {
        id: "card",
        name: "Credit / Debit Card",
        desc: "Visa, Mastercard",
        icon: CreditCard,
    }
];

interface PaymentSelectorProps {
    selectedMethod: string;
    onSelect: (methodId: string) => void;
    className?: string;
}

export function PaymentSelector({ selectedMethod, onSelect, className }: PaymentSelectorProps) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
            {PAYMENT_METHODS.map((method) => (
                <button
                    key={method.id}
                    onClick={() => onSelect(method.id)}
                    className={cn(
                        "relative flex flex-col p-6 rounded-2xl border transition-all duration-300 group text-left",
                        selectedMethod === method.id
                            ? "bg-neon-pink/10 border-neon-pink shadow-[0_0_30px_rgba(255,0,255,0.2)]"
                            : "bg-[#111] border-white/5 hover:border-white/20"
                    )}
                >
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors",
                        selectedMethod === method.id ? "bg-neon-pink text-white" : "bg-white/5 text-white/40"
                    )}>
                        <method.icon size={24} />
                    </div>

                    <div className="space-y-1">
                        <h3 className={cn(
                            "text-sm font-black transition-colors uppercase tracking-wider",
                            selectedMethod === method.id ? "text-white" : "text-white/60"
                        )}>
                            {method.name}
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                            {method.desc}
                        </p>
                    </div>

                    {selectedMethod === method.id && (
                        <motion.div
                            layoutId="activePayment"
                            className="absolute top-4 right-4"
                        >
                            <div className="w-5 h-5 bg-neon-pink rounded-full flex items-center justify-center">
                                <CheckCircle2 size={12} className="text-white" />
                            </div>
                        </motion.div>
                    )}
                </button>
            ))}
        </div>
    );
}
