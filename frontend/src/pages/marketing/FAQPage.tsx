import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, MessageCircle, CreditCard, Settings, Users, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

const categories = [
    { id: 'general', label: 'General', icon: MessageCircle },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
];

const faqs = [
    {
        category: 'general',
        question: 'What is BlueArnk?',
        answer: 'BlueArnk is a comprehensive business management platform designed specifically for Nigerian enterprises. It helps you manage users, track requests, monitor performance, and streamline operations all in one place.',
    },
    {
        category: 'general',
        question: 'How do I get started?',
        answer: 'Getting started is easy! Simply click "Get Started" to create your account, verify your email, and you\'ll be ready to go. We offer a 14-day free trial so you can explore all features before committing.',
    },
    {
        category: 'general',
        question: 'Is there a mobile app?',
        answer: 'Yes! BlueArnk is fully responsive and works on all devices. We also have dedicated mobile apps for iOS and Android available on their respective app stores.',
    },
    {
        category: 'billing',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major Nigerian bank cards, Paystack, Flutterwave, and bank transfers. For Enterprise plans, we also offer invoice-based billing.',
    },
    {
        category: 'billing',
        question: 'Can I change my plan later?',
        answer: 'Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we\'ll prorate any differences.',
    },
    {
        category: 'billing',
        question: 'Do you offer refunds?',
        answer: 'We offer a full refund within the first 14 days if you\'re not satisfied. After that, we provide prorated refunds for annual subscriptions cancelled within the first 3 months.',
    },
    {
        category: 'account',
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a secure link to reset your password. The link expires after 1 hour for security.',
    },
    {
        category: 'account',
        question: 'Can I have multiple organizations?',
        answer: 'Yes, you can create and manage multiple organizations under a single account. Each organization has its own separate data, users, and billing.',
    },
    {
        category: 'teams',
        question: 'How many team members can I add?',
        answer: 'It depends on your plan. Starter allows up to 5, Professional up to 25, and Enterprise has unlimited team members. You can always upgrade to add more.',
    },
    {
        category: 'teams',
        question: 'What are the different user roles?',
        answer: 'We have three roles: Admin (full access), Manager (can manage requests and view reports), and User (can create and view their own requests). Admins can customize permissions further.',
    },
    {
        category: 'security',
        question: 'Is my data secure?',
        answer: 'Absolutely. We use industry-standard AES-256 encryption, SSL/TLS for data in transit, and store data in secure Nigerian data centers. We\'re also compliant with NDPR.',
    },
    {
        category: 'security',
        question: 'Do you offer two-factor authentication?',
        answer: 'Yes, 2FA is available for all accounts and can be enabled in your security settings. We support authenticator apps and SMS-based verification.',
    },
];

export default function FAQPage() {
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && (searchQuery === '' || matchesSearch);
    });

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            {/* Hero */}
            <section className="py-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                    Find answers to common questions about BlueArnk.
                </p>
                {/* Search */}
                <div className="max-w-xl mx-auto relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for a question..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                </div>
            </section>

            {/* Content */}
            <section className="pb-24 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 justify-center">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedCategory === cat.id
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-700'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-3">
                        {filteredFaqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                                >
                                    <span className="font-medium text-white pr-4">{faq.question}</span>
                                    <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                                    <p className="px-5 pb-5 text-slate-400">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-400">No results found. Try a different search term.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 border-t border-slate-800">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
                    <p className="text-slate-400 mb-6">Our support team is here to help.</p>
                    <Link to="/contact">
                        <Button size="lg">Contact Support</Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
