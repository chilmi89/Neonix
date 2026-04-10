"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, Loader2, CheckCircle2, AlertCircle, Camera, RefreshCw } from "lucide-react";
import { apiPost, API } from "@/config/api.config";
import { cn } from "@/lib/utils";

interface QrScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function QrScannerModal({ isOpen, onClose }: QrScannerModalProps) {
    const [scanResult, setScanResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cameraActive, setCameraActive] = useState(false);
    const scannerRef = useRef<any>(null);

    useEffect(() => {
        if (isOpen && !cameraActive) {
            startScanner();
        }
        return () => {
            stopScanner();
        };
    }, [isOpen]);

    const startScanner = async () => {
        try {
            setCameraActive(true);
            setError("");
            
            const Html5Qrcode = (window as any).Html5Qrcode;

            if (!Html5Qrcode) {
                // Wait for script to load
                setTimeout(startScanner, 500);
                return;
            }

            const html5QrCode = new Html5Qrcode("qr-reader");
            scannerRef.current = html5QrCode;

            // Try to find rear camera
            const devices = await Html5Qrcode.getCameras();
            if (devices && devices.length > 0) {
                const backCamera = devices.find((device: any) => 
                    device.label.toLowerCase().includes('back') || 
                    device.label.toLowerCase().includes('rear')
                ) || devices[0];

                await html5QrCode.start(
                    backCamera.id,
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 }
                    },
                    (decodedText: string) => onScanSuccess(decodedText),
                    (errorMessage: string) => { /* ignore noisy logs */ }
                );
            } else {
                setError("Tidak ada kamera ditemukan pada perangkat ini.");
            }

        } catch (err: any) {
            console.error("Scanner Error:", err);
            setError("Gagal mengakses kamera. Pastikan izin kamera telah diberikan.");
            setCameraActive(false);
        }
    };

    const stopScanner = () => {
        if (scannerRef.current) {
            scannerRef.current.stop().then(() => {
                console.log("Scanner stopped");
            }).catch((e: any) => console.warn(e));
            scannerRef.current = null;
        }
        setCameraActive(false);
    };

    const onScanSuccess = async (decodedText: string) => {
        // Stop scanning to process
        stopScanner();
        
        setLoading(true);
        setError("");
        try {
            const response: any = await apiPost(API.transactions.checkIn, { qrCode: decodedText });
            setScanResult(response.data);
            
            // Success audio/vibration feedback would be nice here
            if (navigator.vibrate) navigator.vibrate(200);

        } catch (err: any) {
            setError(err.message || "Gagal memproses QR Code");
            // Restart scanner after 3 seconds on error
            setTimeout(() => {
                setError("");
                startScanner();
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    const onScanFailure = (error: any) => {
        // Mostly ignore noisy failures
    };

    const resetScanner = () => {
        setScanResult(null);
        setError("");
        startScanner();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-lg overflow-hidden relative shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] z-10"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                                    <QrCode size={20} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">QR Check-In Scanner</h2>
                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">Scan ticket to verify</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scanner Area */}
                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <motion.div 
                                        key="loading"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="h-64 flex flex-col items-center justify-center gap-4"
                                    >
                                        <Loader2 className="animate-spin text-primary" size={48} />
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Verifying Ticket...</p>
                                    </motion.div>
                                ) : scanResult ? (
                                    <motion.div 
                                        key="result"
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center text-center space-y-6 py-6"
                                    >
                                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                                {scanResult.type === 'CHECK_IN' ? 'Check-In Success!' : 'Check-Out Success!'}
                                            </h3>
                                            <p className="text-sm text-slate-500 font-medium mt-1">
                                                Attendee: <span className="text-slate-900 dark:text-white font-black">{scanResult.attendeeName}</span>
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">{scanResult.ticketName}</p>
                                        </div>
                                        
                                        <button 
                                            onClick={resetScanner}
                                            className="w-full bg-primary text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
                                        >
                                            <RefreshCw size={16} />
                                            Scan Next Ticket
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="scanner"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="relative"
                                    >
                                        <div id="qr-reader" className="overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" />
                                        
                                        {error && (
                                            <div className="absolute inset-0 bg-red-500/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center text-white rounded-3xl z-10 transition-all">
                                                <AlertCircle size={40} className="mb-4" />
                                                <p className="text-sm font-bold mb-6">{error}</p>
                                                <button 
                                                    onClick={startScanner}
                                                    className="px-6 py-3 bg-white text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100"
                                                >
                                                    Retry Camera
                                                </button>
                                            </div>
                                        )}

                                        {!cameraActive && !error && !loading && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-50/50 dark:bg-slate-950/50">
                                                <Camera className="text-slate-300" size={48} />
                                                <button onClick={startScanner} className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg">Activate Camera</button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer Tips */}
                        <div className="bg-slate-50 dark:bg-slate-800/90 p-6 flex items-center gap-4 border-t border-slate-100 dark:border-slate-800">
                             <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                                <AlertCircle size={16} />
                             </div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
                                Tip: Pastikan kode QR berada di dalam area fokus dan pencahayaan cukup terang untuk hasil maksimal.
                             </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
