import { useState } from 'react';
import { Search, Filter, MoreHorizontal, UserPlus, Loader2, Shield, Mail, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useUsers, type User } from '../../features/admin';

const roleStyles: Record<string, string> = {
    'admin': 'bg-purple-100 text-purple-600',
    'staff': 'bg-blue-100 text-blue-600',
    'client': 'bg-green-100 text-green-600',
};

function formatDate(dateString?: string): string {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function UserManagementPage() {
    const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'staff' | 'client'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Use real API hook with filters
    const { data: usersData, isLoading } = useUsers(
        roleFilter !== 'all' ? { role: roleFilter } : undefined
    );

    // Filter by search query
    const users = usersData?.users?.filter((user: User) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-navy dark:text-white">User Management</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage user accounts and permissions</p>
                </div>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-navy-light md:flex-row md:items-center md:justify-between">
                <div className="flex gap-2">
                    {(['all', 'admin', 'staff', 'client'] as const).map((role) => (
                        <button
                            key={role}
                            onClick={() => setRoleFilter(role)}
                            className={cn(
                                "rounded-lg px-4 py-2 text-sm font-medium transition-colors capitalize",
                                roleFilter === role
                                    ? "bg-primary text-white"
                                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                            )}
                        >
                            {role === 'all' ? 'All Users' : role}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-navy dark:bg-navy/50"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Users List */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-navy-light dark:bg-navy-light">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <Shield className="h-12 w-12 mb-4 text-gray-300" />
                        <p>No users found</p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 dark:bg-navy/50 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-4 font-medium">User</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Last Login</th>
                                <th className="px-6 py-4 font-medium">Joined</th>
                                <th className="px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-navy/50">
                            {users.map((user: User) => (
                                <tr key={user.id} className="group hover:bg-gray-50 dark:hover:bg-white/5">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium text-navy dark:text-white">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Mail className="h-3 w-3" />
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                                            roleStyles[user.role] || 'bg-gray-100 text-gray-600'
                                        )}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                                            user.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                                        )}>
                                            <span className={cn("h-1.5 w-1.5 rounded-full", user.isActive ? "bg-green-500" : "bg-gray-400")} />
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                        {formatDate(user.lastLoginAt)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-navy">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
