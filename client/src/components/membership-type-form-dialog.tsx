import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { MembershipTypeInput } from '@/graphql/mutations';
import type { IMembershipType } from '@/graphql/queries';
import { useMembershipTypeMutations } from '@/hooks/use-membership-type-mutations';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';
import DatePicker from './date-picker';

interface MembershipTypeFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  membershipType?: IMembershipType | null;
}

export default function MembershipTypeFormDialog({ isOpen, onClose, onSuccess, membershipType }: MembershipTypeFormDialogProps) {
  const isEditing = !!membershipType;
  const [formData, setFormData] = useState<MembershipTypeInput>({
    name: membershipType?.name || '',
    order_index: membershipType?.order_index || 0,
    description: membershipType?.description,
    short_code: membershipType?.short_code,
    is_active: membershipType?.is_active ?? true,
    is_payment_required: membershipType?.is_payment_required ?? false,
    purchase_start_date: formatDate(membershipType?.purchase_start_date),
    purchase_end_date: formatDate(membershipType?.purchase_end_date),
    is_restrict_by_age: membershipType?.is_restrict_by_age ?? false,
    allow_min_age: membershipType?.allow_min_age,
    allow_max_age: membershipType?.allow_max_age,
    days_past_due_to_suspend: membershipType?.days_past_due_to_suspend,
    days_past_due_to_cancel: membershipType?.days_past_due_to_cancel,
    initiation_price: membershipType?.initiation_price,
    monthly_price: membershipType?.monthly_price,
    quarterly_price: membershipType?.quarterly_price,
    annual_price: membershipType?.annual_price,
    lifetime_price: membershipType?.lifetime_price,
    custom_price: membershipType?.custom_price,
    custom_frequency_value: membershipType?.custom_frequency_value
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createMembershipType, updateMembershipType, loading } = useMembershipTypeMutations(onSuccess);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Membership type name is required';
    }
    if (formData.is_restrict_by_age) {
      if (formData.allow_min_age && formData.allow_max_age) {
        if (formData.allow_min_age > formData.allow_max_age) {
          newErrors.age_range = 'Minimum age cannot be greater than maximum age';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleInputChange = (name: string, value: string) => {
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

    if (isEditing && membershipType?._id) {
      await updateMembershipType(membershipType._id, formData);
    } else {
      await createMembershipType(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Membership Type' : 'Add New Membership Type'}</DialogTitle>
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
                placeholder="Adult Membership"
                disabled={loading}
              />
              {errors.name && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="short_code">Short Code</Label>
              <Input
                id="short_code"
                name="short_code"
                type="number"
                value={formData.short_code || ''}
                onChange={handleChange}
                className="col-span-3"
                placeholder="ADULT"
                disabled={loading}
              />
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

            <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Membership description..."
                disabled={loading}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <div>Status</div>
              <div className="flex items-center space-x-2 col-span-3">
                <Checkbox
                  id="is_active"
                  checked={formData.is_active ?? false}
                  onCheckedChange={(checked) => handleCheckboxChange('is_active', !!checked)}
                  disabled={loading}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <div>Payment</div>
              <div className="flex items-center space-x-2 col-span-3">
                <Checkbox
                  id="is_payment_required"
                  checked={formData.is_payment_required ?? false}
                  onCheckedChange={(checked) => handleCheckboxChange('is_payment_required', !!checked)}
                  disabled={loading}
                />
                <Label htmlFor="is_payment_required">Payment Required</Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="purchase_start_date">Purchase Start</Label>
              <DatePicker
                className="md:col-span-3"
                value={formData.purchase_start_date}
                onChange={handleInputChange.bind(null, 'purchase_start_date')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="purchase_end_date">Purchase End</Label>
              <DatePicker
                className="md:col-span-3"
                value={formData.purchase_end_date}
                onChange={handleInputChange.bind(null, 'purchase_end_date')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <div>Age Restriction</div>
              <div className="flex items-center space-x-2 col-span-3">
                <Checkbox
                  id="is_restrict_by_age"
                  checked={formData.is_restrict_by_age ?? false}
                  onCheckedChange={(checked) => handleCheckboxChange('is_restrict_by_age', !!checked)}
                  disabled={loading}
                />
                <Label htmlFor="is_restrict_by_age">Restrict by Age</Label>
              </div>
            </div>

            {formData.is_restrict_by_age && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="allow_min_age">Min Age</Label>
                  <Input
                    id="allow_min_age"
                    name="allow_min_age"
                    type="number"
                    value={formData.allow_min_age === null ? '' : formData.allow_min_age}
                    onChange={handleNumberChange}
                    className="col-span-3"
                    placeholder="18"
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="allow_max_age">Max Age</Label>
                  <Input
                    id="allow_max_age"
                    name="allow_max_age"
                    type="number"
                    value={formData.allow_max_age === null ? '' : formData.allow_max_age}
                    onChange={handleNumberChange}
                    className="col-span-3"
                    placeholder="65"
                    disabled={loading}
                  />
                </div>
                {errors.age_range && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.age_range}</p>}
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="days_past_due_to_suspend">Days to Suspend</Label>
              <Input
                id="days_past_due_to_suspend"
                name="days_past_due_to_suspend"
                type="number"
                value={formData.days_past_due_to_suspend === null ? '' : formData.days_past_due_to_suspend}
                onChange={handleNumberChange}
                className="col-span-3"
                placeholder="30"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="days_past_due_to_cancel">Days to Cancel</Label>
              <Input
                id="days_past_due_to_cancel"
                name="days_past_due_to_cancel"
                type="number"
                value={formData.days_past_due_to_cancel === null ? '' : formData.days_past_due_to_cancel}
                onChange={handleNumberChange}
                className="col-span-3"
                placeholder="60"
                disabled={loading}
              />
            </div>

            <h3 className="col-span-4 font-medium text-lg border-b pb-2 mt-2">Pricing</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="initiation_price">Initiation Fee</Label>
              <Input
                id="initiation_price"
                name="initiation_price"
                type="number"
                step="0.01"
                value={formData.initiation_price === null ? '' : formData.initiation_price}
                onChange={handleNumberChange}
                className="col-span-3"
                placeholder="0.00"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="monthly_price">Monthly Price</Label>
              <Input
                id="monthly_price"
                name="monthly_price"
                type="number"
                step="0.01"
                value={formData.monthly_price === null ? '' : formData.monthly_price}
                onChange={handleNumberChange}
                className="col-span-3"
                placeholder="0.00"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="quarterly_price">Quarterly Price</Label>
              <Input
                id="quarterly_price"
                name="quarterly_price"
                type="number"
                step="0.01"
                value={formData.quarterly_price === null ? '' : formData.quarterly_price}
                onChange={handleNumberChange}
                className="col-span-3"
                placeholder="0.00"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="annual_price">Annual Price</Label>
              <Input
                id="annual_price"
                name="annual_price"
                type="number"
                step="0.01"
                value={formData.annual_price === null ? '' : formData.annual_price}
                onChange={handleNumberChange}
                className="col-span-3"
                placeholder="0.00"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="lifetime_price">Lifetime Price</Label>
              <Input
                id="lifetime_price"
                name="lifetime_price"
                type="number"
                step="0.01"
                value={formData.lifetime_price === null ? '' : formData.lifetime_price}
                onChange={handleNumberChange}
                className="col-span-3"
                placeholder="0.00"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="custom_price">Custom Price</Label>
              <Input
                id="custom_price"
                name="custom_price"
                type="number"
                step="0.01"
                value={formData.custom_price === null ? '' : formData.custom_price}
                onChange={handleNumberChange}
                className="col-span-3"
                placeholder="0.00"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="custom_frequency_value">Custom Frequency</Label>
              <Input
                id="custom_frequency_value"
                name="custom_frequency_value"
                value={formData.custom_frequency_value || ''}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Bi-weekly"
                disabled={loading}
              />
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
