import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { type EventCategoryInput } from '@/graphql/mutations';
import { type IEventCategory } from '@/graphql/queries';
import useEventCategoryMutations from '@/hooks/use-event-category-mutations';
import { useState } from 'react';

interface EventCategoryFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  eventCategory: IEventCategory | null;
}

export default function EventCategoryFormDialog({
  isOpen,
  onClose,
  onSuccess,
  eventCategory
}: EventCategoryFormDialogProps) {
  const isEditing = !!eventCategory;
  
  const [formData, setFormData] = useState<EventCategoryInput>({
    name: eventCategory?.name || '',
    background_color: eventCategory?.background_color || '#3b82f6',
    text_color: eventCategory?.text_color || '#ffffff',
    is_public: eventCategory?.is_public ?? true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { createEventCategory, updateEventCategory, loading } = useEventCategoryMutations(onSuccess);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.background_color) {
      newErrors.background_color = 'Background color is required';
    }

    if (!formData.text_color) {
      newErrors.text_color = 'Text color is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isEditing && eventCategory?._id) {
      await updateEventCategory(eventCategory._id, formData);
    } else {
      await createEventCategory(formData);
    }
  };

  const handleChange = (field: keyof EventCategoryInput, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Event Category' : 'Create Event Category'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the event category details' : 'Add a new event category to the system'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Category Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={loading}
                required
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="background_color">Background Color *</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="background_color"
                    type="color"
                    value={formData.background_color}
                    onChange={(e) => handleChange('background_color', e.target.value)}
                    className="w-12 h-8 p-1"
                    disabled={loading}
                    required
                  />
                  <Input
                    type="text"
                    value={formData.background_color}
                    onChange={(e) => handleChange('background_color', e.target.value)}
                    className="flex-1"
                    disabled={loading}
                  />
                </div>
                {errors.background_color && <p className="text-sm text-red-500">{errors.background_color}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="text_color">Text Color *</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="text_color"
                    type="color"
                    value={formData.text_color}
                    onChange={(e) => handleChange('text_color', e.target.value)}
                    className="w-12 h-8 p-1"
                    disabled={loading}
                    required
                  />
                  <Input
                    type="text"
                    value={formData.text_color}
                    onChange={(e) => handleChange('text_color', e.target.value)}
                    className="flex-1"
                    disabled={loading}
                  />
                </div>
                {errors.text_color && <p className="text-sm text-red-500">{errors.text_color}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_public"
                checked={formData.is_public}
                onCheckedChange={(checked) => handleChange('is_public', checked)}
                disabled={loading}
              />
              <Label htmlFor="is_public">Public</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
