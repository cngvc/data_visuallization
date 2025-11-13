import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DatePicker from '@/components/date-picker';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import EventFormDialog from '@/components/event-form-dialog';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import SearchInput from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { EventFilterInput, IEvent } from '@/graphql/queries';
import { useEventCategories } from '@/hooks/use-event-categories';
import { useEventMutations } from '@/hooks/use-event-mutations';
import useEvents from '@/hooks/use-events';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Events() {
  const { loading, error, data, pagination, updatePage, updateLimit, refetch, updateFilters, resetFilters } = useEvents();
  const { data: eventCategories = [] } = useEventCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [filters, setFilters] = useState<EventFilterInput>({});

  const { deleteEvent } = useEventMutations(() => {
    refetch();
  });

  const handlePageChange = (newPage: number) => {
    updatePage(newPage);
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    updateFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters({});
    resetFilters();
  };

  const handleEditEvent = (event: IEvent) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = async (event: IEvent) => {
    if (window.confirm(`Are you sure you want to delete the event "${event.name}"?`)) {
      const result = await deleteEvent(event._id);
      if (result.success) {
        toast.success('Event deleted: ' + result.message);
        refetch();
      } else {
        toast.error('Error: ' + result.message);
      }
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={handleCreateEvent} label="Add Event" />

          <ImportCSVDialog onSuccess={refetch} type="events" />
          <ImportJsonDialog onSuccess={refetch} type="events" />
        </div>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleResetFilters}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SearchInput value={filters.search} onChange={(value) => handleFilterChange('search', value)} />
          <div>
            <Label className="text-sm font-medium mb-1 block">Event Name</Label>
            <Input placeholder="Search by name" value={filters.name} onChange={(e) => handleFilterChange('name', e.target.value)} />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Category</Label>
            <Select value={filters.category_id} onValueChange={(value) => handleFilterChange('category_id', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {eventCategories?.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium mb-1 block">Status</Label>
            <Select
              value={filters.is_registered !== undefined ? String(filters.is_registered) : ''}
              onValueChange={(value) => {
                if (value === '') {
                  handleFilterChange('is_registered', undefined);
                } else {
                  handleFilterChange('is_registered', value === 'true');
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Registered</SelectItem>
                <SelectItem value="false">Not Registered</SelectItem>
              </SelectContent>
            </Select>
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
          { header: 'Name', accessor: (item) => item?.name || '-' },
          { header: 'Category', accessor: (item) => (item?.category_id ? <Badge>{item.category_id.name}</Badge> : '') },
          { header: 'Registered', accessor: (item) => (item?.is_registered ? 'Yes' : 'No') },
          { header: 'Start Date', accessor: (item) => (item?.start_date ? new Date(item.start_date).toLocaleDateString() : '') },
          { header: 'End Date', accessor: (item) => (item?.end_date ? new Date(item.end_date).toLocaleDateString() : '') },
          { header: 'Registrants', accessor: (item) => `${item?.registered_count || 0}/${item?.max_registrants || 0}` },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <EditButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditEvent(item);
                  }}
                />
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEvent(item);
                  }}
                />
              </div>
            )
          }
        ]}
        pagination={pagination}
        isLoading={loading}
        error={error}
        onPageChange={handlePageChange}
        onLimitChange={updateLimit}
      />

      {isFormOpen && (
        <EventFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedEvent(null);
          }}
          onSuccess={() => {
            setIsFormOpen(false);
            setSelectedEvent(null);
            refetch();
          }}
          event={selectedEvent}
        />
      )}
    </Layout>
  );
}
