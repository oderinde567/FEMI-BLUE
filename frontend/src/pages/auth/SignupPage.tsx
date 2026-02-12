import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup } from '../../features/auth';
import { Button } from '../../components/ui/button';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const signupSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Use the real signup mutation
    const signupMutation = useSignup();

    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            await signupMutation.mutateAsync({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            });
            // Navigate to verification page on success
            navigate('/verify-email', { state: { email: data.email } });
        } catch {
            // Error is handled by the mutation
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                <div className="p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-white">Create Account</h1>
                        <p className="mt-2 text-slate-400">Join BlueArnk to get started</p>
                    </div>

                    {/* Success Message */}
                    {signupMutation.isSuccess && (
                        <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500/20 p-4 text-green-400">
                            <CheckCircle className="h-5 w-5 shrink-0" />
                            <p className="text-sm">Account created! Check your email to verify.</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {signupMutation.isError && (
                        <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p className="text-sm">{signupMutation.error?.message || 'Signup failed'}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-200">First Name</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <input
                                        {...register('firstName')}
                                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-4 pl-12 pr-4 text-white placeholder:text-slate-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        placeholder="John"
                                    />
                                </div>
                                {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-200">Last Name</label>
                                <input
                                    {...register('lastName')}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-4 px-4 text-white placeholder:text-slate-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    placeholder="Doe"
                                />
                                {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
                            </div>
                        </div>

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
                            <label className="text-sm font-medium text-slate-200">Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-4 pl-12 pr-14 text-white placeholder:text-slate-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    placeholder="Min. 8 characters"
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

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-200">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirmPassword')}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-4 pl-12 pr-14 text-white placeholder:text-slate-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    placeholder="Confirm password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Sign Up Button */}
                        <Button
                            type="submit"
                            disabled={signupMutation.isPending}
                            className="w-full py-4 text-base font-bold shadow-lg shadow-orange-500/30 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                        >
                            {signupMutation.isPending ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-700/50 bg-slate-800/30 p-5 text-center">
                    <p className="text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-orange-500 hover:text-orange-400 transition-colors cursor-pointer">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
