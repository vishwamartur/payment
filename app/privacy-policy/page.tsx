import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="gradient-bg min-h-screen relative overflow-hidden">
            {/* Glowing orbs */}
            <div className="glow-orb glow-orb-1" />
            <div className="glow-orb glow-orb-2" />

            <main className="relative z-10 max-w-4xl mx-auto px-4 py-16">
                {/* Header */}
                <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-8">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>

                <div className="glass-card p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400 mb-8">Last updated: January 8, 2026</p>

                    <div className="space-y-8 text-gray-300">
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
                            <p className="leading-relaxed">
                                Welcome to PayFlow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our payment services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
                            <p className="leading-relaxed mb-4">We collect information that you provide directly to us, including:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Name and contact information (email address, phone number)</li>
                                <li>Payment information (processed securely through Razorpay)</li>
                                <li>Transaction history and payment details</li>
                                <li>Device information and IP address</li>
                                <li>Any other information you choose to provide</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                            <p className="leading-relaxed mb-4">We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Process and complete your payment transactions</li>
                                <li>Send you transaction confirmations and receipts</li>
                                <li>Prevent fraudulent transactions and monitor against theft</li>
                                <li>Respond to your inquiries and provide customer support</li>
                                <li>Comply with legal obligations and regulatory requirements</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">4. Payment Security</h2>
                            <p className="leading-relaxed">
                                All payments are processed through Razorpay, a PCI-DSS compliant payment gateway. We do not store your complete credit/debit card details on our servers. All transactions are encrypted using 256-bit SSL encryption to ensure your payment information is secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">5. Information Sharing</h2>
                            <p className="leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only with payment processors (Razorpay) to complete transactions, service providers who assist in our operations, and law enforcement when required by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">6. Data Retention</h2>
                            <p className="leading-relaxed">
                                We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">7. Your Rights</h2>
                            <p className="leading-relaxed mb-4">You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of your personal information</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">8. Contact Us</h2>
                            <p className="leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at{' '}
                                <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                    our contact page
                                </Link>.
                            </p>
                        </section>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                    <Link href="/terms-conditions" className="hover:text-indigo-400 transition-colors">Terms & Conditions</Link>
                    <Link href="/refund-policy" className="hover:text-indigo-400 transition-colors">Refund Policy</Link>
                    <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link>
                </div>
            </main>
        </div>
    );
}
