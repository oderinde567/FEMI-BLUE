import { Outlet, NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
    LayoutDashboard, FileText, Bell, Settings,
    Shield, Users, Activity, PieChart, LogOut, Menu
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

export const DashboardLayout = () => {
    const { logout, user } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Overview', href: '/', icon: LayoutDashboard },
        { name: 'Requests', href: '/requests', icon: FileText },
        { name: 'Reports', href: '/reports', icon: PieChart },
        { name: 'Notifications', href: '/notifications', icon: Bell },
    ];

    const adminNavigation = [
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Activity', href: '/admin/activity', icon: Activity },
    ];

    const settingsNavigation = [
        { name: 'General', href: '/settings', icon: Settings },
        { name: 'Security', href: '/settings/security', icon: Shield },
    ];

    const NavItem = ({ item }: { item: any }) => {
        return (
            <NavLink
                to={item.href}
                className={({ isActive }) => `
                    group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                    ${isActive
                        ? 'nav-item-active'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'}
                `}
            >
                {({ isActive }) => (
                    <>
                        <item.icon className={`h-5 w-5 transition-colors ${isActive ? 'text-orange-500' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                        {item.name}
                    </>
                )}
            </NavLink>
        );
    };

    return (
        <div className="relative min-h-screen bg-zinc-950 flex font-sans overflow-hidden">
            {/* Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px]" />
                <div className="absolute top-[20%] right-[30%] w-[30%] h-[30%] rounded-full bg-purple-600/5 blur-[120px]" />
            </div>

            <div className="relative z-10 flex w-full h-screen">
                {/* Sidebar - Desktop (Glassmorphism applied via CSS classes) */}
                <aside className="hidden lg:flex w-72 flex-col border-r border-white/5 bg-zinc-900/40 backdrop-blur-xl h-full">
                    <div className="p-6">
                        <div className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
                            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-orange-500/20 shadow-lg">
                                <span className="text-white">B</span>
                            </div>
                            BlueArnk
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 space-y-8 py-4">
                        <div className="space-y-1">
                            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Platform</p>
                            {navigation.map((item) => <NavItem key={item.name} item={item} />)}
                        </div>

                        {user?.role === 'admin' && (
                            <div className="space-y-1">
                                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Admin</p>
                                {adminNavigation.map((item) => <NavItem key={item.name} item={item} />)}
                            </div>
                        )}

                        <div className="space-y-1">
                            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Settings</p>
                            {settingsNavigation.map((item) => <NavItem key={item.name} item={item} />)}
                        </div>
                    </div>

                    <div className="p-4 border-t border-white/5">
                        <button
                            onClick={() => {
                                logout();
                                toast.success('Logged out successfully');
                            }}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/5 bg-zinc-950/50 backdrop-blur-md px-6">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-zinc-400 hover:text-white"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <div className="flex items-center gap-4 ml-auto">
                            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-white">{user ? `${user.firstName} ${user.lastName}` : 'Guest'}</p>
                                    <p className="text-xs text-zinc-500 capitalize">{user?.role || 'User'}</p>
                                </div>
                                <div className="h-9 w-9 rounded-full bg-linear-to-tr from-orange-500 to-amber-500 p-px">
                                    <div className="h-full w-full rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-white">
                                        {user?.firstName?.[0] || 'U'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                        {/* Animate-in effect for page loads */}
                        <div className="mx-auto max-w-7xl animate-slide-up">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};