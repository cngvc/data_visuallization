import type { MemberInput, MutationResponse } from '@/graphql/mutations';
import { CREATE_MEMBER, DELETE_MEMBER, UPDATE_MEMBER } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useMemberMutations = (onSuccess?: () => void) => {
  const [createMemberMutation, { loading: createLoading }] = useMutation(CREATE_MEMBER, {
    onCompleted: (data) => {
      if (data?.create_member?.success) {
        onSuccess?.();
        toast.success(data.create_member.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to create member: ${error.message}`);
    }
  });

  const [updateMemberMutation, { loading: updateLoading }] = useMutation(UPDATE_MEMBER, {
    onCompleted: (data) => {
      if (data?.update_member?.success) {
        onSuccess?.();
        toast.success(data.update_member.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to update member: ${error.message}`);
    }
  });

  const [deleteMemberMutation, { loading: deleteLoading }] = useMutation(DELETE_MEMBER, {
    onCompleted: (data) => {
      if (data?.delete_member?.success) {
        onSuccess?.();
        toast.success(data.delete_member.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete member: ${error.message}`);
    }
  });

  const createMember = async (input: MemberInput): Promise<MutationResponse> => {
    const { data } = await createMemberMutation({
      variables: { input }
    });
    return (
      data?.create_member || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const updateMember = async (id: string, input: MemberInput): Promise<MutationResponse> => {
    const { data } = await updateMemberMutation({
      variables: { id, input }
    });
    return (
      data?.update_member || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const deleteMember = async (id: string): Promise<MutationResponse> => {
    const { data } = await deleteMemberMutation({
      variables: { id }
    });
    return (
      data?.delete_member || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  return {
    createMember,
    updateMember,
    deleteMember,
    loading: createLoading || updateLoading || deleteLoading
  };
};
