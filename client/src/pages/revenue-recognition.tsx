import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DatePicker from '@/components/date-picker';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import { RevenueRecognitionFormDialog } from '@/components/revenue-recognition-form-dialog';
import SearchInput from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import { type RevenueRecognitionInput } from '@/graphql/mutations';
import type { IRevenueRecognition } from '@/graphql/queries';
import useRevenueRecognition from '@/hooks/use-revenue-recognition';
import useRevenueRecognitionMutations from '@/hooks/use-revenue-recognition-mutations';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

function RevenueRecognition() {
  const { data, loading, error, pagination, updatePage, updateLimit, updateFilters, resetFilters, refetch } = useRevenueRecognition();
  const {
    createRevenueRecognition,
    updateRevenueRecognition,
    deleteRevenueRecognition,
    loading: mutationLoading
  } = useRevenueRecognitionMutations(refetch);
  const { showConfirmation } = useConfirmationModal();

  const [filters, setFilters] = useState({
    search: '',
    payment_type: '',
    transaction_type: '',
    start_date: '',
    end_date: ''
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRevenue, setSelectedRevenue] = useState<IRevenueRecognition | null>(null);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    const filterPayload: any = {};
    if (filters.search) filterPayload.search = filters.search;
    if (filters.payment_type) filterPayload.payment_type = filters.payment_type;
    if (filters.transaction_type) filterPayload.transaction_type = filters.transaction_type;
    if (filters.start_date) {
      filterPayload.start_date = filters.start_date;
    }
    if (filters.end_date) {
      filterPayload.end_date = filters.end_date;
    }
    updateFilters(filterPayload);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      payment_type: '',
      transaction_type: '',
      start_date: '',
      end_date: ''
    });
    resetFilters();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleCreate = (data: RevenueRecognitionInput) => {
    createRevenueRecognition(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdate = (data: RevenueRecognitionInput) => {
    if (selectedRevenue) {
      updateRevenueRecognition(selectedRevenue._id, data);
      setIsEditDialogOpen(false);
      setSelectedRevenue(null);
    }
  };

  const handleEdit = (revenue: IRevenueRecognition) => {
    setSelectedRevenue(revenue);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (revenue: IRevenueRecognition) => {
    showConfirmation('Are you sure you want to delete this revenue recognition record? This action cannot be undone.', () => {
      deleteRevenueRecognition(revenue._id);
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Revenue Recognition</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={() => setIsCreateDialogOpen(true)} label="Add New" />
          <ImportCSVDialog onSuccess={refetch} type="revenue-recognition" />
          <ImportJsonDialog onSuccess={refetch} type="revenue-recognition" />
        </div>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleReset}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SearchInput value={filters.search} onChange={(value) => handleFilterChange('search', value)} />
          <div>
            <Label className="block text-sm font-medium mb-1">Start Date</Label>
            <DatePicker value={filters.start_date} onChange={(e) => handleFilterChange('start_date', `${e}`)} className="w-full" />
          </div>
          <div>
            <Label className="block text-sm font-medium mb-1">End Date</Label>
            <DatePicker value={filters.end_date} onChange={(e) => handleFilterChange('end_date', `${e}`)} className="w-full" />
          </div>
          <div>
            <Label className="block text-sm font-medium mb-1">Payment Type</Label>
            <Select value={filters.payment_type || ''} onValueChange={(value) => handleFilterChange('payment_type', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Payment Type" />
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
          <div>
            <Label className="block text-sm font-medium mb-1">Transaction Type</Label>
            <Select value={filters.transaction_type || ''} onValueChange={(value) => handleFilterChange('transaction_type', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Membership">Membership</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
                <SelectItem value="Lesson">Lesson</SelectItem>
                <SelectItem value="Reservation">Reservation</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterCard>

      <DataTable
        data={data}
        columns={[
          { header: 'Fee Category', accessor: 'fee_category' },
          {
            header: 'Member',
            accessor: (item) => (item.member_id ? `${item.member_id.first_name} ${item.member_id.last_name}` : '-')
          },
          {
            header: 'Description',
            accessor: (item) => item.description || '-'
          },
          {
            header: 'Subtotal',
            accessor: (item) => formatCurrency(item.subtotal),
            className: 'text-right'
          },
          {
            header: 'Tax',
            accessor: (item) => formatCurrency(item.tax_total),
            className: 'text-right'
          },
          {
            header: 'Total',
            accessor: (item) => <Badge variant={item.total > 0 ? 'primary' : 'destructive'}>{formatCurrency(item.total)}</Badge>,
            className: 'text-center'
          },
          {
            header: 'Start Date',
            accessor: (item) => formatDate(item.start_date_time)
          },
          {
            header: 'End Date',
            accessor: (item) => formatDate(item.end_date_time)
          },
          { header: 'Payment Type', accessor: 'payment_type' },
          { header: 'Transaction Type', accessor: 'transaction_type' },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <EditButton onClick={() => handleEdit(item)} />
                <DeleteButton onClick={() => handleDelete(item)} />
              </div>
            ),
            className: 'text-center'
          }
        ]}
        pagination={pagination}
        isLoading={loading}
        error={error}
        onPageChange={updatePage}
        onLimitChange={updateLimit}
      />

      <RevenueRecognitionFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
        title="Create Revenue Recognition"
        description="Add a new revenue recognition record"
        loading={mutationLoading}
      />

      {selectedRevenue && isEditDialogOpen && (
        <RevenueRecognitionFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleUpdate}
          initialData={selectedRevenue}
          title="Edit Revenue Recognition"
          description="Update revenue recognition record"
          loading={mutationLoading}
        />
      )}
    </Layout>
  );
}

export default RevenueRecognition;
