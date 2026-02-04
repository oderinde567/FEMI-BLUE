import { useState } from 'react';
import { Search, Filter, Download, User, Settings, FileText, AlertTriangle, CheckCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';

type ActivityType = 'user' | 'request' | 'settings' | 'security' | 'system';
type ActivityStatus = 'success' | 'warning' | 'info';

interface Activity {
    id: string;
    type: ActivityType;
    action: string;
    user: string;
    userAvatar: string;
    details: string;
    timestamp: string;
    status: ActivityStatus;
    ip?: string;
}

const activities: Activity[] = [
    { id: '1', type: 'user', action: 'User Login', user: 'Kelvin Macuss', userAvatar: 'AO', details: 'Logged in from Lagos, Nigeria', timestamp: '2 minutes ago', status: 'success', ip: '102.89.23.45' },
    { id: '2', type: 'request', action: 'Request Created', user: 'Chioma Eze', userAvatar: 'CE', details: 'Created request #REQ-2024-001', timestamp: '15 minutes ago', status: 'info' },
    { id: '3', type: 'settings', action: 'Settings Updated', user: 'Admin', userAvatar: 'AD', details: 'Changed notification preferences', timestamp: '1 hour ago', status: 'info' },
    { id: '4', type: 'security', action: 'Password Changed', user: 'Olanike Oyadiran', userAvatar: 'NA', details: 'Password successfully updated', timestamp: '2 hours ago', status: 'success' },
    { id: '5', type: 'user', action: 'User Created', user: 'Oluwaseun Bakare', userAvatar: 'OB', details: 'Created new user: john@company.ng', timestamp: '3 hours ago', status: 'success' },
    { id: '6', type: 'security', action: 'Failed Login Attempt', user: 'Unknown', userAvatar: '??', details: 'Multiple failed attempts from IP 192.168.1.100', timestamp: '4 hours ago', status: 'warning', ip: '192.168.1.100' },
    { id: '7', type: 'request', action: 'Request Completed', user: 'System', userAvatar: 'SY', details: 'Auto-closed request #REQ-2023-089', timestamp: '5 hours ago', status: 'success' },
    { id: '8', type: 'user', action: 'Role Changed', user: 'Admin', userAvatar: 'AD', details: 'Changed role for user@email.ng from User to Manager', timestamp: '6 hours ago', status: 'info' },
    { id: '9', type: 'settings', action: 'API Key Generated', user: 'Adebayo Okonkwo', userAvatar: 'AO', details: 'Generated new API key for integration', timestamp: '1 day ago', status: 'info' },
    { id: '10', type: 'system', action: 'System Maintenance', user: 'System', userAvatar: 'SY', details: 'Scheduled maintenance completed successfully', timestamp: '2 days ago', status: 'success' },
];

const typeConfig = {
    user: { icon: User, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    request: { icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    settings: { icon: Settings, color: 'text-gray-500', bg: 'bg-gray-500/10' },
    security: { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    system: { icon: Clock, color: 'text-green-500', bg: 'bg-green-500/10' },
};

const statusConfig = {
    success: { icon: CheckCircle, color: 'text-green-500' },
    warning: { icon: AlertTriangle, color: 'text-amber-500' },
    info: { icon: Clock, color: 'text-blue-500' },
};

export default function ActivityLogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<ActivityType | 'all'>('all');

    const filteredActivities = activities.filter(activity => {
        const matchesSearch = activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.user.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'all' || activity.type === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-navy dark:text-white">Activity Log</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track all system activities and user actions.</p>
                </div>
                <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Log
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl p-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search activities..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                </div>

                {/* Type Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as ActivityType | 'all')}
                        className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                    >
                        <option value="all">All Types</option>
                        <option value="user">User</option>
                        <option value="request">Request</option>
                        <option value="settings">Settings</option>
                        <option value="security">Security</option>
                        <option value="system">System</option>
                    </select>
                </div>
            </div>

            {/* Activity List */}
            <div className="bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl overflow-hidden">
                <div className="divide-y divide-gray-100 dark:divide-navy">
                    {filteredActivities.map((activity) => {
                        const TypeIcon = typeConfig[activity.type].icon;
                        const StatusIcon = statusConfig[activity.status].icon;
                        return (
                            <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-navy/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    {/* Type Icon */}
                                    <div className={`h-10 w-10 rounded-lg ${typeConfig[activity.type].bg} flex items-center justify-center shrink-0`}>
                                        <TypeIcon className={`h-5 w-5 ${typeConfig[activity.type].color}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-navy dark:text-white">{activity.action}</span>
                                            <StatusIcon className={`h-4 w-4 ${statusConfig[activity.status].color}`} />
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{activity.details}</p>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
                                                    {activity.userAvatar}
                                                </div>
                                                <span>{activity.user}</span>
                                            </div>
                                            <span>•</span>
                                            <span>{activity.timestamp}</span>
                                            {activity.ip && (
                                                <>
                                                    <span>•</span>
                                                    <span>IP: {activity.ip}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredActivities.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No activities found matching your criteria.</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-navy">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredActivities.length} of {activities.length} activities
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium text-navy dark:text-white">1</span>
                        <Button variant="outline" size="sm">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
