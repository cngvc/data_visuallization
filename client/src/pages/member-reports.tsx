import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DatePicker from '@/components/date-picker';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import PlayerReportFormDialog from '@/components/member-report-form-dialog';
import { MemberSelector } from '@/components/member-selector';
import { MultiSelect } from '@/components/multiple-select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import type { IPlayerReport, PlayerReportFilterInput } from '@/graphql/queries';
import { usePlayerReportMutations } from '@/hooks/use-member-report-mutations';
import { usePlayerReports } from '@/hooks/use-member-reports';
import { formatDate } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ReservationTabs } from './reservations';

export function PlayerReportsContent() {
  const { data, loading, error, pagination, updatePage, updateLimit, refetch, filterOptions, updateFilters, resetFilters } =
    usePlayerReports();
  const [selectedReport, setSelectedReport] = useState<IPlayerReport | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create'>('view');
  const { showConfirmation } = useConfirmationModal();
  const { deletePlayerReport } = usePlayerReportMutations(() => {
    refetch();
  });
  const [filters, setFilters] = useState<PlayerReportFilterInput>({});

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const handleViewReport = (report: IPlayerReport) => {
    setSelectedReport(report);
    setDialogMode('view');
    setIsDialogOpen(true);
  };

  const handleEditReport = (report: IPlayerReport) => {
    setSelectedReport(report);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleCreateReport = () => {
    setSelectedReport(null);
    setDialogMode('create');
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (report: IPlayerReport) => {
    showConfirmation(`Are you sure you want to delete the member report "${report._id}"? This action cannot be undone.`, async () => {
      await deletePlayerReport(report._id);
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const applyFilters = () => {
    const filterPayload: PlayerReportFilterInput = {};
    if (filters.search) filterPayload.search = filters.search;
    if (filters.booking_type) filterPayload.booking_type = filters.booking_type;
    if (filters.is_approved !== undefined) filterPayload.is_approved = filters.is_approved;
    if (filters.court_ids?.length) filterPayload.court_ids = filters.court_ids;
    if (filters.member_id) filterPayload.member_id = filters.member_id;
    if (filters.start_date) filterPayload.start_date = filters.start_date;
    if (filters.end_date) filterPayload.end_date = filters.end_date;
    updateFilters(filterPayload);
  };

  const handleResetFilters = () => {
    setFilters({});
    resetFilters();
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Member Reports</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={handleCreateReport} label="Add Report" />
          <ImportCSVDialog onSuccess={refetch} type="member-reports" />
          <ImportJsonDialog onSuccess={refetch} type="member-reports" />
        </div>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleResetFilters}>
        <ReservationTabs />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium mb-1 block">Member</Label>
            <MemberSelector value={filters.member_id} onSelect={(value: string) => handleFilterChange('member_id', value)} />
          </div>
          <div>
            <Label className="text-sm font-medium mb-1 block">Booking Type</Label>
            <Select value={filters.booking_type} onValueChange={(value: string) => handleFilterChange('booking_type', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.bookingTypes?.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Status</Label>
            <Select
              value={filters.is_approved !== undefined ? String(filters.is_approved) : ''}
              onValueChange={(value) => {
                if (value === '') {
                  handleFilterChange('is_approved', undefined);
                } else {
                  handleFilterChange('is_approved', value === 'true');
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Approval status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Approved</SelectItem>
                <SelectItem value="false">Not Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Court</Label>
            <MultiSelect
              values={filters.court_ids}
              onValueChange={(value) => {
                handleFilterChange('court_ids', value);
              }}
              options={filterOptions.courts?.map((court) => ({ value: court._id, label: court.label })) || []}
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Start Date</Label>
            <DatePicker value={filters.start_date} onChange={handleFilterChange.bind(null, 'start_date')} />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">End Date</Label>
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
            header: 'Type',
            accessor: (item) => item?.booking_type || '-'
          },
          {
            header: 'Start Date',
            accessor: (item) => formatDate(item?.start_date_time)
          },
          {
            header: 'End Date',
            accessor: (item) => formatDate(item?.end_date_time)
          },
          {
            header: 'Created At',
            accessor: (item) => formatDate(item?.created_at)
          },
          {
            header: 'Courts',
            accessor: (item) => (item?.court_ids?.length ? item.court_ids.map((court) => court.label).join(', ') : '-')
          },
          {
            header: 'Approved',
            accessor: (item) => (item?.is_approved ? 'Yes' : 'No')
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleViewReport(item)} title="View">
                  <Eye className="h-4 w-4" />
                </Button>
                <EditButton onClick={() => handleEditReport(item)} />
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
      {isDialogOpen && (
        <PlayerReportFormDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSuccess={refetch}
          report={selectedReport}
          mode={dialogMode}
        />
      )}
    </div>
  );
}

export default function PlayerReports() {
  return (
    <Layout>
      <PlayerReportsContent />
    </Layout>
  );
}
