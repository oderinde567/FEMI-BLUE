import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import ForgotPasswordPage from './features/auth/ForgotPasswordPage';
import EmailVerificationPage from './features/auth/EmailVerificationPage';
import ResetPasswordPage from './features/auth/ResetPasswordPage';
import RequestsPage from './features/requests/RequestsPage';
import RequestDetailPage from './features/requests/RequestDetailPage';
import NewRequestPage from './features/requests/NewRequestPage';
import NotificationsPage from './features/notifications/NotificationsPage';
import SettingsPage from './features/settings/SettingsPage';
import SecuritySettingsPage from './features/settings/SecuritySettingsPage';
import ReportsPage from './features/reports/ReportsPage';
import ProfilePage from './features/profile/ProfilePage';
import LandingPage from './features/landing/LandingPage';
import NotFoundPage from './features/errors/NotFoundPage';
import UserManagementPage from './features/admin/UserManagementPage';
import ActivityLogPage from './features/admin/ActivityLogPage';
import PricingPage from './features/marketing/PricingPage';
import AboutPage from './features/marketing/AboutPage';
import ContactPage from './features/marketing/ContactPage';
import FAQPage from './features/marketing/FAQPage';
import TermsPage from './features/legal/TermsPage';
import PrivacyPage from './features/legal/PrivacyPage';

export const router = createBrowserRouter([
    // Public Landing Page
    {
        path: '/home',
        element: <LandingPage />,
    },
    // Marketing Pages
    {
        path: '/pricing',
        element: <PricingPage />,
    },
    {
        path: '/about',
        element: <AboutPage />,
    },
    {
        path: '/contact',
        element: <ContactPage />,
    },
    {
        path: '/faq',
        element: <FAQPage />,
    },
    // Legal Pages
    {
        path: '/terms',
        element: <TermsPage />,
    },
    {
        path: '/privacy',
        element: <PrivacyPage />,
    },
    // Authenticated Dashboard
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: 'requests',
                element: <RequestsPage />,
            },
            {
                path: 'requests/new',
                element: <NewRequestPage />,
            },
            {
                path: 'requests/:id',
                element: <RequestDetailPage />,
            },
            {
                path: 'notifications',
                element: <NotificationsPage />,
            },
            {
                path: 'settings',
                element: <SettingsPage />,
            },
            {
                path: 'settings/security',
                element: <SecuritySettingsPage />,
            },
            {
                path: 'reports',
                element: <ReportsPage />,
            },
            {
                path: 'admin/users',
                element: <UserManagementPage />,
            },
            {
                path: 'admin/activity',
                element: <ActivityLogPage />,
            },
            {
                path: 'profile',
                element: <ProfilePage />,
            },
        ],
    },
    // Auth Routes
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
    },
    {
        path: '/verify-email',
        element: <EmailVerificationPage />,
    },
    {
        path: '/reset-password',
        element: <ResetPasswordPage />,
    },
    // 404 Catch-all
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
