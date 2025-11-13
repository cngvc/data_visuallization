import { CREATE_SALES_SUMMARY, DELETE_SALES_SUMMARY, UPDATE_SALES_SUMMARY, type SalesSummaryInput } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useSalesSummaryMutations = (onSuccess?: () => void) => {
  const [createSalesSummary, { loading: createLoading }] = useMutation(CREATE_SALES_SUMMARY, {
    onCompleted: (data) => {
      if (data.create_sales_summary.success) {
        toast.success(data.create_sales_summary.message);
        onSuccess?.();
      }
    },
    onError: (error) => {
      toast.error(`Error creating sales summary: ${error.message}`);
    }
  });

  const [updateSalesSummary, { loading: updateLoading }] = useMutation(UPDATE_SALES_SUMMARY, {
    onCompleted: (data) => {
      if (data.update_sales_summary.success) {
        toast.success(data.update_sales_summary.message);
        onSuccess?.();
      }
    },
    onError: (error) => {
      toast.error(`Error updating sales summary: ${error.message}`);
    }
  });

  const [deleteSalesSummary, { loading: deleteLoading }] = useMutation(DELETE_SALES_SUMMARY, {
    onCompleted: (data) => {
      if (data.delete_sales_summary.success) {
        toast.success(data.delete_sales_summary.message);
        onSuccess?.();
      }
    },
    onError: (error) => {
      toast.error(`Error deleting sales summary: ${error.message}`);
    }
  });

  const handleCreate = (input: SalesSummaryInput) => {
    createSalesSummary({
      variables: {
        input
      }
    });
  };

  const handleUpdate = (id: string, input: SalesSummaryInput) => {
    updateSalesSummary({
      variables: {
        id,
        input
      }
    });
  };

  const handleDelete = (id: string) => {
    deleteSalesSummary({
      variables: {
        id
      }
    });
  };

  return {
    createSalesSummary: handleCreate,
    updateSalesSummary: handleUpdate,
    deleteSalesSummary: handleDelete,
    loading: createLoading || updateLoading || deleteLoading
  };
};

export default useSalesSummaryMutations;
