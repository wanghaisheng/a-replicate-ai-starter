import type { ActiveTool } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface ShapeSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({ activeTool, onChangeActiveTool }: ShapeSidebarProps) => {
  const onClose = () => onChangeActiveTool('select');

  return (
    <aside className={cn('bg-white relative border z-40 w-[360px] h-full flex flex-col', activeTool === 'shapes' ? 'visible' : 'hidden')}>
      <ToolSidebarHeader title="Shapes" description="Add shapes to your canvas." />

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
