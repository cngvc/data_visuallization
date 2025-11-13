import type { ICourt, PlayerReportFilterInput } from '@/graphql/queries';
import { COURTS_QUERY, MEMBER_REPORTS_QUERY } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export const usePlayerReports = () => {
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0
  });
  const [filterOptions, setFilterOptions] = useState<{
    bookingTypes: string[];
    courts?: ICourt[];
  }>({ bookingTypes: ['Event', 'CourtReservation'] });
  const [filters, setFilters] = useState<PlayerReportFilterInput>({});

  const { data: courtsData } = useQuery(COURTS_QUERY, {
    variables: {
      limit: 100
    },
    fetchPolicy: 'cache-first'
  });

  const { loading, error, data, refetch } = useQuery(MEMBER_REPORTS_QUERY, {
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
        total: data.player_reports.pagination.total,
        pages: data.player_reports.pagination.pages
      }));
    }
  }, [data]);

  useEffect(() => {
    if (data?.player_reports?.data) {
      const bookingTypes = Array.from(new Set(data.player_reports.data.map((report) => report.booking_type).filter(Boolean)));
      setFilterOptions((prev) => ({
        ...prev,
        bookingTypes
      }));
    }
  }, [data]);

  useEffect(() => {
    if (courtsData?.courts?.data) {
      setFilterOptions((prev) => ({
        ...prev,
        courts: courtsData.courts.data
      }));
    }
  }, [courtsData]);

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
    data: data?.player_reports?.data || [],
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
