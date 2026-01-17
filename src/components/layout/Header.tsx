import { Link } from 'react-router-dom';
import { BarChart3, ChevronDown, Menu, X, Users, ClipboardCheck, Bell, Shield, Activity, Building2, Zap, FileText, Headphones, HelpCircle, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

// Navigation dropdown menus
const navDropdowns = {
    features: {
        label: 'Features',
        items: [
            { icon: Users, label: 'User Management', description: 'Manage roles & permissions', href: '/home#features' },
            { icon: ClipboardCheck, label: 'Request Tracking', description: 'Track requests end-to-end', href: '/home#features' },
            { icon: Bell, label: 'Notifications', description: 'Real-time alerts & updates', href: '/home#features' },
            { icon: BarChart3, label: 'Analytics & Reports', description: 'Insights & performance data', href: '/home#features' },
            { icon: Shield, label: 'Security', description: 'Enterprise-grade protection', href: '/home#features' },
            { icon: Activity, label: 'Activity Logs', description: 'Full audit trail', href: '/home#features' },
        ],
    },
    solutions: {
        label: 'Solutions',
        items: [
            { icon: Building2, label: 'Enterprise', description: 'For large organizations', href: '/pricing' },
            { icon: Users, label: 'Small Business', description: 'For growing teams', href: '/pricing' },
            { icon: Zap, label: 'Startups', description: 'For fast-moving startups', href: '/pricing' },
            { icon: FileText, label: 'Agencies', description: 'For service providers', href: '/pricing' },
        ],
    },
    company: {
        label: 'Company',
        items: [
            { icon: Building2, label: 'About Us', description: 'Our story & mission', href: '/about' },
            { icon: Headphones, label: 'Contact', description: 'Get in touch', href: '/contact' },
            { icon: HelpCircle, label: 'FAQ', description: 'Common questions', href: '/faq' },
            { icon: BookOpen, label: 'Blog', description: 'News & updates', href: '/home' },
        ],
    },
};

interface DropdownMenuProps {
    items: typeof navDropdowns.features.items;
    isOpen: boolean;
}

function DropdownMenu({ items, isOpen }: DropdownMenuProps) {
    return (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
            <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 w-80 grid grid-cols-1 gap-1">
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            to={item.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors group cursor-pointer"
                        >
                            <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-white text-sm">{item.label}</p>
                                <p className="text-xs text-slate-400">{item.description}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

    return (
        <header className="sticky top-0 z-50 w-full bg-navy border-b border-white/10 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/home" className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl md:text-2xl font-bold tracking-tight text-white">BlueArnk Technologies</span>
                </Link>

                {/* Nav Links - Desktop with Dropdowns */}
                <nav className="hidden md:flex items-center gap-2">
                    {/* Features Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenDropdown('features')}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
                            Features
                            <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'features' ? 'rotate-180' : ''}`} />
                        </button>
                        <DropdownMenu items={navDropdowns.features.items} isOpen={openDropdown === 'features'} />
                    </div>

                    {/* Solutions Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenDropdown('solutions')}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
                            Solutions
                            <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                        </button>
                        <DropdownMenu items={navDropdowns.solutions.items} isOpen={openDropdown === 'solutions'} />
                    </div>

                    {/* Pricing - Direct Link */}
                    <Link
                        to="/pricing"
                        className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                        Pricing
                    </Link>

                    {/* Company Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenDropdown('company')}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
                            Company
                            <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'company' ? 'rotate-180' : ''}`} />
                        </button>
                        <DropdownMenu items={navDropdowns.company.items} isOpen={openDropdown === 'company'} />
                    </div>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="hidden sm:block text-sm font-bold text-white hover:text-primary transition-colors px-4 py-2.5 cursor-pointer"
                    >
                        Login
                    </Link>
                    <Link to="/signup" className="hidden sm:block">
                        <Button className="font-bold px-5 md:px-6 py-2.5 shadow-lg shadow-primary/30 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Get Started
                        </Button>
                    </Link>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/10 cursor-pointer"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
                <nav className="flex flex-col px-4 pb-4 space-y-1">
                    {/* Features - Expandable */}
                    <div>
                        <button
                            onClick={() => setMobileExpanded(mobileExpanded === 'features' ? null : 'features')}
                            className="w-full flex items-center justify-between py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                            <span>Features</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === 'features' ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === 'features' ? 'max-h-96' : 'max-h-0'}`}>
                            <div className="pl-4 space-y-1">
                                {navDropdowns.features.items.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-2 px-4 text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Solutions - Expandable */}
                    <div>
                        <button
                            onClick={() => setMobileExpanded(mobileExpanded === 'solutions' ? null : 'solutions')}
                            className="w-full flex items-center justify-between py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                            <span>Solutions</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === 'solutions' ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === 'solutions' ? 'max-h-96' : 'max-h-0'}`}>
                            <div className="pl-4 space-y-1">
                                {navDropdowns.solutions.items.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-2 px-4 text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pricing - Direct Link */}
                    <Link
                        to="/pricing"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    >
                        Pricing
                    </Link>

                    {/* Company - Expandable */}
                    <div>
                        <button
                            onClick={() => setMobileExpanded(mobileExpanded === 'company' ? null : 'company')}
                            className="w-full flex items-center justify-between py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        >
                            <span>Company</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === 'company' ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === 'company' ? 'max-h-96' : 'max-h-0'}`}>
                            <div className="pl-4 space-y-1">
                                {navDropdowns.company.items.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-2 px-4 text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-3 px-4 text-center text-white font-bold hover:bg-white/5 rounded-lg transition-colors cursor-pointer">Login</Link>
                        <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full font-bold">Get Started</Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
