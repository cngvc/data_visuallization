import { EVENT_REGISTRATIONS_QUERY, type EventRegistrationFilterInput, type IEventRegistration } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export const useEventRegistrations = ({ status }: { status: 'Active' | 'Cancelled' }) => {
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0
  });
  const [filterOptions] = useState({});
  const [filters, setFilters] = useState<EventRegistrationFilterInput>({});

  const { loading, error, data, refetch } = useQuery(EVENT_REGISTRATIONS_QUERY, {
    variables: {
      page: pagination.page,
      limit: pagination.limit,
      filters: {
        ...filters,
        status
      }
    },
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({
        ...prev,
        total: data.event_registrations.pagination.total,
        pages: data.event_registrations.pagination.pages
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
    data: data?.event_registrations.data || ([] as IEventRegistration[]),
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

export default useEventRegistrations;
