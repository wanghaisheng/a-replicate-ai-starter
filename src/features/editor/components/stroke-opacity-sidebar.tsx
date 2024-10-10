import { useEffect, useMemo, useState } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { type ActiveTool, type Editor } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface OpacitySidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({ editor, activeTool, onChangeActiveTool }: OpacitySidebarProps) => {
  const initialOpacity = editor?.getActiveOpacity() || 1;

  const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects]);
  const [opacity, setOpacity] = useState(initialOpacity);

  const onClose = () => onChangeActiveTool('select');

  const onChange = (opacity: number) => {
    editor?.changeOpacity(opacity);
    setOpacity(opacity);
  };

  useEffect(() => {
    if (selectedObject) setOpacity(selectedObject.get('opacity') || 1);
  }, [selectedObject]);

  return (
    <aside className={cn('bg-white relative border z-40 w-[360px] h-full flex flex-col', activeTool === 'opacity' ? 'visible' : 'hidden')}>
      <ToolSidebarHeader title="Opacity" description="Change the opacity of the selected element." />

      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Slider value={[opacity]} onValueChange={(values) => onChange(values[0])} max={1} min={0} step={0.01} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
