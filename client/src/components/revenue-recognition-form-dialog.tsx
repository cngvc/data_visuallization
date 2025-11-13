import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { type RevenueRecognitionInput } from '@/graphql/mutations';
import { type IRevenueRecognition } from '@/graphql/queries';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';
import DatePicker from './date-picker';
import { MemberSelector } from './member-selector';

interface RevenueRecognitionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RevenueRecognitionInput) => void;
  initialData?: IRevenueRecognition;
  title: string;
  description: string;
  loading?: boolean;
}
export function RevenueRecognitionFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title,
  description,
  loading = false
}: RevenueRecognitionFormDialogProps) {
  const [formData, setFormData] = useState<Partial<RevenueRecognitionInput>>({
    fee_category: initialData?.fee_category,
    subtotal: initialData?.subtotal,
    tax_total: initialData?.tax_total,
    total: initialData?.total,
    payment_type: initialData?.payment_type,
    transaction_type: initialData?.transaction_type,
    start_date_time: formatDate(initialData?.start_date_time),
    end_date_time: formatDate(initialData?.end_date_time),
    member_id: initialData?.member_id?._id,
    description: initialData?.description,
    package_info: initialData?.package_info,
    paid_date: formatDate(initialData?.paid_date)
  });

  const handleChange = (field: keyof RevenueRecognitionInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'subtotal' || field === 'tax_total') {
      const subtotal = field === 'subtotal' ? Number(value) : Number(formData.subtotal || 0);
      const taxTotal = field === 'tax_total' ? Number(value) : Number(formData.tax_total || 0);
      setFormData((prev) => ({ ...prev, total: subtotal + taxTotal }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fee_category || !formData.start_date_time || !formData.end_date_time) {
      return;
    }
    const processedData: RevenueRecognitionInput = {
      ...formData,
      subtotal: Number(formData.subtotal),
      tax_total: Number(formData.tax_total),
      total: Number(formData.total)
    } as RevenueRecognitionInput;

    onSubmit(processedData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fee_category">Fee Category *</Label>
                <Input
                  id="fee_category"
                  value={formData.fee_category || ''}
                  onChange={(e) => handleChange('fee_category', e.target.value)}
                  placeholder="Enter fee category ..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transaction_type">Transaction Type *</Label>
                <Select
                  value={formData.transaction_type || 'Fee'}
                  onValueChange={(value) => handleChange('transaction_type', value)}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fee">Fee</SelectItem>
                    <SelectItem value="Refund">Refund</SelectItem>
                    <SelectItem value="Credit">Credit</SelectItem>
                    <SelectItem value="Adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subtotal">Subtotal *</Label>
                <Input
                  id="subtotal"
                  type="number"
                  step="0.01"
                  value={formData.subtotal || 0}
                  onChange={(e) => handleChange('subtotal', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax_total">Tax *</Label>
                <Input
                  id="tax_total"
                  type="number"
                  step="0.01"
                  value={formData.tax_total || 0}
                  onChange={(e) => handleChange('tax_total', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total">Total *</Label>
                <Input
                  id="total"
                  type="number"
                  step="0.01"
                  value={formData.total || 0}
                  onChange={(e) => handleChange('total', e.target.value)}
                  required
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date_time">Start Date *</Label>
                <DatePicker value={formData.start_date_time} onChange={(e) => handleChange('start_date_time', e)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date_time">End Date *</Label>
                <DatePicker value={formData.end_date_time} onChange={(e) => handleChange('end_date_time', e)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment_type">Payment Type *</Label>
                <Select value={formData.payment_type} onValueChange={(value) => handleChange('payment_type', value)} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paid_date">Paid Date</Label>
                <DatePicker value={formData.paid_date} onChange={(e) => handleChange('paid_date', e)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="member_id">Member</Label>
              <div className="col-span-3">
                <MemberSelector value={formData.member_id} onSelect={(value) => handleChange('member_id', value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description ..."
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
