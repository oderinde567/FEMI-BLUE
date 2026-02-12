import { useState } from 'react';
import { Search, Filter, Download, User as UserIcon, Settings, FileText, AlertTriangle, CheckCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useActivityLogs } from '../../features/admin';
import { formatDistanceToNow } from 'date-fns';

const typeConfig: Record<string, { icon: any, color: string, bg: string }> = {
    user: { icon: UserIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    request: { icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    settings: { icon: Settings, color: 'text-gray-500', bg: 'bg-gray-500/10' },
    security: { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    system: { icon: Clock, color: 'text-green-500', bg: 'bg-green-500/10' },
    default: { icon: Clock, color: 'text-gray-500', bg: 'bg-gray-500/10' },
};

const statusConfig = {
    success: { icon: CheckCircle, color: 'text-green-500' },
    warning: { icon: AlertTriangle, color: 'text-amber-500' },
    info: { icon: Clock, color: 'text-blue-500' },
};

export default function ActivityLogPage() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');

    const { data, isLoading } = useActivityLogs({
        page,
        limit: 10,
    });

    const logs = data?.logs || [];
    const pagination = data?.pagination;

    const filteredActivities = logs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (log.actorId && `${log.actorId.firstName} ${log.actorId.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = selectedType === 'all' || log.entityType === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
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

            <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl p-4">
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

                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
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

            <div className="bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl overflow-hidden">
                <div className="divide-y divide-gray-100 dark:divide-navy">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                            <p className="text-gray-500 mt-4">Loading activities...</p>
                        </div>
                    ) : filteredActivities.map((log) => {
                        const entityType = log.entityType?.toLowerCase() || 'system';
                        const config = typeConfig[entityType] || typeConfig.default;
                        const TypeIcon = config.icon;
                        const status = log.action.toLowerCase().includes('failed') ? 'warning' : 'success';
                        const StatusIcon = statusConfig[status as keyof typeof statusConfig].icon;

                        return (
                            <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-navy/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className={`h-10 w-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                                        <TypeIcon className={`h-5 w-5 ${config.color}`} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-navy dark:text-white uppercase text-xs tracking-wider">{log.action}</span>
                                            <StatusIcon className={`h-3 w-3 ${statusConfig[status as keyof typeof statusConfig].color}`} />
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{log.description}</p>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                                            {log.actorId && (
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
                                                        {log.actorId.firstName[0]}{log.actorId.lastName[0]}
                                                    </div>
                                                    <span>{log.actorId.firstName} {log.actorId.lastName}</span>
                                                </div>
                                            )}
                                            {!log.actorId && <span>System</span>}
                                            <span>•</span>
                                            <span>{formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}</span>
                                            {log.ipAddress && (
                                                <>
                                                    <span>•</span>
                                                    <span>IP: {log.ipAddress}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {(!isLoading && filteredActivities.length === 0) && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No activities found matching your criteria.</p>
                    </div>
                )}

                {pagination && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-navy">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Showing {filteredActivities.length} of {pagination.total} activities
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                disabled={page === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium text-navy dark:text-white">{page} of {pagination.totalPages}</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(prev => Math.min(pagination.totalPages, prev + 1))}
                                disabled={page === pagination.totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
