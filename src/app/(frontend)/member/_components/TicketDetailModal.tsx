"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, MapPin, Calendar, Clock, Ticket } from "lucide-react";
import { useState, useEffect } from "react";

interface TicketDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: any;
}

export function TicketDetailModal({ isOpen, onClose, ticket }: TicketDetailModalProps) {
    const [showTransfer, setShowTransfer] = useState(false);
    const [isTransferring, setIsTransferring] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setIsTransferring(false);
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!ticket) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white border border-border rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all shadow-lg border border-border"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex-1 p-10 flex flex-col justify-center gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.3em]">Valid Entrance Pass</p>
                                </div>
                                <h2 className="text-4xl font-black text-foreground uppercase tracking-tighter leading-tight">
                                    {ticket.title}
                                </h2>
                                <div className="flex items-center gap-4 pt-2">
                                    <div className="px-5 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                                        {ticket.category}
                                    </div>
                                    <div className="px-5 py-2 bg-muted text-foreground/40 border border-border rounded-xl text-[10px] font-black uppercase tracking-widest">
                                        ID: {ticket.id}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 py-8 border-y border-border">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-foreground/30 uppercase tracking-widest">
                                        <Calendar size={12} className="text-primary" />
                                        Date & Time
                                    </div>
                                    <p className="text-sm font-black text-foreground">{ticket.date}</p>
                                    <p className="text-xs font-bold text-foreground/60">{ticket.time}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-foreground/30 uppercase tracking-widest">
                                        <MapPin size={12} className="text-primary" />
                                        Venue
                                    </div>
                                    <p className="text-sm font-black text-foreground leading-snug">{ticket.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-1">Pass Code</p>
                                    <p className="font-mono text-xl font-black tracking-[0.2em] text-primary">NX-749-BF2</p>
                                </div>
                                <button
                                    onClick={() => setShowTransfer(true)}
                                    className="px-8 py-4 bg-muted border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm active:scale-95"
                                >
                                    Transfer Ticket
                                </button>
                            </div>
                        </div>

                        {/* Transfer Modal Overlay */}
                        <AnimatePresence>
                            {showTransfer && (
                                <div className="absolute inset-0 z-50 flex items-center justify-center p-8">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                                    />
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        className="relative w-full max-w-sm bg-white border border-border p-10 rounded-[2.5rem] shadow-2xl space-y-8"
                                    >
                                        <div className="text-center space-y-3">
                                            <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground">Transfer Ticket</h3>
                                            <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest leading-relaxed">Send this ticket to another member via email</p>
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="friend@neonix.com"
                                            className="w-full bg-muted border border-border rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all text-foreground"
                                        />
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setShowTransfer(false)}
                                                className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button className="flex-1 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
                                                Send Now
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
