import { BarChart3, TrendingUp, TrendingDown, Download, Calendar, Filter, ArrowUpRight, PieChart, Activity, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const areaData = [
    { month: 'Jan', requests: 186, completed: 165 },
    { month: 'Feb', requests: 305, completed: 280 },
    { month: 'Mar', requests: 237, completed: 220 },
    { month: 'Apr', requests: 473, completed: 450 },
    { month: 'May', requests: 209, completed: 195 },
    { month: 'Jun', requests: 514, completed: 490 },
    { month: 'Jul', requests: 398, completed: 375 },
];

const pieData = [
    { name: 'Operations', value: 400, color: '#fa8500' },
    { name: 'Finance', value: 300, color: '#002366' },
    { name: 'Sales', value: 200, color: '#3b82f6' },
    { name: 'Support', value: 100, color: '#10b981' },
];

const barData = [
    { day: 'Mon', active: 120 },
    { day: 'Tue', active: 180 },
    { day: 'Wed', active: 150 },
    { day: 'Thu', active: 210 },
    { day: 'Fri', active: 190 },
    { day: 'Sat', active: 80 },
    { day: 'Sun', active: 60 },
];

const metrics = [
    { label: 'Total Requests', value: '2,847', change: '+12.5%', trend: 'up', icon: BarChart3 },
    { label: 'Completion Rate', value: '94.2%', change: '+3.1%', trend: 'up', icon: TrendingUp },
    { label: 'Avg. Response Time', value: '2.4h', change: '-18%', trend: 'down', icon: Activity },
    { label: 'Active Users', value: '1,248', change: '+8%', trend: 'up', icon: Users },
];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-navy dark:text-white">Reports & Analytics</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track performance metrics and business insights.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="hidden sm:inline">Last 30 Days</span>
                    </Button>
                    <Button className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div key={metric.label} className="bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl p-4 md:p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                    {metric.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                    {metric.change}
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-navy dark:text-white">{metric.value}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{metric.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Area Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl p-5">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-navy dark:text-white">Request Trends</h3>
                            <p className="text-xs text-gray-500">Requests vs Completions</p>
                        </div>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-navy rounded-lg cursor-pointer">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </button>
                    </div>
                    <div className="h-64 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaData}>
                                <defs>
                                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#fa8500" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#fa8500" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#002366" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#002366" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                                <YAxis stroke="#9ca3af" fontSize={12} />
                                <Tooltip />
                                <Area type="monotone" dataKey="requests" stroke="#fa8500" strokeWidth={2} fill="url(#colorRequests)" />
                                <Area type="monotone" dataKey="completed" stroke="#002366" strokeWidth={2} fill="url(#colorCompleted)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl p-5">
                    <h3 className="text-lg font-bold text-navy dark:text-white mb-2">By Department</h3>
                    <p className="text-xs text-gray-500 mb-4">Request distribution</p>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RePieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {pieData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-xs text-gray-600 dark:text-gray-400">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl p-5">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-navy dark:text-white">Weekly Active Users</h3>
                        <p className="text-xs text-gray-500">Daily user activity this week</p>
                    </div>
                    <a href="#" className="text-sm text-primary font-medium flex items-center gap-1 cursor-pointer hover:underline">
                        View Details <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>
                <div className="h-48 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="active" fill="#fa8500" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
