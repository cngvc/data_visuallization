import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DatePicker from '@/components/date-picker';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import MemberFormDialog from '@/components/member-form-dialog';
import SearchInput from '@/components/search-input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import type { IMember, MemberFilterInput } from '@/graphql/queries';
import { useMemberMutations } from '@/hooks/use-member-mutations';
import useMembers from '@/hooks/use-members';
import { format } from 'date-fns';
import { useState } from 'react';

export default function Members() {
  const { loading, error, data, pagination, updatePage, updateLimit, refetch, updateFilters, resetFilters } = useMembers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null);
  const { deleteMember } = useMemberMutations(refetch);
  const { showConfirmation } = useConfirmationModal();

  const [filters, setFilters] = useState<MemberFilterInput>({});

  const handleFilterChange = (key: string, value: any) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      setFilters((prev) => {
        if (parent === 'membership_date_range') {
          return {
            ...prev,
            membership_date_range: {
              ...prev.membership_date_range,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const applyFilters = () => {
    const filterPayload: MemberFilterInput = {};
    if (filters.search) filterPayload.search = filters.search;
    if (filters.membership_status?.length) {
      filterPayload.membership_status = filters.membership_status;
    }
    if (filters.membership_date_range?.start || filters.membership_date_range?.end) {
      filterPayload.membership_date_range = {
        start: filters.membership_date_range?.start || undefined,
        end: filters.membership_date_range?.end || undefined
      };
    }
    updateFilters(filterPayload);
  };

  const handleResetFilters = () => {
    setFilters({});
    resetFilters();
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setIsFormOpen(true);
  };

  const handleEditMember = (member: IMember) => {
    setSelectedMember(member);
    setIsFormOpen(true);
  };

  const handleDeleteMember = async (member: IMember) => {
    showConfirmation(`Are you sure you want to delete member ${member.first_name} ${member.last_name}?`, async () => {
      await deleteMember(member._id);
      refetch();
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Members</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={handleAddMember} label="Add Member" />

          <ImportCSVDialog onSuccess={refetch} type="members" />
          <ImportJsonDialog onSuccess={refetch} type="members" />
        </div>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleResetFilters}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SearchInput value={filters.search} onChange={(value) => handleFilterChange('search', value)} />
          <div>
            <Label htmlFor="membership_status">Membership Status</Label>
            <Select
              value={filters.membership_status?.length ? filters.membership_status[0] : undefined}
              onValueChange={(value) => handleFilterChange('membership_status', [value])}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="start_date" className="mb-1">
              Membership Start Date
            </Label>
            <DatePicker
              value={filters.membership_date_range?.start}
              onChange={handleFilterChange.bind(null, 'membership_date_range.start')}
            />
          </div>

          <div>
            <Label htmlFor="end_date" className="mb-1">
              Membership End Date
            </Label>
            <DatePicker value={filters.membership_date_range?.end} onChange={handleFilterChange.bind(null, 'membership_date_range.end')} />
          </div>
        </div>
      </FilterCard>

      <DataTable
        data={data}
        columns={[
          {
            header: 'Family',
            accessor: (item) => item?.family_id?.name || '-'
          },
          {
            header: 'Name',
            accessor: (item) => `${item?.first_name} ${item?.last_name}`
          },
          {
            header: 'DOB',
            accessor: (item) => (item?.date_of_birth ? format(new Date(item.date_of_birth), 'yyyy-MM-dd') : '-')
          },
          {
            header: 'Email',
            accessor: (item) => item?.email || '-'
          },
          {
            header: 'Phone',
            accessor: (item) => item?.phone || '-'
          },
          {
            header: 'Membership Type',
            accessor: (item) => item?.membership_type_id?.name || '-'
          },
          {
            header: 'Membership Status',
            accessor: (item) => item?.membership_status || '-'
          },
          {
            header: 'Membership Start Date',
            accessor: (item) => (item?.membership_start_date ? format(new Date(item.membership_start_date), 'yyyy-MM-dd') : '-')
          },
          {
            header: 'Membership End Date',
            accessor: (item) => (item?.membership_end_date ? format(new Date(item.membership_end_date), 'yyyy-MM-dd') : '-')
          },
          {
            header: 'External ID',
            accessor: (item) => item?.external_id || '-'
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <EditButton onClick={() => handleEditMember(item)} />
                <DeleteButton onClick={() => handleDeleteMember(item)} />
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
        <MemberFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedMember(null);
          }}
          onSuccess={() => {
            setIsFormOpen(false);
            setSelectedMember(null);
            refetch();
          }}
          member={selectedMember}
        />
      )}
    </Layout>
  );
}
