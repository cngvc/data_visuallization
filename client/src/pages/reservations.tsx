import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DatePicker from '@/components/date-picker';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import { MemberSelector } from '@/components/member-selector';
import { MultiSelect } from '@/components/multiple-select';
import ReservationFormDialog from '@/components/reservation-form-dialog';
import SearchInput from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import type { IReservation, ReservationFilterInput } from '@/graphql/queries';
import { useCourts } from '@/hooks/use-courts';
import useReservationMutations from '@/hooks/use-reservation-mutations';
import { useReservationTypes } from '@/hooks/use-reservation-types';
import useReservations from '@/hooks/use-reservations';
import { format, parseISO } from 'date-fns';
import { CircleCheck, CircleX, Eye, UserRoundCheck } from 'lucide-react';
import { useCallback, useState } from 'react';
import { PlayerReportsContent } from './member-reports';

type ReservationStatus = 'Active' | 'Cancelled' | 'Attendance';

function ReservationTab({ status }: { status: 'Active' | 'Cancelled' }) {
  const { loading, error, data, pagination, updatePage, updateLimit, updateFilters, resetFilters, refetch } = useReservations({ status });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<IReservation | null>(null);
  const { showConfirmation } = useConfirmationModal();
  const { data: courts } = useCourts();
  const { data: reservationTypes } = useReservationTypes();
  const [filters, setFilters] = useState<ReservationFilterInput>({});

  const { deleteReservation } = useReservationMutations(() => {
    setSelectedReservation(null);
    refetch();
  });

  const handleCreateReservation = () => {
    setSelectedReservation(null);
    setIsFormOpen(true);
  };

  const handleViewReservation = (reservation: IReservation) => {
    setSelectedReservation(reservation);
    setIsViewDialogOpen(true);
  };

  const handleEditReservation = (reservation: IReservation) => {
    setSelectedReservation(reservation);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (reservation: IReservation) => {
    showConfirmation(`Are you sure you want to delete the transaction "${reservation._id}"? This action cannot be undone.`, async () => {
      await deleteReservation(reservation._id);
    });
  };

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const applyFilters = () => {
    const filterPayload: ReservationFilterInput = {};
    if (filters.search) filterPayload.search = filters.search;
    if (filters.member_id) filterPayload.member_id = filters.member_id;
    if (filters.court_ids?.length) filterPayload.court_ids = filters.court_ids;
    if (filters.reservation_type_id) filterPayload.reservation_type_id = filters.reservation_type_id;
    if (filters.status) filterPayload.status = filters.status;
    if (filters.is_lesson !== undefined) filterPayload.is_lesson = filters.is_lesson;
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
        <h1 className="text-2xl font-bold">{status} Reservations</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={handleCreateReservation} label="Add Reservation" />
          <ImportCSVDialog onSuccess={refetch} type="reservations" />
          <ImportJsonDialog onSuccess={refetch} type="reservations" />
        </div>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleResetFilters}>
        <ReservationTabs />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SearchInput value={filters.search} onChange={(value) => handleFilterChange('search', value)} />
          <div>
            <Label className="text-sm font-medium mb-1 block">Member</Label>
            <MemberSelector value={filters.member_id} onSelect={(value) => handleFilterChange('member_id', value)} />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Courts</Label>
            <MultiSelect
              values={filters.court_ids || []}
              onValueChange={(value) => handleFilterChange('court_ids', value)}
              options={courts?.map((court: any) => ({ value: court._id, label: court.label })) || []}
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Reservation Type</Label>
            <Select value={filters.reservation_type_id} onValueChange={(value) => handleFilterChange('reservation_type_id', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {reservationTypes?.map((type) => (
                  <SelectItem key={type._id} value={type._id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Lesson</Label>
            <Select
              value={filters.is_lesson !== undefined ? String(filters.is_lesson) : ''}
              onValueChange={(value) => {
                if (value === '') {
                  handleFilterChange('is_lesson', undefined);
                } else {
                  handleFilterChange('is_lesson', value === 'true');
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Lesson status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Label className="text-sm font-medium mb-1 block">Start Date</Label>
            <DatePicker value={filters.start_date} onChange={handleFilterChange.bind(null, 'start_date')} />
          </div>

          <div className="col-span-2">
            <Label className="text-sm font-medium mb-1 block">End Date</Label>
            <DatePicker value={filters.end_date} onChange={handleFilterChange.bind(null, 'end_date')} />
          </div>
        </div>
      </FilterCard>
      <DataTable
        data={data}
        columns={[
          {
            header: 'Courts',
            accessor: (item) => item.court_ids?.map((court) => court.label).join(', ') || '-'
          },
          {
            header: 'Type',
            accessor: (item) => item.reservation_type_id?.name || '-'
          },
          {
            header: 'Lesson',
            accessor: (item) => (item.is_lesson ? 'Yes' : 'No')
          },
          {
            header: 'Instructors',
            accessor: (item) => item.instructors || '-'
          },
          {
            header: 'Players',
            accessor: (item) => (
              <div className="truncate">
                {item.player_ids?.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {item.player_ids
                      .map((player) => (
                        <div key={player._id} className="text-xs">
                          {player.member_id?.first_name} {player.member_id?.last_name}
                        </div>
                      ))
                      .slice(0, 3)}
                    {item.player_ids.length > 3 && <div className="text-xs text-gray-500">+{item.player_ids.length - 3} more</div>}
                  </div>
                ) : (
                  '-'
                )}
              </div>
            )
          },
          {
            header: 'Payment',
            accessor: (item) => {
              if (!item.player_ids?.length) return '-';

              const totalToPay = item.player_ids.reduce((sum, player) => sum + (player.price_to_pay || 0), 0);
              const totalPaid = item.player_ids.reduce((sum, player) => sum + (player.paid_amount || 0), 0);

              return (
                <div className="text-xs text-center">
                  <Badge variant={totalPaid >= totalToPay ? 'success' : 'destructive'}>Paid: ${totalPaid?.toFixed(2) || '0.00'}</Badge>
                  <div>Total: ${totalToPay?.toFixed(2) || '0.00'}</div>
                </div>
              );
            }
          },
          {
            header: 'Time',
            accessor: (item) => (
              <div className="text-xs">
                <div>{item.start_time ? format(parseISO(item.start_time), 'MMM d, yyyy') : ''}</div>
                <div className="font-medium">
                  {item.start_time ? format(parseISO(item.start_time), 'h:mm a') : ''} -
                  {item.end_time ? format(parseISO(item.end_time), 'h:mm a') : ''}
                </div>
              </div>
            )
          },
          {
            header: 'Created At',
            accessor: (item) => (
              <div className="text-xs">
                <div>{item.created_at ? format(parseISO(item.created_at), 'MMM d, yyyy') : '-'}</div>
              </div>
            )
          },
          {
            header: 'Updated At',
            accessor: (item) => (
              <div className="text-xs">
                <div>{item.updated_at ? format(parseISO(item.updated_at), 'MMM d, yyyy') : '-'}</div>
              </div>
            )
          },
          {
            header: 'Status',
            accessor: (item) => {
              let statusColor = 'bg-gray-100 text-gray-800';
              if (item.status === 'confirmed') statusColor = 'bg-green-100 text-green-800';
              else if (item.status === 'pending') statusColor = 'bg-yellow-100 text-yellow-800';
              else if (item.status === 'cancelled') statusColor = 'bg-red-100 text-red-800';

              return (
                <div>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>{item.status}</span>
                  {item.cancelled_on && (
                    <div className="text-xs text-gray-500 mt-1">Cancelled: {format(parseISO(item.cancelled_on), 'MMM d, yyyy')}</div>
                  )}
                </div>
              );
            }
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleViewReservation(item)} title="View">
                  <Eye className="h-4 w-4" />
                </Button>
                <EditButton onClick={() => handleEditReservation(item)} />
                <DeleteButton onClick={() => handleDeleteClick(item)} />
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

      <ReservationFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={() => {
          setIsFormOpen(false);
          refetch();
        }}
        reservation={selectedReservation}
      />
      {selectedReservation && isViewDialogOpen && (
        <ReservationFormDialog
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
          onSuccess={() => {}}
          reservation={selectedReservation}
          isViewOnly={true}
        />
      )}
    </div>
  );
}

export default function Reservations() {
  const [activeTab, setActiveTab] = useState<ReservationStatus>('Active');

  return (
    <Layout>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ReservationStatus)} className="w-full">
        <TabsContent value="Active">
          <ReservationTab status="Active" />
        </TabsContent>

        <TabsContent value="Cancelled">
          <ReservationTab status="Cancelled" />
        </TabsContent>

        <TabsContent value="Attendance">
          <PlayerReportsContent />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export const ReservationTabs = () => {
  return (
    <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
      <TabsTrigger value="Active">
        <CircleCheck />
        Active
      </TabsTrigger>
      <TabsTrigger value="Cancelled">
        <CircleX />
        Cancelled
      </TabsTrigger>
      <TabsTrigger value="Attendance">
        <UserRoundCheck />
        Attendance
      </TabsTrigger>
    </TabsList>
  );
};
