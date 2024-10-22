'use client';

import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-6 max-w-xl">
        <AlertCircle className="mx-auto size-20 text-rose-500" />

        <h1 className="text-4xl font-bold text-gray-900">Oops! Something went wrong</h1>
        <p className="text-lg text-gray-600">We're sorry, but it seems there was an error processing your request. Please try again.</p>

        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>

          <Button onClick={reset}>
            <RefreshCw className="mr-2 size-3.5" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
