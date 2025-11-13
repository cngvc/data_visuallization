import { MEMBERS_QUERY, type IFilter, type IMember, type MemberFilterInput } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export const useMembers = (init?: IFilter) => {
  const [pagination, setPagination] = useState({
    total: 0,
    page: init?.page || 1,
    limit: init?.limit || 20,
    pages: 0
  });

  const [filterOptions] = useState({});
  const [filters, setFilters] = useState<MemberFilterInput>({});

  const { loading, error, data, refetch } = useQuery(MEMBERS_QUERY, {
    variables: {
      page: pagination.page,
      limit: pagination.limit,
      filters: Object.keys(filters).length > 0 ? filters : undefined
    },
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({ ...prev, total: data.members.pagination.total, pages: data.members.pagination.pages }));
    }
  }, [data]);

  const updatePage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const updateLimit = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  const updateFilters = (newFilters: Partial<MemberFilterInput>) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilters };
      Object.keys(updatedFilters).forEach((key) => {
        const value = updatedFilters[key as keyof MemberFilterInput];
        if (
          value === undefined ||
          value === '' ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === 'object' && value !== null && Object.keys(value).length === 0)
        ) {
          delete updatedFilters[key as keyof MemberFilterInput];
        }
      });
      return updatedFilters;
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
    refetch();
  };

  const resetFilters = () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, page: 1 }));
    refetch();
  };

  return {
    data: data?.members.data || ([] as IMember[]),
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

export default useMembers;
