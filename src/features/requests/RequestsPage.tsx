import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MoreHorizontal, FileText } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const requests = [
    { id: 'BA-10294', title: 'Hardware Specification Review', status: 'In Progress', dept: 'IT Support', date: 'Today, 10:30 AM', priority: 'High' },
    { id: 'BA-10295', title: 'Q4 Financial Audit', status: 'Pending', dept: 'Finance', date: 'Yesterday', priority: 'Medium' },
    { id: 'BA-10296', title: 'New Employee Onboarding', status: 'Completed', dept: 'HR', date: 'Jan 10', priority: 'Low' },
    { id: 'BA-10297', title: 'Server Maintenance', status: 'Overdue', dept: 'IT Infra', date: 'Jan 08', priority: 'High' },
    { id: 'BA-10298', title: 'Legal Contract Review', status: 'In Progress', dept: 'Legal', date: 'Jan 05', priority: 'Medium' },
];

const statusStyles = {
    'In Progress': 'bg-royal-blue/10 text-royal-blue',
    'Pending': 'bg-primary/10 text-primary',
    'Completed': 'bg-green-100 text-green-600',
    'Overdue': 'bg-red-100 text-red-600',
};

export default function RequestsPage() {
    const [activeTab, setActiveTab] = useState('All');

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
                    {['All', 'My Requests', 'Pending', 'Completed'].map((tab) => (
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
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 dark:bg-navy/50 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Request ID</th>
                            <th className="px-6 py-4 font-medium">Subject</th>
                            <th className="px-6 py-4 font-medium">Department</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-navy/50">
                        {requests.map((req) => (
                            <tr key={req.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                                <td className="px-6 py-4 font-medium text-navy dark:text-white">
                                    <Link to={`/requests/${req.id}`} className="text-primary hover:underline">#{req.id}</Link>
                                </td>
                                <td className="px-6 py-4 font-medium text-navy dark:text-white">
                                    <Link to={`/requests/${req.id}`} className="hover:text-primary">{req.title}</Link>
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{req.dept}</td>
                                <td className="px-6 py-4">
                                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyles[req.status as keyof typeof statusStyles])}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{req.date}</td>
                                <td className="px-6 py-4">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-navy">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
