import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type TransactionInput } from '@/graphql/mutations';
import { type ITransaction } from '@/graphql/queries';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';
import DatePicker from './date-picker';
import { MemberSelector } from './member-selector';

interface TransactionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TransactionInput) => void;
  initialData?: ITransaction;
  title: string;
  description?: string;
  loading?: boolean;
}

export function TransactionFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title,
  description,
  loading
}: TransactionFormDialogProps) {
  const [formData, setFormData] = useState<TransactionInput>({
    member_id: initialData?.member_id ? initialData.member_id._id : undefined,
    transaction_type: initialData?.transaction_type,
    payment_type: initialData?.payment_type,
    transaction_date: formatDate(initialData?.transaction_date),
    is_paid: initialData?.is_paid,
    subtotal: initialData?.subtotal,
    tax_total: initialData?.tax_total || 0,
    total: initialData?.total || 0,
    unpaid_amount: initialData?.unpaid_amount || 0,
    paid_on: formatDate(initialData?.paid_on),
    category: initialData?.category || '',
    reservation_start: formatDate(initialData?.reservation_start),
    reservation_end: formatDate(initialData?.reservation_end),
    account_creation_date: formatDate(initialData?.account_creation_date)
  });

  const handleChange = (field: keyof TransactionInput, value: string | number | boolean) => {
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
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="member_id">Member</Label>
              <div className="col-span-3">
                <MemberSelector value={formData.member_id} onSelect={(value) => handleChange('member_id', value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Category"
                value={formData.category || undefined}
                onChange={(e) => handleChange('category', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subtotal">Subtotal</Label>
                <Input
                  id="subtotal"
                  type="number"
                  step="0.01"
                  placeholder="Subtotal"
                  value={formData.subtotal || undefined}
                  onChange={(e) => handleChange('subtotal', parseFloat(e.target.value))}
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
                <Label htmlFor="total">Total</Label>
                <Input
                  id="total"
                  type="number"
                  step="0.01"
                  placeholder="Total"
                  value={formData.total || undefined}
                  onChange={(e) => handleChange('total', parseFloat(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unpaid_amount">Unpaid Amount</Label>
                <Input
                  id="unpaid_amount"
                  type="number"
                  step="0.01"
                  placeholder="Unpaid Amount"
                  value={formData.unpaid_amount || undefined}
                  onChange={(e) => handleChange('unpaid_amount', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment_type">Payment Type</Label>
                <Select value={formData.payment_type} onValueChange={(value) => handleChange('payment_type', value)}>
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
                <Label htmlFor="transaction_type">Transaction Type</Label>
                <Select value={formData.transaction_type} onValueChange={(value) => handleChange('transaction_type', value)}>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transaction_date">Transaction Date</Label>
                <DatePicker value={formData.transaction_date} onChange={handleChange.bind(null, 'transaction_date')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paid_on">Paid Date</Label>
                <DatePicker value={formData.paid_on} onChange={handleChange.bind(null, 'paid_on')} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reservation_start">Reservation Start</Label>
                <DatePicker value={formData.reservation_start} onChange={handleChange.bind(null, 'reservation_start')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reservation_end">Reservation End</Label>
                <DatePicker value={formData.reservation_end} onChange={handleChange.bind(null, 'reservation_end')} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="is_paid" checked={formData.is_paid} onCheckedChange={(checked) => handleChange('is_paid', checked === true)} />
              <Label htmlFor="is_paid">Is Paid</Label>
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

export default TransactionFormDialog;
