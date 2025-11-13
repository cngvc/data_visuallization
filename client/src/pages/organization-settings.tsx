import Layout from '@/components/layout';
import OrganizationInfoSection from '@/components/organization/organization-info-section';
import OrganizationUsersSection from '@/components/organization/organization-users-section';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { GET_ORGANIZATION, UserRole } from '@/graphql/queries';
import useCurrentUser from '@/hooks/use-current-user';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router';

const OrganizationSettings = () => {
  const { id } = useParams();
  const { isAuthenticated, user, organizations: currentUserOrganizations } = useCurrentUser();
  const { data, loading, refetch } = useQuery(GET_ORGANIZATION, {
    variables: { organization_id: id! },
    skip: !id
  });
  const role = currentUserOrganizations.find((org) => org.organization_id._id === id)?.role as UserRole;
  const organization = data?.organization.data.organization;
  const userOrganizations = data?.organization.data.userOrganizations || [];

  if (loading) {
    return (
      <Layout>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-[200px] w-full" />
        </div>
        <Skeleton className="h-[200px] w-full" />
      </Layout>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <Alert>
          <AlertTitle>Unauthorized</AlertTitle>
          <AlertDescription>You must be an organization administrator to view this page.</AlertDescription>
        </Alert>
      </Layout>
    );
  }

  if (!id || !organization) {
    return (
      <Layout>
        <Alert>
          <AlertTitle>No Organization Found</AlertTitle>
          <AlertDescription>No organization is currently selected.</AlertDescription>
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4">
        <OrganizationInfoSection organization={organization!} role={role} />
        <OrganizationUsersSection
          userOrganizations={userOrganizations}
          organization={organization}
          currentUser={user}
          refetch={refetch}
          role={role}
        />
      </div>
    </Layout>
  );
};

export default OrganizationSettings;
