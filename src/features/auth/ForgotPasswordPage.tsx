import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSuccess(true);
        setIsSubmitting(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                <div className="p-8">
                    {!isSuccess ? (
                        <>
                            <div className="mb-8 text-center">
                                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-orange-500/10 flex items-center justify-center">
                                    <Mail className="h-7 w-7 text-orange-500" />
                                </div>
                                <h1 className="text-2xl font-bold text-white">Forgot Password?</h1>
                                <p className="mt-2 text-slate-400 text-sm">No worries! Enter your email and we'll send you reset instructions.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-200">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-4 pl-12 pr-4 text-white placeholder:text-slate-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 text-base font-bold shadow-lg shadow-orange-500/30 bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                                >
                                    {isSubmitting ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Reset Link
                                        </>
                                    )}
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center animate-pulse">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
                            <p className="text-slate-400 text-sm mb-6">
                                We've sent a password reset link to<br />
                                <span className="text-white font-medium">{email}</span>
                            </p>
                            <p className="text-xs text-slate-500 mb-6">
                                Didn't receive the email? Check your spam folder or{' '}
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-orange-500 hover:underline cursor-pointer"
                                >
                                    try again
                                </button>
                            </p>
                        </div>
                    )}
                </div>

                <div className="border-t border-slate-700/50 bg-slate-800/30 p-5 text-center">
                    <Link
                        to="/login"
                        className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
