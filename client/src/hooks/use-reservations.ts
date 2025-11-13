import { RESERVATIONS_QUERY, type IReservation, type ReservationFilterInput } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export const useReservations = ({ status }: { status: 'Active' | 'Cancelled' }) => {
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0
  });
  const [filters, setFilters] = useState<ReservationFilterInput>({
    search: '',
    member_id: '',
    court_ids: [],
    reservation_type_id: '',
    start_date: '',
    end_date: '',
    status,
    is_lesson: undefined
  });

  const { loading, error, data, refetch } = useQuery(RESERVATIONS_QUERY, {
    variables: {
      page: pagination.page,
      limit: pagination.limit,
      filters: {
        ...filters,
        search: filters.search || undefined,
        member_id: filters.member_id || undefined,
        court_ids: filters.court_ids?.length ? filters.court_ids : undefined,
        reservation_type_id: filters.reservation_type_id || undefined,
        start_date: filters.start_date || undefined,
        end_date: filters.end_date || undefined,
        status: filters.status || undefined,
        is_lesson: filters.is_lesson
      }
    },
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (data) {
      setPagination((prev) => ({
        ...prev,
        total: data.reservations.pagination.total,
        pages: data.reservations.pagination.pages
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
    setFilters({
      search: '',
      member_id: '',
      court_ids: [],
      reservation_type_id: '',
      start_date: '',
      end_date: '',
      status: '',
      is_lesson: undefined
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return {
    data: data?.reservations?.data || ([] as IReservation[]),
    loading,
    error,
    pagination,
    filters,
    updatePage,
    updateLimit,
    updateFilters,
    resetFilters,
    refetch
  };
};

export default useReservations;
