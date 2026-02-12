import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, FileCheck, Settings, BellOff } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { getNotifications, markAllAsRead, markAsRead, deleteNotification } from '../../features/notifications/api/notifications-api';
import type { Notification } from '../../features/notifications/types';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';

const typeConfig: Record<string, { icon: any, color: string }> = {
    assignment: { icon: FileCheck, color: 'text-primary bg-primary/10 border-primary' },
    payment: { icon: CheckCircle, color: 'text-green-500 bg-green-50 border-green-500' },
    deadline: { icon: AlertTriangle, color: 'text-orange-500 bg-orange-50 border-orange-500' },
    completion: { icon: CheckCircle, color: 'text-gray-500 bg-gray-100 border-gray-300' },
    default: { icon: FileCheck, color: 'text-primary bg-primary/10 border-primary' },
};

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'mentions'>('all');
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const tabs = [
        { id: 'all', label: 'All Activity' },
        { id: 'unread', label: 'Unread' },
        { id: 'mentions', label: 'Mentions' },
    ];

    useEffect(() => {
        fetchNotifications();
    }, [activeTab]);

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const params = activeTab === 'unread' ? { isRead: false } : {};
            const data = await getNotifications(params);
            setNotifications(data.notifications);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, readAt: new Date().toISOString() })));
            toast.success('All notifications marked as read');
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await markAsRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? ({ ...n, readAt: new Date().toISOString() }) : n));
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteNotification(id);
            setNotifications(prev => prev.filter(n => n.id !== id));
            toast.success('Notification dismissed');
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayNotifications = notifications.filter(n => new Date(n.createdAt) >= today);
    const olderNotifications = notifications.filter(n => new Date(n.createdAt) < today);

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Notifications Feed */}
            <section className="flex-1 max-w-3xl">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <h1 className="text-3xl font-bold text-navy dark:text-white">Notifications</h1>
                    <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
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
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-navy-light rounded-2xl border border-dashed border-gray-200 dark:border-navy">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                            <p className="text-gray-500 mt-4">Loading notifications...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-navy-light rounded-2xl border border-dashed border-gray-200 dark:border-navy text-center px-4">
                            <div className="bg-gray-100 dark:bg-navy p-4 rounded-full mb-4">
                                <BellOff className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-navy dark:text-white">All caught up!</h3>
                            <p className="text-gray-500 max-w-xs mx-auto">You don't have any notifications {activeTab === 'unread' ? 'that you haven\'t read yet' : ''}.</p>
                        </div>
                    ) : (
                        <>
                            {/* Today */}
                            {todayNotifications.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-navy dark:text-white mb-4">Today</h3>
                                    <div className="space-y-3">
                                        {todayNotifications.map((notification) => {
                                            const config = typeConfig[notification.type] || typeConfig.default;
                                            const Icon = config.icon;
                                            return (
                                                <div
                                                    key={notification.id}
                                                    className={cn(
                                                        "flex gap-4 bg-white dark:bg-navy-light px-5 py-4 rounded-xl shadow-sm border-l-4",
                                                        notification.readAt ? "border-transparent opacity-75" : config.color.split(' ')[2]
                                                    )}
                                                    onClick={() => !notification.readAt && handleMarkAsRead(notification.id)}
                                                >
                                                    <div className={cn("flex items-center justify-center rounded-xl h-12 w-12 shrink-0", config.color.split(' ').slice(0, 2).join(' '))}>
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-navy dark:text-white">{notification.title}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                                                        <p className="text-xs text-gray-400 mt-2">
                                                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        {notification.data?.requestId && (
                                                            <Button size="sm" onClick={(e) => {
                                                                e.stopPropagation();
                                                                window.location.href = `/requests/${notification.data?.requestId}`;
                                                            }}>View Request</Button>
                                                        )}
                                                        <Button variant="ghost" size="sm" onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(notification.id);
                                                        }}>Dismiss</Button>
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
                                            const config = typeConfig[notification.type] || typeConfig.default;
                                            const Icon = config.icon;
                                            return (
                                                <div
                                                    key={notification.id}
                                                    className={cn(
                                                        "flex gap-4 bg-white/60 dark:bg-navy-light/50 px-5 py-4 rounded-xl shadow-sm",
                                                        notification.readAt ? "opacity-60" : "opacity-90 border-l-4 " + config.color.split(' ')[2]
                                                    )}
                                                    onClick={() => !notification.readAt && handleMarkAsRead(notification.id)}
                                                >
                                                    <div className={cn("flex items-center justify-center rounded-xl h-12 w-12 shrink-0", config.color.split(' ').slice(0, 2).join(' '))}>
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-navy dark:text-white">{notification.title}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                                                        <p className="text-xs text-gray-400 mt-2">
                                                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Button variant="ghost" size="sm" onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(notification.id);
                                                        }}>Dismiss</Button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
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
