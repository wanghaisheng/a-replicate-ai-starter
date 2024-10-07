'use client';

import { fabric } from 'fabric';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useEditor } from '@/features/editor/hooks/use-editor';
import type { ActiveTool } from '@/features/editor/types';

import { Footer } from './footer';
import { Navbar } from './navbar';
import { ShapeSidebar } from './shape-sidebar';
import { Sidebar } from './sidebar';
import { Toolbar } from './toolbar';

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');

  const { init, editor } = useEditor();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar />

          <div className="flex-1 h-[calc(100%_-_124px)] bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};
