import { Outlet, Link } from 'react-router-dom';
import { Sidebar, MobileSidebar } from '../components/layout/Sidebar';
import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-navy">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Sidebar Overlay */}
            <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-64">
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-4 md:px-6 backdrop-blur-md dark:border-navy-light dark:bg-navy/80">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-light cursor-pointer"
                        >
                            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </button>

                        {/* Search Bar - Hidden on mobile */}
                        <div className="hidden md:flex flex-1 max-w-md items-center rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-500 focus-within:ring-2 focus-within:ring-primary/20 dark:bg-navy-light dark:text-gray-400">
                            <Search className="mr-2 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search analytics..."
                                className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Mobile Search Button */}
                        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-light cursor-pointer">
                            <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </button>

                        <button className="relative rounded-xl p-2 text-gray-400 hover:bg-gray-50 hover:text-primary transition-colors cursor-pointer">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        </button>
                        <Link to="/profile" className="h-9 w-9 overflow-hidden rounded-full border border-gray-200 bg-gray-100 hover:ring-2 hover:ring-primary/30 transition-all cursor-pointer">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6qhn-Gz6Sko0Iq1z71g1O7UkgYvI0eQG0YP2SbcWslf6QW7AbAG4iyS-gPkHquR4AAj6asXg47XHYG_yVME5yUGQV9KfKtouip5fLHLNXyKTgEJRKnCMnodrAx5EkMn25f-CAeUn2SrTouNd2sQToDsOIB3JJWn2Tpq9eDrWPJa28heFdLkxdSH_T7Bh5YMcUG4UfDJx0JZXckzb6T2iYb4fL8hOmUbQYlq2KAmsSI1oRa6gz9hj4z8GfCb61i2zAlPySZM3shQ" alt="User" className="h-full w-full object-cover" />
                        </Link>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
