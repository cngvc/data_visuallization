import { type RevenueRecognitionFilterInput, REVENUE_RECOGNITION_QUERY } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export default function useRevenueRecognition() {
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0
  });
  const [filterOptions] = useState({});
  const [filters, setFilters] = useState<RevenueRecognitionFilterInput>({
    start_date: '',
    end_date: '',
    transaction_type: '',
    payment_type: ''
  });

  const { loading, error, data, refetch } = useQuery(REVENUE_RECOGNITION_QUERY, {
    variables: {
      page: pagination.page,
      limit: pagination.limit,
      filters: {
        start_date: filters.start_date,
        end_date: filters.end_date,
        transaction_type: filters.transaction_type,
        payment_type: filters.payment_type
      }
    },
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({
        ...prev,
        total: data.revenue_recognition.pagination.total,
        pages: data.revenue_recognition.pagination.pages
      }));
    }
  }, [data]);

  const updatePage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const updateLimit = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  const updateFilters = (newFilters: Partial<RevenueRecognitionFilterInput>) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilters };
      Object.keys(updatedFilters).forEach((key) => {
        const value = updatedFilters[key as keyof RevenueRecognitionFilterInput];
        if (
          value === undefined ||
          value === '' ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'object' && value !== null && Object.keys(value).length === 0)
        ) {
          delete updatedFilters[key as keyof RevenueRecognitionFilterInput];
        }
      });
      return updatedFilters;
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
    refetch();
  };

  const resetFilters = () => {
    setFilters({
      start_date: '',
      end_date: ''
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return {
    data: data?.revenue_recognition?.data || [],
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
}
