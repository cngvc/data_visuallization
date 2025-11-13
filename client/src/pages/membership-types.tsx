import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import MembershipTypeFormDialog from '@/components/membership-type-form-dialog';
import SearchInput from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import type { IMembershipType, MembershipTypeFilterInput } from '@/graphql/queries';
import { useMembershipTypeMutations } from '@/hooks/use-membership-type-mutations';
import { useMembershipTypes } from '@/hooks/use-membership-types';
import { useState } from 'react';

export default function MembershipTypes() {
  const { data, loading, error, pagination, updatePage, updateLimit, refetch, updateFilters, resetFilters } = useMembershipTypes();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMembershipType, setSelectedMembershipType] = useState<IMembershipType | null>(null);
  const { deleteMembershipType } = useMembershipTypeMutations(refetch);
  const { showConfirmation } = useConfirmationModal();

  const [localFilters, setLocalFilters] = useState<MembershipTypeFilterInput>({});

  const handleAddMembershipType = () => {
    setSelectedMembershipType(null);
    setIsFormOpen(true);
  };

  const handleEditMembershipType = (membershipType: IMembershipType) => {
    setSelectedMembershipType(membershipType);
    setIsFormOpen(true);
  };

  const handleDeleteMembershipType = async (membershipType: IMembershipType) => {
    showConfirmation(`Are you sure you want to delete membership type ${membershipType.name}?`, async () => {
      await deleteMembershipType(membershipType._id);
      refetch();
    });
  };

  const handleFilterChange = (key: string, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const filterPayload: MembershipTypeFilterInput = {};
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
        <h1 className="text-2xl font-bold">Membership Types</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={handleAddMembershipType} label="Add New" />

          <ImportCSVDialog onSuccess={refetch} type="membership-types" />
          <ImportJsonDialog onSuccess={refetch} type="membership-types" />
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
            header: 'Name',
            accessor: (item) => item?.name || '-'
          },
          {
            header: 'Order Index',
            accessor: (item) => item?.order_index || '-'
          },
          {
            header: 'Description',
            accessor: (item) => item?.description || '-'
          },
          {
            header: 'Short Code',
            accessor: (item) => item?.short_code || '-'
          },
          {
            header: 'Status',
            accessor: (item) => <Badge variant={item?.is_active ? 'default' : 'secondary'}>{item?.is_active ? 'Active' : 'Inactive'}</Badge>
          },
          {
            header: 'Is Payment Required',
            accessor: (item) => (item?.is_payment_required ? 'Yes' : 'No')
          },
          {
            header: 'Purchase Start Date',
            accessor: (item) => item?.purchase_start_date || '-'
          },
          {
            header: 'Purchase End Date',
            accessor: (item) => item?.purchase_end_date || '-'
          },
          {
            header: 'Initiation Price',
            accessor: (item) => item?.initiation_price || '-'
          },
          {
            header: 'Monthly Price',
            accessor: (item) => item?.monthly_price || '-'
          },
          {
            header: 'Quarterly Price',
            accessor: (item) => item?.quarterly_price || '-'
          },
          {
            header: 'Annual Price',
            accessor: (item) => item?.annual_price || '-'
          },
          {
            header: 'Lifetime Price',
            accessor: (item) => item?.lifetime_price || '-'
          },

          {
            header: 'Custom Price',
            accessor: (item) => item?.custom_price || '-'
          },
          {
            header: 'Custom Frequency',
            accessor: (item) => item?.custom_frequency_value || '-'
          },
          {
            header: 'Created At',
            accessor: (item) => item?.created_at || '-'
          },
          {
            header: 'Updated At',
            accessor: (item) => item?.updated_at || '-'
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <EditButton onClick={() => handleEditMembershipType(item)} />
                <DeleteButton onClick={() => handleDeleteMembershipType(item)} />
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
        <MembershipTypeFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            refetch();
            setIsFormOpen(false);
          }}
          membershipType={selectedMembershipType}
        />
      )}
    </Layout>
  );
}
