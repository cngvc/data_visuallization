import {
  CREATE_REVENUE_RECOGNITION,
  DELETE_REVENUE_RECOGNITION,
  UPDATE_REVENUE_RECOGNITION,
  type RevenueRecognitionInput
} from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export default function useRevenueRecognitionMutations(refetch?: () => void) {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_REVENUE_RECOGNITION);
  const [updateMutation, { loading: updateLoading }] = useMutation(UPDATE_REVENUE_RECOGNITION);
  const [deleteMutation, { loading: deleteLoading }] = useMutation(DELETE_REVENUE_RECOGNITION);

  const createRevenueRecognition = async (input: RevenueRecognitionInput) => {
    try {
      const { data } = await createMutation({
        variables: { input }
      });

      if (data?.create_revenue_recognition?.success) {
        toast.success('Revenue recognition created successfully');
        refetch?.();
        return data.create_revenue_recognition;
      } else {
        toast.error(data?.create_revenue_recognition?.message || 'Failed to create revenue recognition');
        return null;
      }
    } catch (error) {
      toast.error(`Error creating revenue recognition: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  };

  const updateRevenueRecognition = async (id: string, input: RevenueRecognitionInput) => {
    try {
      const { data } = await updateMutation({
        variables: { id, input }
      });

      if (data?.update_revenue_recognition?.success) {
        toast.success('Revenue recognition updated successfully');
        refetch?.();
        return data.update_revenue_recognition;
      } else {
        toast.error(data?.update_revenue_recognition?.message || 'Failed to update revenue recognition');
        return null;
      }
    } catch (error) {
      toast.error(`Error updating revenue recognition: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  };

  const deleteRevenueRecognition = async (id: string) => {
    try {
      const { data } = await deleteMutation({
        variables: { id }
      });

      if (data?.delete_revenue_recognition?.success) {
        toast.success('Revenue recognition deleted successfully');
        refetch?.();
        return true;
      } else {
        toast.error(data?.delete_revenue_recognition?.message || 'Failed to delete revenue recognition');
        return false;
      }
    } catch (error) {
      toast.error(`Error deleting revenue recognition: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  };

  return {
    createRevenueRecognition,
    updateRevenueRecognition,
    deleteRevenueRecognition,
    loading: createLoading || updateLoading || deleteLoading
  };
}
