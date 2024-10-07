'use client';

import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';

import { useEditor } from '@/features/editor/hooks/use-editor';

import { Footer } from './footer';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { Toolbar } from './toolbar';

export const Editor = () => {
  const { init } = useEditor();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });
    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar />

      <div className="absolute h-[calc(100%_-_68px)] w-full top-[68px] flex">
        <Sidebar />

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
