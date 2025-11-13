import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface SearchInputProps {
  value: any;
  onChange: (value: any) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="col-span-full">
      <Label htmlFor="search" className="mb-1">
        Search
      </Label>
      <div className="flex items-center mt-1">
        <Input id="search" placeholder="Search by etc." value={value} onChange={(e) => onChange(e.target.value)} className="flex-1" />
        <Button variant="ghost" size="icon" className="ml-2" onClick={() => onChange('')} disabled={!value}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
