import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-navy dark:text-white mb-4">Page Not Found</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/">
                        <Button className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Go to Dashboard
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
