"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function NeonFooter() {
    return (
        <footer className="pt-24 pb-12 px-6 border-t border-white/5 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-neon-pink rounded flex items-center justify-center">
                                <div className="w-4 h-4 bg-black rotate-45" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white uppercase">
                                NEON<span className="text-neon-cyan">TIX</span>
                            </span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed font-medium">
                            The premier destination for nightlife enthusiasts and live event seekers. We light up your night.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="p-2 bg-white/5 rounded-lg text-white/40 hover:text-neon-pink hover:bg-white/10 transition-all">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-white/5 rounded-lg text-white/40 hover:text-neon-pink hover:bg-white/10 transition-all">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="p-2 bg-white/5 rounded-lg text-white/40 hover:text-neon-pink hover:bg-white/10 transition-all">
                                <Twitter size={18} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Discover</h4>
                        <ul className="space-y-4 font-bold">
                            <li><Link href="#" className="text-white/40 hover:text-white transition-colors">Concerts</Link></li>
                            <li><Link href="#" className="text-white/40 hover:text-white transition-colors">Festivals</Link></li>
                            <li><Link href="#" className="text-white/40 hover:text-white transition-colors">Theater</Link></li>
                            <li><Link href="#" className="text-white/40 hover:text-white transition-colors">Sports</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Support</h4>
                        <ul className="space-y-4 font-bold">
                            <li><Link href="#" className="text-white/40 hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="text-white/40 hover:text-white transition-colors">Refunds</Link></li>
                            <li><Link href="#" className="text-white/40 hover:text-white transition-colors">Sell Tickets</Link></li>
                            <li><Link href="#" className="text-white/40 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Stay Updated</h4>
                        <p className="text-white/40 text-sm font-medium">Subscribe to get early access to the hottest drops.</p>
                        <div className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-neon-pink transition-colors font-medium"
                            />
                            <button className="bg-neon-pink/10 border border-neon-pink text-neon-pink font-black uppercase tracking-widest py-3 rounded-xl hover:bg-neon-pink hover:text-white transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                        © 2024 NEONTIX INC. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
                        <Link href="#" className="text-white/20 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-white/20 hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
