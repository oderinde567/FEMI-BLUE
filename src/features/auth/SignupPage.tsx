import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Building2, ArrowRight, Shield, Lock, CheckCircle, Headphones, Zap, TrendingUp } from 'lucide-react';

const signupSchema = z.object({
    companyName: z.string().min(2, 'Company name is required'),
    fullName: z.string().min(2, 'Full name is required'),
    email: z.email('Please enter a valid email'),
    phone: z.string().min(10, 'Phone number is required'),
    location: z.string().min(1, 'Please select a location'),
    terms: z.literal(true, { message: 'You must agree to the terms' }),
});

type SignupForm = z.infer<typeof signupSchema>;

const locations = [
    { value: 'ikeja', label: 'Ikeja' },
    { value: 'vi', label: 'Victoria Island (VI)' },
    { value: 'lekki', label: 'Lekki' },
    { value: 'surulere', label: 'Surulere' },
    { value: 'yaba', label: 'Yaba' },
    { value: 'abuja', label: 'Abuja (FCT)' },
    { value: 'ph', label: 'Port Harcourt' },
    { value: 'other', label: 'Other' },
];

const benefits = [
    { icon: Headphones, title: 'Lagos-based support team', desc: 'Real humans, available 24/7 in your time zone.' },
    { icon: Zap, title: 'Fast processing', desc: 'Deploy services in minutes, not days.' },
    { icon: TrendingUp, title: 'Business growth tools', desc: 'Advanced analytics to track your expansion.' },
];

export default function SignupPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupForm) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Signup data:', data);
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Brand Panel with Gradient */}
            <div className="hidden lg:flex lg:w-[42%] bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 p-12 flex-col justify-between relative text-white overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">BlueArnk</span>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold leading-tight">Join 500+ Nigerian Businesses</h1>
                        <p className="text-blue-100 text-lg leading-relaxed">Scale your professional service management with BlueArnk. The most trusted platform for modern enterprises in Nigeria.</p>
                    </div>
                    <div className="mt-12 space-y-5">
                        {benefits.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="flex items-start gap-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
                                        <Icon className="h-5 w-5 text-orange-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{item.title}</h3>
                                        <p className="text-blue-200 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Avatar Group - Social Proof */}
                <div className="relative z-10 flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="flex -space-x-3">
                        <div className="w-9 h-9 rounded-full bg-orange-400 border-2 border-blue-700 flex items-center justify-center text-xs font-bold">AO</div>
                        <div className="w-9 h-9 rounded-full bg-orange-500 border-2 border-blue-700 flex items-center justify-center text-xs font-bold">EM</div>
                        <div className="w-9 h-9 rounded-full bg-amber-500 border-2 border-blue-700 flex items-center justify-center text-xs font-bold">TK</div>
                    </div>
                    <p className="text-sm text-blue-100">Trusted by top founders in Ikeja & VI</p>
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="w-full lg:w-[58%] bg-slate-900 flex flex-col justify-center px-6 py-12 lg:px-16">
                <div className="max-w-lg w-full mx-auto">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Create your business account</h2>
                        <p className="text-slate-400">Get started with Nigeria's leading service management system.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* 2-Column Grid for Company & Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Company Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Company Name</label>
                                <input
                                    {...register('companyName')}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                                    placeholder="Enter your registered business name"
                                />
                                {errors.companyName && <p className="text-xs text-red-400">{errors.companyName.message}</p>}
                            </div>

                            {/* Business Location */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Business Location</label>
                                <select
                                    {...register('location')}
                                    className="w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-800/80 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all cursor-pointer"
                                >
                                    <option value="">Select your primary location</option>
                                    {locations.map((loc) => (
                                        <option key={loc.value} value={loc.value}>{loc.label}</option>
                                    ))}
                                </select>
                                {errors.location && <p className="text-xs text-red-400">{errors.location.message}</p>}
                            </div>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Full Name</label>
                            <input
                                {...register('fullName')}
                                className="w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                                placeholder="Enter your full name"
                            />
                            {errors.fullName && <p className="text-xs text-red-400">{errors.fullName.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <input
                                {...register('email')}
                                type="email"
                                className="w-full h-12 px-4 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                                placeholder="e.g. name@company.com"
                            />
                            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                        </div>

                        {/* Phone - Custom Input Group */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Phone Number</label>
                            <div className="flex">
                                <div className="h-12 flex items-center px-4 rounded-l-xl border border-r-0 border-slate-700 bg-slate-700/50 text-slate-300 font-medium select-none">
                                    <span className="text-sm">+234</span>
                                </div>
                                <div className="w-px bg-slate-600"></div>
                                <input
                                    {...register('phone')}
                                    type="tel"
                                    className="flex-1 h-12 px-4 rounded-r-xl border border-l-0 border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                                    placeholder="801 234 5678"
                                />
                            </div>
                            {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
                        </div>

                        {/* Terms - Improved Visibility */}
                        <div className="flex items-start gap-3 py-2">
                            <input
                                type="checkbox"
                                {...register('terms')}
                                id="terms"
                                className="w-5 h-5 mt-0.5 text-orange-500 bg-slate-800 border-slate-600 rounded focus:ring-orange-500 focus:ring-offset-slate-900 cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-sm text-slate-300 cursor-pointer">
                                I agree to the <Link to="#" className="text-orange-500 hover:underline font-medium cursor-pointer">Terms of Service</Link> and <Link to="#" className="text-orange-500 hover:underline font-medium cursor-pointer">Privacy Policy</Link>.
                            </label>
                        </div>
                        {errors.terms && <p className="text-xs text-red-400">{errors.terms.message}</p>}

                        {/* Submit - Gradient Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-400">
                            Already have an account? <Link to="/login" className="text-orange-500 font-semibold hover:underline cursor-pointer">Log in</Link>
                        </p>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-10 flex justify-center items-center gap-8 text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <Shield className="h-4 w-4" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Secure</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Lock className="h-4 w-4" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Encrypted</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Protected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
