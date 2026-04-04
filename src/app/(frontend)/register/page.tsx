"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Check, Eye, EyeOff, X, Loader2 } from "lucide-react";
import * as authService from "@/services/authService";
import { PlasmaBackground } from "@/app/(frontend)/_components/ui/PlasmaBackground";

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validation
        if (!formData.name || !formData.email || !formData.password) {
            setError("Tolong isi semua field");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Password tidak cocok");
            return;
        }

        setLoading(true);

        try {
            const response = await authService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (response.status === "success") {
                setSuccess("Registrasi berhasil! Mengalihkan ke halaman login...");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setError(response.message || "Registrasi gagal");
            }
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan saat registrasi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-foreground font-inter flex flex-col relative bg-background">
            <PlasmaBackground />

            <main className="flex-1 flex items-center justify-center py-6 md:py-10 px-4 relative z-50 overflow-hidden">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[540px] bg-white/80 backdrop-blur-xl border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative transition-all duration-500"
                >
                    {/* Close Button */}
                    <Link href="/" className="absolute top-8 right-8 text-foreground/20 hover:text-foreground transition-colors p-2">
                        <X size={24} />
                    </Link>

                    {/* Tab Switcher */}
                    <div className="flex gap-8 mb-10 border-b border-border">
                        <Link href="/login" className="pb-4 text-sm font-bold text-foreground/30 hover:text-foreground transition-all border-b-2 border-transparent">
                            Login
                        </Link>
                        <Link href="/register" className="pb-4 text-sm font-bold border-b-2 border-primary text-primary transition-all">
                            Register
                        </Link>
                    </div>

                    <div className="space-y-2 mb-8 text-left">
                        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Create Account</h1>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed">Join NEONIX today and access exclusive events</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <X size={18} />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 text-green-600 border border-green-100 rounded-2xl text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <Check size={18} />
                            {success}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/10 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className="w-full bg-muted/50 border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm text-foreground outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-muted-foreground/40"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/10 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="name@example.com"
                                    className="w-full bg-muted/50 border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm text-foreground outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-muted-foreground/40"
                                />
                            </div>
                        </div>

                        {/* Password Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/10 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-muted/50 border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm text-foreground outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-muted-foreground/40 font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/10 hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Confirm</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/10 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-muted/50 border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm text-foreground outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-muted-foreground/40 font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center gap-3 pt-2 group cursor-pointer">
                            <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center transition-all group-active:scale-95 shadow-lg shadow-primary/20">
                                <Check size={14} className="text-white stroke-[3.5]" />
                            </div>
                            <p className="text-[11px] font-bold text-foreground/40 leading-none uppercase tracking-wider">
                                I agree to the <Link href="#" className="text-primary hover:underline">Terms</Link> & <Link href="#" className="text-primary hover:underline">Privacy</Link>
                            </p>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 transition-all mt-4 text-sm active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Creating Account...
                                </>
                            ) : (
                                "Complete Registration"
                            )}
                        </button>
                    </form>

                    {/* Footer Link */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase">
                            <span className="bg-white/80 backdrop-blur-md px-4 text-foreground/30 font-bold tracking-[0.2em]">Already a member?</span>
                        </div>
                    </div>

                    <Link href="/login" className="block w-full text-center text-sm font-black text-primary uppercase tracking-widest hover:brightness-125 transition-all">
                        Sign In Instead
                    </Link>
                </motion.div>
            </main>

        </div>
    );
}
