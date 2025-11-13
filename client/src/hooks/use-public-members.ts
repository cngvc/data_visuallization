import { PUBLIC_MEMBERS_QUERY, type IMember, type MemberFilterInput } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useCallback, useState } from 'react';

export const usePublicMembers = () => {
  const [filters, setFilters] = useState<MemberFilterInput>({});
  const { loading, error, data, refetch } = useQuery(PUBLIC_MEMBERS_QUERY, {
    variables: {
      page: 1,
      limit: 50,
      filters: Object.keys(filters).length > 0 ? filters : undefined
    },
    fetchPolicy: 'cache-and-network',
    skip: !filters.search || filters.search.length < 3
  });

  const updateFilters = useCallback(
    (newFilters: Partial<MemberFilterInput>) => {
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
      refetch();
    },
    [refetch]
  );

  return {
    data: data?.members.data || ([] as IMember[]),
    loading,
    error,
    refetch,
    filters,
    updateFilters
  };
};

export default usePublicMembers;
