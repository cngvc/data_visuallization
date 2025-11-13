import { FAMILIES_QUERY, type FamilyFilterInput, type IFamily, type IFilter } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export const useFamilies = (init?: IFilter) => {
  const [pagination, setPagination] = useState({
    total: 0,
    page: init?.page || 1,
    limit: init?.limit || 20,
    pages: 0
  });
  const [filterOptions] = useState({});
  const [filters, setFilters] = useState<FamilyFilterInput>({});

  const { loading, error, data, refetch } = useQuery(FAMILIES_QUERY, {
    variables: {
      page: pagination.page,
      limit: pagination.limit,
      filters
    },
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({ ...prev, total: data.families.pagination.total, pages: data.families.pagination.pages }));
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
    data: data?.families.data || ([] as IFamily[]),
    loading,
    error,
    pagination,
    filterOptions,
    updatePage,
    updateLimit,
    updateFilters,
    resetFilters,
    refetch
  };
};

export default useFamilies;
