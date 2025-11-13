import { SALES_SUMMARY_QUERY, type SalesSummaryFilterInput } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export const useSalesSummary = () => {
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0
  });
  const [filterOptions] = useState({});
  const [filters, setFilters] = useState<SalesSummaryFilterInput>();

  const { loading, error, data, refetch } = useQuery(SALES_SUMMARY_QUERY, {
    variables: {
      page: pagination.page,
      limit: pagination.limit,
      filters
    },
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({ ...prev, total: data.sales_summary.pagination.total, pages: data.sales_summary.pagination.pages }));
    }
  }, [data]);

  const updatePage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const updateLimit = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  const updateFilters = (newFilters: Partial<SalesSummaryFilterInput>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return {
    data: data?.sales_summary.data || [],
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

export default useSalesSummary;
