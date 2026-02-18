"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, X, Loader2, CheckCircle2 } from "lucide-react";
import { login, getCurrentUser } from "@/services/authService";

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
            const response = await login(email, password);
            console.log("Login full response:", response);

            const { token, user } = response.data;
            console.log("Token received:", token ? "(exists)" : "(missing)");

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
                console.log("Roles from login response:", roleNames);
            }

            // 2. Coba fetch /me untuk data lebih lengkap, tapi jangan block jika gagal
            try {
                // Gunakan token langsung untuk menghindari masalah async localStorage
                const meResponse = await getCurrentUser(token);
                const freshUser = meResponse.data;
                if (freshUser && freshUser.roles && Array.isArray(freshUser.roles)) {
                    const freshRoleNames = freshUser.roles.map((r: string) => r.toLowerCase());
                    if (freshRoleNames.length > 0) {
                        roleNames = freshRoleNames;
                        console.log("Roles refreshed from /me:", roleNames);
                    }
                }
            } catch (roleErr: any) {
                console.warn("Could not refresh profile via /me (using login roles):", roleErr.message);
                // Jika login response tadi juga tidak memberikan role, baru kita error
                if (roleNames.length === 0) {
                    throw new Error("Akun anda tidak memiliki role yang valid. Silahkan hubungi admin.");
                }
            }

            console.log("Final detected roles for redirection:", roleNames);

            setTimeout(() => {
                // Flexible role matching: check if any role name contains the target string
                const hasRole = (target: string) =>
                    roleNames.some(rn => rn.toLowerCase().includes(target.toLowerCase()));

                if (hasRole("superadminevent")) {
                    console.log("Redirecting to Superadmin Dashboard");
                    router.push("/dashboard/superadmin");
                } else if (hasRole("admin")) {
                    console.log("Redirecting to Admin Dashboard");
                    router.push("/dashboard/admin");
                } else {
                    console.log("Redirecting to Member Page");
                    router.push("/member");
                }
            }, 1500);

        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white font-inter flex flex-col relative">
            {/* Modal Backdrop Overlay */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />


            <main className="flex-1 flex items-center justify-center py-20 px-6 relative z-50 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-neon-pink/10 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-neon-cyan/5 blur-[120px] rounded-full -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[480px] bg-[#121212] border border-white/[0.05] rounded-[2.5rem] p-10 md:p-12 shadow-2xl relative"
                >
                    {/* Close Button */}
                    <Link href="/" className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors p-2">
                        <X size={24} />
                    </Link>

                    {/* Tab Switcher */}
                    <div className="flex gap-8 mb-10 border-b border-white/5">
                        <Link href="/login" className="pb-4 text-sm font-bold border-b-2 border-neon-pink text-white transition-all">
                            Login
                        </Link>
                        <Link href="/register" className="pb-4 text-sm font-bold text-white/20 hover:text-white transition-all border-b-2 border-transparent">
                            Register
                        </Link>
                    </div>

                    <div className="space-y-2 mb-8 text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
                        <p className="text-white/40 text-sm">Enter your credentials to access your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/60 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-pink transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-neon-pink/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 relative text-left">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/60 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-pink transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-sm text-white outline-none focus:border-neon-pink/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="flex justify-end pt-1">
                                <Link href="#" className="text-[11px] font-bold text-[#FFD700] hover:brightness-125 transition-all">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF00FF] text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(255,0,255,0.4)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] hover:brightness-110 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                "Log In"
                            )}
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#121212] px-4 text-white/20 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 bg-black/40 border border-white/5 rounded-2xl py-4 hover:bg-white/5 transition-all group">
                            <i className="fab fa-google text-white/40 group-hover:text-white transition-colors"></i>
                            <span className="text-sm font-bold text-white/60 group-hover:text-white">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 bg-black/40 border border-white/5 rounded-2xl py-4 hover:bg-white/5 transition-all group">
                            <i className="fab fa-apple text-white/40 group-hover:text-white transition-colors text-lg"></i>
                            <span className="text-sm font-bold text-white/60 group-hover:text-white">Apple</span>
                        </button>
                    </div>
                </motion.div>
            </main>

            {/* Success Message Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/40 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#121212] border border-white/10 rounded-4xl p-10 shadow-2xl flex flex-col items-center text-center max-w-[400px] w-full"
                        >
                            <div className="w-20 h-20 bg-neon-pink/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="text-neon-pink" size={48} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-white">Login Successful!</h2>
                            <p className="text-white/40 mb-8">Welcome back. Redirecting you to your dashboard...</p>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="h-full bg-neon-pink shadow-[0_0_10px_rgba(255,0,255,0.5)]"
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
