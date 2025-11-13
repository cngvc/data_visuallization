import axios from '@/api/axios';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useCurrentUser from '@/hooks/use-current-user';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { AlertCircle, FileUp, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type ImportType =
  | 'sales-summary'
  | 'families'
  | 'members'
  | 'events'
  | 'reservations'
  | 'courts'
  | 'event-categories'
  | 'reservation-types'
  | 'membership-types'
  | 'member-reports'
  | 'revenue-recognition'
  | 'transactions'
  | 'event-registrations';

function ImportCSVDialog({ onSuccess, type }: { onSuccess?: () => void; type: ImportType }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { isCurrentOrgAdmin } = useCurrentUser();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ file, type }: { file: File; type: ImportType }) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`/upload-csv/${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        }
      });
      return response.data;
    },
    onSuccess: () => {
      setSelectedFile(null);
      setUploadProgress(0);
      toast.success('File uploaded successfully');
      setDialogOpen(false);
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      toast.error((error?.response?.data as { message: string })?.message || 'An error occurred');
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    mutate({ file: selectedFile, type });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          disabled={!isCurrentOrgAdmin}
        >
          <FileUp className="h-4 w-4" />
          Import CSV
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl w-[90vw]">
        <DialogHeader className="text-left">
          <DialogTitle>Import CSV</DialogTitle>
          <DialogDescription>Import CSV files containing data to import into the system</DialogDescription>
        </DialogHeader>

        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">File Upload</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload a CSV file directly to the server. The server will process the file and import the data.
          </p>

          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="file" className="text-sm font-medium">
                CSV File
              </label>
              <input
                id="file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={isPending}
                className="border rounded p-2 text-sm w-full"
              />
              <p className="text-xs text-muted-foreground">Allowed file types: .csv (Max size: 5MB)</p>
            </div>

            {selectedFile && (
              <div className="text-sm">
                Selected file: <span className="font-medium">{selectedFile.name}</span> ({(selectedFile.size / 1024).toFixed(2)} KB)
              </div>
            )}

            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p className="text-xs text-center text-muted-foreground">Processing... {uploadProgress}%</p>
              </div>
            )}

            <Button onClick={handleUpload} disabled={!selectedFile || isPending} className="w-full sm:w-auto">
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload CSV
                </span>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ImportCSVDialog;
