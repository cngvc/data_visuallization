import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ReservationTypeInput } from '@/graphql/mutations';
import type { IReservationType } from '@/graphql/queries';
import { useReservationTypeMutations } from '@/hooks/use-reservation-type-mutations';
import { useState } from 'react';

interface ReservationTypeFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  reservationType?: IReservationType | null;
}

export default function ReservationTypeFormDialog({ isOpen, onClose, onSuccess, reservationType }: ReservationTypeFormDialogProps) {
  const isEditing = !!reservationType;
  const [formData, setFormData] = useState<ReservationTypeInput>({
    name: reservationType?.name || '',
    background_color: reservationType?.background_color || '#3b82f6',
    text_color: reservationType?.text_color || '#ffffff',
    order_index: reservationType?.order_index || 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createReservationType, updateReservationType, loading } = useReservationTypeMutations(onSuccess);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Reservation type name is required';
    }
    if (!formData.background_color.trim()) {
      newErrors.background_color = 'Background color is required';
    }
    if (!formData.text_color.trim()) {
      newErrors.text_color = 'Text color is required';
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
    if (isEditing && reservationType?._id) {
      await updateReservationType(reservationType._id, formData);
    } else {
      await createReservationType(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Reservation Type' : 'Add New Reservation Type'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Tennis Lesson"
                disabled={loading}
                required
              />
              {errors.name && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="background_color">Background Color</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="background_color"
                  name="background_color"
                  type="color"
                  value={formData.background_color}
                  onChange={handleChange}
                  className="w-12 h-10 p-1"
                  disabled={loading}
                />
                <Input
                  name="background_color"
                  value={formData.background_color}
                  onChange={handleChange}
                  className="flex-1"
                  placeholder="#3b82f6"
                  disabled={loading}
                />
              </div>
              {errors.background_color && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.background_color}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="text_color">Text Color</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="text_color"
                  name="text_color"
                  type="color"
                  value={formData.text_color}
                  onChange={handleChange}
                  className="w-12 h-10 p-1"
                  disabled={loading}
                />
                <Input
                  name="text_color"
                  value={formData.text_color}
                  onChange={handleChange}
                  className="flex-1"
                  placeholder="#ffffff"
                  disabled={loading}
                />
              </div>
              {errors.text_color && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.text_color}</p>}
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

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Preview</Label>
              <div
                className="col-span-3 p-3 rounded text-center"
                style={{
                  backgroundColor: formData.background_color,
                  color: formData.text_color
                }}
              >
                {formData.name || 'Reservation Type Preview'}
              </div>
            </div>
          </div>
          <DialogFooter className="pt-4 mt-4 border-t">
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
