import { ME_ORGANIZATIONS_QUERY } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';

export const useCurrentUserOrg = () => {
  const { data, loading, error, refetch } = useQuery(ME_ORGANIZATIONS_QUERY);

  return {
    organizations: data?.me_organizations?.data || [],
    loading,
    error,
    refetch
  };
};

export default useCurrentUserOrg;
