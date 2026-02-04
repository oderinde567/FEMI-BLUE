import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, CreditCard, Activity, Clock, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useDashboardKpis, useRequestSummary } from '../../features/reports';

function KPICard({ title, value, change, trend, icon: Icon, isLoading }: {
    title: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down';
    icon: React.ElementType;
    isLoading?: boolean;
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-navy-light dark:bg-navy-light">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    {isLoading ? (
                        <div className="mt-2 h-9 flex items-center">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    ) : (
                        <h3 className="mt-2 text-3xl font-bold text-navy dark:text-white">{value}</h3>
                    )}
                </div>
                <div className={cn("rounded-xl p-3", trend === 'up' ? "bg-primary/10 text-primary" : trend === 'down' ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500")}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            {change && (
                <div className="mt-4 flex items-center gap-2">
                    {trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className={cn("text-sm font-medium", trend === 'up' ? "text-green-500" : "text-red-500")}>
                        {change}
                    </span>
                    <span className="text-xs text-gray-400">vs last month</span>
                </div>
            )}
        </div>
    );
}

export default function DashboardPage() {
    // Use real API hooks
    const { data: kpis, isLoading: kpisLoading } = useDashboardKpis();
    const { data: summary, isLoading: summaryLoading } = useRequestSummary();

    // Chart data - will be replaced with real data from trends API
    const chartData = [
        { name: 'Mon', requests: 400 },
        { name: 'Tue', requests: 300 },
        { name: 'Wed', requests: 200 },
        { name: 'Thu', requests: 278 },
        { name: 'Fri', requests: 189 },
        { name: 'Sat', requests: 239 },
        { name: 'Sun', requests: 349 },
    ];

    // Build status distribution from summary data
    const statusDistribution = summary ? [
        { label: 'Pending', count: summary.byStatus?.pending || 0, color: 'bg-primary', width: `${Math.min((summary.byStatus?.pending || 0) / 100 * 10, 100)}%` },
        { label: 'In Progress', count: summary.byStatus?.in_progress || 0, color: 'bg-royal-blue', width: `${Math.min((summary.byStatus?.in_progress || 0) / 100 * 10, 100)}%` },
        { label: 'Completed', count: summary.byStatus?.completed || 0, color: 'bg-green-500', width: `${Math.min((summary.byStatus?.completed || 0) / 100 * 10, 100)}%` },
        { label: 'Overdue', count: summary.byStatus?.overdue || 0, color: 'bg-red-500', width: `${Math.min((summary.byStatus?.overdue || 0) / 100 * 10, 100)}%` },
    ] : [
        { label: 'Pending', count: 0, color: 'bg-primary', width: '0%' },
        { label: 'In Progress', count: 0, color: 'bg-royal-blue', width: '0%' },
        { label: 'Completed', count: 0, color: 'bg-green-500', width: '0%' },
        { label: 'Overdue', count: 0, color: 'bg-red-500', width: '0%' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-navy dark:text-white">Enterprise Analytics</h1>
                <p className="text-gray-500 dark:text-gray-400">Overview of your service performance</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <KPICard
                    title="Total Requests"
                    value={kpis?.totalRequests?.toLocaleString() || '0'}
                    change="+12.4%"
                    trend="up"
                    icon={Activity}
                    isLoading={kpisLoading}
                />
                <KPICard
                    title="Pending Requests"
                    value={kpis?.pendingRequests?.toLocaleString() || '0'}
                    change="+5.2%"
                    trend="up"
                    icon={Clock}
                    isLoading={kpisLoading}
                />
                <KPICard
                    title="Avg. Resolution"
                    value={kpis ? `${kpis.avgResolutionTime?.toFixed(1)} hrs` : '0 hrs'}
                    change="-8.1%"
                    trend="down"
                    icon={Users}
                    isLoading={kpisLoading}
                />
                <KPICard
                    title="Active Users"
                    value={kpis?.activeUsers?.toLocaleString() || '0'}
                    change="+15.0%"
                    trend="up"
                    icon={CreditCard}
                    isLoading={kpisLoading}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Main Chart */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-navy-light dark:bg-navy-light">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-navy dark:text-white">Requests Over Time</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FB8500" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#FB8500" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="requests" stroke="#FB8500" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-navy-light dark:bg-navy-light">
                    <h3 className="mb-6 text-lg font-bold text-navy dark:text-white">Status Distribution</h3>
                    {summaryLoading ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {statusDistribution.map((item) => (
                                <div key={item.label}>
                                    <div className="mb-2 flex justify-between text-sm font-medium">
                                        <span className="text-navy dark:text-white">{item.label}</span>
                                        <span className="font-bold text-gray-500 dark:text-gray-400">{item.count}</span>
                                    </div>
                                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-navy">
                                        <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: item.width }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
