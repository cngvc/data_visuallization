import { UPDATE_ME_MUTATION } from '@/graphql/auth';
import { ME_QUERY, UserRole, type IOrganization, type IUserOrganization } from '@/graphql/queries';
import { useAuthStore } from '@/store/auth.store';
import { CombinedGraphQLErrors } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import useCurrentUserOrg from './use-current-user-org';

export const useCurrentUser = () => {
  const { organizations } = useCurrentUserOrg();
  const { data, loading, error, refetch } = useQuery(ME_QUERY);
  const [updateMe, { loading: updateLoading }] = useMutation(UPDATE_ME_MUTATION);
  const [currentOrganization, setCurrentOrganization] = useState<IOrganization | null>(null);
  const [roleInCurrentOrganization, setCurrentRoleInCurrentOrganization] = useState<UserRole | null>(null);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.me?.data?.current_organization_id) {
      setCurrentOrganization(data.me.data.current_organization_id);
    }
    if (data?.me?.data?.role_in_current_organization) {
      setCurrentRoleInCurrentOrganization(data.me.data.role_in_current_organization);
    }
  }, [data]);

  const switchOrganization = async (organizationId: string) => {
    if (organizations) {
      const newOrg = organizations.find((org: IUserOrganization) => org.organization_id._id === organizationId);
      if (newOrg) {
        try {
          await updateMe({
            variables: {
              input: {
                current_organization_id: organizationId
              }
            }
          });
          setCurrentOrganization(newOrg.organization_id);
          await refetch();
          navigate(0);
        } catch (error) {
          if (error instanceof CombinedGraphQLErrors) {
            return toast.error(`Error updating user's organization: ${error.message}`);
          }
          toast.error(`Error updating user's organization, please try again later`);
        }
      }
    }
  };

  return {
    organizations,
    user: data?.me?.data || null,
    currentOrganization,
    switchOrganization,
    loading: loading || updateLoading,
    error,
    refetch,
    isAuthenticated,

    isCurrentOrgAdmin: roleInCurrentOrganization === UserRole.ORG_ADMIN
  };
};

export default useCurrentUser;
