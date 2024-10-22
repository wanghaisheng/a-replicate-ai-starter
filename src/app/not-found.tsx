'use client';

import { ArrowLeft, FileQuestion, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-6 max-w-xl">
        <FileQuestion className="mx-auto size-20 text-blue-500" />

        <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600">
          Oops! It looks like the page you're looking for doesn't exist. Maybe it was moved or renamed?
        </p>

        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 size-4" />
            Go Back
          </Button>

          <Button asChild>
            <Link href="/">
              <Home className="mr-2 size-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
