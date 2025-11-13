import type { FamilyInput, MutationResponse } from '@/graphql/mutations';
import { CREATE_FAMILY, DELETE_FAMILY, UPDATE_FAMILY } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useFamilyMutations = (onSuccess?: () => void) => {
  const [createFamilyMutation, { loading: createLoading }] = useMutation(CREATE_FAMILY, {
    onCompleted: (data) => {
      if (data?.create_family?.success) {
        onSuccess?.();
        toast.success(data.create_family.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to create family: ${error.message}`);
    }
  });

  const [updateFamilyMutation, { loading: updateLoading }] = useMutation(UPDATE_FAMILY, {
    onCompleted: (data) => {
      if (data?.update_family?.success) {
        onSuccess?.();
        toast.success(data.update_family.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to update family: ${error.message}`);
    }
  });

  const [deleteFamilyMutation, { loading: deleteLoading }] = useMutation(DELETE_FAMILY, {
    onCompleted: (data) => {
      if (data?.delete_family?.success) {
        onSuccess?.();
        toast.success(data.delete_family.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete family: ${error.message}`);
    }
  });

  const createFamily = async (input: FamilyInput): Promise<MutationResponse> => {
    const { data } = await createFamilyMutation({
      variables: { input }
    });
    return (
      data?.create_family || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const updateFamily = async (id: string, input: FamilyInput): Promise<MutationResponse> => {
    const { data } = await updateFamilyMutation({
      variables: { id, input }
    });
    return (
      data?.update_family || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const deleteFamily = async (id: string): Promise<MutationResponse> => {
    const { data } = await deleteFamilyMutation({
      variables: { id }
    });
    return (
      data?.delete_family || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  return {
    createFamily,
    updateFamily,
    deleteFamily,
    loading: createLoading || updateLoading || deleteLoading
  };
};
