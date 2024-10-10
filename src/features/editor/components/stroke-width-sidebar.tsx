import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { type ActiveTool, type Editor, STROKE_WIDTH } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface StrokeWidthSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeWidthSidebar = ({ editor, activeTool, onChangeActiveTool }: StrokeWidthSidebarProps) => {
  const width = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onClose = () => onChangeActiveTool('select');

  const onChange = (width: number) => {
    editor?.changeStrokeWidth(width);
  };

  return (
    <aside
      className={cn('bg-white relative border z-40 w-[360px] h-full flex flex-col', activeTool === 'stroke-width' ? 'visible' : 'hidden')}
    >
      <ToolSidebarHeader title="Stroke options" description="Modify the stroke of your element." />

      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke width</Label>

          <Slider value={[width]} onValueChange={(values) => onChange(values[0])} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
