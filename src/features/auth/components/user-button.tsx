'use client';

import { CreditCard, Crown, Loader2, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBilling } from '@/features/subscriptions/api/use-billing';
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';

export const UserButton = () => {
  const session = useSession();
  const { mutate: checkoutBilling, isPending: isPendingBilling } = useBilling();
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

  const onClick = () => {
    if (shouldBlock) return triggerPaywall();

    checkoutBilling();
  };

  if (session.status === 'loading') {
    return <Loader2 className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === 'unauthenticated' || !session.data) return null;

  const name = session.data?.user?.name || '';
  const image = session.data?.user?.image || '';

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        {!shouldBlock && !isLoading && (
          <div className="absolute -top-1 -left-1 z-10 flex items-center justify-center">
            <div className="rounded-full bg-white flex items-center justify-center p-1 drop-shadow-sm">
              <Crown className="size-3 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        )}

        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage src={image} alt={name} />

          <AvatarFallback className="bg-blue-500 font-medium text-white">{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        {!shouldBlock && !isLoading && (
          <>
            <DropdownMenuItem disabled={isPendingBilling} onClick={onClick} className="h-10">
              <CreditCard className="size-4 mr-2" />
              Billing
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem disabled={isPendingBilling} onClick={() => signOut()} className="h-10">
          <LogOut className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
