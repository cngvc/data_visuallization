import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FamilyInput } from '@/graphql/mutations';
import type { IFamily } from '@/graphql/queries';
import { useFamilyMutations } from '@/hooks/use-family-mutations';
import { useState } from 'react';

interface FamilyFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  family?: IFamily | null;
}

export default function FamilyFormDialog({ isOpen, onClose, onSuccess, family }: FamilyFormDialogProps) {
  const isEditing = !!family;
  const [formData, setFormData] = useState<FamilyInput>({
    name: family?.name || '',
    number: family?.number || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createFamily, updateFamily, loading } = useFamilyMutations(onSuccess);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Family name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditing && family?._id) {
      await updateFamily(family._id, formData);
    } else {
      await createFamily(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Family' : 'Add New Family'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Family Name"
                disabled={loading}
              />
              {errors.name && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                name="number"
                value={formData.number || ''}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Family Number"
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
