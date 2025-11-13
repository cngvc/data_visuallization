import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import SearchInput from '@/components/search-input';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import type { EventRegistrationFilterInput, IReservationPlayer, ReservationPlayerFilterInput } from '@/graphql/queries';
import useEventRegistrations from '@/hooks/use-event-registrations';
import { useReservationPlayersMutations } from '@/hooks/use-event-registrations-mutation';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';

export default function EventRegistrations({ status }: { status: 'Active' | 'Cancelled' }) {
  const { loading, error, data, pagination, updatePage, updateLimit, refetch, updateFilters, resetFilters } = useEventRegistrations({
    status
  });
  const { showConfirmation } = useConfirmationModal();
  const { deleteReservationPlayer } = useReservationPlayersMutations(refetch);

  const [filters, setFilters] = useState<EventRegistrationFilterInput>({
    status: 'Active'
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDeleteRegistration = async (registration: IReservationPlayer) => {
    showConfirmation(`Are you sure you want to delete registration ${registration._id}?`, async () => {
      await deleteReservationPlayer(registration._id);
      refetch();
    });
  };

  const applyFilters = () => {
    const filterPayload: ReservationPlayerFilterInput = {};
    if (filters.search) filterPayload.search = filters.search;
    if (filters.status) filterPayload.status = filters.status;
    updateFilters(filterPayload);
  };

  const handleResetFilters = () => {
    setFilters({});
    resetFilters();
  };

  return (
    <Layout>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">{status} Event Registrations</h1>
        <div className="flex items-center gap-2">
          <ImportCSVDialog onSuccess={refetch} type="event-registrations" />
          <ImportJsonDialog type="event-registrations" onSuccess={refetch} />
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
            header: 'Event',
            accessor: (item) => item?.event_id?.name || '-'
          },
          {
            header: 'Member',
            accessor: (item) => item?.member_id?.first_name + ' ' + item?.member_id?.last_name
          },
          {
            header: 'Paid Amount',
            accessor: (item) => item?.paid_amount || '-'
          },
          {
            header: 'Price to Pay',
            accessor: (item) => item?.price_to_pay || '-'
          },
          {
            header: 'Unsubscribe from Marketing Emails',
            accessor: (item) => item?.unsubscribe_from_marketing_emails || '-'
          },
          {
            header: 'Unsubscribe from Marketing Text Alerts',
            accessor: (item) => item?.unsubscribe_from_marketing_text_alerts || '-'
          },
          {
            header: 'Start Time',
            accessor: (item) => item?.start_time || '-'
          },
          {
            header: 'End Time',
            accessor: (item) => item?.end_time || '-'
          },
          {
            header: 'Signed Up On UTC',
            accessor: (item) => item?.signed_up_on_utc || '-'
          },
          {
            header: 'Status',
            accessor: (item) => {
              const isCancelled = !!item.cancelled_on_utc;
              const statusText = isCancelled ? 'Cancelled' : 'Active';
              const statusColor = isCancelled ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800';

              return (
                <div>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>{statusText}</span>
                  {isCancelled && (
                    <div className="text-xs text-gray-500 mt-1">Cancelled: {format(parseISO(item.cancelled_on_utc), 'MMM d, yyyy')}</div>
                  )}
                </div>
              );
            }
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <DeleteButton onClick={() => handleDeleteRegistration(item)} />
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
    </Layout>
  );
}
