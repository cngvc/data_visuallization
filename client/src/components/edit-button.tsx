import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import type { MouseEventHandler } from 'react';

const EditButton = ({ onClick, disabled }: { onClick: MouseEventHandler; disabled?: boolean }) => {
  return (
    <Button size="sm" onClick={onClick} className="bg-blue-100 hover:bg-blue-200" disabled={disabled}>
      <Pencil className="h-5 w-5 text-blue-500" strokeWidth={2.5} />
    </Button>
  );
};

export default EditButton;
