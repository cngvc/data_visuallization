import type { EventCategoryInput, MutationResponse } from '@/graphql/mutations';
import { CREATE_EVENT_CATEGORY, DELETE_EVENT_CATEGORY, UPDATE_EVENT_CATEGORY } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useEventCategoryMutations = (onSuccess?: () => void) => {
  const [createEventCategoryMutation, { loading: createLoading }] = useMutation(CREATE_EVENT_CATEGORY, {
    onCompleted: (data) => {
      if (data?.create_event_category?.success) {
        onSuccess?.();
        toast.success(data.create_event_category.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to create event category: ${error.message}`);
    }
  });

  const [updateEventCategoryMutation, { loading: updateLoading }] = useMutation(UPDATE_EVENT_CATEGORY, {
    onCompleted: (data) => {
      if (data?.update_event_category?.success) {
        onSuccess?.();
        toast.success(data.update_event_category.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to update event category: ${error.message}`);
    }
  });

  const [deleteEventCategoryMutation, { loading: deleteLoading }] = useMutation(DELETE_EVENT_CATEGORY, {
    onCompleted: (data) => {
      if (data?.delete_event_category?.success) {
        onSuccess?.();
        toast.success(data.delete_event_category.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete event category: ${error.message}`);
    }
  });

  const createEventCategory = async (input: EventCategoryInput): Promise<MutationResponse> => {
    const { data } = await createEventCategoryMutation({
      variables: { input }
    });
    return (
      data?.create_event_category || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const updateEventCategory = async (id: string, input: EventCategoryInput): Promise<MutationResponse> => {
    const { data } = await updateEventCategoryMutation({
      variables: { id, input }
    });
    return (
      data?.update_event_category || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const deleteEventCategory = async (id: string): Promise<MutationResponse> => {
    const { data } = await deleteEventCategoryMutation({
      variables: { id }
    });
    return (
      data?.delete_event_category || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  return {
    createEventCategory,
    updateEventCategory,
    deleteEventCategory,
    loading: createLoading || updateLoading || deleteLoading
  };
};

export default useEventCategoryMutations;
