import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Check, RefreshCw, Package, CheckCircle, User, FileText, CalendarDays, ArrowLeft, Clock, Building2, AlertCircle, Send, Paperclip, MessageSquare, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

// Mock request data - in a real app this would come from an API
const mockRequest = {
    id: 'BA-10294',
    title: 'Hardware Specification Review',
    description: 'Need IT team to review and approve the hardware specifications for the new server room upgrade. The current servers are 5 years old and showing signs of performance degradation during peak hours.',
    status: 'In Progress',
    priority: 'high',
    type: 'IT Support',
    department: 'Information Technology',
    createdAt: '2026-01-10T09:30:00',
    updatedAt: '2026-01-12T14:22:00',
    requestedBy: {
        name: 'Adebayo Okonkwo',
        email: 'adebayo@bluearnk.ng',
        avatar: 'AO',
    },
    assignedTo: {
        name: 'John Doe',
        email: 'john.doe@bluearnk.ng',
        avatar: 'JD',
    },
    attachments: [
        { name: 'server_specs.pdf', size: '2.4 MB' },
        { name: 'current_performance.xlsx', size: '156 KB' },
    ],
    timeline: [
        { id: 1, action: 'Request submitted', user: 'Adebayo Okonkwo', time: 'Jan 10, 9:30 AM', status: 'complete' },
        { id: 2, action: 'Assigned to John Doe', user: 'System', time: 'Jan 10, 9:45 AM', status: 'complete' },
        { id: 3, action: 'Status changed to In Progress', user: 'John Doe', time: 'Jan 11, 10:00 AM', status: 'current' },
        { id: 4, action: 'Review pending', user: '', time: '', status: 'upcoming' },
        { id: 5, action: 'Completion', user: '', time: '', status: 'upcoming' },
    ],
    comments: [
        { id: 1, user: 'John Doe', avatar: 'JD', message: "I'm currently reviewing the hardware specifications. We expect to have a full assessment ready by the end of today.", time: '2 hours ago' },
        { id: 2, user: 'Adebayo Okonkwo', avatar: 'AO', message: 'Great, please let me know if you need any additional documentation.', time: '1 hour ago' },
    ],
};

const steps = [
    { id: 'submitted', label: 'Submitted', icon: Check, status: 'complete' },
    { id: 'progress', label: 'In Progress', icon: RefreshCw, status: 'current' },
    { id: 'review', label: 'Review', icon: Package, status: 'upcoming' },
    { id: 'completed', label: 'Completed', icon: CheckCircle, status: 'upcoming' },
];

const stepperStyles = {
    complete: 'bg-royal-blue text-white',
    current: 'bg-royal-blue text-white ring-4 ring-royal-blue/20 scale-110',
    upcoming: 'bg-gray-100 text-gray-400 border border-gray-200 dark:bg-navy dark:border-navy-light',
};

const statusColors: Record<string, string> = {
    'Pending': 'bg-primary/10 text-primary',
    'In Progress': 'bg-royal-blue/10 text-royal-blue',
    'Completed': 'bg-green-100 text-green-600',
    'Overdue': 'bg-red-100 text-red-600',
};

const priorityColors: Record<string, { bg: string, text: string, dot: string }> = {
    low: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
    medium: { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-500' },
    high: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
};

export default function RequestDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newComment, setNewComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [comments, setComments] = useState(mockRequest.comments);
    const [showActions, setShowActions] = useState(false);

    const request = { ...mockRequest, id: id || mockRequest.id };
    const priority = priorityColors[request.priority] || priorityColors.medium;

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        setIsSubmittingComment(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setComments([...comments, {
            id: comments.length + 1,
            user: 'You',
            avatar: 'YU',
            message: newComment,
            time: 'Just now',
        }]);
        setNewComment('');
        setIsSubmittingComment(false);
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <Link to="/requests" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary cursor-pointer">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Requests
                </Link>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                    </Button>
                    <div className="relative">
                        <Button variant="outline" size="icon" onClick={() => setShowActions(!showActions)} className="h-9 w-9">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                        {showActions && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-navy-light rounded-lg shadow-xl border border-gray-100 dark:border-navy py-2 z-10">
                                <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-navy cursor-pointer flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    Mark as Complete
                                </button>
                                <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-navy cursor-pointer flex items-center gap-2 text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                    Delete Request
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Request Card */}
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-navy overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-navy">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="text-sm font-bold text-primary">#{request.id}</span>
                                <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", statusColors[request.status])}>
                                    {request.status}
                                </span>
                                <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1", priority.bg, priority.text)}>
                                    <span className={cn("h-2 w-2 rounded-full", priority.dot)} />
                                    {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-navy dark:text-white mb-2">{request.title}</h1>
                            <p className="text-gray-600 dark:text-gray-400">{request.description}</p>
                        </div>

                        {/* Status Stepper */}
                        <div className="p-6 bg-gray-50 dark:bg-navy/30">
                            <h3 className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider mb-6">Progress Tracker</h3>
                            <div className="relative flex items-center justify-between">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    return (
                                        <div key={step.id} className="flex flex-col items-center gap-2 relative z-10 flex-1">
                                            <div className={cn(
                                                "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                                                stepperStyles[step.status as keyof typeof stepperStyles]
                                            )}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <span className={cn(
                                                "text-xs font-bold text-center",
                                                step.status === 'current' ? 'text-navy dark:text-white' :
                                                    step.status === 'complete' ? 'text-royal-blue' : 'text-gray-400'
                                            )}>
                                                {step.label}
                                            </span>
                                            {index < steps.length - 1 && (
                                                <div className={cn(
                                                    "absolute top-5 left-1/2 w-full h-0.5 -z-10",
                                                    step.status === 'complete' ? 'bg-royal-blue' : 'bg-gray-200 dark:bg-navy'
                                                )} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-navy overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-navy">
                            <h3 className="text-lg font-bold text-navy dark:text-white flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                Comments ({comments.length})
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-navy">
                            {comments.map((comment) => (
                                <div key={comment.id} className="p-6">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary to-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            {comment.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-navy dark:text-white">{comment.user}</span>
                                                <span className="text-xs text-gray-400">{comment.time}</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400">{comment.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Add Comment */}
                        <div className="p-6 bg-gray-50 dark:bg-navy/30">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-navy flex items-center justify-center text-gray-500 font-bold text-sm shrink-0">
                                    YU
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy bg-white dark:bg-navy-light text-navy dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                    />
                                    <div className="flex justify-end mt-3">
                                        <Button onClick={handleAddComment} disabled={isSubmittingComment || !newComment.trim()}>
                                            <Send className="h-4 w-4 mr-2" />
                                            {isSubmittingComment ? 'Sending...' : 'Send'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Details Card */}
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-navy p-6">
                        <h3 className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider mb-4">Request Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Building2 className="h-5 w-5 text-gray-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Department</p>
                                    <p className="font-medium text-navy dark:text-white">{request.department}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FileText className="h-5 w-5 text-gray-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                                    <p className="font-medium text-navy dark:text-white">{request.type}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CalendarDays className="h-5 w-5 text-gray-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Created</p>
                                    <p className="font-medium text-navy dark:text-white">
                                        {new Date(request.createdAt).toLocaleDateString('en-NG', { dateStyle: 'medium' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-gray-400 shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Last Updated</p>
                                    <p className="font-medium text-navy dark:text-white">
                                        {new Date(request.updatedAt).toLocaleDateString('en-NG', { dateStyle: 'medium' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* People Card */}
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-navy p-6">
                        <h3 className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider mb-4">People</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Requested By</p>
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-linear-to-br from-primary to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                                        {request.requestedBy.avatar}
                                    </div>
                                    <div>
                                        <p className="font-medium text-navy dark:text-white text-sm">{request.requestedBy.name}</p>
                                        <p className="text-xs text-gray-500">{request.requestedBy.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Assigned To</p>
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-royal-blue flex items-center justify-center text-white font-bold text-sm">
                                        {request.assignedTo.avatar}
                                    </div>
                                    <div>
                                        <p className="font-medium text-navy dark:text-white text-sm">{request.assignedTo.name}</p>
                                        <p className="text-xs text-gray-500">{request.assignedTo.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attachments Card */}
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-navy p-6">
                        <h3 className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Paperclip className="h-4 w-4" />
                            Attachments ({request.attachments.length})
                        </h3>
                        <div className="space-y-2">
                            {request.attachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-navy hover:bg-gray-100 dark:hover:bg-navy/70 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-primary" />
                                        <span className="text-sm font-medium text-navy dark:text-white">{file.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{file.size}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Timeline Card */}
                    <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-navy p-6">
                        <h3 className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider mb-4">Activity</h3>
                        <div className="relative">
                            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-navy" />
                            <div className="space-y-4">
                                {request.timeline.filter(t => t.time).map((item) => (
                                    <div key={item.id} className="flex gap-4 relative">
                                        <div className={cn(
                                            "h-4 w-4 rounded-full shrink-0 z-10",
                                            item.status === 'complete' ? 'bg-green-500' :
                                                item.status === 'current' ? 'bg-royal-blue' : 'bg-gray-300'
                                        )} />
                                        <div>
                                            <p className="text-sm text-navy dark:text-white font-medium">{item.action}</p>
                                            <p className="text-xs text-gray-500">{item.user && `${item.user} • `}{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
