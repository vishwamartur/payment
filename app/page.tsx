'use client';

import { useState, useCallback } from 'react';

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

export default function Home() {
  const [amount, setAmount] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
    setSelectedPreset(null);
  };

  const handlePresetClick = (preset: number) => {
    setAmount(preset.toString());
    setSelectedPreset(preset);
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
        name: 'Premium Payments',
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
              setAmount('');
              setSelectedPreset(null);
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
      {/* Glowing orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* Floating particles - using deterministic positions to avoid hydration mismatch */}
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

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="logo-pulse inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              PayFlow
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Seamless Payments
          </h1>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            Fast, secure, and hassle-free payments. Enter any amount and pay instantly.
          </p>
        </div>

        {/* Payment Card */}
        <div className={`glass-card w-full max-w-md p-8 ${paymentStatus === 'success' ? 'success-state' : ''} ${paymentStatus === 'error' ? 'error-state' : ''}`}>
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
                className="premium-input pl-14"
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
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetClick(preset)}
                  className={`preset-btn ${selectedPreset === preset ? 'active' : ''}`}
                  disabled={loading}
                >
                  ₹{preset.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Status message */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl text-center text-sm font-medium ${paymentStatus === 'success'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
              {message}
            </div>
          )}

          {/* Pay button */}
          <button
            onClick={handlePayment}
            disabled={loading || !amount}
            className="pay-btn w-full flex items-center justify-center gap-3"
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
            <div className="trust-badge">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure
            </div>
            <div className="trust-badge">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Instant
            </div>
            <div className="trust-badge">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Encrypted
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Powered by{' '}
            <span className="text-indigo-400 font-medium">Razorpay</span>
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Your payments are secured with 256-bit encryption
          </p>
        </div>
      </main>
    </div>
  );
}
