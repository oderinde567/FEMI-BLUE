import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, ShieldCheck } from 'lucide-react';

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    // const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // Password strength indicators
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const passwordsMatch = password === confirmPassword && password.length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!passwordsMatch) {
            setError('Passwords do not match');
            return;
        }

        if (!hasMinLength || !hasUppercase || !hasNumber) {
            setError('Password does not meet requirements');
            return;
        }

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSuccess(true);
        setIsSubmitting(false);

        // Redirect to login after success
        setTimeout(() => navigate('/login'), 2500);
    };

    const requirements = [
        { met: hasMinLength, label: 'At least 8 characters' },
        { met: hasUppercase, label: 'One uppercase letter' },
        { met: hasNumber, label: 'One number' },
        { met: hasSpecial, label: 'One special character (!@#$%^&*)' },
    ];

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                <div className="p-8">
                    {!isSuccess ? (
                        <>
                            <div className="mb-8 text-center">
                                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-orange-500/10 flex items-center justify-center">
                                    <ShieldCheck className="h-7 w-7 text-orange-500" />
                                </div>
                                <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
                                <p className="mt-2 text-slate-400 text-sm">
                                    Create a new secure password for your account.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* New Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-200">New Password</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-xl border border-slate-600 bg-slate-800 py-4 pl-12 pr-12 text-white placeholder:text-slate-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                            placeholder="Enter new password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Password Requirements */}
                                <div className="grid grid-cols-2 gap-2">
                                    {requirements.map((req) => (
                                        <div key={req.label} className="flex items-center gap-2">
                                            <div className={`h-1.5 w-1.5 rounded-full ${req.met ? 'bg-green-500' : 'bg-slate-600'}`} />
                                            <span className={`text-xs ${req.met ? 'text-green-400' : 'text-slate-500'}`}>
                                                {req.label}
                                            </span>
                                        </div>
                                    ))}
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
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`w-full rounded-xl border bg-slate-800 py-4 pl-12 pr-12 text-white placeholder:text-slate-500 transition-all focus:outline-none focus:ring-2 ${confirmPassword.length > 0
                                                ? passwordsMatch
                                                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                                                    : 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                                : 'border-slate-600 focus:border-orange-500 focus:ring-orange-500/20'
                                                }`}
                                            placeholder="Confirm new password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {confirmPassword.length > 0 && !passwordsMatch && (
                                        <p className="text-xs text-red-400">Passwords do not match</p>
                                    )}
                                </div>

                                {error && (
                                    <p className="text-sm text-red-400 text-center">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !passwordsMatch}
                                    className={`w-full py-4 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer ${passwordsMatch && hasMinLength && hasUppercase && hasNumber
                                        ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/30'
                                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-500 animate-pulse" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Password Reset!</h2>
                            <p className="text-slate-400 text-sm mb-6">
                                Your password has been successfully updated.<br />
                                Redirecting you to login...
                            </p>
                            <div className="flex justify-center">
                                <div className="h-1 w-32 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 animate-pulse" style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
