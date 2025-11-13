import { Button } from '@/components/ui/button';
import { useConfirmationModal } from '@/context/confirm-modal.context';
import { REMOVE_ORGANIZATION_USER } from '@/graphql/mutations';
import { UserRole, type IAuthUser, type IOrganization, type IUserOrganization } from '@/graphql/queries';
import useCurrentUser from '@/hooks/use-current-user';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from '../data-table';
import DeleteButton from '../delete-button';
import EditButton from '../edit-button';
import { Badge } from '../ui/badge';
import AddUserModal from './add-user-modal';
import EditUserModal from './edit-user-modal';

interface OrganizationUsersSectionProps {
  userOrganizations: IUserOrganization[];
  organization: IOrganization;
  currentUser: IAuthUser;
  refetch: () => void;

  role?: UserRole;
}

const OrganizationUsersSection = ({ userOrganizations, organization, currentUser, refetch, role }: OrganizationUsersSectionProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUserOrganization, setEditingUserOrganization] = useState<IUserOrganization | null>(null);
  const { showConfirmation } = useConfirmationModal();
  const { user } = useCurrentUser();

  const [deleteOrganizationUser, { loading }] = useMutation(REMOVE_ORGANIZATION_USER, {
    onCompleted: () => {
      toast.success('User removed successfully');
    },
    onError: (error) => {
      toast.error(`Failed to remove user: ${error.message}`);
    }
  });

  const handleDelete = (deletingUserOrganization: IUserOrganization) => {
    showConfirmation(`Are you sure you want to delete user ${deletingUserOrganization.user_id._id}?`, async () => {
      await deleteOrganizationUser({
        variables: {
          input: {
            user_id: deletingUserOrganization.user_id._id,
            organization_id: deletingUserOrganization.organization_id._id
          }
        }
      });
      refetch();
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Users</h2>
        {role === UserRole.ORG_ADMIN && <Button onClick={() => setIsAddModalOpen(true)}>Add User</Button>}
      </div>

      <DataTable
        data={userOrganizations}
        columns={[
          {
            header: 'Name',
            accessor: (item) => (
              <span className="flex items-center gap-2">
                {item?.user_id._id === user?._id && <Badge>You</Badge>}
                {item?.user_id?.first_name} {item?.user_id?.last_name}
              </span>
            )
          },
          {
            header: 'Email',
            accessor: (item) => item?.user_id?.email || '-'
          },
          {
            header: 'Role',
            accessor: (item) => <Badge variant="secondary">{item.role.replace('_', ' ').toUpperCase()}</Badge>
          },
          {
            header: 'Actions',
            accessor: (item) => (
              <div className="flex gap-2">
                <EditButton
                  onClick={() => setEditingUserOrganization(item)}
                  disabled={item?.user_id._id === currentUser._id || role !== UserRole.ORG_ADMIN}
                />
                <DeleteButton
                  onClick={() => handleDelete(item)}
                  disabled={item?.user_id._id === currentUser._id || role !== UserRole.ORG_ADMIN}
                />
              </div>
            )
          }
        ]}
        isLoading={loading}
      />
      {isAddModalOpen && (
        <AddUserModal
          organizationId={organization._id}
          onSuccess={() => {
            refetch();
            setIsAddModalOpen(false);
          }}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
      {editingUserOrganization && (
        <EditUserModal
          userOrganization={editingUserOrganization}
          organizationId={organization._id}
          onSuccess={() => {
            refetch();
            setEditingUserOrganization(null);
          }}
          isOpen={!!editingUserOrganization}
          onClose={() => setEditingUserOrganization(null)}
        />
      )}
    </div>
  );
};

export default OrganizationUsersSection;
