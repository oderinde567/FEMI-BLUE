import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
                <p className="text-slate-400 mb-12">Last updated: January 12, 2026</p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-slate-400">
                            By accessing or using BlueArnk's services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                        <p className="text-slate-400">
                            BlueArnk provides a cloud-based business management platform that enables organizations to manage users, track requests, generate reports, and streamline operations. The service is provided "as is" and we reserve the right to modify or discontinue it at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                        <p className="text-slate-400 mb-4">When you create an account, you must:</p>
                        <ul className="list-disc pl-6 text-slate-400 space-y-2">
                            <li>Provide accurate, complete, and current information</li>
                            <li>Maintain the security of your password and account</li>
                            <li>Accept responsibility for all activities under your account</li>
                            <li>Notify us immediately of any unauthorized access</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use</h2>
                        <p className="text-slate-400 mb-4">You agree not to:</p>
                        <ul className="list-disc pl-6 text-slate-400 space-y-2">
                            <li>Use the service for any unlawful purpose</li>
                            <li>Attempt to gain unauthorized access to any systems</li>
                            <li>Transmit viruses or malicious code</li>
                            <li>Interfere with the proper working of the service</li>
                            <li>Copy, modify, or distribute our content without permission</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Payment Terms</h2>
                        <p className="text-slate-400">
                            Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable except as expressly stated in our refund policy. We reserve the right to change our prices with 30 days notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                        <p className="text-slate-400">
                            The service and its original content, features, and functionality are owned by BlueArnk Technologies and are protected by international copyright, trademark, and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                        <p className="text-slate-400">
                            In no event shall BlueArnk be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
                        <p className="text-slate-400">
                            These terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                        <p className="text-slate-400">
                            If you have any questions about these Terms, please contact us at{' '}
                            <a href="mailto:legal@bluearnk.ng" className="text-orange-500 hover:underline">legal@bluearnk.ng</a>.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
