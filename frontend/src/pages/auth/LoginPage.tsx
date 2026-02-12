import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../../features/auth/hooks/useLogin'; // Ensure this path is correct for your folder structure
import { toast } from 'react-hot-toast';
import { Button } from '../../components/ui/button';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Use the REAL login mutation
    const loginMutation = useLogin();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                toast.success('Welcome back!');
                navigate('/');
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4 font-sans">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl animate-fade-in">
                <div className="p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                        <p className="mt-2 text-slate-400">Sign in to your BlueArnk account</p>
                    </div>

                    {/* Error Message Display */}
                    {loginMutation.isError && (
                        <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p className="text-sm">{(loginMutation.error as any)?.response?.data?.message || 'Login failed'}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-200">Email Address</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    {...register('email')}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-4 pl-12 pr-4 text-white placeholder:text-slate-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    placeholder="name@company.com"
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-200">Password</label>
                                <Link to="/forgot-password" className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors cursor-pointer">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-4 pl-12 pr-14 text-white placeholder:text-slate-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
                        </div>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full py-4 text-base font-bold shadow-lg shadow-orange-500/30 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-none cursor-pointer"
                        >
                            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-700/50 bg-slate-800/30 p-5 text-center">
                    <p className="text-sm text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-bold text-orange-500 hover:text-orange-400 transition-colors cursor-pointer">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}