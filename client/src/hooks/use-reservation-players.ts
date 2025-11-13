import { RESERVATION_PLAYERS_QUERY, type IFilter, type IReservationPlayer, type ReservationPlayerFilterInput } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export const useReservationPlayers = (init?: IFilter) => {
  const [pagination, setPagination] = useState({
    total: 0,
    page: init?.page || 1,
    limit: init?.limit || 20,
    pages: 0
  });
  const [filterOptions] = useState({});
  const [filters, setFilters] = useState<ReservationPlayerFilterInput>({});

  const { loading, error, data, refetch } = useQuery(RESERVATION_PLAYERS_QUERY, {
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
        total: data.reservation_players.pagination.total,
        pages: data.reservation_players.pagination.pages
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
    data: data?.reservation_players.data || ([] as IReservationPlayer[]),
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

export default useReservationPlayers;
