import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onRequestClose, onConfirm, loading, message }) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onRequestClose();
      }}
    >
      <DialogContent className="sm:max-w-md rounded-lg border-none shadow-lg">
        <DialogHeader className="space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
          <DialogTitle className="text-xl font-semibold text-center">Confirmation Required</DialogTitle>
          <DialogDescription className="text-base text-center text-foreground/90">{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex sm:justify-center gap-3 mt-6 sm:space-x-2">
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="bg-[#9D2D2C] hover:bg-[#9D2D2C]/90 text-white font-medium px-6 py-2 transition-all duration-200 shadow-sm"
            variant="default"
          >
            <LoaderCircle className={cn('h-4 w-4 animate-spin', loading ? 'block' : 'hidden')} /> {loading ? 'Loading...' : 'Yes, Proceed'}
          </Button>
          <Button
            onClick={onRequestClose}
            className="bg-[#3D4C9F] hover:bg-[#3D4C9F]/90 text-white font-medium px-6 py-2 transition-all duration-200 shadow-sm"
            variant="default"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
