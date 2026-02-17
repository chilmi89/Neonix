"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, MapPin, Calendar, Clock, Ticket } from "lucide-react";
import { useState } from "react";

interface TicketDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: any;
}

export function TicketDetailModal({ isOpen, onClose, ticket }: TicketDetailModalProps) {
    const [isTransferring, setIsTransferring] = useState(false);

    if (!ticket) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8">
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
                        className="relative w-full max-w-lg bg-[#121212] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                    >
                        {/* Header Image */}
                        <div className="relative h-48">
                            <img
                                src={ticket.image}
                                alt={ticket.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-neon-pink transition-colors border border-white/10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Ticket Info */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 rounded bg-neon-pink/20 text-neon-pink text-[10px] font-black uppercase tracking-widest">{ticket.category}</span>
                                        <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">ID: {ticket.id}</span>
                                    </div>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter">{ticket.title}</h2>
                                    <p className="text-sm font-bold text-neon-cyan mt-1 uppercase tracking-wider">{ticket.type}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Date</p>
                                        <p className="text-sm font-bold">{ticket.date}</p>
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">{ticket.time}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Location</p>
                                        <p className="text-sm font-bold">{ticket.location}</p>
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Jakarta, ID</p>
                                    </div>
                                </div>
                            </div>

                            {/* QR Section */}
                            <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4">
                                <div className="w-48 h-48 flex items-center justify-center">
                                    <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                                        <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h10v10H40zM50 10h10v10H50zM40 20h10v10H40zM0 40h10v10H0zM10 50h10v10H10zM20 40h10v10H20zM40 40h20v20H40zM45 45h10v10H45zM70 40h10v10H70zM90 40h10v10H90zM80 50h10v10H80zM40 70h10v10H40zM50 80h10v10H50zM40 90h10v10H40zM70 70h10v10H70zM90 70h10v10H90zM80 80h10v10H80zM70 90h10v10H70zM90 90h10v10H90z" fill="currentColor" />
                                    </svg>
                                </div>
                                <p className="text-[10px] text-black/40 font-black uppercase tracking-widest">Scan at the entrance</p>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-neon-pink/10 hover:border-neon-pink/30 hover:text-neon-pink transition-all">
                                    <Download size={16} />
                                    Download QR
                                </button>
                                <button
                                    onClick={() => setIsTransferring(true)}
                                    className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-neon-cyan/10 hover:border-neon-cyan/30 hover:text-neon-cyan transition-all"
                                >
                                    <Share2 size={16} />
                                    Transfer QR
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
                                    className="absolute inset-x-0 bottom-0 bg-[#121212] border-t border-white/10 p-8 rounded-t-3xl z-[110] space-y-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold uppercase">Transfer Ticket</h3>
                                        <button onClick={() => setIsTransferring(false)} className="text-white/40 hover:text-white">
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-black tracking-widest text-white/40">Recipient Email or Username</label>
                                            <input
                                                type="text"
                                                placeholder="Enter recipient info..."
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-neon-cyan/50 transition-all"
                                            />
                                        </div>
                                        <button className="w-full py-4 bg-neon-cyan text-black font-black rounded-xl text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg shadow-neon-cyan/20">
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
