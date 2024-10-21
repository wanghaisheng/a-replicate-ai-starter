'use client';

import { CreditCard, Crown, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsGithub } from 'react-icons/bs';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { links } from '@/config';
import { useBilling } from '@/features/subscriptions/api/use-billing';
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';

import { SidebarItem } from './sidebar-item';

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();
  const { mutate: checkoutBilling } = useBilling();

  const onClick = () => {
    if (shouldBlock) return triggerPaywall();

    checkoutBilling();
  };

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <div className="px-3">
        {shouldBlock && (
          <>
            <Button
              onClick={triggerPaywall}
              disabled={isLoading}
              className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition"
              variant="outline"
              size="lg"
            >
              <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
              Upgrade to Image AI Pro
            </Button>

            <div className="px-3">
              <Separator />
            </div>
          </>
        )}
      </div>

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem href="/" label="Home" icon={Home} isActive={pathname === '/'} />
      </ul>

      <div className="px-3">
        <Separator />
      </div>

      <ul className="flex flex-col gap-y-1 px-3">
        {!shouldBlock && <SidebarItem href={pathname} label="Billing" icon={CreditCard} onClick={onClick} />}

        <Link href={links.sourceCode} target="_blank" rel="noreferrer noopener">
          <div className="flex items-center p-3 rounded-xl bg-transparent hover:bg-white transition">
            <BsGithub className="size-4 mr-2" />

            <span className="text-sm font-medium">Source Code</span>
          </div>
        </Link>
      </ul>
    </div>
  );
};
