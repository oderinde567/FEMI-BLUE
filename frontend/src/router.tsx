import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthGuard } from './components/AuthGuard';
import { DashboardLayout } from './layouts/DashboardLayout';

// ... existing code ...

// Authenticated Dashboard

// Eager imports for critical path (Auth & Landing)
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Lazy imports for heavy dashboard features
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const RequestsPage = lazy(() => import('./pages/requests/RequestsPage'));
const RequestDetailPage = lazy(() => import('./pages/requests/RequestDetailPage'));
const NewRequestPage = lazy(() => import('./pages/requests/NewRequestPage'));
const NotificationsPage = lazy(() => import('./pages/notifications/NotificationsPage'));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));
const SecuritySettingsPage = lazy(() => import('./pages/settings/SecuritySettingsPage'));
const ReportsPage = lazy(() => import('./pages/reports/ReportsPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));

// Admin pages
const UserManagementPage = lazy(() => import('./pages/admin/UserManagementPage'));
const ActivityLogPage = lazy(() => import('./pages/admin/ActivityLogPage'));

// Legal & Marketing (can also be lazy if they are large)
const PricingPage = lazy(() => import('./pages/marketing/PricingPage'));
const AboutPage = lazy(() => import('./pages/marketing/AboutPage'));
const ContactPage = lazy(() => import('./pages/marketing/ContactPage'));
const FAQPage = lazy(() => import('./pages/marketing/FAQPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));

// Error pages
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import EmailVerificationPage from './pages/auth/EmailVerificationPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import NotFoundPage from './pages/errors/NotFoundPage';
import ErrorPage from './pages/errors/ErrorPage';

// Loading Spinner Component
const PageLoader = () => (
    <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
    </div>
);

export const router = createBrowserRouter([
    // Public Landing Page
    {
        path: '/home',
        element: <LandingPage />,
        errorElement: <ErrorPage />,
    },

    // Marketing Pages
    {
        path: '/pricing',
        element: <Suspense fallback={<PageLoader />}><PricingPage /></Suspense>,
    },
    {
        path: '/about',
        element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense>,
    },
    {
        path: '/contact',
        element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense>,
    },
    {
        path: '/faq',
        element: <Suspense fallback={<PageLoader />}><FAQPage /></Suspense>,
    },
    // Legal Pages
    {
        path: '/terms',
        element: <Suspense fallback={<PageLoader />}><TermsPage /></Suspense>,
    },
    {
        path: '/privacy',
        element: <Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense>,
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

    // Authenticated Dashboard
    {
        path: '/',
        element: (
            <AuthGuard>
                <DashboardLayout />
            </AuthGuard>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>,
            },
            {
                path: 'requests',
                element: <Suspense fallback={<PageLoader />}><RequestsPage /></Suspense>,
            },
            {
                path: 'requests/new',
                element: <Suspense fallback={<PageLoader />}><NewRequestPage /></Suspense>,
            },
            {
                path: 'requests/:id',
                element: <Suspense fallback={<PageLoader />}><RequestDetailPage /></Suspense>,
            },
            {
                path: 'notifications',
                element: <Suspense fallback={<PageLoader />}><NotificationsPage /></Suspense>,
            },
            {
                path: 'settings',
                element: <Suspense fallback={<PageLoader />}><SettingsPage /></Suspense>,
            },
            {
                path: 'settings/security',
                element: <Suspense fallback={<PageLoader />}><SecuritySettingsPage /></Suspense>,
            },
            {
                path: 'reports',
                element: <Suspense fallback={<PageLoader />}><ReportsPage /></Suspense>,
            },
            {
                path: 'admin/users',
                element: <Suspense fallback={<PageLoader />}><UserManagementPage /></Suspense>,
            },
            {
                path: 'admin/activity',
                element: <Suspense fallback={<PageLoader />}><ActivityLogPage /></Suspense>,
            },
            {
                path: 'profile',
                element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense>,
            },
        ],
    },

    // 404 Catch-all
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
