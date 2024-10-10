import { fabric } from 'fabric';
import { useCallback, useMemo, useState } from 'react';

import {
  type BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  type Editor,
  EditorHookProps,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
} from '@/features/editor/types';
import { isTextType } from '@/features/editor/utils';

import { useAutoResize } from './use-auto-resize';
import { useCanvasEvents } from './use-canvas-events';

const buildEditor = ({
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  strokeDashArray,
  setStrokeDashArray,
  selectedObjects,
}: BuildEditorProps): Editor => {
  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === 'clip');
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const centerPoint = workspace?.getCenterPoint();

    if (!centerPoint) return;

    // @ts-ignore _centerObject method types aren't added.
    canvas._centerObject(object, centerPoint);
  };

  return {
    changeOpacity: (opacity: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity });
      });

      canvas.renderAll();
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringForward(object);
      });

      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendBackwards(object);
      });

      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    changeFillColor: (color: string) => {
      setFillColor(color);

      canvas.getActiveObjects().forEach((object) => object.set({ fill: color }));
      canvas.renderAll();
    },
    changeStrokeColor: (color: string) => {
      setStrokeColor(color);

      canvas.getActiveObjects().forEach((object) => {
        // Text types don't have strokes
        if (isTextType(object.type)) {
          object.set({ fill: color });
          return;
        }

        object.set({ stroke: color });
      });

      canvas.renderAll();
    },
    changeStrokeWidth: (width: number) => {
      setStrokeWidth(width);

      canvas.getActiveObjects().forEach((object) => object.set({ strokeWidth: width }));
      canvas.renderAll();
    },
    changeStrokeDashArray: (strokeDashArray: number[]) => {
      setStrokeDashArray(strokeDashArray);

      canvas.getActiveObjects().forEach((object) => object.set({ strokeDashArray }));
      canvas.renderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
      });

      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
      });

      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
      });

      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
      });

      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const WIDTH = TRIANGLE_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          {
            x: 0,
            y: 0,
          },
          {
            x: WIDTH,
            y: 0,
          },
          {
            x: WIDTH / 2,
            y: HEIGHT,
          },
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
          strokeDashArray,
        },
      );

      addToCanvas(object);
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          {
            x: WIDTH / 2,
            y: 0,
          },
          {
            x: WIDTH,
            y: HEIGHT / 2,
          },
          {
            x: WIDTH / 2,
            y: HEIGHT,
          },
          {
            x: 0,
            y: HEIGHT / 2,
          },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
          strokeDashArray,
        },
      );

      addToCanvas(object);
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return 1;

      const value = selectedObject.get('opacity') || 1;

      // Gradients and patterns are not passed.
      return value;
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return fillColor;

      const value = selectedObject.get('fill') || fillColor;

      // Gradients and patterns are not passed.
      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return strokeColor;

      const value = selectedObject.get('stroke') || strokeColor;

      // Gradients and patterns are not passed.
      return value;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return strokeWidth;

      const value = selectedObject.get('strokeWidth') || strokeWidth;

      // Gradients and patterns are not passed.
      return value;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return strokeDashArray;

      const value = selectedObject.get('strokeDashArray') || strokeDashArray;

      // Gradients and patterns are not passed.
      return value;
    },

    canvas,
    selectedObjects,
  };
};

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);

  useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
  });

  fabric.Object.prototype.set({
    cornerColor: '#fff',
    cornerStyle: 'circle',
    borderColor: '#3b82f6',
    borderScaleFactor: 1.5,
    transparentCorners: false,
    borderOpacityWhenMoving: 1,
    cornerStrokeColor: '#3b82f6',
  });

  const editor = useMemo(() => {
    if (canvas)
      return buildEditor({
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        strokeDashArray,
        setStrokeDashArray,
        selectedObjects,
      });

    return undefined;
  }, [canvas, fillColor, strokeColor, strokeWidth, strokeDashArray, selectedObjects]);

  const init = useCallback(({ initialCanvas, initialContainer }: { initialCanvas: fabric.Canvas; initialContainer: HTMLDivElement }) => {
    const initialWorkspace = new fabric.Rect({
      width: 900,
      height: 1200,
      name: 'clip',
      fill: 'white',
      selectable: false,
      hasControls: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0, 0, 0, 0.8)',
        blur: 5,
      }),
    });

    initialCanvas.setWidth(initialContainer.offsetWidth);
    initialCanvas.setHeight(initialContainer.offsetHeight);

    initialCanvas.add(initialWorkspace);
    initialCanvas.centerObject(initialWorkspace);
    initialCanvas.clipPath = initialWorkspace;

    setCanvas(initialCanvas);
    setContainer(initialContainer);
  }, []);

  return { init, editor };
};
