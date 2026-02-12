import { useState, useEffect } from 'react';
import { Camera, Mail, Phone, Building2, MapPin, Save, User } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useAuthStore } from '../../store/useAuthStore';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    location: string;
    role: string;
    bio: string;
}

export default function ProfilePage() {
    const { user } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Initialize with user data from store + placeholders for missing fields
    const [profile, setProfile] = useState<UserProfile>({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: '',
        company: 'BlueArnk Technologies', // Placeholder/Default
        location: 'Lagos, Nigeria', // Placeholder/Default
        role: user?.role || 'Client',
        bio: '',
    });

    // Update local state if user store changes
    useEffect(() => {
        if (user) {
            setProfile(prev => ({
                ...prev,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            }));
        }
    }, [user]);

    const handleSave = async () => {
        setIsSaving(true);
        // TODO: Implement update profile API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        setIsEditing(false);
    };

    const handleChange = (field: keyof UserProfile, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-navy dark:text-white">My Profile</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your personal information and preferences.</p>
                </div>
                <div className="flex gap-3">
                    {isEditing ? (
                        <>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={isSaving}>
                                <Save className="h-4 w-4 mr-2" />
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl p-6">
                        {/* Avatar */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <div className="h-24 w-24 rounded-full bg-linear-to-br from-primary to-amber-500 flex items-center justify-center text-white text-3xl font-bold">
                                    {profile.firstName ? profile.firstName[0].toUpperCase() : 'U'}
                                    {profile.lastName ? profile.lastName[0].toUpperCase() : ''}
                                </div>
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary/90">
                                        <Camera className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-navy dark:text-white">
                                {profile.firstName} {profile.lastName}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{profile.role}</p>
                            <div className="mt-4 w-full">
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Building2 className="h-4 w-4" />
                                    {profile.company}
                                </div>
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    <MapPin className="h-4 w-4" />
                                    {profile.location}
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-navy grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-xl font-bold text-navy dark:text-white">127</p>
                                <p className="text-xs text-gray-500">Requests</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-navy dark:text-white">94%</p>
                                <p className="text-xs text-gray-500">Completed</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-navy dark:text-white">2.4h</p>
                                <p className="text-xs text-gray-500">Avg. Time</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-navy-light border border-gray-200 dark:border-navy rounded-xl p-6">
                        <h3 className="text-lg font-bold text-navy dark:text-white mb-6">Personal Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* First Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={profile.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white disabled:opacity-70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={profile.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white disabled:opacity-70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white disabled:opacity-70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white disabled:opacity-70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Company */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Company</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={profile.company}
                                        onChange={(e) => handleChange('company', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white disabled:opacity-70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={profile.location}
                                        onChange={(e) => handleChange('location', e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white disabled:opacity-70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="mt-5 space-y-2">
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Bio</label>
                            <textarea
                                value={profile.bio}
                                onChange={(e) => handleChange('bio', e.target.value)}
                                disabled={!isEditing}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy bg-gray-50 dark:bg-navy text-navy dark:text-white disabled:opacity-70 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
