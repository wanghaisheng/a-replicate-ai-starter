'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const SignUpCard = () => {
  const onProviderSignUp = (provider: 'github' | 'google') => {
    signIn(provider, { redirectTo: '/' });
  };

  return (
    <Card className="size-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create an account</CardTitle>

        <CardDescription>Use your email or another service to continue.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <div className="flex flex-col gap-y-2.5">
          <Button onClick={() => onProviderSignUp('google')} variant="outline" size="lg" className="w-full relative">
            <FcGoogle className="size-5 mr-2 top-2.5 left-2.5 absolute" />
            Continue with Google
          </Button>

          <Button onClick={() => onProviderSignUp('github')} variant="outline" size="lg" className="w-full relative">
            <FaGithub className="size-5 mr-2 top-2.5 left-2.5 absolute" />
            Continue with GitHub
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link href="/sign-in">
            <span className="text-sky-700 hover:underline">Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
