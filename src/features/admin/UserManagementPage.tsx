import { useState } from 'react';
import { Search, UserPlus, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

type UserRole = 'Admin' | 'Manager' | 'User';
type UserStatus = 'active' | 'inactive';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    department: string;
    status: UserStatus;
    avatar: string;
}

const mockUsers: User[] = [
    { id: 'ARN-001', name: 'Kelvin Macuss', email: 'kelvin@bluearnk.ng', phone: '+234 901 436 3569', role: 'Admin', department: 'Operations', status: 'active', avatar: 'AA' },
    { id: 'ARN-042', name: 'Olanike Oyadiran', email: 'nike@bluearnk.ng', phone: '+234 907 402 1516', role: 'Manager', department: 'Finance', status: 'active', avatar: 'CO' },
    { id: 'ARN-115', name: 'Babajide Soyinka', email: 'jide@bluearnk.ng', phone: '+234 703 456 7890', role: 'User', department: 'Sales', status: 'inactive', avatar: 'BS' },
    { id: 'ARN-208', name: 'Ngozi Eze', email: 'ngozi@bluearnk.ng', phone: '+234 905 111 2222', role: 'User', department: 'Support', status: 'active', avatar: 'NE' },
    { id: 'ARN-054', name: 'Olayeni Nice', email: 'nice@bluearnk.ng', phone: '+234 808 126 0566', role: 'Manager', department: 'Operations', status: 'active', avatar: 'OB' },
];

const stats = [
    { label: 'Total Active', value: '1,180', badge: '+4%', badgeColor: 'text-green-500 bg-green-50' },
    { label: 'Pending Approval', value: '24', badge: 'Alert', badgeColor: 'text-orange-500 bg-orange-500/10' },
    { label: 'New this month', value: '156', badge: 'Growth', badgeColor: 'text-green-500 bg-green-50' },
    { label: 'System Load', value: 'Normal', progress: 35 },
];

const getRoleBadgeStyles = (role: UserRole) => {
    switch (role) {
        case 'Admin':
            return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
        case 'Manager':
            return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
        case 'User':
            return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
        default:
            return 'bg-slate-100 text-slate-600 border-slate-200';
    }
};

export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const toggleUserStatus = (userId: string) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
                : user
        ));
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phone.includes(searchQuery);
        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesDepartment = !departmentFilter || user.department === departmentFilter;
        const matchesStatus = !statusFilter || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-navy dark:text-white">User Management</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Monitor and manage 1,248 active business accounts across Nigeria.</p>
                </div>
                <Button className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Add New User
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl p-4 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Search Users</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-navy border border-gray-200 dark:border-navy-light rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                placeholder="Search by name, email or phone..."
                            />
                        </div>
                    </div>
                    {/* Role Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Role</label>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-navy border border-gray-200 dark:border-navy-light rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none cursor-pointer"
                        >
                            <option value="">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    {/* Department Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Department</label>
                        <select
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-navy border border-gray-200 dark:border-navy-light rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none cursor-pointer"
                        >
                            <option value="">All Departments</option>
                            <option value="Operations">Operations</option>
                            <option value="Finance">Finance</option>
                            <option value="Sales">Sales</option>
                            <option value="Support">Support</option>
                        </select>
                    </div>
                    {/* Status Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-navy border border-gray-200 dark:border-navy-light rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none cursor-pointer"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl overflow-hidden shadow-sm">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-navy border-b border-gray-200 dark:border-navy-light">
                                <th className="px-6 py-4 text-xs font-bold text-navy dark:text-gray-300 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-navy dark:text-gray-300 uppercase tracking-wider">Contact Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-navy dark:text-gray-300 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-navy dark:text-gray-300 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-bold text-navy dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-navy dark:text-gray-300 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-navy-light">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-navy/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-navy dark:text-white">{user.name}</p>
                                                <p className="text-xs text-gray-500">ID: {user.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{user.email}</span>
                                            <span className="text-xs font-medium text-primary">{user.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-[11px] font-bold uppercase rounded-full border ${getRoleBadgeStyles(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.department}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleUserStatus(user.id)}
                                            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${user.status === 'active' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                                                }`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.status === 'active' ? 'translate-x-5' : 'translate-x-1'
                                                }`} />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-navy rounded-lg cursor-pointer">
                                            <MoreVertical className="h-5 w-5 text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-100 dark:divide-navy-light">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                                        {user.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-navy dark:text-white">{user.name}</p>
                                        <p className="text-xs text-gray-500">ID: {user.id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleUserStatus(user.id)}
                                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${user.status === 'active' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                                        }`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.status === 'active' ? 'translate-x-5' : 'translate-x-1'
                                        }`} />
                                </button>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                            <div className="flex items-center justify-between">
                                <span className={`px-3 py-1 text-[11px] font-bold uppercase rounded-full border ${getRoleBadgeStyles(user.role)}`}>
                                    {user.role}
                                </span>
                                <span className="text-xs text-gray-500">{user.department}</span>
                                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-navy rounded-lg cursor-pointer">
                                    <MoreVertical className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-gray-50 dark:bg-navy border-t border-gray-200 dark:border-navy-light">
                    <p className="text-xs text-gray-500">
                        Showing <span className="font-bold text-navy dark:text-white">1 - 5</span> of <span className="font-bold text-navy dark:text-white">1,248</span> users
                    </p>
                    <div className="flex items-center gap-1">
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-navy-light text-gray-500 cursor-pointer">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold cursor-pointer">1</button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-navy-light text-xs text-gray-600 dark:text-gray-400 cursor-pointer">2</button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-navy-light text-xs text-gray-600 dark:text-gray-400 cursor-pointer">3</button>
                        <span className="px-2 text-xs text-gray-400">...</span>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-navy-light text-xs text-gray-600 dark:text-gray-400 cursor-pointer">125</button>
                        <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-navy-light text-gray-500 cursor-pointer">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl p-4">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">{stat.label}</p>
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-navy dark:text-white">{stat.value}</h3>
                            {stat.badge && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.badgeColor}`}>
                                    {stat.badge}
                                </span>
                            )}
                            {stat.progress !== undefined && (
                                <div className="w-12 h-1.5 bg-gray-200 dark:bg-navy rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-full" style={{ width: `${stat.progress}%` }} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
