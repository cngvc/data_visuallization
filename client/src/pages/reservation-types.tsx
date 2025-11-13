import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import ReservationTypeFormDialog from '@/components/reservation-type-form-dialog';
import SearchInput from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import type { IReservationType, ReservationTypeFilterInput } from '@/graphql/queries';
import { useReservationTypeMutations } from '@/hooks/use-reservation-type-mutations';
import { useReservationTypes } from '@/hooks/use-reservation-types';
import { useState } from 'react';

export default function ReservationTypes() {
  const { data, loading, error, pagination, updatePage, updateLimit, updateFilters, resetFilters, refetch } = useReservationTypes();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReservationType, setSelectedReservationType] = useState<IReservationType | null>(null);
  const { deleteReservationType } = useReservationTypeMutations(() => refetch());
  const { showConfirmation } = useConfirmationModal();

  const [filters, setFilters] = useState<ReservationTypeFilterInput>({});

  const handleAddClick = () => {
    setSelectedReservationType(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (reservationType: IReservationType) => {
    setSelectedReservationType(reservationType);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (reservationType: IReservationType) => {
    showConfirmation(
      `Are you sure you want to delete the reservation type "${reservationType.name}"? This action cannot be undone.`,
      async () => {
        await deleteReservationType(reservationType._id);
        refetch();
      }
    );
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    const filterPayload: ReservationTypeFilterInput = {};
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
        <h1 className="text-2xl font-bold">Reservation Types</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={handleAddClick} label="Add New" />

          <ImportCSVDialog onSuccess={refetch} type="reservation-types" />
          <ImportJsonDialog onSuccess={refetch} type="reservation-types" />
        </div>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleResetFilters}>
        <div className="grid grid-cols-1 gap-4">
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
            header: 'Color Preview',
            accessor: (item) => (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: item?.background_color || '#ffffff' }} />
                <Badge
                  style={{
                    backgroundColor: item?.background_color || '#ffffff',
                    color: item?.text_color || '#000000'
                  }}
                >
                  Sample Text
                </Badge>
              </div>
            )
          },
          {
            header: 'Background Color',
            accessor: (item) => item?.background_color || '-'
          },
          {
            header: 'Text Color',
            accessor: (item) => item?.text_color || '-'
          },
          {
            header: 'Order Index',
            accessor: (item) => item?.order_index || '-'
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <EditButton onClick={() => handleEditClick(item)} />
                <DeleteButton onClick={() => handleDeleteClick(item)} />
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
        <ReservationTypeFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedReservationType(null);
          }}
          onSuccess={() => {
            setIsFormOpen(false);
            setSelectedReservationType(null);
            refetch();
          }}
          reservationType={selectedReservationType}
        />
      )}
    </Layout>
  );
}
