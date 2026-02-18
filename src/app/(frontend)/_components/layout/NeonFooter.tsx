"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function NeonFooter() {
    return (
        <footer className="pt-20 pb-10 px-8 md:px-12 lg:px-16 border-t border-glass-border bg-background transition-colors duration-500 w-full">
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-neon-pink rounded-full flex items-center justify-center">
                                <i className="fas fa-bolt text-white text-xs"></i>
                            </div>
                            <span className="text-xl font-bold tracking-tighter text-foreground">
                                NEON<span className="text-neon-pink">IX</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                            The premier destination for nightlife enthusiasts and live event seekers. We light up your night.
                        </p>
                        <div className="flex items-center gap-5 text-muted-foreground">
                            <Link href="#" className="hover:text-neon-pink transition-colors"><i className="fab fa-facebook-f"></i></Link>
                            <Link href="#" className="hover:text-neon-pink transition-colors"><i className="fab fa-instagram"></i></Link>
                            <Link href="#" className="hover:text-neon-pink transition-colors"><i className="fab fa-x-twitter"></i></Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-foreground font-bold text-sm mb-6 uppercase tracking-wider">Discover</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Concerts</Link></li>
                            <li><Link href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Festivals</Link></li>
                            <li><Link href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Theater</Link></li>
                            <li><Link href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Sports</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground font-bold text-sm mb-6 uppercase tracking-wider">Support</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Refunds</Link></li>
                            <li><Link href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Sell Tickets</Link></li>
                            <li><Link href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-foreground font-bold text-sm uppercase tracking-wider">Stay Updated</h4>
                        <p className="text-muted-foreground text-xs font-medium">Subscribe to get early access to the hottest drops.</p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-muted border border-glass-border rounded-lg px-4 py-3 text-xs text-foreground outline-none focus:border-neon-pink/50 transition-colors font-medium placeholder:text-muted-foreground/30"
                            />
                            <button className="bg-gradient-to-r from-pink-900 to-pink-600 text-white font-bold text-xs py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-muted-foreground/40 text-[10px] font-bold uppercase tracking-widest">
                        © 2024 NEONIX INC. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                        <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
