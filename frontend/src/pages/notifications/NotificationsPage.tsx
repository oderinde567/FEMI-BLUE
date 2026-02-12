import { useState } from 'react';
import { CheckCircle, AlertTriangle, FileCheck, Settings } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

type NotificationType = 'assignment' | 'payment' | 'deadline' | 'completion';

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    requestId?: string;
}

const notifications: Notification[] = [
    { id: '1', type: 'assignment', title: 'New Request Assigned', message: 'A new professional service request #402-Lagos has been assigned to your team by the Logistics manager.', time: '10:30 AM WAT', isRead: false, requestId: '#402' },
    { id: '2', type: 'payment', title: 'Payment Confirmed', message: 'The deposit for request #388 has been verified. You can now proceed with the procurement phase.', time: '08:15 AM WAT', isRead: false, requestId: '#388' },
    { id: '3', type: 'deadline', title: 'Deadline Approaching', message: 'Reminder: Request #350 (IT Audit) is due in 24 hours. Please ensure all documentation is uploaded.', time: 'Yesterday, 04:45 PM WAT', isRead: true, requestId: '#350' },
    { id: '4', type: 'completion', title: 'Request Completed', message: 'Service request #312 has been marked as completed by the client. Well done!', time: 'Nov 12, 02:00 PM WAT', isRead: true, requestId: '#312' },
];

const typeConfig = {
    assignment: { icon: FileCheck, color: 'text-primary bg-primary/10 border-primary' },
    payment: { icon: CheckCircle, color: 'text-green-500 bg-green-50 border-green-500' },
    deadline: { icon: AlertTriangle, color: 'text-orange-500 bg-orange-50 border-orange-500' },
    completion: { icon: CheckCircle, color: 'text-gray-500 bg-gray-100 border-gray-300' },
};

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'mentions'>('all');
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);

    const tabs = [
        { id: 'all', label: 'All Activity' },
        { id: 'unread', label: 'Unread' },
        { id: 'mentions', label: 'Mentions' },
    ];

    const filteredNotifications = activeTab === 'unread'
        ? notifications.filter(n => !n.isRead)
        : notifications;

    const todayNotifications = filteredNotifications.slice(0, 2);
    const olderNotifications = filteredNotifications.slice(2);

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Notifications Feed */}
            <section className="flex-1 max-w-3xl">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <h1 className="text-3xl font-bold text-navy dark:text-white">Notifications</h1>
                    <Button variant="outline" size="sm">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark all as read
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-navy-light gap-8 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={cn(
                                "pb-3 text-sm font-bold transition-colors border-b-2",
                                activeTab === tab.id
                                    ? "text-primary border-primary"
                                    : "text-gray-500 border-transparent hover:text-navy dark:hover:text-white"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Notification Sections */}
                <div className="space-y-6">
                    {/* Today */}
                    {todayNotifications.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold text-navy dark:text-white mb-4">Today</h3>
                            <div className="space-y-3">
                                {todayNotifications.map((notification) => {
                                    const config = typeConfig[notification.type];
                                    const Icon = config.icon;
                                    return (
                                        <div
                                            key={notification.id}
                                            className={cn(
                                                "flex gap-4 bg-white dark:bg-navy-light px-5 py-4 rounded-xl shadow-sm border-l-4",
                                                config.color.split(' ')[2]
                                            )}
                                        >
                                            <div className={cn("flex items-center justify-center rounded-xl h-12 w-12 shrink-0", config.color.split(' ').slice(0, 2).join(' '))}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-navy dark:text-white">{notification.title}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                                                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Button size="sm">View Request</Button>
                                                <Button variant="ghost" size="sm">Dismiss</Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Older */}
                    {olderNotifications.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold text-navy dark:text-white mb-4">Older</h3>
                            <div className="space-y-3">
                                {olderNotifications.map((notification) => {
                                    const config = typeConfig[notification.type];
                                    const Icon = config.icon;
                                    return (
                                        <div
                                            key={notification.id}
                                            className="flex gap-4 bg-white/60 dark:bg-navy-light/50 px-5 py-4 rounded-xl shadow-sm opacity-75"
                                        >
                                            <div className={cn("flex items-center justify-center rounded-xl h-12 w-12 shrink-0", config.color.split(' ').slice(0, 2).join(' '))}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-navy dark:text-white">{notification.title}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                                                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Preferences Sidebar */}
            <aside className="w-full lg:w-96">
                <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm p-6 border border-gray-100 dark:border-navy sticky top-24">
                    <div className="flex items-center gap-3 mb-6">
                        <Settings className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold text-navy dark:text-white">Preferences</h2>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                        Choose how you want to be notified about activity on your requests and account.
                    </p>

                    <div className="space-y-8">
                        {/* Request Updates */}
                        <div>
                            <h4 className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider mb-4">Request Updates</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-navy dark:text-white">Email Alerts</p>
                                        <p className="text-xs text-gray-500">Receive instant project emails</p>
                                    </div>
                                    <button
                                        onClick={() => setEmailAlerts(!emailAlerts)}
                                        className={cn("w-11 h-6 rounded-full transition-colors relative", emailAlerts ? "bg-primary" : "bg-gray-200")}
                                    >
                                        <span className={cn("absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform", emailAlerts && "translate-x-5")} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-navy dark:text-white">Push Notifications</p>
                                        <p className="text-xs text-gray-500">In-browser desktop alerts</p>
                                    </div>
                                    <button
                                        onClick={() => setPushNotifications(!pushNotifications)}
                                        className={cn("w-11 h-6 rounded-full transition-colors relative", pushNotifications ? "bg-primary" : "bg-gray-200")}
                                    >
                                        <span className={cn("absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform", pushNotifications && "translate-x-5")} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Urgent Notifications */}
                        <div>
                            <h4 className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider mb-4">Urgent Notifications</h4>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-navy dark:text-white">SMS Notifications</p>
                                    <p className="text-xs text-gray-500">Critical deadlines & payments</p>
                                </div>
                                <button
                                    onClick={() => setSmsNotifications(!smsNotifications)}
                                    className={cn("w-11 h-6 rounded-full transition-colors relative", smsNotifications ? "bg-primary" : "bg-gray-200")}
                                >
                                    <span className={cn("absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform", smsNotifications && "translate-x-5")} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Button className="w-full">Save Preferences</Button>
                        <button className="w-full mt-3 text-sm font-medium text-gray-500 hover:text-primary py-2 transition-colors">
                            Restore Default Settings
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
