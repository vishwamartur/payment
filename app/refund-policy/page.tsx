import Link from 'next/link';

export default function RefundPolicy() {
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
                        Refund & Cancellation Policy
                    </h1>
                    <p className="text-gray-400 mb-8">Last updated: January 8, 2026</p>

                    <div className="space-y-8 text-gray-300">
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">1. Refund Eligibility</h2>
                            <p className="leading-relaxed">
                                We strive to provide excellent service to all our customers. Refunds may be issued under the following circumstances:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                                <li>Duplicate transaction/payment made in error</li>
                                <li>Technical failure resulting in failed service delivery</li>
                                <li>Unauthorized transaction after proper verification</li>
                                <li>Amount charged exceeds the agreed amount</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">2. Non-Refundable Transactions</h2>
                            <p className="leading-relaxed mb-4">The following transactions are NOT eligible for refunds:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Completed and successfully delivered services</li>
                                <li>Transactions older than 30 days</li>
                                <li>Transactions where the service was partially used</li>
                                <li>Cases of buyer&apos;s remorse or change of mind</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">3. Refund Request Process</h2>
                            <p className="leading-relaxed mb-4">To request a refund:</p>
                            <ol className="list-decimal list-inside space-y-2 ml-4">
                                <li>Contact us within 7 days of the transaction date</li>
                                <li>Provide your transaction ID and order details</li>
                                <li>Explain the reason for your refund request</li>
                                <li>Submit any supporting documentation if applicable</li>
                            </ol>
                            <p className="leading-relaxed mt-4">
                                You can initiate a refund request through our{' '}
                                <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                    contact page
                                </Link>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">4. Refund Processing Time</h2>
                            <p className="leading-relaxed">
                                Once a refund is approved, the processing time varies based on your payment method:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                                <li><strong className="text-white">UPI:</strong> 1-3 business days</li>
                                <li><strong className="text-white">Debit/Credit Card:</strong> 5-7 business days</li>
                                <li><strong className="text-white">Net Banking:</strong> 5-7 business days</li>
                                <li><strong className="text-white">Wallets:</strong> 1-3 business days</li>
                            </ul>
                            <p className="leading-relaxed mt-4 text-gray-400">
                                Note: The actual credit to your account may take additional time depending on your bank&apos;s processing time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">5. Cancellation Policy</h2>
                            <p className="leading-relaxed">
                                You may cancel a transaction before the payment is processed. Once the payment is successfully completed, cancellation is not possible. However, you may request a refund as per our refund policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">6. Partial Refunds</h2>
                            <p className="leading-relaxed">
                                In some cases, we may offer partial refunds based on the circumstances. The refund amount will be determined on a case-by-case basis and communicated to you before processing.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">7. Failed Transactions</h2>
                            <p className="leading-relaxed">
                                If your payment fails but the amount is debited from your account, the amount will be automatically refunded within 5-7 business days. If you do not receive the refund within this timeframe, please contact your bank or reach out to us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">8. Contact for Refunds</h2>
                            <p className="leading-relaxed">
                                For all refund-related queries, please contact us through our{' '}
                                <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                    contact page
                                </Link>
                                . Please include your transaction details for faster resolution.
                            </p>
                        </section>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                    <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
                    <Link href="/terms-conditions" className="hover:text-indigo-400 transition-colors">Terms & Conditions</Link>
                    <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link>
                </div>
            </main>
        </div>
    );
}
