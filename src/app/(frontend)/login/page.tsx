"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, X, Loader2, CheckCircle2 } from "lucide-react";
import * as authService from "@/services/authService";
import { PlasmaBackground } from "@/app/(frontend)/_components/ui/PlasmaBackground";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await authService.login(email, password);
            console.log("Login full response:", response);

            const { token, user } = response.data;

            // Simpan token lagi di sini untuk memastikan localStorage benar-benar terisi
            if (token) localStorage.setItem("token", token);
            if (user) localStorage.setItem("user", JSON.stringify(user));

            // Show success message
            setShowSuccess(true);

            // Fetch roles if missing or empty
            let roleNames: string[] = [];

            // 1. Ambil role dari response login (UserDTO)
            if (user && user.roles && Array.isArray(user.roles)) {
                roleNames = user.roles.map((r: string) => r.toLowerCase());
            }

            // 2. Coba fetch /me untuk data lebih lengkap
            try {
                const meResponse = await authService.getCurrentUser(token);
                const freshUser = meResponse.data;
                if (freshUser && freshUser.roles && Array.isArray(freshUser.roles)) {
                    const freshRoleNames = freshUser.roles.map((r: string) => r.toLowerCase());
                    if (freshRoleNames.length > 0) {
                        roleNames = freshRoleNames;
                    }
                }
            } catch (roleErr: any) {
                console.warn("Could not refresh profile via /me:", roleErr.message);
                if (roleNames.length === 0) {
                    throw new Error("Akun anda tidak memiliki role yang valid. Silahkan hubungi admin.");
                }
            }

            setTimeout(() => {
                const hasRole = (target: string) =>
                    roleNames.some(rn => rn.toLowerCase().includes(target.toLowerCase()));

                if (hasRole("superadminevent")) {
                    router.push("/dashboard/superadmin");
                } else if (hasRole("admin")) {
                    router.push("/dashboard/admin");
                } else {
                    // Buyer / user biasa → ke homepage untuk cari event & checkout
                    router.push("/");
                }
            }, 1500);

        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-foreground font-inter flex flex-col relative overflow-hidden bg-background">
            <PlasmaBackground />

            <main className="flex-1 flex items-center justify-center py-6 md:py-10 px-4 relative z-50">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[480px] bg-white/80 backdrop-blur-xl border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative transition-all duration-500"
                >
                    {/* Close Button */}
                    <Link href="/" className="absolute top-8 right-8 text-foreground/20 hover:text-foreground transition-colors p-2">
                        <X size={24} />
                    </Link>

                    {/* Tab Switcher */}
                    <div className="flex gap-8 mb-10 border-b border-border">
                        <Link href="/login" className="pb-4 text-sm font-bold border-b-2 border-primary text-primary transition-all">
                            Login
                        </Link>
                        <Link href="/register" className="pb-4 text-sm font-bold text-foreground/30 hover:text-foreground transition-all border-b-2 border-transparent">
                            Register
                        </Link>
                    </div>

                    <div className="space-y-2 mb-8 text-left">
                        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Welcome Back</h1>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed">Enter your credentials to access your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100 text-sm font-medium animate-in fade-in slide-in-from-top-4 flex items-center gap-3">
                            <X size={18} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/10 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-muted/50 border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm text-foreground outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-muted-foreground/40"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 relative text-left">
                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Secure Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/10 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-muted/50 border border-border rounded-2xl py-3.5 pl-12 pr-12 text-sm text-foreground outline-none focus:border-primary/50 focus:bg-white transition-all placeholder:text-muted-foreground/40 font-mono"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/10 hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="flex justify-end pt-1">
                                <Link href="#" className="text-[11px] font-bold text-primary hover:brightness-125 transition-all uppercase tracking-wider">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                "Sign In to Account"
                            )}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase">
                            <span className="bg-white/80 backdrop-blur-md px-4 text-foreground/30 font-bold tracking-[0.2em]">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="flex items-center justify-center gap-3 bg-white border border-border rounded-2xl py-3.5 hover:bg-muted transition-all group shadow-sm">
                            <i className="fab fa-google text-foreground/20 group-hover:text-foreground transition-colors"></i>
                            <span className="text-sm font-bold text-foreground/60 group-hover:text-foreground">Google</span>
                        </button>
                        <button type="button" className="flex items-center justify-center gap-3 bg-white border border-border rounded-2xl py-3.5 hover:bg-muted transition-all group shadow-sm">
                            <i className="fab fa-apple text-foreground/20 group-hover:text-foreground transition-colors text-lg"></i>
                            <span className="text-sm font-bold text-foreground/60 group-hover:text-foreground">Apple</span>
                        </button>
                    </div>
                </motion.div>
            </main>

            {/* Success Message Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white border border-border rounded-[3rem] p-12 shadow-[0_32px_64px_rgba(0,0,0,0.1)] flex flex-col items-center text-center max-w-[440px] w-full"
                        >
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                                <CheckCircle2 className="text-primary" size={56} />
                            </div>
                            <h2 className="text-3xl font-black mb-3 text-foreground uppercase tracking-tight">Login Successful</h2>
                            <p className="text-muted-foreground mb-10 font-medium leading-relaxed font-inter">Welcome back. We are preparing your personalized dashboard experience.</p>
                            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="h-full bg-primary shadow-lg shadow-primary/20"
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
