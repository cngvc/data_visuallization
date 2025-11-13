import { TRANSACTIONS_QUERY, type TransactionsFilterInput } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export const useTransactions = () => {
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0
  });
  const [filterOptions] = useState({});
  const [filters, setFilters] = useState<TransactionsFilterInput>({});

  const { loading, error, data, refetch } = useQuery(TRANSACTIONS_QUERY, {
    variables: {
      page: pagination.page,
      limit: pagination.limit,
      filters: Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== '' && value !== undefined && value !== null))
    },
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({ ...prev, total: data.transactions.pagination.total, pages: data.transactions.pagination.pages }));
    }
  }, [data]);

  const updatePage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const updateLimit = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return {
    data: data?.transactions?.data || [],
    loading,
    error,
    pagination,
    filterOptions,
    filters,
    updatePage,
    updateLimit,
    updateFilters,
    resetFilters,
    refetch
  };
};

export default useTransactions;
