"use client";


import { GlassCard } from "@/app/(frontend)/_components/ui/GlassCard";
import { GlassButton } from "@/app/(frontend)/_components/ui/GlassButton";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { User, Bell, Shield, Save } from "lucide-react";

export default function SettingsPage() {
    return (

        <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="max-w-4xl space-y-6"
        >
            <div>
                <h1 className="text-3xl font-bold text-glass-text">Settings</h1>
                <p className="text-glass-text/60">Configure your personal preferences and application settings.</p>
            </div>

            <GlassCard>
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <User size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Profile Information</h3>
                        <p className="text-sm text-glass-text/40">Update your account details and public profile.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-glass-text/60">Full Name</label>
                        <input
                            type="text"
                            defaultValue="John Doe"
                            className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-glass-text/60">Email Address</label>
                        <input
                            type="email"
                            defaultValue="john@example.com"
                            className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <GlassButton className="flex items-center gap-2">
                        <Save size={18} /> Save Changes
                    </GlassButton>
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard>
                    <div className="flex items-center gap-3 mb-4">
                        <Bell className="text-primary" size={20} />
                        <h4 className="font-bold">Notifications</h4>
                    </div>
                    <p className="text-sm text-glass-text/60 mb-6">Choose how you want to be notified about updates.</p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Email Notifications</span>
                            <div className="h-6 w-11 bg-primary rounded-full relative p-1 cursor-pointer">
                                <div className="h-4 w-4 bg-white rounded-full absolute right-1" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Push Notifications</span>
                            <div className="h-6 w-11 bg-white/10 rounded-full relative p-1 cursor-pointer">
                                <div className="h-4 w-4 bg-white rounded-full absolute left-1" />
                            </div>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard>
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="text-primary" size={20} />
                        <h4 className="font-bold">Security</h4>
                    </div>
                    <p className="text-sm text-glass-text/60 mb-6">Manage your account security and authentication.</p>
                    <div className="space-y-4">
                        <GlassButton variant="outline" size="sm" className="w-full">
                            Change Password
                        </GlassButton>
                        <GlassButton variant="outline" size="sm" className="w-full">
                            Enable 2FA
                        </GlassButton>
                    </div>
                </GlassCard>
            </div>
        </motion.div>

    );
}
