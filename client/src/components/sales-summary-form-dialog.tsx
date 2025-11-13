import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type SalesSummaryInput } from '@/graphql/mutations';
import { type IFamily, type ISalesSummary } from '@/graphql/queries';
import useFamilies from '@/hooks/use-families';
import { useState } from 'react';
import DatePicker from './date-picker';

interface SalesSummaryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SalesSummaryInput) => void;
  initialData?: ISalesSummary | null;
  loading?: boolean;
}

export function SalesSummaryFormDialog({ open, onOpenChange, onSubmit, initialData, loading }: SalesSummaryFormDialogProps) {
  const isEditing = !!initialData;
  const { data: families } = useFamilies({
    limit: -1
  });
  const [formData, setFormData] = useState<SalesSummaryInput>({
    family_id: initialData?.family_id?._id,
    fee_category_name: initialData?.fee_category_name || '',
    item_name: initialData?.item_name || '',
    revenue_category_name: initialData?.revenue_category_name || '',
    amount: initialData?.amount || 0,
    amount_with_no_tax: initialData?.amount_with_no_tax || 0,
    tax_total: initialData?.tax_total || 0,
    court_labels: initialData?.court_labels || '',
    payment_type: initialData?.payment_type || '',
    transaction_type: initialData?.transaction_type || '',
    start: initialData?.start ? new Date(initialData.start).toISOString().split('T')[0] : '',
    end: initialData?.end ? new Date(initialData.end).toISOString().split('T')[0] : '',
    transaction_date: initialData?.transaction_date ? new Date(initialData.transaction_date).toISOString().split('T')[0] : '',
    paid_date: initialData?.paid_date ? new Date(initialData.paid_date).toISOString().split('T')[0] : '',
    item_cost: initialData?.item_cost || 0
  });

  const handleChange = (field: keyof SalesSummaryInput, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Sales Summary' : 'Add Sales Summary'}</DialogTitle>
            <DialogDescription>{isEditing ? 'Update sales summary record' : 'Add a new sales summary record'}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="family_id">Family</Label>
              <Select
                value={formData.family_id || undefined}
                onValueChange={(value) => handleChange('family_id', value)}
                disabled={loading}
                required
              >
                <SelectTrigger id="family_id" className="w-full">
                  <SelectValue placeholder="Select Family" />
                </SelectTrigger>
                <SelectContent>
                  {families.map((family: IFamily) => (
                    <SelectItem key={family._id} value={family._id}>
                      {family.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fee_category_name">Fee Category *</Label>
                <Input
                  id="fee_category_name"
                  placeholder="Fee Category"
                  value={formData.fee_category_name || undefined}
                  onChange={(e) => handleChange('fee_category_name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item_name">Item Name *</Label>
                <Input
                  id="item_name"
                  placeholder="Item Name"
                  value={formData.item_name || undefined}
                  onChange={(e) => handleChange('item_name', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue_category_name">Revenue Category *</Label>
                <Input
                  id="revenue_category_name"
                  placeholder="Revenue Category"
                  value={formData.revenue_category_name || undefined}
                  onChange={(e) => handleChange('revenue_category_name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                  value={formData.amount || undefined}
                  onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount_with_no_tax">Amount (No Tax)</Label>
                <Input
                  id="amount_with_no_tax"
                  type="number"
                  step="0.01"
                  placeholder="Amount (No Tax)"
                  value={formData.amount_with_no_tax || undefined}
                  onChange={(e) => handleChange('amount_with_no_tax', parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax_total">Tax Total</Label>
                <Input
                  id="tax_total"
                  type="number"
                  step="0.01"
                  placeholder="Tax Total"
                  value={formData.tax_total || undefined}
                  onChange={(e) => handleChange('tax_total', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="court_labels">Court Labels</Label>
                <Input
                  id="court_labels"
                  placeholder="Court Labels"
                  value={formData.court_labels || undefined}
                  onChange={(e) => handleChange('court_labels', e.target.value)}
                />
              </div>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transaction_type">Transaction Type *</Label>
                <Select value={formData.transaction_type} onValueChange={(value) => handleChange('transaction_type', value)} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fee">Fee</SelectItem>
                    <SelectItem value="Refund">Refund</SelectItem>
                    <SelectItem value="Credit">Credit</SelectItem>
                    <SelectItem value="Debit">Debit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item_cost">Item Cost</Label>
                <Input
                  id="item_cost"
                  type="number"
                  step="0.01"
                  placeholder="Item Cost"
                  value={formData.item_cost || undefined}
                  onChange={(e) => handleChange('item_cost', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start">Start Date</Label>
                <DatePicker value={formData.start} onChange={(e) => handleChange('start', e)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">End Date</Label>
                <DatePicker value={formData.end} onChange={(e) => handleChange('end', e)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transaction_date">Transaction Date</Label>
                <DatePicker value={formData.transaction_date} onChange={(e) => handleChange('transaction_date', e)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paid_date">Paid Date</Label>
                <DatePicker value={formData.paid_date} onChange={(e) => handleChange('paid_date', e)} />
              </div>
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

export default SalesSummaryFormDialog;
