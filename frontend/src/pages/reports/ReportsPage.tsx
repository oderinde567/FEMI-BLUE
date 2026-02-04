import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useDashboardKpis, useRequestSummary, useTrends } from '../../features/reports';

const COLORS = ['#FB8500', '#3B82F6', '#22C55E', '#EF4444'];

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

    // Use real API hooks
    const { data: kpis, isLoading: kpisLoading } = useDashboardKpis();
    const { data: summary, isLoading: summaryLoading } = useRequestSummary();
    const { data: trends, isLoading: trendsLoading } = useTrends({ groupBy: dateRange === '7d' ? 'day' : dateRange === '30d' ? 'day' : 'week' });

    const isLoading = kpisLoading || summaryLoading || trendsLoading;

    // Build pie chart data from summary
    const pieData = summary ? [
        { name: 'Pending', value: summary.byStatus?.pending || 0 },
        { name: 'In Progress', value: summary.byStatus?.in_progress || 0 },
        { name: 'Completed', value: summary.byStatus?.completed || 0 },
        { name: 'Overdue', value: summary.byStatus?.overdue || 0 },
    ].filter(d => d.value > 0) : [];

    // Build category bar chart data
    const categoryData = summary ? Object.entries(summary.byCategory || {}).map(([name, value]) => ({
        name: name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        count: value as number,
    })) : [];

    // Build trend line chart data
    const trendData = trends?.daily?.map(d => ({
        date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: d.count,
    })) || [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-navy dark:text-white">Reports & Analytics</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track performance and insights</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex rounded-lg border border-gray-200 bg-white p-1 dark:border-navy-light dark:bg-navy-light">
                        {(['7d', '30d', '90d'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                className={cn(
                                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                                    dateRange === range
                                        ? "bg-primary text-white"
                                        : "text-gray-500 hover:text-navy dark:text-gray-400"
                                )}
                            >
                                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                            </button>
                        ))}
                    </div>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            ) : (
                <>
                    {/* KPI Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-navy-light dark:bg-navy-light">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">Total Requests</p>
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            </div>
                            <p className="mt-2 text-2xl font-bold text-navy dark:text-white">
                                {kpis?.totalRequests?.toLocaleString() || 0}
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-navy-light dark:bg-navy-light">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">Completed</p>
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            </div>
                            <p className="mt-2 text-2xl font-bold text-navy dark:text-white">
                                {kpis?.completedRequests?.toLocaleString() || 0}
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-navy-light dark:bg-navy-light">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">Avg Resolution</p>
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            </div>
                            <p className="mt-2 text-2xl font-bold text-navy dark:text-white">
                                {kpis?.avgResolutionTime?.toFixed(1) || 0} hrs
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-navy-light dark:bg-navy-light">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">Overdue</p>
                                <Calendar className="h-4 w-4 text-orange-500" />
                            </div>
                            <p className="mt-2 text-2xl font-bold text-navy dark:text-white">
                                {kpis?.overdueRequests?.toLocaleString() || 0}
                            </p>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Requests Trend */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-navy-light dark:bg-navy-light">
                            <h3 className="mb-6 text-lg font-bold text-navy dark:text-white">Request Trends</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#FB8500" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#FB8500" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Area type="monotone" dataKey="count" stroke="#FB8500" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Status Distribution Pie */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-navy-light dark:bg-navy-light">
                            <h3 className="mb-6 text-lg font-bold text-navy dark:text-white">Status Distribution</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                        >
                                            {pieData.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Category Breakdown */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-navy-light dark:bg-navy-light lg:col-span-2">
                            <h3 className="mb-6 text-lg font-bold text-navy dark:text-white">Requests by Category</h3>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={categoryData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                                        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} width={100} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
