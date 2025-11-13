import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DatePicker from '@/components/date-picker';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import SearchInput from '@/components/search-input';
import TransactionFormDialog from '@/components/transaction-form-dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import { type ITransaction, type TransactionsFilterInput } from '@/graphql/queries';
import useTransactionMutations from '@/hooks/use-transaction-mutations';
import useTransactions from '@/hooks/use-transactions';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

function Transactions() {
  const { data, loading, error, pagination, updatePage, updateLimit, updateFilters, resetFilters, refetch } = useTransactions();
  const { createTransaction, updateTransaction, deleteTransaction, loading: mutationLoading } = useTransactionMutations(refetch);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const { showConfirmation } = useConfirmationModal();

  const [filters, setFilters] = useState<TransactionsFilterInput>({});

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev: Partial<typeof filters>) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    updateFilters(filters);
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

  const handleCreate = (data: any) => {
    createTransaction(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdate = (data: any) => {
    if (selectedTransaction) {
      updateTransaction(selectedTransaction._id, data);
      setIsEditDialogOpen(false);
      setSelectedTransaction(null);
    }
  };

  const handleEdit = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (transaction: ITransaction) => {
    showConfirmation(`Are you sure you want to delete the transaction "${transaction._id}"? This action cannot be undone.`, async () => {
      await deleteTransaction(transaction._id);
    });
  };

  const renderMainUI = () => (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={() => setIsCreateDialogOpen(true)} label="Add Transaction" />
          <ImportCSVDialog onSuccess={refetch} type="transactions" />
          <ImportJsonDialog onSuccess={refetch} type="transactions" />
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
          {
            header: 'Member',
            accessor: (item) => item?.member_id?.first_name + ' ' + item?.member_id?.last_name
          },
          {
            header: 'Category',
            accessor: (item) => item?.category || '-'
          },
          {
            header: 'Total',
            accessor: (item) =>
              item ? (
                <Badge variant={item.total && item.total > 0 ? 'primary' : 'destructive'}>{formatCurrency(item.total || 0)}</Badge>
              ) : null,
            className: 'text-left'
          },
          {
            header: 'Unpaid Amount',
            accessor: (item) =>
              item ? (
                <Badge variant={item.unpaid_amount && item.unpaid_amount > 0 ? 'primary' : 'destructive'}>
                  {formatCurrency(item.unpaid_amount || 0)}
                </Badge>
              ) : null,
            className: 'text-center'
          },
          {
            header: 'Transaction Date',
            accessor: (item) => (item?.transaction_date ? formatDate(item.transaction_date) : '')
          },
          {
            header: 'Paid Date',
            accessor: (item) => (item?.paid_on ? formatDate(item.paid_on) : '')
          },
          {
            header: 'Reservation Date',
            accessor: (item) => (item?.reservation_start ? formatDate(item.reservation_start) : '')
          },
          {
            header: 'Payment Type',
            accessor: (item) => item?.payment_type || '-'
          },
          {
            header: 'Transaction Type',
            accessor: (item) => item?.transaction_type || '-'
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <EditButton onClick={() => handleEdit(item)} />
                <DeleteButton onClick={() => handleDelete(item)} />
              </div>
            ),
            className: 'text-right'
          }
        ]}
        pagination={pagination}
        isLoading={loading}
        error={error}
        onPageChange={updatePage}
        onLimitChange={updateLimit}
      />
    </Layout>
  );

  return (
    <>
      {renderMainUI()}

      <TransactionFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreate}
        title="Create Transaction"
        description="Add a new transaction to the system"
        loading={mutationLoading}
      />

      {selectedTransaction && isEditDialogOpen && (
        <TransactionFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleUpdate}
          initialData={selectedTransaction}
          title="Edit Transaction"
          description="Update transaction details"
          loading={mutationLoading}
        />
      )}
    </>
  );
}

export default Transactions;
