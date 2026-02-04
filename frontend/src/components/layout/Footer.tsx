import { Link } from 'react-router-dom';
import { BarChart3, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const footerLinks = {
    product: [
        { label: 'Features', href: '/home#features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Integrations', href: '/home#integrations' },
        { label: 'Updates', href: '/home' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '/home' },
    ],
    support: [
        { label: 'Help Center', href: '/faq' },
        { label: 'FAQ', href: '/faq' },
        { label: 'API Docs', href: '/home' },
        { label: 'Status', href: '/home' },
    ],
    legal: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie Policy', href: '/privacy' },
        { label: 'NDPR Compliance', href: '/privacy' },
    ],
};

const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/bluearnk', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/bluearnk', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://facebook.com/bluearnk', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/bluearnk', label: 'Instagram' },
];

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            {/* Main Footer */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link to="/home" className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                                <BarChart3 className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">BlueArnk</span>
                        </Link>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Empowering Nigerian businesses with world-class management tools. Streamline operations, track requests, and grow your business.
                        </p>
                        <div className="space-y-3">
                            <a href="mailto:hello@bluearnk.ng" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                                <Mail className="h-4 w-4" />
                                hello@bluearnk.ng
                            </a>
                            <a href="tel:+2341234567890" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                                <Phone className="h-4 w-4" />
                                +234 123 456 7890
                            </a>
                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                <MapPin className="h-4 w-4" />
                                Lagos, Nigeria
                            </div>
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} BlueArnk Technologies. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                                    aria-label={social.label}
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
