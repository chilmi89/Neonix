"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X, ArrowLeft, MoreVertical, Plus, Send, MessageSquare, Users, Bell, Settings, LayoutGrid, CheckCheck, BarChart3 } from "lucide-react";

export const MobileMockupWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            {/* Mobile Mockup Container */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" }}
                        className="mb-6 relative"
                    >
                        {/* Phone Frame */}
                        <div className="w-[280px] h-[560px] bg-[#050505] border-[6px] border-[#1A1A1A] rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.8),0_0_15px_rgba(255,0,255,0.1)] overflow-hidden relative border-t-[10px] border-b-[10px] flex flex-col">

                            {/* Speaker/Camera Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1A1A1A] rounded-b-xl z-30 flex items-center justify-center">
                                <div className="w-8 h-1 bg-[#262626] rounded-full mr-1.5" />
                                <div className="w-1.5 h-1.5 bg-[#262626] rounded-full" />
                            </div>

                            {/* Header */}
                            <div className="pt-8 pb-4 px-4 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between z-20">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <h4 className="text-neon-yellow text-sm font-black uppercase tracking-tighter">Superadmin</h4>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse" />
                                            <span className="text-[7px] font-black text-white/40 uppercase tracking-widest">Live Priority Support</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-muted border border-white/10 overflow-hidden">
                                        <img src="https://ui-avatars.com/api/?name=Super+Admin&background=1a1a1a&color=fff" alt="Avatar" className="w-full h-full object-cover opacity-80" />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-neon-pink border-2 border-black" />
                                </div>
                            </div>

                            {/* Protocol Info */}
                            <div className="py-6 flex flex-col items-center justify-center space-y-1 bg-black/40">
                                <p className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em]">Secure Encrypted Protocol Active</p>
                                <p className="text-[7px] font-black text-neon-pink uppercase tracking-[0.2em]">Chat ID: X-990-BETA</p>
                            </div>

                            {/* Chat Content */}
                            <div className="flex-1 overflow-y-auto px-4 space-y-6 py-4 custom-scrollbar bg-[#050505]">

                                {/* Incoming 1 */}
                                <div className="space-y-1.5">
                                    <div className="max-w-[85%] bg-neon-pink/5 border-l-2 border-neon-pink rounded-r-xl rounded-bl-xl p-3 shadow-[0_0_20px_rgba(255,0,255,0.03)]">
                                        <p className="text-[10px] text-white/80 leading-relaxed font-medium">System scan complete. Welcome to the SuperAdmin console. How can I assist your deployment today?</p>
                                    </div>
                                    <p className="text-[7px] font-bold text-white/20 uppercase ml-1">09:41 AM</p>
                                </div>

                                {/* Outgoing 1 */}
                                <div className="flex flex-col items-end space-y-1.5">
                                    <div className="max-w-[85%] bg-black border border-neon-yellow/30 rounded-l-xl rounded-br-xl p-3">
                                        <p className="text-[10px] text-white/80 leading-relaxed font-medium">{"I'm"} experiencing a latency spike in the neon-sector nodes. Can we recalibrate the flux capacitors?</p>
                                    </div>
                                    <div className="flex items-center gap-1 mr-1">
                                        <p className="text-[7px] font-bold text-white/20 uppercase">09:42 AM</p>
                                        <CheckCheck size={10} className="text-neon-cyan opacity-40" />
                                    </div>
                                </div>

                                {/* Incoming 2 */}
                                <div className="space-y-1.5">
                                    <div className="max-w-[85%] bg-neon-pink/5 border-l-2 border-neon-pink rounded-r-xl rounded-bl-xl p-3">
                                        <p className="text-[10px] text-white/80 leading-relaxed font-medium">Understood. Initiating remote diagnostics on Sector 7. This will take approximately 45 seconds. Do not disconnect.</p>
                                    </div>
                                    <p className="text-[7px] font-bold text-white/20 uppercase ml-1">09:43 AM</p>
                                </div>

                                {/* Diagnostic Card */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full bg-neon-pink rounded-2xl p-4 shadow-[0_0_30px_rgba(255,0,255,0.2)] space-y-3 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 animate-shimmer" />
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-white">
                                            <BarChart3 size={14} />
                                        </div>
                                        <h5 className="text-[9px] font-black text-white uppercase tracking-wider">Diagnostic Report</h5>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: "30%" }}
                                                animate={{ width: "70%" }}
                                                transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
                                                className="h-full bg-white/60 rounded-full"
                                            />
                                        </div>
                                        <p className="text-[7px] font-black text-white/60 uppercase tracking-widest text-center">Optimization in progress...</p>
                                    </div>
                                </motion.div>

                                {/* Outgoing 2 */}
                                <div className="flex flex-col items-end space-y-1.5">
                                    <div className="max-w-[85%] bg-black border border-neon-yellow/30 rounded-l-xl rounded-br-xl p-3 opacity-60">
                                        <p className="text-[10px] text-white/80 leading-relaxed font-medium">Perfect. Let me know when the sync is complete.</p>
                                    </div>
                                </div>

                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-[#0A0A0A] border-t border-white/5 space-y-4">
                                <div className="bg-[#111] border border-white/5 rounded-2xl p-2 flex items-center gap-3">
                                    <button className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                                        <Plus size={18} />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Transmit Message..."
                                        className="flex-1 bg-transparent border-none outline-none text-[9px] font-bold uppercase tracking-wider text-white placeholder:text-white/20"
                                    />
                                    <button className="w-10 h-10 rounded-xl bg-neon-yellow flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                                        <Send size={18} fill="currentColor" />
                                    </button>
                                </div>

                                {/* Nav Bar */}
                                <div className="flex items-center justify-around pb-2">
                                    <button className="relative p-2 text-neon-yellow">
                                        <MessageSquare size={20} fill="currentColor" />
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-neon-yellow rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                                    </button>
                                    <button className="p-2 text-white/20 hover:text-white/40 transition-colors">
                                        <Users size={20} />
                                    </button>
                                    <button className="p-2 text-white/20 hover:text-white/40 transition-colors">
                                        <Bell size={20} />
                                    </button>
                                    <button className="p-2 text-white/20 hover:text-white/40 transition-colors">
                                        <Settings size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Home Indicator */}
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/5 rounded-full z-30" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] relative group overflow-hidden border-2 border-white/20"
            >
                {/* Shine Animation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                <div className="text-white">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                </div>
            </motion.button>
        </div>
    );
};
