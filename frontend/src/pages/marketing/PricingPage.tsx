import { Link } from 'react-router-dom';
import { Check, Zap, Building2, Crown, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

const plans = [
    {
        name: 'Starter',
        description: 'Perfect for small businesses just getting started.',
        price: '₦15,000',
        period: '/month',
        features: [
            'Up to 5 team members',
            '100 requests per month',
            'Basic analytics',
            'Email support',
            'Mobile app access',
        ],
        cta: 'Start Free Trial',
        popular: false,
        icon: Zap,
    },
    {
        name: 'Professional',
        description: 'Ideal for growing teams and businesses.',
        price: '₦45,000',
        period: '/month',
        features: [
            'Up to 25 team members',
            'Unlimited requests',
            'Advanced analytics & reports',
            'Priority support',
            'API access',
            'Custom integrations',
            'Team collaboration tools',
        ],
        cta: 'Get Started',
        popular: true,
        icon: Building2,
    },
    {
        name: 'Enterprise',
        description: 'For large organizations with custom needs.',
        price: 'Custom',
        period: '',
        features: [
            'Unlimited team members',
            'Unlimited everything',
            'Dedicated account manager',
            '24/7 phone support',
            'Custom training',
            'SLA guarantee',
            'On-premise deployment option',
            'Advanced security features',
        ],
        cta: 'Contact Sales',
        popular: false,
        icon: Crown,
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            {/* Hero */}
            <section className="py-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Simple, Transparent Pricing
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Choose the plan that fits your business. All plans include a 14-day free trial with no credit card required.
                </p>
            </section>

            {/* Pricing Cards */}
            <section className="pb-24 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={plan.name}
                                className={`relative rounded-2xl p-8 flex flex-col h-full ${plan.popular
                                    ? 'bg-slate-800 border-2 border-orange-500 scale-100 md:scale-105 z-10 shadow-xl'
                                    : 'bg-slate-900/50 border border-slate-700'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                                        MOST POPULAR
                                    </div>
                                )}
                                <div className={`h-12 w-12 rounded-xl ${plan.popular ? 'bg-orange-500' : 'bg-slate-800'} flex items-center justify-center mb-6`}>
                                    <Icon className={`h-6 w-6 ${plan.popular ? 'text-white' : 'text-orange-500'}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-sm text-slate-400 mb-6">{plan.description}</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-slate-400">{plan.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8 grow">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-sm text-slate-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/signup" className="mt-auto">
                                    <Button
                                        className={`w-full font-bold transition-all ${plan.popular
                                            ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25 border-0 rounded-xl py-6'
                                            : 'bg-transparent border border-slate-600 text-slate-300 hover:border-white hover:text-white hover:bg-transparent rounded-xl py-6'
                                            }`}
                                        variant={plan.popular ? 'primary' : 'outline'}
                                    >
                                        {plan.cta}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* FAQ CTA */}
            <section className="py-16 border-t border-slate-800">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-2xl font-bold text-white mb-4">Have questions?</h2>
                    <p className="text-slate-400 mb-6">Check out our FAQ or contact our sales team for more information.</p>
                    <div className="flex justify-center gap-4">
                        <Link to="/faq">
                            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                                View FAQ
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button>Contact Sales</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
