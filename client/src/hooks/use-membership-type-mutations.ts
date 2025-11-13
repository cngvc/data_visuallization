import type { MembershipTypeInput, MutationResponse } from '@/graphql/mutations';
import { CREATE_MEMBERSHIP_TYPE, DELETE_MEMBERSHIP_TYPE, UPDATE_MEMBERSHIP_TYPE } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useMembershipTypeMutations = (onSuccess?: () => void) => {
  const [createMembershipTypeMutation, { loading: createLoading }] = useMutation(CREATE_MEMBERSHIP_TYPE, {
    onCompleted: (data) => {
      if (data?.create_membership_type?.success) {
        onSuccess?.();
        toast.success(data.create_membership_type.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to create membership type: ${error.message}`);
    }
  });

  const [updateMembershipTypeMutation, { loading: updateLoading }] = useMutation(UPDATE_MEMBERSHIP_TYPE, {
    onCompleted: (data) => {
      if (data?.update_membership_type?.success) {
        onSuccess?.();
        toast.success(data.update_membership_type.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to update membership type: ${error.message}`);
    }
  });

  const [deleteMembershipTypeMutation, { loading: deleteLoading }] = useMutation(DELETE_MEMBERSHIP_TYPE, {
    onCompleted: (data) => {
      if (data?.delete_membership_type?.success) {
        onSuccess?.();
        toast.success(data.delete_membership_type.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete membership type: ${error.message}`);
    }
  });

  const createMembershipType = async (input: MembershipTypeInput): Promise<MutationResponse> => {
    const { data } = await createMembershipTypeMutation({
      variables: { input }
    });
    return (
      data?.create_membership_type || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const updateMembershipType = async (id: string, input: MembershipTypeInput): Promise<MutationResponse> => {
    const { data } = await updateMembershipTypeMutation({
      variables: { id, input }
    });
    return (
      data?.update_membership_type || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const deleteMembershipType = async (id: string): Promise<MutationResponse> => {
    const { data } = await deleteMembershipTypeMutation({
      variables: { id }
    });
    return (
      data?.delete_membership_type || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  return {
    createMembershipType,
    updateMembershipType,
    deleteMembershipType,
    loading: createLoading || updateLoading || deleteLoading
  };
};
