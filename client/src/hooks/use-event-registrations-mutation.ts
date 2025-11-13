import type { MutationResponse } from '@/graphql/mutations';
import { DELETE_EVENT_REGISTRATION } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useReservationPlayersMutations = (onSuccess?: () => void) => {
  const [deleteReservationPlayerMutation, { loading: deleteLoading }] = useMutation(DELETE_EVENT_REGISTRATION, {
    onCompleted: (data) => {
      if (data?.delete_event_registration?.success) {
        onSuccess?.();
        toast.success(data.delete_event_registration.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete event registration: ${error.message}`);
    }
  });
  const deleteReservationPlayer = async (id: string): Promise<MutationResponse> => {
    const { data } = await deleteReservationPlayerMutation({
      variables: { id }
    });
    return (
      data?.delete_event_registration || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  return {
    deleteReservationPlayer,
    loading: deleteLoading
  };
};
