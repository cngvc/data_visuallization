import type { CourtInput, MutationResponse } from '@/graphql/mutations';
import { CREATE_COURT, DELETE_COURT, UPDATE_COURT } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useCourtMutations = (onSuccess?: () => void) => {
  const [createCourtMutation, { loading: createLoading }] = useMutation(CREATE_COURT, {
    onCompleted: (data) => {
      if (data?.create_court?.success) {
        onSuccess?.();
        toast.success(data.create_court.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to create court: ${error.message}`);
    }
  });

  const [updateCourtMutation, { loading: updateLoading }] = useMutation(UPDATE_COURT, {
    onCompleted: (data) => {
      if (data?.update_court?.success) {
        onSuccess?.();
        toast.success(data.update_court.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to update court: ${error.message}`);
    }
  });

  const [deleteCourtMutation, { loading: deleteLoading }] = useMutation(DELETE_COURT, {
    onCompleted: (data) => {
      if (data?.delete_court?.success) {
        onSuccess?.();
        toast.success(data.delete_court.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete court: ${error.message}`);
    }
  });

  const createCourt = async (input: CourtInput): Promise<MutationResponse> => {
    const { data } = await createCourtMutation({
      variables: { input }
    });
    return (
      data?.create_court || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const updateCourt = async (id: string, input: CourtInput): Promise<MutationResponse> => {
    const { data } = await updateCourtMutation({
      variables: { id, input }
    });
    return (
      data?.update_court || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const deleteCourt = async (id: string): Promise<MutationResponse> => {
    const { data } = await deleteCourtMutation({
      variables: { id }
    });
    return (
      data?.delete_court || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  return {
    createCourt,
    updateCourt,
    deleteCourt,
    loading: createLoading || updateLoading || deleteLoading
  };
};
