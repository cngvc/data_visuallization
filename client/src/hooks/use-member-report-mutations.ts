import type { MutationResponse, PlayerReportInput } from '@/graphql/mutations';
import { CREATE_MEMBER_REPORT, DELETE_MEMBER_REPORT, UPDATE_MEMBER_REPORT } from '@/graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

export const usePlayerReportMutations = (onSuccess?: () => void) => {
  const [createPlayerReportMutation, { loading: createLoading }] = useMutation(CREATE_MEMBER_REPORT, {
    onCompleted: (data) => {
      if (data?.create_member_report?.success) {
        onSuccess?.();
        toast.success(data.create_member_report.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to create member report: ${error.message}`);
    }
  });

  const [updatePlayerReportMutation, { loading: updateLoading }] = useMutation(UPDATE_MEMBER_REPORT, {
    onCompleted: (data) => {
      if (data?.update_member_report?.success) {
        onSuccess?.();
        toast.success(data.update_member_report.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to update member report: ${error.message}`);
    }
  });

  const [deletePlayerReportMutation, { loading: deleteLoading }] = useMutation(DELETE_MEMBER_REPORT, {
    onCompleted: (data) => {
      if (data?.delete_member_report?.success) {
        onSuccess?.();
        toast.success(data.delete_member_report.message);
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete member report: ${error.message}`);
    }
  });

  const createPlayerReport = async (input: PlayerReportInput): Promise<MutationResponse> => {
    const { data } = await createPlayerReportMutation({
      variables: { input }
    });
    return (
      data?.create_member_report || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const updatePlayerReport = async (id: string, input: PlayerReportInput): Promise<MutationResponse> => {
    const { data } = await updatePlayerReportMutation({
      variables: { id, input }
    });
    return (
      data?.update_member_report || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  const deletePlayerReport = async (id: string): Promise<MutationResponse> => {
    const { data } = await deletePlayerReportMutation({
      variables: { id }
    });
    return (
      data?.delete_member_report || {
        success: false,
        message: 'No data returned'
      }
    );
  };

  return {
    createPlayerReport,
    updatePlayerReport,
    deletePlayerReport,
    loading: createLoading || updateLoading || deleteLoading
  };
};
