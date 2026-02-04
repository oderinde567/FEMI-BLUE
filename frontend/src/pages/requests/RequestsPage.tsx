import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MoreHorizontal, FileText, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useRequests, useMyRequests } from '../../features/requests';
import type { RequestItem } from '../../features/requests';

const statusStyles: Record<string, string> = {
    'in_progress': 'bg-royal-blue/10 text-royal-blue',
    'pending': 'bg-primary/10 text-primary',
    'completed': 'bg-green-100 text-green-600',
    'overdue': 'bg-red-100 text-red-600',
    'cancelled': 'bg-gray-100 text-gray-600',
};

const statusLabels: Record<string, string> = {
    'in_progress': 'In Progress',
    'pending': 'Pending',
    'completed': 'Completed',
    'overdue': 'Overdue',
    'cancelled': 'Cancelled',
};

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function RequestsPage() {
    const [activeTab, setActiveTab] = useState<'All' | 'My Requests' | 'Pending' | 'Completed'>('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Determine which hook to use based on active tab
    const filters = activeTab === 'Pending'
        ? { status: 'pending' as const }
        : activeTab === 'Completed'
            ? { status: 'completed' as const }
            : {};

    const { data: allRequestsData, isLoading: allLoading } = useRequests(activeTab !== 'My Requests' ? filters : undefined);
    const { data: myRequestsData, isLoading: myLoading } = useMyRequests();

    const isLoading = activeTab === 'My Requests' ? myLoading : allLoading;
    const requestsData = activeTab === 'My Requests' ? myRequestsData : allRequestsData;

    // Filter by search query
    const requests = requestsData?.requests?.filter((req: RequestItem) =>
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold text-navy dark:text-white">Service Requests</h1>
                <Link to="/requests/new">
                    <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        New Request
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-navy-light md:flex-row md:items-center md:justify-between">
                <div className="flex gap-2 border-b border-gray-100 pb-2 md:border-0 md:pb-0">
                    {(['All', 'My Requests', 'Pending', 'Completed'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                activeTab === tab
                                    ? "bg-primary text-white"
                                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search requests..."
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

            {/* Requests List */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-navy-light dark:bg-navy-light">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : requests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <FileText className="h-12 w-12 mb-4 text-gray-300" />
                        <p>No requests found</p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 dark:bg-navy/50 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-4 font-medium">Request ID</th>
                                <th className="px-6 py-4 font-medium">Subject</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-navy/50">
                            {requests.map((req: RequestItem) => (
                                <tr key={req.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                                    <td className="px-6 py-4 font-medium text-navy dark:text-white">
                                        <Link to={`/requests/${req.id}`} className="text-primary hover:underline">
                                            #{req.referenceNumber}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-navy dark:text-white">
                                        <Link to={`/requests/${req.id}`} className="hover:text-primary">{req.title}</Link>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 capitalize">
                                        {req.category.replace('_', ' ')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                            statusStyles[req.status] || 'bg-gray-100 text-gray-600'
                                        )}>
                                            {statusLabels[req.status] || req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                        {formatDate(req.createdAt)}
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
