import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import usePublicMembers from '@/hooks/use-public-members';
import { cn } from '@/lib/utils';
import { Loader2Icon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

export interface MemberSelectorProps {
  value?: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function MemberSelector({ value, onSelect, className }: MemberSelectorProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading, updateFilters } = usePublicMembers();

  const options =
    data?.map((member) => ({
      value: member._id,
      label: member.first_name + ' ' + member.last_name
    })) || [];

  const filteredOptions =
    search.length >= 3 ? options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase())) : options;

  const selectedLabel = options.find((opt) => opt.value === value)?.label || 'Select User';

  useEffect(() => {
    if (search.length >= 3) {
      updateFilters({ search });
    }
  }, [search, updateFilters]);

  return (
    <Select
      value={value}
      onValueChange={(val) => {
        onSelect(val);
        setSearch('');
      }}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger className={cn('w-full', className)}>
        <SelectValue placeholder="Select User">{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div className="p-2 border-b">
          <div className="flex items-center px-1.5 py-1 rounded-md border">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        <ScrollArea className="max-h-72 pt-1.5">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2">Loading members...</span>
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {search.length >= 3 ? 'No members found' : 'Type at least 3 characters to search'}
            </div>
          ) : (
            <SelectGroup>
              {filteredOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
