import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, CreditCard, Activity, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

const data = [
    { name: 'Mon', requests: 400, value: 240 },
    { name: 'Tue', requests: 300, value: 139 },
    { name: 'Wed', requests: 200, value: 980 },
    { name: 'Thu', requests: 278, value: 390 },
    { name: 'Fri', requests: 189, value: 480 },
    { name: 'Sat', requests: 239, value: 380 },
    { name: 'Sun', requests: 349, value: 430 },
];

function KPICard({ title, value, change, trend, icon: Icon }: { title: string, value: string, change: string, trend: 'up' | 'down', icon: any }) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-navy-light dark:bg-navy-light">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-navy dark:text-white">{value}</h3>
                </div>
                <div className={cn("rounded-xl p-3", trend === 'up' ? "bg-primary/10 text-primary" : "bg-red-50 text-red-500")}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
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
        </div>
    );
}

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-navy dark:text-white">Enterprise Analytics</h1>
                <p className="text-gray-500 dark:text-gray-400">Overview of your service performance</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <KPICard title="Total Requests" value="2,840" change="+12.4%" trend="up" icon={Activity} />
                <KPICard title="Active Requests" value="156" change="+5.2%" trend="up" icon={Clock} />
                <KPICard title="Avg. Resolution" value="4.2 hrs" change="-8.1%" trend="down" icon={Users} />
                <KPICard title="Total Value" value="₦4.2M" change="+15.0%" trend="up" icon={CreditCard} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Main Chart */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-navy-light dark:bg-navy-light">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-navy dark:text-white">Requests Over Time</h3>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
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
                    <div className="space-y-6">
                        {[
                            { label: 'Pending', count: 324, color: 'bg-primary', width: '45%' },
                            { label: 'In Progress', count: 842, color: 'bg-royal-blue', width: '75%' },
                            { label: 'Completed', count: 1250, color: 'bg-green-500', width: '90%' },
                            { label: 'Overdue', count: 124, color: 'bg-red-500', width: '20%' },
                        ].map((item) => (
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
                </div>
            </div>
        </div>
    );
}
