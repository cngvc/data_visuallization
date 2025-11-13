import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import FamilyFormDialog from '@/components/family-form-dialog';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import SearchInput from '@/components/search-input';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import type { FamilyFilterInput, IFamily } from '@/graphql/queries';
import useCurrentUser from '@/hooks/use-current-user';
import useFamilies from '@/hooks/use-families';
import { useFamilyMutations } from '@/hooks/use-family-mutations';
import { format } from 'date-fns';
import { useState } from 'react';

export default function Families() {
  const { loading, error, data, pagination, updatePage, updateLimit, refetch, updateFilters, resetFilters } = useFamilies();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<IFamily | null>(null);
  const { deleteFamily } = useFamilyMutations(refetch);
  const { showConfirmation } = useConfirmationModal();
  const { isCurrentOrgAdmin } = useCurrentUser();
  const [filters, setFilters] = useState<FamilyFilterInput>({});

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddFamily = () => {
    setSelectedFamily(null);
    setIsFormOpen(true);
  };

  const handleEditFamily = (family: IFamily) => {
    setSelectedFamily(family);
    setIsFormOpen(true);
  };

  const handleDeleteFamily = async (family: IFamily) => {
    showConfirmation(`Are you sure you want to delete family ${family.name}?`, async () => {
      await deleteFamily(family._id);
      refetch();
    });
  };

  const applyFilters = () => {
    const filterPayload: FamilyFilterInput = {};
    if (filters.search) filterPayload.search = filters.search;
    updateFilters(filterPayload);
  };

  const handleResetFilters = () => {
    setFilters({});
    resetFilters();
  };

  return (
    <Layout>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Families</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={handleAddFamily} label="Add Family" />
          <ImportCSVDialog onSuccess={refetch} type="families" />
          <ImportJsonDialog onSuccess={refetch} type="families" />
        </div>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleResetFilters}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SearchInput value={filters.search} onChange={(value) => handleFilterChange('search', value)} />
        </div>
      </FilterCard>

      <DataTable
        data={data}
        columns={[
          {
            header: 'Name',
            accessor: (item) => item?.name || '-'
          },
          {
            header: 'Number',
            accessor: (item) => item?.number || '-'
          },
          {
            header: 'Created At',
            accessor: (item) => format(new Date(item?.created_at), 'yyyy-MM-dd') || '-'
          },
          {
            header: 'Updated At',
            accessor: (item) => format(new Date(item?.updated_at), 'yyyy-MM-dd') || '-'
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <EditButton onClick={() => handleEditFamily(item)} disabled={!isCurrentOrgAdmin} />
                <DeleteButton onClick={() => handleDeleteFamily(item)} disabled={!isCurrentOrgAdmin} />
              </div>
            )
          }
        ]}
        pagination={pagination}
        isLoading={loading}
        error={error}
        onPageChange={updatePage}
        onLimitChange={updateLimit}
      />

      {isFormOpen && (
        <FamilyFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            refetch();
            setIsFormOpen(false);
          }}
          family={selectedFamily}
        />
      )}
    </Layout>
  );
}
