import AddButton from '@/components/add-button';
import CourtFormDialog from '@/components/court-form-dialog';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import SearchInput from '@/components/search-input';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import type { CourtFilterInput, ICourt } from '@/graphql/queries';
import { useCourtMutations } from '@/hooks/use-court-mutations';
import { useCourts } from '@/hooks/use-courts';
import { useState } from 'react';

export default function Courts() {
  const { data, loading, error, pagination, updatePage, updateLimit, refetch, updateFilters, resetFilters } = useCourts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<ICourt | null>(null);
  const { deleteCourt } = useCourtMutations(refetch);
  const { showConfirmation } = useConfirmationModal();

  const [localFilters, setLocalFilters] = useState<CourtFilterInput>({});

  const handleAddCourt = () => {
    setSelectedCourt(null);
    setIsFormOpen(true);
  };

  const handleEditCourt = (court: ICourt) => {
    setSelectedCourt(court);
    setIsFormOpen(true);
  };

  const handleDeleteCourt = async (court: ICourt) => {
    showConfirmation(`Are you sure you want to delete court ${court.label}?`, async () => {
      await deleteCourt(court._id);
      refetch();
    });
  };

  const handleFilterChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const filterPayload: CourtFilterInput = {};
    if (localFilters.search) filterPayload.search = localFilters.search;
    updateFilters(filterPayload);
  };

  const handleResetFilters = () => {
    setLocalFilters({});
    resetFilters();
  };

  return (
    <Layout>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Courts</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={handleAddCourt} label="Add New" />

          <ImportCSVDialog onSuccess={refetch} type="courts" />
          <ImportJsonDialog onSuccess={refetch} type="courts" />
        </div>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleResetFilters}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SearchInput value={localFilters.search} onChange={(value) => handleFilterChange('search', value)} />
        </div>
      </FilterCard>

      <DataTable
        data={data}
        columns={[
          {
            header: 'Label',
            accessor: (item) => item?.label || '-'
          },
          {
            header: 'Type',
            accessor: (item) => item?.type_name || '-'
          },
          {
            header: 'Order Index',
            accessor: (item) => item?.order_index || '-'
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <EditButton onClick={() => handleEditCourt(item)} />
                <DeleteButton onClick={() => handleDeleteCourt(item)} />
              </div>
            )
          }
        ]}
        isLoading={loading}
        error={error}
        pagination={pagination}
        onPageChange={updatePage}
        onLimitChange={updateLimit}
      />

      {isFormOpen && (
        <CourtFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            refetch();
            setIsFormOpen(false);
          }}
          court={selectedCourt}
        />
      )}
    </Layout>
  );
}
