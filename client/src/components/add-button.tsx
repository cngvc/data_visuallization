import { Plus } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

const AddButton = ({ onClick, label, disabled = false }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
      disabled={disabled}
    >
      <Plus className="h-4 w-4" />
      {label}
    </Button>
  );
};

export default AddButton;
