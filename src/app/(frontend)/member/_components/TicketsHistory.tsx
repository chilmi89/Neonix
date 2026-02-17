"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, Download, Share2, Ticket, ChevronRight, DownloadCloud, LucideDownload } from "lucide-react";
import { TicketDetailModal } from "./TicketDetailModal";

const MOCK_TICKETS = [
    {
        id: "TIX-8829-XJ",
        title: "SUKMA",
        image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80",
        date: "Oct 25, 2025",
        time: "19:30 WIB",
        location: "CGV Grand Indonesia",
        category: "Horror",
        status: "Active",
        type: "Regular Admission",
        price: "Rp 50.000"
    },
    {
        id: "TIX-1102-PK",
        title: "NEON RIOT",
        image: "https://images.unsplash.com/photo-1470225620780?auto=format&fit=crop&q=80",
        date: "Sep 12, 2025",
        time: "22:00 WIB",
        location: "Underground JKT",
        category: "Rave",
        status: "Active",
        type: "VIP Experience",
        price: "Rp 120.000"
    },
    {
        id: "TIX-9942-ZT",
        title: "LIQUID SOUL",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
        date: "Aug 05, 2025",
        time: "20:00 WIB",
        location: "Sky Lounge JKT",
        category: "Deep House",
        status: "Used",
        type: "Regular Admission",
        price: "Rp 50.000"
    }
];

export function TicketsHistory() {
    const [selectedTicket, setSelectedTicket] = useState<any>(null);

    return (
        <div className="space-y-6">
            <div className="grid gap-6">
                {MOCK_TICKETS.map((ticket, i) => (
                    <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all cursor-pointer"
                        onClick={() => setSelectedTicket(ticket)}
                    >
                        <div className="flex flex-col md:flex-row">
                            {/* Image Wrapper */}
                            <div className="w-full md:w-56 h-48 md:h-auto overflow-hidden">
                                <img
                                    src={ticket.image}
                                    alt={ticket.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${ticket.status === 'Active' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-white/10 text-white/40'
                                            }`}>
                                            {ticket.status}
                                        </span>
                                        <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">ID: {ticket.id}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:text-neon-pink transition-colors">
                                            {ticket.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-white/60 font-medium">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-neon-cyan" />
                                                <span>{ticket.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-neon-cyan" />
                                                <span>{ticket.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col justify-between items-end md:text-right gap-4">
                                    <div className="hidden md:block">
                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Ticket Type</p>
                                        <p className="text-sm font-bold text-white mt-1">{ticket.type}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTicket(ticket);
                                        }}
                                        className="w-full md:w-auto bg-white/5 border border-white/10 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-neon-pink/10 hover:border-neon-pink/30 hover:text-neon-pink transition-all text-xs font-black uppercase tracking-widest"
                                    >
                                        View Detail
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <TicketDetailModal
                isOpen={!!selectedTicket}
                onClose={() => setSelectedTicket(null)}
                ticket={selectedTicket}
            />
        </div>
    );
}
