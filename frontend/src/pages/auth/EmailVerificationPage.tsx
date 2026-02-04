import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';

export default function EmailVerificationPage() {
    const navigate = useNavigate();
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    // Simulate countdown for resend
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleCodeChange = (index: number, value: string) => {
        // Handle single character input
        if (value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Auto-focus next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    // Handle paste - fills all boxes when pasting a 6-digit code
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pastedData.length > 0) {
            const newCode = [...code];
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedData[i] || '';
            }
            setCode(newCode);
            // Focus last filled input or next empty one
            const lastIndex = Math.min(pastedData.length - 1, 5);
            const lastInput = document.getElementById(`code-${lastIndex}`);
            lastInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerify = async () => {
        const fullCode = code.join('');
        if (fullCode.length !== 6) return;

        setIsVerifying(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSuccess(true);
        setIsVerifying(false);

        // Redirect after success
        setTimeout(() => navigate('/'), 2000);
    };

    const handleResend = () => {
        setResendCooldown(60);
        // Simulate resend
    };

    const isCodeComplete = code.join('').length === 6;

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                <div className="p-8">
                    {!isSuccess ? (
                        <>
                            <div className="mb-8 text-center">
                                {/* Orange icon for brand consistency */}
                                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-orange-500/10 flex items-center justify-center">
                                    <Mail className="h-7 w-7 text-orange-500" />
                                </div>
                                <h1 className="text-2xl font-bold text-white">Verify Your Email</h1>
                                <p className="mt-2 text-slate-400 text-sm">
                                    We've sent a 6-digit code to your email address.<br />
                                    Enter it below to verify your account.
                                </p>
                            </div>

                            {/* OTP Input - Improved visibility and paste support */}
                            <div className="flex justify-center gap-3 mb-8">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`code-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all"
                                    />
                                ))}
                            </div>

                            {/* Verify Button - Vibrant orange, not muddy */}
                            <button
                                onClick={handleVerify}
                                disabled={isVerifying || !isCodeComplete}
                                className={`w-full py-4 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer ${isCodeComplete
                                        ? 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/30'
                                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                {isVerifying ? 'Verifying...' : 'Verify Email'}
                            </button>

                            <div className="mt-8 text-center">
                                <p className="text-sm text-slate-500">
                                    Didn't receive the code?{' '}
                                    {resendCooldown > 0 ? (
                                        <span className="text-slate-400">Resend in {resendCooldown}s</span>
                                    ) : (
                                        <button
                                            onClick={handleResend}
                                            className="text-orange-500 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                                        >
                                            <RefreshCw className="h-3.5 w-3.5" />
                                            Resend Code
                                        </button>
                                    )}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-500 animate-pulse" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
                            <p className="text-slate-400 text-sm mb-6">
                                Your account has been successfully verified.<br />
                                Redirecting you to the dashboard...
                            </p>
                            <div className="flex justify-center">
                                <div className="h-1 w-32 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 animate-pulse" style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer with more padding */}
                <div className="border-t border-slate-700/50 bg-slate-800/30 px-6 py-6 text-center">
                    <Link
                        to="/signup"
                        className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                        Wrong email? <span className="text-orange-500 font-medium hover:underline">Change it</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
