import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import type { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: LucideIcon | IconType;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({ icon: Icon, label, href, isActive, onClick }: SidebarItemProps) => {
  return (
    <Link href={href} onClick={onClick}>
      <div className={cn('flex items-center p-3 rounded-xl bg-transparent hover:bg-white transition', isActive && 'bg-white')}>
        <Icon className="size-4 mr-2" />

        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};
