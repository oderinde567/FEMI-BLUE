import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Upload, Info, FileText, Building2, Paperclip, CheckCircle, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const steps = [
    { id: 1, label: 'Request Details' },
    { id: 2, label: 'Department' },
    { id: 3, label: 'Attachments' },
    { id: 4, label: 'Review & Submit' },
];

const priorities = [
    { value: 'low', label: 'Low', sublabel: 'Standard', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', sublabel: 'Urgent', color: 'bg-orange-500' },
    { value: 'high', label: 'High', sublabel: 'Emergency', color: 'bg-red-500' },
];

const requestTypes = [
    { value: 'maintenance', label: 'Maintenance & Repairs' },
    { value: 'it', label: 'IT Support' },
    { value: 'logistics', label: 'Logistics & Supply' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'legal', label: 'Legal' },
];

const departments = [
    { value: 'facilities', label: 'Facilities Management' },
    { value: 'it', label: 'Information Technology' },
    { value: 'operations', label: 'Operations' },
    { value: 'procurement', label: 'Procurement' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
];

interface FormData {
    title: string;
    type: string;
    priority: string;
    description: string;
    department: string;
    assignee: string;
    attachments: File[];
}

export default function NewRequestPage() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const [formData, setFormData] = useState<FormData>({
        title: '',
        type: '',
        priority: 'medium',
        description: '',
        department: '',
        assignee: '',
        attachments: [],
    });

    const updateField = (field: keyof FormData, value: string | File[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when field is updated
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (step === 1) {
            if (!formData.title.trim()) {
                newErrors.title = 'Request title is required';
            }
            if (!formData.type) {
                newErrors.type = 'Please select a request type';
            }
            if (!formData.description.trim()) {
                newErrors.description = 'Description is required';
            }
        }

        if (step === 2) {
            if (!formData.department) {
                newErrors.department = 'Please select a department';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            updateField('attachments', [...formData.attachments, ...Array.from(files)]);
        }
    };

    const removeFile = (index: number) => {
        updateField('attachments', formData.attachments.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);

        // Redirect to requests list after success
        setTimeout(() => navigate('/requests'), 2500);
    };

    const getStepDescription = () => {
        switch (currentStep) {
            case 1: return 'Enter the basic details about your service need.';
            case 2: return 'Select the department and optionally assign to a specific officer.';
            case 3: return 'Upload any supporting documents or images.';
            case 4: return 'Review your request details before submitting.';
            default: return '';
        }
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20">
                <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-navy dark:text-white mb-4">Request Submitted Successfully!</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-2">Your request has been submitted and assigned ID:</p>
                <p className="text-2xl font-bold text-primary mb-6">#BA-{Math.floor(10000 + Math.random() * 90000)}</p>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    You'll receive an email confirmation shortly. Redirecting to requests...
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/requests">
                        <Button variant="outline">View All Requests</Button>
                    </Link>
                    <Link to="/requests/new">
                        <Button onClick={() => { setIsSuccess(false); setCurrentStep(1); setFormData({ title: '', type: '', priority: 'medium', description: '', department: '', assignee: '', attachments: [] }); }}>
                            Submit Another
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Page Heading */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-navy dark:text-white">New Service Request</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Submit your request to the management system for quick processing.</p>
                </div>
                <Link to="/requests">
                    <Button variant="outline" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Requests
                    </Button>
                </Link>
            </div>

            {/* Progress Bar Card */}
            <div className="bg-white dark:bg-navy-light rounded-xl shadow-sm border border-gray-100 dark:border-navy mb-8 p-6">
                <div className="flex items-center justify-between text-sm font-medium uppercase tracking-wider text-gray-400 mb-4">
                    {steps.map((step, index) => (
                        <span key={step.id} className={cn(
                            "flex items-center gap-2",
                            currentStep >= step.id ? "text-primary font-bold" : "opacity-50"
                        )}>
                            <span className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                                currentStep > step.id ? "bg-green-500 text-white" :
                                    currentStep === step.id ? "bg-primary text-white" : "bg-gray-100 dark:bg-navy text-gray-400"
                            )}>
                                {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                            </span>
                            <span className="hidden md:inline">{step.label}</span>
                            {index < steps.length - 1 && (
                                <div className={cn(
                                    "hidden md:block w-8 lg:w-16 h-0.5 mx-2",
                                    currentStep > step.id ? "bg-green-500" : "bg-gray-200 dark:bg-navy"
                                )} />
                            )}
                        </span>
                    ))}
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-navy rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">
                    Step {currentStep} of {steps.length}: {getStepDescription()}
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-navy-light rounded-xl shadow-lg border border-gray-100 dark:border-navy overflow-hidden">

                {/* Step 1: Request Details */}
                {currentStep === 1 && (
                    <div className="p-8">
                        <h2 className="text-xl font-bold text-navy dark:text-white mb-6 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Request Details
                        </h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-navy dark:text-white">Request Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => updateField('title', e.target.value)}
                                        placeholder="e.g. Server Room Air Conditioning Repair"
                                        className={cn(
                                            "w-full h-14 px-4 rounded-xl border bg-gray-50 dark:bg-navy text-navy dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all",
                                            errors.title ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-navy focus:border-primary"
                                        )}
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-navy dark:text-white">Request Type *</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => updateField('type', e.target.value)}
                                        className={cn(
                                            "w-full h-14 px-4 rounded-xl border bg-gray-50 dark:bg-navy text-navy dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer",
                                            errors.type ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-navy focus:border-primary"
                                        )}
                                    >
                                        <option value="">Select a service type</option>
                                        {requestTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                    {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy dark:text-white">Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => updateField('description', e.target.value)}
                                    placeholder="Describe the issue or request in detail..."
                                    rows={4}
                                    className={cn(
                                        "w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-navy text-navy dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none",
                                        errors.description ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-navy focus:border-primary"
                                    )}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            {/* Priority Selection */}
                            <div>
                                <label className="text-sm font-medium text-navy dark:text-white block mb-4">Priority Level</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {priorities.map((p) => (
                                        <label
                                            key={p.value}
                                            className={cn(
                                                "relative flex cursor-pointer rounded-xl border p-4 transition-colors",
                                                formData.priority === p.value
                                                    ? "border-2 border-primary bg-primary/5"
                                                    : "border-gray-200 dark:border-navy hover:bg-gray-50 dark:hover:bg-white/5"
                                            )}
                                        >
                                            <input
                                                type="radio"
                                                name="priority"
                                                value={p.value}
                                                checked={formData.priority === p.value}
                                                onChange={(e) => updateField('priority', e.target.value)}
                                                className="sr-only"
                                            />
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn("h-4 w-4 rounded-full", p.color)} />
                                                    <span className="font-semibold text-navy dark:text-white">{p.label}</span>
                                                </div>
                                                <span className="text-xs text-gray-500">{p.sublabel}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Department */}
                {currentStep === 2 && (
                    <div className="p-8">
                        <h2 className="text-xl font-bold text-navy dark:text-white mb-6 flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            Department & Assignment
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy dark:text-white">Target Department *</label>
                                <select
                                    value={formData.department}
                                    onChange={(e) => updateField('department', e.target.value)}
                                    className={cn(
                                        "w-full h-14 px-4 rounded-xl border bg-gray-50 dark:bg-navy text-navy dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer",
                                        errors.department ? "border-red-500 focus:border-red-500" : "border-gray-200 dark:border-navy focus:border-primary"
                                    )}
                                >
                                    <option value="">Select a department</option>
                                    {departments.map(dept => (
                                        <option key={dept.value} value={dept.value}>{dept.label}</option>
                                    ))}
                                </select>
                                {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-navy dark:text-white">Assigned Officer (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.assignee}
                                    onChange={(e) => updateField('assignee', e.target.value)}
                                    placeholder="Search by name or staff ID"
                                    className="w-full h-14 px-4 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Attachments */}
                {currentStep === 3 && (
                    <div className="p-8">
                        <h2 className="text-xl font-bold text-navy dark:text-white mb-6 flex items-center gap-2">
                            <Paperclip className="h-5 w-5 text-primary" />
                            File Attachments
                        </h2>
                        <div className="border-2 border-dashed border-gray-200 dark:border-navy rounded-xl p-10 flex flex-col items-center justify-center bg-gray-50 dark:bg-navy hover:bg-primary/5 transition-colors">
                            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
                                <Upload className="h-8 w-8" />
                            </div>
                            <p className="text-lg font-semibold text-navy dark:text-white mb-1">Drag and drop files here</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">PDF, PNG, JPG (Max. 10MB per file)</p>
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                <Button type="button" asChild><span>Browse Files</span></Button>
                            </label>
                        </div>

                        {/* Uploaded Files */}
                        {formData.attachments.length > 0 && (
                            <div className="mt-6 space-y-3">
                                <p className="text-sm font-medium text-navy dark:text-white">Uploaded Files ({formData.attachments.length})</p>
                                {formData.attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-navy">
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-primary" />
                                            <span className="text-sm text-navy dark:text-white">{file.name}</span>
                                            <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                                        </div>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="p-1 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-full transition-colors cursor-pointer"
                                        >
                                            <X className="h-4 w-4 text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                    <div className="p-8">
                        <h2 className="text-xl font-bold text-navy dark:text-white mb-6 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            Review Your Request
                        </h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-navy">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Title</p>
                                    <p className="font-semibold text-navy dark:text-white">{formData.title || '-'}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-navy">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Type</p>
                                    <p className="font-semibold text-navy dark:text-white">
                                        {requestTypes.find(t => t.value === formData.type)?.label || '-'}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-navy">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Priority</p>
                                    <div className="flex items-center gap-2">
                                        <div className={cn("h-3 w-3 rounded-full", priorities.find(p => p.value === formData.priority)?.color)} />
                                        <p className="font-semibold text-navy dark:text-white capitalize">{formData.priority}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-navy">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Department</p>
                                    <p className="font-semibold text-navy dark:text-white">
                                        {departments.find(d => d.value === formData.department)?.label || '-'}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-navy">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Description</p>
                                <p className="text-navy dark:text-white">{formData.description || '-'}</p>
                            </div>
                            {formData.attachments.length > 0 && (
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-navy">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Attachments ({formData.attachments.length})</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.attachments.map((file, index) => (
                                            <span key={index} className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">{file.name}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer Navigation */}
                <div className="p-8 bg-gray-50 dark:bg-navy/50 border-t border-gray-100 dark:border-navy flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Link to="/requests">
                        <Button variant="outline" className="flex items-center gap-2">
                            <X className="h-4 w-4" />
                            Cancel
                        </Button>
                    </Link>
                    <div className="flex gap-4">
                        {currentStep > 1 && (
                            <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Previous
                            </Button>
                        )}
                        {currentStep < steps.length ? (
                            <Button onClick={nextStep} className="flex items-center gap-2">
                                Next: {steps[currentStep]?.label}
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2 min-w-[160px]">
                                {isSubmitting ? 'Submitting...' : (
                                    <>
                                        <CheckCircle className="h-4 w-4" />
                                        Submit Request
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Helpful Tip */}
            <div className="mt-8 flex items-start gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-bold text-navy dark:text-white">Pro Tip</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Providing clear photos of the issue in Step 3 helps our team resolve your request up to 30% faster.</p>
                </div>
            </div>
        </div>
    );
}
