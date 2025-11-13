import { CREATE_TRANSACTION, DELETE_TRANSACTION, UPDATE_TRANSACTION, type TransactionInput, type MutationResponse } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const useTransactionMutations = (onSuccess?: () => void) => {
  const [createTransactionMutation, { loading: createLoading }] = useMutation(CREATE_TRANSACTION, {
    onCompleted: (data: { create_transaction: MutationResponse }) => {
      if (data.create_transaction.success) {
        toast.success(data.create_transaction.message || 'Transaction created successfully');
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.create_transaction.message || 'Failed to create transaction');
      }
    },
    onError: (error: Error) => {
      toast.error(`Error creating transaction: ${error.message}`);
    }
  });

  const [updateTransactionMutation, { loading: updateLoading }] = useMutation(UPDATE_TRANSACTION, {
    onCompleted: (data: { update_transaction: MutationResponse }) => {
      if (data.update_transaction.success) {
        toast.success(data.update_transaction.message || 'Transaction updated successfully');
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.update_transaction.message || 'Failed to update transaction');
      }
    },
    onError: (error: Error) => {
      toast.error(`Error updating transaction: ${error.message}`);
    }
  });

  const [deleteTransactionMutation, { loading: deleteLoading }] = useMutation(DELETE_TRANSACTION, {
    onCompleted: (data: { delete_transaction: MutationResponse }) => {
      if (data.delete_transaction.success) {
        toast.success(data.delete_transaction.message || 'Transaction deleted successfully');
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.delete_transaction.message || 'Failed to delete transaction');
      }
    },
    onError: (error: Error) => {
      toast.error(`Error deleting transaction: ${error.message}`);
    }
  });

  const createTransaction = (input: TransactionInput) => {
    createTransactionMutation({
      variables: { input }
    });
  };

  const updateTransaction = (id: string, input: TransactionInput) => {
    updateTransactionMutation({
      variables: { id, input }
    });
  };

  const deleteTransaction = (id: string) => {
    deleteTransactionMutation({
      variables: { id }
    });
  };

  return {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    loading: createLoading || updateLoading || deleteLoading
  };
};

export default useTransactionMutations;
