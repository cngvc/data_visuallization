import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ADD_ORGANIZATION_USER } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import OrganizationUserForm, { type UserFormValues } from './organization-user-form';

interface AddUserModalProps {
  organizationId: string;
  onSuccess: () => void;

  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal = ({ organizationId, onSuccess, isOpen, onClose }: AddUserModalProps) => {
  const [createOrganizationUser, { loading }] = useMutation(ADD_ORGANIZATION_USER, {
    onCompleted: (data) => {
      const { success, message } = data.add_organization_user;
      if (success) {
        toast.success(message || 'User added successfully');
        onSuccess();
        onClose();
      } else {
        toast.error(message || 'Failed to add user');
      }
    },
    onError: (error) => {
      toast.error(`Failed to add user: ${error.message}`);
    }
  });

  const handleSubmit = (values: UserFormValues) => {
    createOrganizationUser({
      variables: {
        input: {
          organization_id: organizationId,
          email: values.email,
          first_name: values.first_name,
          last_name: values.last_name,
          role: values.role as any
        }
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Add a new user to this organization.</DialogDescription>
        </DialogHeader>
        <OrganizationUserForm onSubmit={handleSubmit} isSubmitting={loading} isEdit={false} />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
