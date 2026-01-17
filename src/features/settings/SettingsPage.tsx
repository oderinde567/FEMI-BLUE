import { useState } from 'react';
import { Camera, User, Shield, Bell, Building, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const settingsNav = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'company', label: 'Company Info', icon: Building },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('account');

    return (
        <div className="flex gap-8">
            {/* Settings Navigation Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
                <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-navy p-4 sticky top-24">
                    <nav className="space-y-1">
                        {settingsNav.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                        activeSection === item.id
                                            ? "bg-primary/10 text-primary border-r-4 border-primary"
                                            : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-navy dark:text-white">Profile Settings</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage your personal information and professional business identity on BlueArnk.
                    </p>
                </div>

                {/* Settings Card */}
                <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-navy overflow-hidden">
                    {/* Profile Photo Section */}
                    <div className="p-8 border-b border-gray-100 dark:border-navy">
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="relative group">
                                <div className="h-32 w-32 rounded-full border-4 border-white dark:border-navy shadow-lg bg-cover bg-center"
                                    style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6qhn-Gz6Sko0Iq1z71g1O7UkgYvI0eQG0YP2SbcWslf6QW7AbAG4iyS-gPkHquR4AAj6asXg47XHYG_yVME5yUGQV9KfKtouip5fLHLNXyKTgEJRKnCMnodrAx5EkMn25f-CAeUn2SrTouNd2sQToDsOIB3JJWn2Tpq9eDrWPJa28heFdLkxdSH_T7Bh5YMcUG4UfDJx0JZXckzb6T2iYb4fL8hOmUbQYlq2KAmsSI1oRa6gz9hj4z8GfCb61i2zAlPySZM3shQ")` }}>
                                </div>
                                <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white dark:border-navy shadow-md">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-navy dark:text-white">Profile Photo</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Upload a high-quality professional photo. Supported formats: JPG, PNG. Maximum size: 5MB.
                                </p>
                                <div className="mt-4 flex gap-3">
                                    <Button variant="outline" size="sm">Upload New Photo</Button>
                                    <Button variant="ghost" size="sm">Remove</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8 space-y-6">
                        {/* Personal Identity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-navy dark:text-white">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Femi Oderinde"
                                    className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-navy bg-transparent text-navy dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-navy dark:text-white">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="femi.o@bluearnk.ng"
                                    className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-navy bg-transparent text-navy dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                        </div>

                        {/* Contact & Business */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-navy dark:text-white">Phone Number</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-gray-500 text-sm">
                                        +234
                                    </span>
                                    <input
                                        type="tel"
                                        defaultValue="8144979938"
                                        className="flex-1 h-11 px-4 rounded-r-lg border border-gray-200 dark:border-navy bg-transparent text-navy dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-navy dark:text-white">Business Address (Lagos)</label>
                                <input
                                    type="text"
                                    placeholder="8, Gafari Balogun Ikeja, Lagos State"
                                    className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-navy bg-transparent text-navy dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                        </div>

                        {/* Professional Bio */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-navy dark:text-white">Professional Bio</label>
                                <span className="text-xs text-gray-500">240/500 characters</span>
                            </div>
                            <textarea
                                rows={4}
                                defaultValue="Experienced operations manager specialized in logistics and service delivery across the Lagos metropolis. Helping Nigerian SMEs streamline their request management processes through BlueArnk."
                                className="w-full p-4 rounded-lg border border-gray-200 dark:border-navy bg-transparent text-navy dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-8 py-6 bg-gray-50 dark:bg-navy/50 border-t border-gray-100 dark:border-navy flex justify-end gap-4">
                        <Button variant="ghost">Cancel</Button>
                        <Button>Save Changes</Button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="mt-12 p-6 border-2 border-dashed border-red-200 dark:border-red-900/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h4 className="text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
                            <Trash2 className="h-4 w-4" />
                            Delete Account
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
                    </div>
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20">
                        Deactivate
                    </Button>
                </div>
            </main>
        </div>
    );
}
