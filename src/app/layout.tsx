import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import { extractRouterConfig } from 'uploadthing/server';

import { appFileRouter } from '@/app/api/uploadthing/core';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Canva Clone',
  description: 'AI-Powered Canva clone using Next.js',
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased')}>
        <Providers>
          <NextSSRPlugin routerConfig={extractRouterConfig(appFileRouter)} />
          <Toaster theme="light" closeButton richColors />

          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
