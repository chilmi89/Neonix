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
    const [zoomedQR, setZoomedQR] = useState<string | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setIsTransferring(false);
            setZoomedQR(null);
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

                        <div className="flex-1 p-10 flex flex-col justify-center gap-8 overflow-y-auto max-h-[90vh]">
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

                            {/* Attendee Tickets List */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-foreground/40">Attendee Tickets ({ticket.attendees?.length || 0})</h3>
                                    <button
                                        onClick={() => setShowTransfer(true)}
                                        className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                                    >
                                        Transfer Ticket
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {ticket.attendees?.map((att: any, idx: number) => (
                                        <div key={att.id} className="group relative bg-white border border-border rounded-[2rem] p-5 flex items-center gap-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden">
                                            {/* QR Code Section */}
                                            <div
                                                className="relative shrink-0 cursor-zoom-in"
                                                onClick={() => setZoomedQR(att.qrCode)}
                                            >
                                                <div className="w-24 h-24 bg-white p-2 rounded-2xl border border-border shadow-sm group-hover:scale-105 transition-transform duration-500">
                                                    <img
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${att.qrCode}`}
                                                        alt={`QR ${att.attendeeName}`}
                                                        className="w-full h-full object-contain mix-blend-multiply"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                                                    <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-lg border border-primary/20">
                                                        <Share2 size={12} className="text-primary" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ticket Info Section */}
                                            <div className="flex-1 min-w-0 flex flex-col gap-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest rounded-md">Ticket #{idx + 1}</span>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${att.isCheckedIn ? 'bg-green-500' : 'bg-amber-400'}`} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-foreground/30">
                                                        {att.isCheckedIn ? 'Checked In' : 'Not Checked In'}
                                                    </span>
                                                </div>
                                                <h4 className="text-sm font-black text-foreground uppercase truncate tracking-tight">{att.attendeeName}</h4>
                                                <p className="text-[10px] text-foreground/40 font-bold truncate uppercase tracking-wider">{att.attendeeEmail}</p>
                                            </div>

                                            {/* Decorative Vertical Dash Line */}
                                            <div className="h-12 border-l border-dashed border-border/60 mx-2" />

                                            {/* Action Section */}
                                            <button className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center text-foreground/40 group-hover:text-primary transition-all hover:bg-white hover:shadow-lg hover:shadow-primary/10 shrink-0">
                                                <Download size={18} />
                                            </button>

                                            {/* Subtle Side Notch Decor */}
                                            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-muted rounded-full border border-border" />
                                            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-muted rounded-full border border-border" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* QR Zoom Overlay */}
                        <AnimatePresence>
                            {zoomedQR && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/20 backdrop-blur-xl cursor-zoom-out"
                                    onClick={() => setZoomedQR(null)}
                                >
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        className="bg-white p-8 rounded-[3rem] shadow-2xl border border-white/20 aspect-square w-full max-w-[400px]"
                                    >
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${zoomedQR}`}
                                            alt="Zoomed QR"
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

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
