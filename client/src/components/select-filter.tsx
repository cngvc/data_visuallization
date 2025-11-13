import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface SelectFilterProps {
  value?: string;
  onSelect: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
}

export function SelectFilter({ value, onSelect, options, placeholder, className }: SelectFilterProps) {
  return (
    <Select value={value} onValueChange={onSelect}>
      <SelectTrigger className={cn('w-full', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
