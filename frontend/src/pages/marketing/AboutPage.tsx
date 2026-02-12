import { Link } from 'react-router-dom';
import { Users, Target, Award, Zap } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

const team = [
    { name: 'Adebayo Okonkwo', role: 'CEO & Founder', image: 'AO' },
    { name: 'Chioma Eze', role: 'CTO', image: 'CE' },
    { name: 'Oluwaseun Bakare', role: 'Head of Product', image: 'OB' },
    { name: 'Ngozi Adeyemi', role: 'Head of Operations', image: 'NA' },
];

const values = [
    { icon: Target, title: 'Customer First', description: 'Every decision we make starts with our customers in mind.' },
    { icon: Zap, title: 'Innovation', description: 'We constantly push boundaries to deliver cutting-edge solutions.' },
    { icon: Users, title: 'Collaboration', description: 'We believe in the power of teamwork and open communication.' },
    { icon: Award, title: 'Excellence', description: 'We strive for excellence in everything we do.' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            {/* Hero */}
            <section className="py-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    About BlueArnk
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    We're on a mission to empower Nigerian businesses with world-class management tools.
                </p>
            </section>

            {/* Story */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                            <p className="text-slate-400 mb-4">
                                Founded in 2020 in Lagos, BlueArnk was born from a simple observation: Nigerian businesses deserved better tools to manage their operations.
                            </p>
                            <p className="text-slate-400 mb-4">
                                Our founders experienced firsthand the challenges of managing growing teams, tracking requests, and maintaining visibility across business operations. They knew there had to be a better way.
                            </p>
                            <p className="text-slate-400">
                                Today, BlueArnk serves over 500 businesses across Nigeria, processing more than 10,000 requests monthly and helping teams work smarter, not harder.
                            </p>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div>
                                    <p className="text-4xl font-bold text-orange-500">500+</p>
                                    <p className="text-sm text-slate-400">Businesses</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-orange-500">10K+</p>
                                    <p className="text-sm text-slate-400">Monthly Requests</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-orange-500">99.9%</p>
                                    <p className="text-sm text-slate-400">Uptime</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-orange-500">24/7</p>
                                    <p className="text-sm text-slate-400">Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 px-4 bg-slate-900/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <div key={value.title} className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                                    <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-sm text-slate-400">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Leadership Team</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div key={member.name} className="text-center">
                                <div className="h-20 w-20 mx-auto rounded-full bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                                    {member.image}
                                </div>
                                <h3 className="font-bold text-white">{member.name}</h3>
                                <p className="text-sm text-slate-400">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 border-t border-slate-800">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-2xl font-bold text-white mb-4">Ready to transform your business?</h2>
                    <p className="text-slate-400 mb-6">Join hundreds of Nigerian businesses already using BlueArnk.</p>
                    <Link to="/signup">
                        <Button size="lg">Get Started Free</Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
