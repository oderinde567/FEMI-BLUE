import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                <p className="text-slate-400 mb-12">Last updated: January 12, 2026</p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                        <p className="text-slate-400 mb-4">We collect information you provide directly to us, including:</p>
                        <ul className="list-disc pl-6 text-slate-400 space-y-2">
                            <li>Account information (name, email, phone number, company)</li>
                            <li>Profile information (job title, location, bio)</li>
                            <li>Usage data (requests created, features used)</li>
                            <li>Communications (support tickets, feedback)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                        <p className="text-slate-400 mb-4">We use the information we collect to:</p>
                        <ul className="list-disc pl-6 text-slate-400 space-y-2">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send you technical notices and support messages</li>
                            <li>Respond to your comments and questions</li>
                            <li>Analyze usage patterns to improve user experience</li>
                            <li>Protect against fraudulent or illegal activity</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
                        <p className="text-slate-400">
                            We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with trusted third-party service providers who assist us in operating our platform, as long as they agree to keep this information confidential.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                        <p className="text-slate-400">
                            We implement industry-standard security measures including AES-256 encryption for data at rest, SSL/TLS for data in transit, and regular security audits. Your data is stored in secure Nigerian data centers with 24/7 monitoring.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
                        <p className="text-slate-400">
                            We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your data at any time by contacting us, and we will comply within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights (NDPR Compliance)</h2>
                        <p className="text-slate-400 mb-4">Under the Nigeria Data Protection Regulation, you have the right to:</p>
                        <ul className="list-disc pl-6 text-slate-400 space-y-2">
                            <li>Access your personal data</li>
                            <li>Rectify inaccurate data</li>
                            <li>Request erasure of your data</li>
                            <li>Object to processing</li>
                            <li>Data portability</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Cookies</h2>
                        <p className="text-slate-400">
                            We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies, but some features may not function properly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
                        <p className="text-slate-400">
                            Our service is not intended for use by children under 18 years of age. We do not knowingly collect personal information from children under 18.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
                        <p className="text-slate-400">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                        <p className="text-slate-400">
                            If you have any questions about this Privacy Policy, please contact our Data Protection Officer at{' '}
                            <a href="mailto:privacy@bluearnk.ng" className="text-orange-500 hover:underline">privacy@bluearnk.ng</a>.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
