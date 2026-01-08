'use client';

import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    theme: {
        color: string;
    };
    modal: {
        ondismiss: () => void;
    };
}

interface RazorpayInstance {
    open: () => void;
}

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

const presetAmounts = [100, 500, 1000, 5000];

// Confetti colors
const confettiColors = ['#6366f1', '#22d3ee', '#f472b6', '#fbbf24', '#34d399', '#818cf8'];

// Confetti component - uses deterministic values to avoid hydration mismatch
function Confetti() {
    // Pre-computed positions to avoid hydration issues with Math.random()
    const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
        left: `${(i * 3.33) % 100}%`,
        animationDelay: `${(i * 0.07) % 2}s`,
        animationDuration: `${2 + (i % 3)}s`,
        background: confettiColors[i % confettiColors.length],
        width: `${6 + (i % 8)}px`,
        height: `${6 + ((i * 3) % 8)}px`,
        borderRadius: i % 2 === 0 ? '50%' : '0',
        transform: `rotate(${(i * 12) % 360}deg)`,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {confettiPieces.map((piece, i) => (
                <div
                    key={i}
                    className="confetti"
                    style={piece}
                />
            ))}
        </div>
    );
}

// Animated success checkmark
function SuccessCheck() {
    return (
        <div className="mx-auto w-20 h-20 mb-6 bounce-in">
            <svg viewBox="0 0 52 52" className="w-full h-full">
                <circle
                    cx="26" cy="26" r="25"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    className="opacity-30"
                />
                <circle
                    cx="26" cy="26" r="25"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="166"
                    strokeDashoffset="166"
                    style={{ animation: 'check-draw 0.6s ease-out forwards' }}
                />
                <path
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    className="check-draw"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

// Floating payment icons
function FloatingIcons() {
    const icons = ['💳', '🔒', '✨', '💰'];
    return (
        <>
            {icons.map((icon, i) => (
                <div
                    key={i}
                    className={`absolute text-3xl float-icon float-icon-${i + 1} opacity-40`}
                    style={{
                        top: `${10 + i * 20}%`,
                        left: i % 2 === 0 ? '5%' : 'auto',
                        right: i % 2 === 1 ? '5%' : 'auto',
                    }}
                >
                    {icon}
                </div>
            ))}
        </>
    );
}

export default function PaymentPage() {
    const [amount, setAmount] = useState<string>('');
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [amountChanged, setAmountChanged] = useState(false);

    // Reset amount changed animation
    useEffect(() => {
        if (amountChanged) {
            const timer = setTimeout(() => setAmountChanged(false), 300);
            return () => clearTimeout(timer);
        }
    }, [amountChanged]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setAmount(value);
        setSelectedPreset(null);
        setAmountChanged(true);
    };

    const handlePresetClick = (preset: number) => {
        setAmount(preset.toString());
        setSelectedPreset(preset);
        setAmountChanged(true);
    };

    const formatAmount = (value: string) => {
        if (!value) return '';
        return parseInt(value).toLocaleString('en-IN');
    };

    const loadRazorpayScript = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = useCallback(async () => {
        if (!amount || parseInt(amount) < 1) {
            setPaymentStatus('error');
            setMessage('Please enter a valid amount');
            setTimeout(() => setPaymentStatus('idle'), 3000);
            return;
        }

        setLoading(true);
        setPaymentStatus('idle');

        try {
            // Load Razorpay script
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error('Failed to load Razorpay SDK');
            }

            // Create order
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseInt(amount) }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create order');
            }

            // Initialize Razorpay
            const options: RazorpayOptions = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: 'NICE Traders',
                description: `Payment of ₹${formatAmount(amount)}`,
                order_id: data.orderId,
                handler: async (response: RazorpayResponse) => {
                    // Verify payment
                    try {
                        const verifyResponse = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyData.success) {
                            setPaymentStatus('success');
                            setMessage('Payment successful! Thank you.');
                            setShowConfetti(true);
                            setAmount('');
                            setSelectedPreset(null);
                            // Hide confetti after 5 seconds
                            setTimeout(() => setShowConfetti(false), 5000);
                        } else {
                            setPaymentStatus('error');
                            setMessage('Payment verification failed');
                        }
                    } catch {
                        setPaymentStatus('error');
                        setMessage('Error verifying payment');
                    }
                },
                prefill: {
                    name: '',
                    email: '',
                    contact: '',
                },
                theme: {
                    color: '#6366f1',
                },
                modal: {
                    ondismiss: () => {
                        setLoading(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            setPaymentStatus('error');
            setMessage(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [amount]);

    return (
        <div className="gradient-bg min-h-screen relative overflow-hidden">
            {/* Confetti on success */}
            {showConfetti && <Confetti />}

            {/* Morphing blobs */}
            <div className="morph-blob-1" style={{ top: '-150px', right: '-150px' }} />
            <div className="morph-blob-2" style={{ bottom: '-100px', left: '-100px' }} />

            {/* Glowing orbs */}
            <div className="glow-orb glow-orb-1" />
            <div className="glow-orb glow-orb-2" />
            <div className="glow-orb glow-orb-3" />

            {/* Floating particles */}
            {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pos, i) => (
                <div
                    key={i}
                    className="particle"
                    style={{
                        left: `${pos}%`,
                        animationDelay: `${(i * 0.5) % 10}s`,
                        animationDuration: `${10 + (i % 10)}s`,
                    }}
                />
            ))}

            {/* Floating payment icons */}
            <FloatingIcons />

            {/* Main content */}
            <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
                {/* Back Link */}
                <Link
                    href="/"
                    className="absolute top-6 left-6 inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-all hover:translate-x-[-4px] text-reveal text-reveal-1"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Shop
                </Link>

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="logo-pulse inline-flex items-center gap-3 mb-6 text-reveal text-reveal-1">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            NICE Traders
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-reveal text-reveal-2">
                        <span className="animated-gradient-text">Make Payment</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-md mx-auto text-reveal text-reveal-3">
                        Fast, secure, and hassle-free payments for your building materials orders.
                    </p>
                </div>

                {/* Payment Card */}
                <div
                    className={`glass-card card-shine w-full max-w-md p-8 text-reveal text-reveal-4 transition-all duration-500 ${paymentStatus === 'success' ? 'success-state' : ''
                        } ${paymentStatus === 'error' ? 'error-state shake' : ''}`}
                    style={{
                        boxShadow: paymentStatus === 'success'
                            ? '0 0 60px rgba(34, 197, 94, 0.3)'
                            : paymentStatus === 'error'
                                ? '0 0 60px rgba(239, 68, 68, 0.3)'
                                : '0 0 60px rgba(99, 102, 241, 0.2)'
                    }}
                >
                    {paymentStatus === 'success' ? (
                        /* Success State */
                        <div className="text-center py-8">
                            <SuccessCheck />
                            <h2 className="text-2xl font-bold text-white mb-2 slide-up">Payment Successful!</h2>
                            <p className="text-gray-400 slide-up" style={{ animationDelay: '0.1s' }}>
                                Thank you for your payment. Your order is being processed.
                            </p>
                            <Link
                                href="/"
                                className="inline-block mt-6 px-6 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-medium hover:bg-green-500/30 transition-all slide-up"
                                style={{ animationDelay: '0.2s' }}
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        /* Payment Form */
                        <>
                            {/* Amount input section */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-400 mb-3">
                                    Enter Amount
                                </label>
                                <div className="relative">
                                    <span className="rupee-symbol absolute left-6 top-1/2 -translate-y-1/2">₹</span>
                                    <input
                                        type="text"
                                        value={amount ? formatAmount(amount) : ''}
                                        onChange={handleAmountChange}
                                        placeholder="0"
                                        className={`premium-input glow-input pl-14 ${amountChanged ? 'number-pop' : ''}`}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Preset amounts */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-400 mb-3">
                                    Quick Select
                                </label>
                                <div className="grid grid-cols-4 gap-3">
                                    {presetAmounts.map((preset, index) => (
                                        <button
                                            key={preset}
                                            onClick={() => handlePresetClick(preset)}
                                            className={`preset-btn ripple-effect transition-all ${selectedPreset === preset ? 'active' : ''
                                                }`}
                                            disabled={loading}
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            ₹{preset.toLocaleString('en-IN')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Status message */}
                            {message && paymentStatus === 'error' && (
                                <div className="mb-6 p-4 rounded-xl text-center text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 bounce-in">
                                    {message}
                                </div>
                            )}

                            {/* Pay button */}
                            <button
                                onClick={handlePayment}
                                disabled={loading || !amount}
                                className="pay-btn ripple-effect w-full flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Pay {amount ? `₹${formatAmount(amount)}` : 'Now'}
                                    </>
                                )}
                            </button>

                            {/* Trust indicators */}
                            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
                                {[
                                    { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Secure' },
                                    { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Instant' },
                                    { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Encrypted' },
                                ].map((item, index) => (
                                    <div
                                        key={item.label}
                                        className="trust-badge float-icon"
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-10 text-center text-reveal text-reveal-4">
                    <p className="text-sm text-gray-500">
                        Powered by{' '}
                        <span className="text-indigo-400 font-medium">Razorpay</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                        Your payments are secured with 256-bit encryption
                    </p>

                    {/* Policy Links */}
                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                        <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <span className="text-gray-700">•</span>
                        <Link href="/terms-conditions" className="hover:text-indigo-400 transition-colors">
                            Terms & Conditions
                        </Link>
                        <span className="text-gray-700">•</span>
                        <Link href="/refund-policy" className="hover:text-indigo-400 transition-colors">
                            Refund Policy
                        </Link>
                        <span className="text-gray-700">•</span>
                        <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
