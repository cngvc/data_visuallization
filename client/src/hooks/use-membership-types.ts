import { MEMBERSHIP_TYPES_QUERY, type IFilter, type MembershipTypeFilterInput } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export const useMembershipTypes = (init?: IFilter) => {
  const [pagination, setPagination] = useState({
    total: 0,
    page: init?.page || 1,
    limit: init?.limit || 20,
    pages: 0
  });
  const [filterOptions] = useState({});
  const [filters, setFilters] = useState<MembershipTypeFilterInput>({});

  const { loading, error, data, refetch } = useQuery(MEMBERSHIP_TYPES_QUERY, {
    variables: {
      page: pagination.page,
      limit: pagination.limit,
      filters
    },
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({
        ...prev,
        total: data.membership_types.pagination.total,
        pages: data.membership_types.pagination.pages
      }));
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
    data: data?.membership_types?.data || [],
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

