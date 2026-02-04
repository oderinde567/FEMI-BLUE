import { useState } from 'react';
import { Eye, EyeOff, Smartphone, Laptop, Monitor, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const sessions = [
    { id: '1', device: 'MacBook Pro', browser: 'Chrome 121.0.0', location: 'Ikeja, Lagos, NG', time: 'Just now', status: 'current', icon: Laptop },
    { id: '2', device: 'iPhone 15 Pro', browser: 'Safari Mobile', location: 'Abuja, FCT, NG', time: '2 hours ago', status: 'active', icon: Smartphone },
    { id: '3', device: 'Windows Desktop', browser: 'Firefox', location: 'Port Harcourt, NG', time: 'Yesterday, 14:22', status: 'expired', icon: Monitor },
];

export default function SecuritySettingsPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

    return (
        <div className="max-w-4xl mx-auto">
            {/* Page Heading */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">Security & Password Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your account security and authentication preferences to keep your business data safe.</p>
            </div>

            <div className="space-y-8">
                {/* Change Password Section */}
                <section className="bg-white dark:bg-navy-light rounded-xl border border-gray-100 dark:border-navy shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-navy">
                        <h3 className="text-xl font-bold text-navy dark:text-white">Change Password</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ensure your account is using a long, random password to stay secure.</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="max-w-md space-y-2">
                            <label className="text-sm font-medium text-navy dark:text-white">Current Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>
                        <div className="max-w-md space-y-2">
                            <label className="text-sm font-medium text-navy dark:text-white">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-gray-400 hover:text-primary"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {/* Password Strength Meter */}
                            <div className="mt-3">
                                <div className="flex gap-1 h-1.5 w-full">
                                    <div className="h-full flex-1 bg-primary rounded-full"></div>
                                    <div className="h-full flex-1 bg-primary rounded-full"></div>
                                    <div className="h-full flex-1 bg-primary rounded-full"></div>
                                    <div className="h-full flex-1 bg-gray-200 dark:bg-navy rounded-full"></div>
                                </div>
                                <p className="mt-2 text-xs font-medium text-primary">Strong Password</p>
                            </div>
                        </div>
                        <div className="max-w-md space-y-2">
                            <label className="text-sm font-medium text-navy dark:text-white">Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>
                        <div className="pt-4 border-t border-gray-100 dark:border-navy flex items-center justify-between">
                            <Button>Update Password</Button>
                            <a href="#" className="text-sm font-medium text-primary hover:underline cursor-pointer">Forgot your password?</a>
                        </div>
                    </div>
                </section>

                {/* 2FA Section */}
                <section className="bg-white dark:bg-navy-light rounded-xl border border-gray-100 dark:border-navy shadow-sm">
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex gap-4">
                            <div className="bg-primary/10 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
                                <Smartphone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-navy dark:text-white">Two-Factor Authentication (2FA)</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-lg">
                                    Add an extra layer of security to your account. We support SMS codes to Nigerian numbers (+234) and standard authenticator apps.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                className={cn("relative inline-flex h-7 w-12 items-center rounded-full transition-colors", twoFactorEnabled ? "bg-primary" : "bg-gray-200")}
                            >
                                <span className={cn("inline-block h-5 w-5 transform rounded-full bg-white transition-transform", twoFactorEnabled ? "translate-x-6" : "translate-x-1")}></span>
                            </button>
                            <span className={cn("ml-3 text-sm font-bold", twoFactorEnabled ? "text-primary" : "text-gray-400")}>
                                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Login Activity Section */}
                <section className="bg-white dark:bg-navy-light rounded-xl border border-gray-100 dark:border-navy shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-navy flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-navy dark:text-white">Recent Login Activity</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review your recent login sessions and sign out if anything looks suspicious.</p>
                        </div>
                        <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20">
                            Sign out of all other sessions
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-navy text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold">
                                <tr>
                                    <th className="px-6 py-4">Device / Browser</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Time (WAT)</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-navy">
                                {sessions.map((session) => {
                                    const Icon = session.icon;
                                    return (
                                        <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Icon className="h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <p className="text-sm font-bold text-navy dark:text-white">{session.device}</p>
                                                        <p className="text-xs text-gray-500">{session.browser}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="h-3 w-3" />
                                                    {session.location}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{session.time}</td>
                                            <td className="px-6 py-4">
                                                {session.status === 'current' && (
                                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">Current</span>
                                                )}
                                                {session.status === 'active' && (
                                                    <span className="text-sm text-gray-400">Active</span>
                                                )}
                                                {session.status === 'expired' && (
                                                    <span className="text-sm text-gray-400">Expired</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
