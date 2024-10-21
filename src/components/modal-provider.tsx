'use client';

import { useEffect, useState } from 'react';

import { SubscriptionModal } from '@/features/subscriptions/components/subscription-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SubscriptionModal />
    </>
  );
};
