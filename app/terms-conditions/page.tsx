import Link from 'next/link';

export default function TermsConditions() {
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
                        Terms & Conditions
                    </h1>
                    <p className="text-gray-400 mb-8">Last updated: January 8, 2026</p>

                    <div className="space-y-8 text-gray-300">
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                            <p className="leading-relaxed">
                                By accessing and using PayFlow payment services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">2. Services Description</h2>
                            <p className="leading-relaxed">
                                PayFlow provides online payment processing services through Razorpay payment gateway. Our services enable you to make secure payments for various purposes as specified on our platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">3. User Responsibilities</h2>
                            <p className="leading-relaxed mb-4">As a user of our services, you agree to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide accurate and complete information during transactions</li>
                                <li>Use valid and authorized payment methods</li>
                                <li>Not use the service for any illegal or unauthorized purpose</li>
                                <li>Not attempt to breach or circumvent our security measures</li>
                                <li>Maintain the confidentiality of your account information</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">4. Payment Processing</h2>
                            <p className="leading-relaxed">
                                All payments are processed through Razorpay, a secure and PCI-DSS compliant payment gateway. By making a payment, you authorize us to charge the specified amount to your selected payment method. Transaction success depends on proper validation of payment details and sufficient funds.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">5. Pricing and Fees</h2>
                            <p className="leading-relaxed">
                                All prices are displayed in Indian Rupees (INR). You are responsible for any applicable taxes, fees, or charges associated with your payment. We reserve the right to modify our pricing at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">6. Transaction Disputes</h2>
                            <p className="leading-relaxed">
                                In case of any transaction disputes, please contact us within 7 days of the transaction date. We will investigate the matter and work towards a fair resolution. For payment-related disputes, you may also contact your bank or card issuer.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">7. Intellectual Property</h2>
                            <p className="leading-relaxed">
                                All content, logos, trademarks, and intellectual property on this platform are owned by PayFlow or our licensors. You may not copy, reproduce, modify, or distribute any content without our prior written consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
                            <p className="leading-relaxed">
                                To the maximum extent permitted by law, PayFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our liability shall be limited to the amount of the transaction in question.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">9. Governing Law</h2>
                            <p className="leading-relaxed">
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">10. Modifications</h2>
                            <p className="leading-relaxed">
                                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of our services after any changes constitutes your acceptance of the modified terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">11. Contact Information</h2>
                            <p className="leading-relaxed">
                                For any questions regarding these Terms and Conditions, please contact us at{' '}
                                <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                    our contact page
                                </Link>.
                            </p>
                        </section>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                    <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
                    <Link href="/refund-policy" className="hover:text-indigo-400 transition-colors">Refund Policy</Link>
                    <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link>
                </div>
            </main>
        </div>
    );
}
