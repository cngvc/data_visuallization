import { DataTable } from '@/components/data-table';
import DatePicker from '@/components/date-picker';
import FilterCard from '@/components/filter-card';
import Layout from '@/components/layout';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { IImportHistory } from '@/graphql/queries';
import useImportHistory from '@/hooks/use-import-history';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

function Activities() {
  const { data, loading, error, pagination, updatePage, updateLimit, updateFilters, resetFilters } = useImportHistory();
  const [tempFilters, setTempFilters] = useState<{
    start_date?: string;
    end_date?: string;
    status?: string;
    collection_name?: string;
  }>({
    start_date: '',
    end_date: '',
    status: '',
    collection_name: ''
  });
  const handleFilterChange = (key: string, value: string) => {
    setTempFilters((prev: Partial<typeof tempFilters>) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    updateFilters(tempFilters);
  };

  const handleReset = () => {
    setTempFilters({});
    resetFilters();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'duplicate':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Duplicate</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Activities</h1>
      </div>

      <FilterCard onApply={applyFilters} onReset={handleReset}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label className="block text-sm font-medium mb-1">Start Date</Label>
            <DatePicker value={tempFilters.start_date} onChange={(e) => handleFilterChange('start_date', e)} />
          </div>
          <div>
            <Label className="block text-sm font-medium mb-1">End Date</Label>
            <DatePicker value={tempFilters.end_date} onChange={(e) => handleFilterChange('end_date', e)} />
          </div>
          <div>
            <Label className="block text-sm font-medium mb-1">Status</Label>
            <Select value={tempFilters.status || undefined} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="duplicate">Duplicate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block text-sm font-medium mb-1">Collection</Label>
            <Select
              value={tempFilters.collection_name || undefined}
              onValueChange={(value) => handleFilterChange('collection_name', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transactions">Transactions</SelectItem>
                <SelectItem value="sales_summary">Sales Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterCard>

      <DataTable
        data={data}
        columns={[
          {
            header: 'Filename',
            accessor: (item: IImportHistory) => item?.filename || '-'
          },
          {
            header: 'Collection',
            accessor: (item: IImportHistory) => item?.collection_name || '-'
          },
          {
            header: 'Records',
            accessor: (item: IImportHistory) => item?.record_count || 0,
            className: 'text-right'
          },
          {
            header: 'Status',
            accessor: (item: IImportHistory) => getStatusBadge(item.status),
            className: 'text-center'
          },
          {
            header: 'Import Date',
            accessor: (item: IImportHistory) => formatDate(item.import_date)
          },
          {
            header: 'Error Message',
            accessor: (item: IImportHistory) => item?.error_message || '-'
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

export default Activities;
