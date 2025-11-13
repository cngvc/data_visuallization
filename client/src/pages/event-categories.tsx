import AddButton from '@/components/add-button';
import { DataTable } from '@/components/data-table';
import DeleteButton from '@/components/delete-button';
import EditButton from '@/components/edit-button';
import EventCategoryFormDialog from '@/components/event-category-form-dialog';
import FilterCard from '@/components/filter-card';
import ImportCSVDialog from '@/components/import-csv-dialog';
import ImportJsonDialog from '@/components/import-json-dialog';
import Layout from '@/components/layout';
import SearchInput from '@/components/search-input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import type { EventCategoryFilterInput, IEventCategory } from '@/graphql/queries';
import useEventCategories from '@/hooks/use-event-categories';
import useEventCategoryMutations from '@/hooks/use-event-category-mutations';
import { useState } from 'react';

export default function EventCategories() {
  const { data, loading, error, pagination, updatePage, updateLimit, updateFilters, resetFilters, refetch } = useEventCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<IEventCategory | null>(null);
  const { deleteEventCategory } = useEventCategoryMutations(refetch);
  const { showConfirmation } = useConfirmationModal();

  const [filters, setFilters] = useState<EventCategoryFilterInput>({});

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category: IEventCategory) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const applyFilters = () => {
    const filterPayload: EventCategoryFilterInput = {};
    if (filters.search) filterPayload.search = filters.search;
    if (filters.is_public !== undefined) filterPayload.is_public = filters.is_public;
    updateFilters(filterPayload);
  };

  const handleResetFilters = () => {
    setFilters({});
    resetFilters();
  };

  const handleDeleteCategory = async (category: IEventCategory) => {
    showConfirmation(`Are you sure you want to delete category ${category.name}?`, async () => {
      await deleteEventCategory(category._id);
      refetch();
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Event Categories</h1>
        <div className="flex items-center gap-2">
          <AddButton onClick={handleAddCategory} label="Add New" />

          <ImportCSVDialog onSuccess={refetch} type="event-categories" />
          <ImportJsonDialog onSuccess={refetch} type="event-categories" />
        </div>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleResetFilters}>
        <div className="grid grid-cols-1 gap-4">
          <SearchInput value={filters.search} onChange={(value) => handleFilterChange('search', value)} />
          <div className="md:col-span-1">
            <Label className="text-sm font-medium mb-1 block">Public Status</Label>
            <Select
              value={filters.is_public?.toString() || ''}
              onValueChange={(value) => {
                if (value === '') {
                  handleFilterChange('is_public', undefined);
                } else {
                  handleFilterChange('is_public', value === 'true');
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Public Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Public</SelectItem>
                <SelectItem value="false">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            header: 'Colors',
            accessor: (item) => (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: item.background_color }}></div>
                <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: item.text_color }}></div>
                <span className="text-xs">
                  {item.background_color} / {item.text_color}
                </span>
              </div>
            )
          },
          {
            header: 'Public',
            accessor: (item) => (item?.is_public ? 'Yes' : 'No')
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <EditButton onClick={() => handleEditCategory(item)} />
                <DeleteButton onClick={() => handleDeleteCategory(item)} />
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
        <EventCategoryFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedCategory(null);
          }}
          onSuccess={() => {
            refetch();
            setIsFormOpen(false);
            setSelectedCategory(null);
          }}
          eventCategory={selectedCategory}
        />
      )}
    </Layout>
  );
}
