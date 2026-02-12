import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSuccess(true);
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            {/* Hero */}
            <section className="py-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Get in Touch
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Have a question or want to learn more? We'd love to hear from you.
                </p>
            </section>

            {/* Content */}
            <section className="pb-24 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                                <Mail className="h-6 w-6 text-orange-500" />
                            </div>
                            <h3 className="font-bold text-white mb-2">Email Us</h3>
                            <p className="text-slate-400 text-sm mb-2">For general inquiries</p>
                            <a href="mailto:hello@bluearnk.ng" className="text-orange-500 hover:underline">hello@bluearnk.ng</a>
                        </div>
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                                <Phone className="h-6 w-6 text-orange-500" />
                            </div>
                            <h3 className="font-bold text-white mb-2">Call Us</h3>
                            <p className="text-slate-400 text-sm mb-2">Mon-Fri, 9am-6pm WAT</p>
                            <a href="tel:+2341234567890" className="text-orange-500 hover:underline">+234 123 456 7890</a>
                        </div>
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                                <MapPin className="h-6 w-6 text-orange-500" />
                            </div>
                            <h3 className="font-bold text-white mb-2">Visit Us</h3>
                            <p className="text-slate-400 text-sm">
                                42 Broad Street,<br />
                                Lagos Island,<br />
                                Lagos, Nigeria
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-200">Full Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 px-4 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-200">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 px-4 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                                placeholder="you@company.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-200">Company</label>
                                            <input
                                                type="text"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 px-4 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                                placeholder="Your company"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-200">Subject</label>
                                            <select
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 px-4 text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
                                                required
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="sales">Sales Inquiry</option>
                                                <option value="support">Technical Support</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-200">Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={5}
                                            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 px-4 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
                                            placeholder="Tell us how we can help..."
                                            required
                                        />
                                    </div>
                                    <Button type="submit" disabled={isSubmitting} className="w-full py-4">
                                        {isSubmitting ? 'Sending...' : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                                        <CheckCircle className="h-8 w-8 text-green-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                                    <p className="text-slate-400 mb-6">
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="border-slate-700">
                                        Send Another Message
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
