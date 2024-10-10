'use client';

import { fabric } from 'fabric';
import { act, useCallback, useEffect, useRef, useState } from 'react';

import { useEditor } from '@/features/editor/hooks/use-editor';
import { type ActiveTool, selectionDependentTools } from '@/features/editor/types';

import { FillColorSidebar } from './fill-color-sidebar';
import { FontSidebar } from './font-sidebar';
import { Footer } from './footer';
import { Navbar } from './navbar';
import { ShapeSidebar } from './shape-sidebar';
import { Sidebar } from './sidebar';
import { StrokeColorSidebar } from './stroke-color-sidebar';
import { OpacitySidebar } from './stroke-opacity-sidebar';
import { StrokeWidthSidebar } from './stroke-width-sidebar';
import { TextSidebar } from './text-sidebar';
import { Toolbar } from './toolbar';

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) setActiveTool('select');
  }, [activeTool]);

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) return setActiveTool('select');

      if (tool === 'draw') {
        // TODO: Enable draw mode
      }

      if (activeTool === 'draw') {
        // TODO: Disable draw mode
      }

      setActiveTool(tool);
    },
    [activeTool],
  );

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />

      <div className="absolute h-[calc(100%_-_68px)] w-full top-[68px] flex">
        <Sidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <ShapeSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <FillColorSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <StrokeColorSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <StrokeWidthSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <OpacitySidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <TextSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <FontSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />

        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />

          <div className="flex-1 h-[calc(100%_-_124px)] bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};
