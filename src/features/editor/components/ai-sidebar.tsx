import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useGenerateImage } from '@/features/ai/api/use-generate-image';
import { type ActiveTool, type Editor } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({ editor, activeTool, onChangeActiveTool }: AiSidebarProps) => {
  const { mutate: generateImage, isPending: isGeneratingImage } = useGenerateImage();

  const [prompt, setPrompt] = useState('');

  const onClose = () => onChangeActiveTool('select');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: block with paywall

    generateImage(
      { prompt },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
          setPrompt('');
        },
        onError: (error) => {
          console.error(error);
          toast.error('Something went wrong!');
        },
      },
    );
  };

  return (
    <aside className={cn('bg-white relative border z-40 w-[360px] h-full flex flex-col', activeTool === 'ai' ? 'visible' : 'hidden')}>
      <ToolSidebarHeader title="AI" description="Generate an image using AI." />

      <ScrollArea>
        <form className="p-4 space-y-6" onSubmit={onSubmit}>
          <Textarea
            disabled={isGeneratingImage}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="An astronaut riding a horse on mars, hd, dramatic lighting..."
            cols={30}
            rows={10}
            required
            minLength={10}
            className="resize-y"
          />

          <Button disabled={isGeneratingImage} type="submit" className="w-full">
            Generate
          </Button>
        </form>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};