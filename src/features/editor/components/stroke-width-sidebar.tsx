import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { type ActiveTool, type Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from '@/features/editor/types';
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
  const type = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onClose = () => onChangeActiveTool('select');

  const onChange = (width: number) => {
    editor?.changeStrokeWidth(width);
  };

  const onChangeStrokeType = (strokeDashArray: number[]) => {
    editor?.changeStrokeDashArray(strokeDashArray);
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

        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke type</Label>

          <Button
            onClick={() => onChangeStrokeType(STROKE_DASH_ARRAY)}
            variant={JSON.stringify(type) === JSON.stringify(STROKE_DASH_ARRAY) ? 'secondary' : 'outline'}
            size="lg"
            className="w-full h-16 justify-start text-left"
            style={{
              padding: '8px 16px',
            }}
          >
            <div aria-hidden className="w-full border-black rounded-full border-4" />
          </Button>

          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant={JSON.stringify(type) === JSON.stringify([5, 5]) ? 'secondary' : 'outline'}
            size="lg"
            className="w-full h-16 justify-start text-left"
            style={{
              padding: '8px 16px',
            }}
          >
            <div aria-hidden className="w-full border-black rounded-full border-4 border-dashed" />
          </Button>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
