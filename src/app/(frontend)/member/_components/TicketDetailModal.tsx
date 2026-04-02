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

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm max-h-[90vh] bg-[#121212] rounded-3xl overflow-y-auto shadow-2xl border border-white/10 flex flex-col"
                    >
                        {/* Header Image */}
                        <div className="relative h-32 shrink-0">
                            <img
                                src={ticket.image}
                                alt={ticket.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-neon-pink transition-colors border border-white/10 z-20"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="p-5 space-y-5">
                            {/* Ticket Info */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded bg-neon-pink/20 text-neon-pink text-[9px] font-black uppercase tracking-widest">{ticket.category}</span>
                                        <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">ID: {ticket.id}</span>
                                    </div>
                                    <p className="text-[9px] font-black text-neon-cyan uppercase tracking-wider">{ticket.type}</p>
                                </div>
                                <h2 className="text-xl font-black uppercase tracking-tighter leading-tight">{ticket.title}</h2>

                                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Date & Time</p>
                                        <p className="text-[11px] font-bold text-white/80">{ticket.date}</p>
                                        <p className="text-[10px] font-medium text-white/40">{ticket.time}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Venue Location</p>
                                        <p className="text-[11px] font-bold text-white/80 truncate">{ticket.location}</p>
                                        <p className="text-[10px] font-medium text-white/40 italic">Jakarta, ID</p>
                                    </div>
                                </div>
                            </div>

                            {/* QR Section */}
                            <div className="bg-white rounded-2xl p-3 flex flex-col items-center gap-2">
                                <div className="w-28 h-28 flex items-center justify-center">
                                    <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                                        <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h10v10H40zM50 10h10v10H50zM40 20h10v10H40zM0 40h10v10H0zM10 50h10v10H10zM20 40h10v10H20zM40 40h20v20H40zM45 45h10v10H45zM70 40h10v10H70zM90 40h10v10H90zM80 50h10v10H80zM40 70h10v10H40zM50 80h10v10H50zM40 90h10v10H40zM70 70h10v10H70zM90 70h10v10H90zM80 80h10v10H80zM70 90h10v10H70zM90 90h10v10H90z" fill="currentColor" />
                                    </svg>
                                </div>
                                <p className="text-[9px] text-black/40 font-black uppercase tracking-widest">Scan at entrance</p>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-neon-pink/10 hover:border-neon-pink/30 hover:text-neon-pink transition-all">
                                    <Download size={14} />
                                    Download
                                </button>
                                <button
                                    onClick={() => setIsTransferring(true)}
                                    className="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-neon-cyan/10 hover:border-neon-cyan/30 hover:text-neon-cyan transition-all"
                                >
                                    <Share2 size={14} />
                                    Transfer
                                </button>
                            </div>
                        </div>

                        {/* Transfer Modal Overlay */}
                        <AnimatePresence>
                            {isTransferring && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute inset-x-0 bottom-0 bg-[#121212] border-t border-white/10 p-6 rounded-t-3xl z-[110] space-y-4 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold uppercase">Transfer Ticket</h3>
                                        <button onClick={() => setIsTransferring(false)} className="text-white/40 hover:text-white">
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-black tracking-widest text-white/40">Recipient Email or Username</label>
                                            <input
                                                type="text"
                                                placeholder="Enter recipient info..."
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-cyan/50 transition-all"
                                            />
                                        </div>
                                        <button className="w-full py-3 bg-neon-cyan text-black font-black rounded-xl text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg shadow-neon-cyan/20">
                                            Confirm Transfer
                                        </button>
                                        <p className="text-[10px] text-white/40 text-center uppercase tracking-widest leading-relaxed">
                                            Once transferred, this ticket will be removed from your account.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
