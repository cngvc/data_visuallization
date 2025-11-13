import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { MouseEventHandler } from 'react';

const DeleteButton = ({ onClick, disabled = false }: { onClick: MouseEventHandler; disabled?: boolean }) => {
  return (
    <Button size="sm" onClick={onClick} className="bg-red-100 hover:bg-red-200" disabled={disabled}>
      <Trash2 className="h-5 w-5 text-destructive" strokeWidth={2.5} />
    </Button>
  );
};

export default DeleteButton;
