import { IMPORT_HISTORY_QUERY, type IImportHistory } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useState } from 'react';

export default function useImportHistory() {
  const [page, updatePage] = useState(1);
  const [limit, updateLimit] = useState(10);
  const [filters, setFilters] = useState<{
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

  const { data, loading, error, refetch } = useQuery(IMPORT_HISTORY_QUERY, {
    variables: {
      page,
      limit,
      filters: {
        start_date: filters.start_date,
        end_date: filters.end_date,
        status: filters.status as 'success' | 'failed' | 'duplicate',
        collection_name: filters.collection_name
      }
    },
    fetchPolicy: 'cache-first'
  });

  const updateFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    updatePage(1);
  };

  const resetFilters = () => {
    setFilters({});
    updatePage(1);
  };

  return {
    data: data?.import_history.data || ([] as IImportHistory[]),
    pagination: data?.import_history.pagination || { total: 0, page: 1, limit: 20, pages: 1 },
    loading,
    error,
    updatePage,
    updateLimit,
    updateFilters,
    resetFilters,
    refetch
  };
}
