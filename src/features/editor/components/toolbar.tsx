import { ArrowDown, ArrowUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { BsBorderWidth } from 'react-icons/bs';
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from 'react-icons/fa';
import { RxTransparencyGrid } from 'react-icons/rx';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import {
  type ActiveTool,
  type Editor,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_LINETHROUGH,
  FONT_STYLE,
  FONT_UNDERLINE,
  FONT_WEIGHT,
  STROKE_COLOR,
} from '@/features/editor/types';
import { isTextType } from '@/features/editor/utils';

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor() || FILL_COLOR;
  const initialStrokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const initialFontFamily = editor?.getActiveFontFamily() || FONT_FAMILY;
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle() || FONT_STYLE;
  const initialFontLinethrough = editor?.getActiveFontLinethrough() || FONT_LINETHROUGH;
  const initialFontUnderline = editor?.getActiveFontUnderline() || FONT_UNDERLINE;

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialFontUnderline,
  });

  const selectedObject = editor?.selectedObjects[0];
  const isText = isTextType(selectedObject?.type);

  const toggleBold = () => {
    if (!selectedObject) return;

    const newValue = properties.fontWeight > 500 ? 500 : 700;

    editor?.changeFontWeight(newValue);

    setProperties((prevProperties) => ({
      ...prevProperties,
      fontWeight: newValue,
    }));
  };

  const toggleItalic = () => {
    if (!selectedObject) return;

    const isItalic = properties.fontStyle === 'italic';
    const newValue = isItalic ? 'normal' : 'italic';

    editor?.changeFontStyle(newValue);

    setProperties((prevProperties) => ({
      ...prevProperties,
      fontStyle: newValue,
    }));
  };

  const toggleLinethrough = () => {
    if (!selectedObject) return;

    const newValue = properties.fontLinethrough ? false : true;

    editor?.changeFontLinethrough(newValue);

    setProperties((prevProperties) => ({
      ...prevProperties,
      fontLinethrough: newValue,
    }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) return;

    const newValue = properties.fontUnderline ? false : true;

    editor?.changeFontUnderline(newValue);

    setProperties((prevProperties) => ({
      ...prevProperties,
      fontUnderline: newValue,
    }));
  };

  if (editor?.selectedObjects.length === 0) {
    return <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />;
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button onClick={() => onChangeActiveTool('fill')} size="icon" variant={activeTool === 'fill' ? 'secondary' : 'ghost'}>
            <div
              aria-hidden
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: properties.fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>

      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke Color" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('stroke-color')}
              size="icon"
              variant={activeTool === 'stroke-color' ? 'secondary' : 'ghost'}
            >
              <div
                aria-hidden
                className="rounded-sm size-4 border-2 bg-white"
                style={{
                  borderColor: properties.strokeColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}

      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke Width" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('stroke-width')}
              size="icon"
              variant={activeTool === 'stroke-width' ? 'secondary' : 'ghost'}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button onClick={() => onChangeActiveTool('font')} size="sm" variant={activeTool === 'font' ? 'secondary' : 'ghost'}>
              <div className="max-w-[100px] truncate">{properties.fontFamily}</div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button onClick={toggleBold} size="icon" variant={properties.fontWeight > 500 ? 'secondary' : 'ghost'}>
              <FaBold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button onClick={toggleItalic} size="icon" variant={properties.fontStyle === 'italic' ? 'secondary' : 'ghost'}>
              <FaItalic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button onClick={toggleUnderline} size="icon" variant={properties.fontUnderline ? 'secondary' : 'ghost'}>
              <FaUnderline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Strike" side="bottom" sideOffset={5}>
            <Button onClick={toggleLinethrough} size="icon" variant={properties.fontLinethrough ? 'secondary' : 'ghost'}>
              <FaStrikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      <div className="flex items-center h-full justify-center">
        <Hint label="Bring Forward" side="bottom" sideOffset={5}>
          <Button onClick={() => editor?.bringForward()} size="icon" variant="ghost">
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Send Backwards" side="bottom" sideOffset={5}>
          <Button onClick={() => editor?.sendBackwards()} size="icon" variant="ghost">
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button onClick={() => onChangeActiveTool('opacity')} size="icon" variant={activeTool === 'opacity' ? 'secondary' : 'ghost'}>
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
