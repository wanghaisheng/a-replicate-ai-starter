import { createId } from '@paralleldrive/cuid2';
import { AlertTriangle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ScrollArea } from '@/components/ui/scroll-area';
import { type ActiveTool, type Editor } from '@/features/editor/types';
import { useGetImages } from '@/features/images/api/use-get-images';
import { UploadButton } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';

import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface ImageSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar = ({ editor, activeTool, onChangeActiveTool }: ImageSidebarProps) => {
  const { data, isLoading, isError } = useGetImages();

  const onClose = () => onChangeActiveTool('select');

  return (
    <aside className={cn('bg-white relative border z-40 w-[360px] h-full flex flex-col', activeTool === 'images' ? 'visible' : 'hidden')}>
      <ToolSidebarHeader title="Images" description="Add images to your canvas." />

      <div className="p-4 border-b">
        <UploadButton
          appearance={{
            button: 'w-full text-sm font-medium',
            allowedContent: 'hidden',
          }}
          onBeforeUploadBegin={(files) => {
            return files.map((f) => {
              const fileExt = f.name.split('.').at(-1) ?? 'png';
              const fileName = `${createId()}.${fileExt}`;

              return new File([f], fileName, {
                type: f.type,
              });
            });
          }}
          content={{
            button: 'Upload image',
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            editor?.addImage(res[0].url);
          }}
        />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}

      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Failed to fetch images.</p>
        </div>
      )}

      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.map((image) => {
                return (
                  <button
                    key={image.id}
                    onClick={() => editor?.addImage(image.urls.regular)}
                    className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                  >
                    <Image fill src={image.urls.small} alt={image.alt_description || 'Image from unsplash'} className="object-cover" />

                    <Link
                      href={image.links.html}
                      target="_blank"
                      className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left"
                    >
                      {image.user.name}
                    </Link>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
