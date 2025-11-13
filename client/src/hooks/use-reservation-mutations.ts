import { CREATE_RESERVATION, DELETE_RESERVATION, UPDATE_RESERVATION, type ReservationInput } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useReservationMutations = (onSuccess?: () => void) => {
  const [createReservationMutation, { loading: createLoading }] = useMutation(CREATE_RESERVATION, {
    onCompleted: (data) => {
      if (data?.create_reservation?.success) {
        onSuccess?.();
        toast.success(data.create_reservation.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to create reservation: ${error.message}`);
    }
  });

  const [updateReservationMutation, { loading: updateLoading }] = useMutation(UPDATE_RESERVATION, {
    onCompleted: (data) => {
      if (data?.update_reservation?.success) {
        onSuccess?.();
        toast.success(data.update_reservation.message);
      }
    },
    onError: (error) => {
      toast.error(`Failed to update reservation: ${error.message}`);
    }
  });

  const [deleteReservationMutation, { loading: deleteLoading }] = useMutation(DELETE_RESERVATION, {
    onCompleted: (data) => {
      if (data?.delete_reservation?.success) {
        onSuccess?.();
        toast.success(data.delete_reservation.message);
      }
    },
    onError: (error) => {
      toast.error(`Failed to delete reservation: ${error.message}`);
    }
  });

  const createReservation = async (input: ReservationInput) => {
    const { data } = await createReservationMutation({
      variables: { input }
    });
    return (
      data?.create_reservation || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const updateReservation = async (id: string, input: ReservationInput) => {
    const { data } = await updateReservationMutation({
      variables: { id, input }
    });
    return (
      data?.update_reservation || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const deleteReservation = async (id: string) => {
    const { data } = await deleteReservationMutation({
      variables: { id }
    });
    return (
      data?.delete_reservation || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  return {
    createReservation,
    updateReservation,
    deleteReservation,
    loading: createLoading || updateLoading || deleteLoading
  };
};

export default useReservationMutations;
