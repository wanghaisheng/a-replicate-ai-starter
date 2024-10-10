import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type ActiveTool, type Editor, fonts } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface FontSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FontSidebar = ({ editor, activeTool, onChangeActiveTool }: FontSidebarProps) => {
  const fontFamily = editor?.getActiveFontFamily();

  const onClose = () => onChangeActiveTool('select');

  return (
    <aside className={cn('bg-white relative border z-40 w-[360px] h-full flex flex-col', activeTool === 'font' ? 'visible' : 'hidden')}>
      <ToolSidebarHeader title="Font" description="Modify the text font." />

      <ScrollArea>
        <div className="p-4 space-y-2 border-b">
          {fonts.map((font) => (
            <Button
              key={font}
              variant={fontFamily === font ? 'secondary' : 'outline'}
              size="lg"
              className="w-full h-14 justify-start text-left"
              style={{
                fontFamily: font,
                fontSize: '16px',
                padding: '8px 16px',
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
