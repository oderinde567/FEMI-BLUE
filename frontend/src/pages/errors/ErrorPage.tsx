import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function ErrorPage() {
    const error = useRouteError();
    let errorMessage = 'An unexpected error occurred';
    let errorStatus = 'Error';

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText || error.data?.message;
        errorStatus = `${error.status}`;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 text-center">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-zinc-900/50 p-8 shadow-xl ring-1 ring-white/10 backdrop-blur-xl">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-red-500/10 p-4 ring-1 ring-red-500/20">
                        <AlertCircle className="h-12 w-12 text-red-500" />
                    </div>
                </div>

                <h1 className="mb-2 text-3xl font-bold text-white">{errorStatus}</h1>
                <p className="mb-8 text-zinc-400">{errorMessage}</p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Reload Page
                    </button>
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 rounded-xl bg-zinc-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-700"
                    >
                        <Home className="h-4 w-4" />
                        Go Home
                    </Link>
                </div>

                {import.meta.env.DEV && error instanceof Error && (
                    <div className="mt-8 overflow-hidden rounded-lg bg-black/50 p-4 text-left">
                        <p className="mb-2 text-xs font-mono text-zinc-500">Stack Trace:</p>
                        <pre className="max-h-40 overflow-auto text-xs font-mono text-red-400">
                            {error.stack}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
