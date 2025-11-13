import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DatePicker from '@/components/date-picker';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import SalesSummaryFormDialog from '@/components/sales-summary-form-dialog';
import SearchInput from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import { type SalesSummaryInput } from '@/graphql/mutations';
import type { ISalesSummary, SalesSummaryFilterInput } from '@/graphql/queries';
import useSalesSummary from '@/hooks/use-sales-summary';
import useSalesSummaryMutations from '@/hooks/use-sales-summary-mutations';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

function SalesSummary() {
  const { data, loading, error, pagination, updatePage, updateLimit, updateFilters, resetFilters, refetch } = useSalesSummary();
  const { createSalesSummary, updateSalesSummary, deleteSalesSummary, loading: mutationLoading } = useSalesSummaryMutations(refetch);
  const { showConfirmation } = useConfirmationModal();

  const [filters, setFilters] = useState<SalesSummaryFilterInput>({});
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSalesSummary, setSelectedSalesSummary] = useState<ISalesSummary | null>(null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: Partial<SalesSummaryFilterInput>) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const filterPayload: SalesSummaryFilterInput = {};
    if (filters.search) filterPayload.search = filters.search;
    if (filters.start_date) filterPayload.start_date = filters.start_date;
    if (filters.end_date) filterPayload.end_date = filters.end_date;
    updateFilters(filterPayload);
  };

  const handleReset = () => {
    setFilters({});
    resetFilters();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleCreate = (data: SalesSummaryInput) => {
    createSalesSummary(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdate = (data: SalesSummaryInput) => {
    if (selectedSalesSummary) {
      updateSalesSummary(selectedSalesSummary._id, data);
      setIsEditDialogOpen(false);
      setSelectedSalesSummary(null);
    }
  };

  const handleEdit = (salesSummary: ISalesSummary) => {
    setSelectedSalesSummary(salesSummary);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (salesSummary: ISalesSummary) => {
    showConfirmation('Are you sure you want to delete this sales summary? This action cannot be undone.', () => {
      deleteSalesSummary(salesSummary._id);
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sales Summary</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={() => setIsCreateDialogOpen(true)} label="Add New" />
          <ImportCSVDialog onSuccess={refetch} type="sales-summary" />
          <ImportJsonDialog onSuccess={refetch} type="sales-summary" />
        </div>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleReset}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchInput value={filters.search} onChange={(value) => handleFilterChange('search', value)} />
          <div>
            <Label className="block text-sm font-medium mb-1">Start Date</Label>
            <DatePicker value={filters.start_date} onChange={handleFilterChange.bind(null, 'start_date')} />
          </div>
          <div>
            <Label className="block text-sm font-medium mb-1">End Date</Label>
            <DatePicker value={filters.end_date} onChange={handleFilterChange.bind(null, 'end_date')} />
          </div>
        </div>
      </FilterCard>

      <DataTable
        data={data}
        columns={[
          { header: 'Fee Category', accessor: 'fee_category_name' },
          { header: 'Family', accessor: (item) => item.family_id?.name || '-' },
          {
            header: 'Item Name',
            accessor: (item) => item.item_name
          },
          { header: 'Revenue Category', accessor: 'revenue_category_name' },
          { header: 'Membership', accessor: (item) => item.membership_name || '-' },
          { header: 'Instructor', accessor: (item) => item.instructor_names || '-' },
          {
            header: 'Amount',
            accessor: (item) => <Badge variant={item.amount > 0 ? 'primary' : 'destructive'}>{formatCurrency(item.amount)}</Badge>,
            className: 'text-center'
          },
          {
            header: 'Transaction Date',
            accessor: (item) => item.transaction_date
          },
          {
            header: 'Paid Date',
            accessor: (item) => formatDate(item.paid_date)
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

      <SalesSummaryFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
        loading={mutationLoading}
      />

      {selectedSalesSummary && isEditDialogOpen && (
        <SalesSummaryFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleUpdate}
          initialData={selectedSalesSummary}
          loading={mutationLoading}
        />
      )}
    </Layout>
  );
}

export default SalesSummary;
