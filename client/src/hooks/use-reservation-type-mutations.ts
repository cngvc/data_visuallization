import { CREATE_RESERVATION_TYPE, DELETE_RESERVATION_TYPE, UPDATE_RESERVATION_TYPE, type ReservationTypeInput } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useReservationTypeMutations = (onSuccess?: () => void) => {
  const [createReservationTypeMutation, { loading: createLoading }] = useMutation(CREATE_RESERVATION_TYPE, {
    onCompleted: (data) => {
      if (data?.create_reservation_type?.success) {
        onSuccess?.();
        toast.success(data.create_reservation_type.message);
      }
    },
    onError: () => {
      toast.error('Failed to create reservation type');
    }
  });

  const [updateReservationTypeMutation, { loading: updateLoading }] = useMutation(UPDATE_RESERVATION_TYPE, {
    onCompleted: (data) => {
      if (data?.update_reservation_type?.success) {
        onSuccess?.();
        toast.success(data.update_reservation_type.message);
      }
    },
    onError: () => {
      toast.error('Failed to update reservation type');
    }
  });

  const [deleteReservationTypeMutation, { loading: deleteLoading }] = useMutation(DELETE_RESERVATION_TYPE, {
    onCompleted: (data) => {
      if (data?.delete_reservation_type?.success) {
        onSuccess?.();
        toast.success(data.delete_reservation_type.message);
      }
    },
    onError: () => {
      toast.error('Failed to update reservation type');
    }
  });

  const createReservationType = async (input: ReservationTypeInput) => {
    return createReservationTypeMutation({
      variables: { input }
    });
  };

  const updateReservationType = async (id: string, input: ReservationTypeInput) => {
    return updateReservationTypeMutation({
      variables: { id, input }
    });
  };

  const deleteReservationType = async (id: string) => {
    return deleteReservationTypeMutation({
      variables: { id }
    });
  };

  return {
    createReservationType,
    updateReservationType,
    deleteReservationType,
    loading: createLoading || updateLoading || deleteLoading
  };
};
