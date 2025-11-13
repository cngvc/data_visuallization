import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { EventInput } from '@/graphql/mutations';
import type { IEvent } from '@/graphql/queries';
import useEventCategories from '@/hooks/use-event-categories';
import { useEventMutations } from '@/hooks/use-event-mutations';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';
import DatePicker from './date-picker';

interface EventFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  event?: IEvent | null;
}

export default function EventFormDialog({ isOpen, onClose, onSuccess, event }: EventFormDialogProps) {
  const isEditing = !!event;
  const { data: categories = [], loading: categoriesLoading } = useEventCategories({
    limit: -1
  });

  const [formData, setFormData] = useState<EventInput>({
    category_id: event?.category_id?._id,
    reservation_id: event?.reservation_id?._id,
    name: event?.name || '',
    start_date: formatDate(event?.start_date),
    end_date: formatDate(event?.end_date),
    background_color: event?.background_color,
    is_registered: event?.is_registered || false,
    sso_url: event?.sso_url,
    image_url: event?.image_url,
    max_registrants: event?.max_registrants,
    registered_count: event?.registered_count
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createEvent, updateEvent, loading } = useEventMutations(onSuccess);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.category_id) {
      newErrors.category_id = 'Category is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = value === '' ? undefined : parseInt(value, 10);
    setFormData((prev) => ({ ...prev, [name]: numberValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditing && event?._id) {
      await updateEvent(event._id, formData);
    } else {
      await createEvent(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="category_id">Category</Label>
              <div className="col-span-3">
                <Select
                  value={formData.category_id || undefined}
                  onValueChange={(value) => handleSelectChange('category_id', value)}
                  disabled={loading || categoriesLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Event Name"
                disabled={loading}
              />
              {errors.name && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="start_date">Start Date</Label>
              <DatePicker className="col-span-3" value={formData.start_date} onChange={handleInputChange.bind(null, 'start_date')} />
              {errors.start_date && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.start_date}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="end_date">End Date</Label>
              <DatePicker className="col-span-3" value={formData.end_date} onChange={handleInputChange.bind(null, 'end_date')} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="background_color">Color</Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="background_color"
                  name="background_color"
                  type="color"
                  value={formData.background_color || '#ffffff'}
                  onChange={handleChange}
                  className="w-16"
                  disabled={loading}
                />
                <Input
                  name="background_color"
                  value={formData.background_color || ''}
                  onChange={handleChange}
                  placeholder="#RRGGBB"
                  className="flex-1"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="is_registered">Registration</Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="is_registered"
                  checked={formData.is_registered || false}
                  onCheckedChange={(checked) => handleCheckboxChange('is_registered', checked === true)}
                  disabled={loading}
                />
                <Label htmlFor="is_registered" className="cursor-pointer">
                  Event requires registration
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="max_registrants" className="text-left">
                Max Registrants
              </Label>
              <Input
                id="max_registrants"
                name="max_registrants"
                type="number"
                value={formData.max_registrants?.toString() || ''}
                onChange={handleNumberChange}
                className="col-span-3"
                placeholder="Leave empty for unlimited"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="sso_url">SSO URL</Label>
              <Input
                id="sso_url"
                name="sso_url"
                value={formData.sso_url || ''}
                onChange={handleChange}
                className="col-span-3"
                placeholder="https://example.com"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url || ''}
                onChange={handleChange}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
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
