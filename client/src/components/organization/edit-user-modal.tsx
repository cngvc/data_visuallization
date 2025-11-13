import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UPDATE_ORGANIZATION_USER } from '@/graphql/mutations';
import { type IUserOrganization } from '@/graphql/queries';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import OrganizationUserForm, { type UserFormValues } from './organization-user-form';

interface EditUserModalProps {
  userOrganization: IUserOrganization;
  organizationId: string;
  onSuccess: () => void;

  isOpen: boolean;
  onClose: () => void;
}

const EditUserModal = ({ userOrganization, organizationId, onSuccess, isOpen, onClose }: EditUserModalProps) => {
  const [updateOrganizationUser, { loading }] = useMutation(UPDATE_ORGANIZATION_USER, {
    onCompleted: () => {
      toast.success('User updated successfully');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to update user: ${error.message}`);
    }
  });

  const defaultValues: UserFormValues = {
    email: userOrganization.user_id.email,
    first_name: userOrganization.user_id.first_name,
    last_name: userOrganization.user_id.last_name,
    role: userOrganization.role
  };

  const handleSubmit = (values: UserFormValues) => {
    updateOrganizationUser({
      variables: {
        id: userOrganization._id,
        input: {
          organization_id: organizationId,
          email: values.email,
          first_name: values.first_name,
          last_name: values.last_name,
          role: values.role
        }
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information and role.</DialogDescription>
        </DialogHeader>
        <OrganizationUserForm defaultValues={defaultValues} onSubmit={handleSubmit} isSubmitting={loading} isEdit />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
