import { format, parseISO } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, CreditCard, Activity, Clock, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useDashboardKpis, useRequestSummary, useTrends } from '../../features/reports';

function KPICard({ title, value, change, trend, icon: Icon, isLoading }: {
    title: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down';
    icon: React.ElementType;
    isLoading?: boolean;
}) {
    return (
        <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-400">{title}</p>
                    {isLoading ? (
                        <div className="mt-2 h-9 flex items-center">
                            <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                        </div>
                    ) : (
                        <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
                    )}
                </div>
                <div className={cn("rounded-xl p-3", trend === 'up' ? "bg-green-500/10 text-green-500" : trend === 'down' ? "bg-red-500/10 text-red-500" : "bg-zinc-800 text-zinc-400")}>
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
                    <span className="text-xs text-zinc-500">vs last month</span>
                </div>
            )}
        </div>
    );
}

export default function DashboardPage() {
    // Use real API hooks
    const { data: kpis, isLoading: kpisLoading } = useDashboardKpis();
    const { data: summary, isLoading: summaryLoading } = useRequestSummary();
    const { data: trends, isLoading: trendsLoading } = useTrends();

    // Chart data - transformed from API
    const chartData = trends?.daily ? trends.daily.map(t => ({
        name: format(parseISO(t.date), 'EEE'), // Convert YYYY-MM-DD to Mon, Tue...
        requests: t.count
    })).slice(-7) : []; // Show last 7 days

    // Fallback empty data if loading or no data
    if (!chartData.length && !trendsLoading) {
        // Optional: show empty placeholder or keep empty array
    }

    // Build status distribution from summary data
    const statusDistribution = summary ? [
        { label: 'Pending', count: summary.byStatus?.pending || 0, color: 'bg-orange-500', width: `${Math.min((summary.byStatus?.pending || 0) / 100 * 10, 100)}%` },
        { label: 'In Progress', count: summary.byStatus?.in_progress || 0, color: 'bg-blue-500', width: `${Math.min((summary.byStatus?.in_progress || 0) / 100 * 10, 100)}%` },
        { label: 'Completed', count: summary.byStatus?.completed || 0, color: 'bg-green-500', width: `${Math.min((summary.byStatus?.completed || 0) / 100 * 10, 100)}%` },
        { label: 'Overdue', count: summary.byStatus?.overdue || 0, color: 'bg-red-500', width: `${Math.min((summary.byStatus?.overdue || 0) / 100 * 10, 100)}%` },
    ] : [
        { label: 'Pending', count: 0, color: 'bg-orange-500', width: '0%' },
        { label: 'In Progress', count: 0, color: 'bg-blue-500', width: '0%' },
        { label: 'Completed', count: 0, color: 'bg-green-500', width: '0%' },
        { label: 'Overdue', count: 0, color: 'bg-red-500', width: '0%' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Enterprise Analytics</h1>
                <p className="text-zinc-400">Overview of your service performance</p>
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
                {/* Main Chart */}
                <div className="glass-panel rounded-2xl p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">Requests Over Time</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        {trendsLoading ? (
                            <div className="flex h-full items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                            </div>
                        ) : chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff1a" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#18181b', color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="requests" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-zinc-500">
                                No activity data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Distribution */}
                {/* Status Distribution */}
                <div className="glass-panel rounded-2xl p-6">
                    <h3 className="mb-6 text-lg font-bold text-white">Status Distribution</h3>
                    {summaryLoading ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {statusDistribution.map((item) => (
                                <div key={item.label}>
                                    <div className="mb-2 flex justify-between text-sm font-medium">
                                        <span className="text-zinc-200">{item.label}</span>
                                        <span className="font-bold text-zinc-500">{item.count}</span>
                                    </div>
                                    <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
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
