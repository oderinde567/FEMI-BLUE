import { Link } from 'react-router-dom';
import { ArrowRight, Users, ClipboardCheck, Bell, BarChart3, Globe, Mail } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

const stats = [
    { value: '500+', label: 'Nigerian Businesses' },
    { value: '10,000+', label: 'Requests Processed' },
    { value: '99.9%', label: 'System Uptime' },
    { value: '24/7', label: 'Premium Support' },
];

const features = [
    {
        icon: Users,
        title: 'Efficient User Management',
        description: 'Manage staff and client roles effortlessly with our intuitive interface. Assign permissions and track activity across your entire organization.',
    },
    {
        icon: ClipboardCheck,
        title: 'Smart Request Tracking',
        description: 'Monitor service tickets from initiation to completion with ease. Automation ensures no request is left behind, improving customer satisfaction.',
    },
    {
        icon: Bell,
        title: 'Real-time Notifications',
        description: 'Stay updated with instant SMS and Email alerts for every critical action. Keep your team and clients informed with zero latency.',
    },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-navy via-[#0a2e7a] to-royal-blue pt-20 pb-32">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
                </div>
                <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in-down">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        Trusted by 500+ Nigerian Enterprises
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight max-w-4xl mb-8 animate-fade-in-up stagger-1">
                        Streamline Your Business Operations with <span className="text-primary">BlueArnk</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-12 font-medium leading-relaxed animate-fade-in-up stagger-2">
                        The all-in-one management system built specifically for the unique operational needs of Nigerian enterprises. Scale faster, manage better.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up stagger-3">
                        <Link to="/signup">
                            <Button size="lg" className="shadow-2xl shadow-primary/40 hover:scale-105 transition-transform animate-pulse-glow">
                                Get Started Free
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20">
                                Book a Demo
                            </Button>
                        </Link>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="mt-20 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-2 animate-fade-in-up stagger-4">
                        <div className="bg-navy rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                            <img
                                alt="Dashboard interface preview"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNFPc-U0zSEdc276q0JqyYJReiYC9Kq_qlhAsQ3fBL1U87phJQvi1U4YqBNCG4njCKPny9CEUIzAEJY5o4YvaaHrxu9huXi31Q1PbCT0oRNoAL4E_2fEZjVacExDTYDmjip9HTVTenUWT5TmEeAqB-9QH0YEKACJZKNd_OgF5O7Lplemm1CHAax-qZbiOYq4G_RES-o76WZ8tffVKyVXs89iJ8UaKHP4emWoTOjJAQW14_EaHNoXy7ssvCXRRNeDELtyowdcaHnw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-navy py-16 border-y border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
                                <p className="text-primary text-4xl font-bold">{stat.value}</p>
                                <p className="text-blue-100/70 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-slate-900">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Header - F-Pattern Layout */}
                    <div className="max-w-2xl mb-16">
                        <h2 className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-4">Powerful Features</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
                            Everything you need to run a high-performance business
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Tools designed to help your business scale efficiently while maintaining full control over every process.
                        </p>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className="group p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                >
                                    {/* Orange-tinted Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
                                    <p className="text-slate-400 leading-relaxed mb-6">{feature.description}</p>
                                    <Link to="/pricing" className="text-orange-500 font-bold inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300 cursor-pointer">
                                        Learn more <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-slate-950">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="relative bg-slate-900 rounded-3xl p-10 md:p-20 overflow-hidden text-center border border-white/10">
                        {/* Spotlight Effect - Centered Radial Gradient */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900"></div>

                        {/* Decorative Blurs */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-royal-blue rounded-full blur-[100px] opacity-20"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary rounded-full blur-[100px] opacity-15"></div>

                        <div className="relative z-10 flex flex-col items-center gap-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight tracking-tight">
                                Ready to transform your business operations?
                            </h2>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                Join hundreds of businesses already using BlueArnk to optimize their service delivery and user management.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <Link to="/signup">
                                    <Button size="lg" className="shadow-lg shadow-orange-500/40 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300">
                                        Get Started for Free
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <button className="h-14 px-8 rounded-xl text-base font-bold border border-white/20 text-white bg-transparent hover:bg-white hover:text-slate-900 transition-all duration-300 cursor-pointer">
                                        Contact Sales
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
