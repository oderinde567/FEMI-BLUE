import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import EmailVerificationPage from './pages/auth/EmailVerificationPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import RequestsPage from './pages/requests/RequestsPage';
import RequestDetailPage from './pages/requests/RequestDetailPage';
import NewRequestPage from './pages/requests/NewRequestPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import SettingsPage from './pages/settings/SettingsPage';
import SecuritySettingsPage from './pages/settings/SecuritySettingsPage';
import ReportsPage from './pages/reports/ReportsPage';
import ProfilePage from './pages/profile/ProfilePage';
import LandingPage from './pages/landing/LandingPage';
import NotFoundPage from './pages/errors/NotFoundPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import ActivityLogPage from './pages/admin/ActivityLogPage';
import PricingPage from './pages/marketing/PricingPage';
import AboutPage from './pages/marketing/AboutPage';
import ContactPage from './pages/marketing/ContactPage';
import FAQPage from './pages/marketing/FAQPage';
import TermsPage from './pages/legal/TermsPage';
import PrivacyPage from './pages/legal/PrivacyPage';

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
