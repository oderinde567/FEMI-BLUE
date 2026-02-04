import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, BarChart3, Settings, LogOut, Bell, Users, X, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: FileText, label: 'Requests', href: '/requests' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Activity, label: 'Activity Log', href: '/admin/activity' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: BarChart3, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

// Desktop Sidebar
export function Sidebar() {
    return (
        <aside className="hidden h-screen w-64 flex-col border-r border-gray-100 bg-white dark:bg-navy dark:border-navy-light lg:flex fixed left-0 top-0 z-40">
            {/* Logo Area */}
            <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-100 dark:border-navy-light">
                <div className="flex bg-primary/10 text-primary h-8 w-8 items-center justify-center rounded-lg">
                    <BarChart3 className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-navy dark:text-white">BlueArnk</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-6">
                {navItems.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer",
                                isActive
                                    ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-navy dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                            )
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / User Profile Summary */}
            <div className="border-t border-gray-100 p-4 dark:border-navy-light">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer">
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}

// Mobile Sidebar with Overlay
interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-navy border-r border-gray-100 dark:border-navy-light transform transition-transform duration-300 ease-in-out lg:hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Area with Close Button */}
                <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100 dark:border-navy-light">
                    <div className="flex items-center gap-3">
                        <div className="flex bg-primary/10 text-primary h-8 w-8 items-center justify-center rounded-lg">
                            {/* <BarChart3 className="h-10 w-10" />
                             */}


                             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
    <img
        src="/logo.jpg"
        alt="BlueArnk Logo"
        className="h-15 w-15 object-contain"
    />
</div>


                            
                       
                        </div>
                        <span className="text-xl font-bold tracking-tight text-navy dark:text-white">BlueArnk Technologies</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-light cursor-pointer"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            onClick={onClose}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors cursor-pointer",
                                    isActive
                                        ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-navy dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                                )
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 p-4 dark:border-navy-light">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}
