import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CourtInput } from '@/graphql/mutations';
import type { ICourt } from '@/graphql/queries';
import { useCourtMutations } from '@/hooks/use-court-mutations';
import { useState } from 'react';

interface CourtFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  court?: ICourt | null;
}

export default function CourtFormDialog({ isOpen, onClose, onSuccess, court }: CourtFormDialogProps) {
  const isEditing = !!court;
  const [formData, setFormData] = useState<CourtInput>({
    order_index: court?.order_index || 0,
    label: court?.label || '',
    type_name: court?.type_name || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createCourt, updateCourt, loading } = useCourtMutations(onSuccess);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.label.trim()) {
      newErrors.label = 'Court label is required';
    }

    if (!formData.type_name.trim()) {
      newErrors.type_name = 'Court type is required';
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

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = value === '' ? null : Number(value);
    setFormData((prev) => ({ ...prev, [name]: numberValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditing && court?._id) {
      await updateCourt(court._id, formData);
    } else {
      await createCourt(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Court' : 'Add New Court'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                name="label"
                value={formData.label}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Court 1"
                disabled={loading}
                required
              />
              {errors.label && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.label}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="type_name">Type</Label>
              <Input
                id="type_name"
                name="type_name"
                value={formData.type_name}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Tennis"
                disabled={loading}
                required
              />
              {errors.type_name && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.type_name}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="order_index">Order Index</Label>
              <Input
                id="order_index"
                name="order_index"
                value={formData.order_index || ''}
                onChange={handleNumberChange}
                className="col-span-3"
                placeholder="Enter Order Index"
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
