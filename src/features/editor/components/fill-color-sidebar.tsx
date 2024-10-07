import { ScrollArea } from '@/components/ui/scroll-area';
import { type ActiveTool, type Editor, FILL_COLOR } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ColorPicker } from './color-picker';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface FillColorSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FillColorSidebar = ({ editor, activeTool, onChangeActiveTool }: FillColorSidebarProps) => {
  const color = editor?.fillColor || FILL_COLOR;

  const onClose = () => onChangeActiveTool('select');

  const onChange = (color: string) => {
    editor?.changeFillColor(color);
  };

  return (
    <aside className={cn('bg-white relative border z-40 w-[360px] h-full flex flex-col', activeTool === 'fill' ? 'visible' : 'hidden')}>
      <ToolSidebarHeader title="Fill color" description="Add fill color to your element." />

      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker color={color} onChange={onChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};