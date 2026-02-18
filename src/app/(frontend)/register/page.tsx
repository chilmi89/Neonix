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
        <div className="min-h-screen text-white font-inter flex flex-col relative">
            <PlasmaBackground />

            <main className="flex-1 flex items-center justify-center py-20 px-6 relative z-50 overflow-hidden">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[540px] bg-glass-surface border border-glass-border rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative transition-colors duration-500"
                >
                    {/* Close Button */}
                    <Link href="/" className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors p-2">
                        <X size={24} />
                    </Link>

                    {/* Tab Switcher */}
                    <div className="flex gap-8 mb-10 border-b border-white/5">
                        <Link href="/login" className="pb-4 text-sm font-bold text-white/20 hover:text-white transition-all border-b-2 border-transparent">
                            Login
                        </Link>
                        <Link href="/register" className="pb-4 text-sm font-bold border-b-2 border-[#FFD700] text-white transition-all">
                            Register
                        </Link>
                    </div>

                    <div className="space-y-2 mb-8 text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create Account</h1>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed">Create your account to get started</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-500 text-sm flex items-center gap-2">
                            <X size={18} />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-2xl text-green-500 text-sm flex items-center gap-2">
                            <Check size={18} />
                            {success}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1 font-inter">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className="w-full bg-muted border border-glass-border rounded-2xl py-4 pl-12 pr-4 text-sm text-foreground outline-none focus:border-[#FFD700]/50 focus:bg-background transition-all placeholder:text-muted-foreground/30"
                                />
                            </div>
                        </div>

                        {/* Email or Phone */}
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1 font-inter">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="name@example.com"
                                    className="w-full bg-muted border border-glass-border rounded-2xl py-4 pl-12 pr-4 text-sm text-foreground outline-none focus:border-[#FFD700]/50 focus:bg-background transition-all placeholder:text-muted-foreground/30"
                                />
                            </div>
                        </div>

                        {/* Password Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1 font-inter">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-muted border border-glass-border rounded-2xl py-4 pl-12 pr-4 text-sm text-foreground outline-none focus:border-[#FFD700]/50 focus:bg-background transition-all placeholder:text-muted-foreground/30 font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1 font-inter">Confirm</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#FFD700] transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-muted border border-glass-border rounded-2xl py-4 pl-12 pr-4 text-sm text-foreground outline-none focus:border-[#FFD700]/50 focus:bg-background transition-all placeholder:text-muted-foreground/30 font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center gap-3 pt-2 group cursor-pointer">
                            <div className="w-5 h-5 rounded bg-[#FFD700] flex items-center justify-center transition-transform group-active:scale-95 shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                                <Check size={14} className="text-black stroke-[4]" />
                            </div>
                            <p className="text-[11px] font-medium text-white/40 leading-none font-inter">
                                I agree to the <Link href="#" className="text-[#FFD700] hover:underline transition-all">Terms of Service</Link> and <Link href="#" className="text-[#FFD700] hover:underline transition-all">Privacy Policy</Link>
                            </p>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FFD700] text-black font-bold py-4 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.3)] hover:shadow-[0_0_35px_rgba(255,215,0,0.5)] hover:brightness-110 transition-all mt-4 text-sm active:scale-[0.98] font-inter flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Processing...
                                </>
                            ) : (
                                "Register Now"
                            )}
                        </button>
                    </form>

                    {/* Footer Link */}
                    <p className="text-center text-sm text-white/40 mt-10">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#FFD700] font-bold hover:brightness-125 transition-all">
                            Sign In
                        </Link>
                    </p>
                </motion.div>
            </main>

        </div>
    );
}
