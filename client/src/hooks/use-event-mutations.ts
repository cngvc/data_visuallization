import type { EventInput, MutationResponse } from '@/graphql/mutations';
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useEventMutations = (onSuccess?: () => void) => {
  const [createEventMutation, { loading: createLoading }] = useMutation(CREATE_EVENT, {
    onCompleted: (data) => {
      if (data?.create_event?.success) {
        onSuccess?.();
        toast.success(data.create_event.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to create event: ${error.message}`);
    }
  });

  const [updateEventMutation, { loading: updateLoading }] = useMutation(UPDATE_EVENT, {
    onCompleted: (data) => {
      if (data?.update_event?.success) {
        onSuccess?.();
        toast.success(data.update_event.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to update event: ${error.message}`);
    }
  });

  const [deleteEventMutation, { loading: deleteLoading }] = useMutation(DELETE_EVENT, {
    onCompleted: (data) => {
      if (data?.delete_event?.success) {
        onSuccess?.();
        toast.success(data.delete_event.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete event: ${error.message}`);
    }
  });

  const createEvent = async (input: EventInput): Promise<MutationResponse> => {
    const { data } = await createEventMutation({
      variables: { input }
    });
    return (
      data?.create_event || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const updateEvent = async (id: string, input: EventInput): Promise<MutationResponse> => {
    const { data } = await updateEventMutation({
      variables: { id, input }
    });
    return (
      data?.update_event || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const deleteEvent = async (id: string): Promise<MutationResponse> => {
    const { data } = await deleteEventMutation({
      variables: { id }
    });
    return (
      data?.delete_event || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  return {
    createEvent,
    updateEvent,
    deleteEvent,
    loading: createLoading || updateLoading || deleteLoading
  };
};
