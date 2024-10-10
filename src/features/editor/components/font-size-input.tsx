import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    onChange(value);
  };

  return (
    <div className="flex items-center">
      <Button disabled={value <= 1} onClick={decrement} variant="outline" className="p-2 rounded-r-none border-r-0" size="icon">
        <Minus className="size-4" />
      </Button>

      <Input
        type="number"
        min={5}
        max={100}
        onChange={handleChange}
        value={value}
        className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
      />

      <Button disabled={value >= 100} onClick={increment} variant="outline" className="p-2 rounded-l-none border-l-0" size="icon">
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
