import ConfirmationModal from '@/components/confirmation-modal';
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

type ConfirmationModalContextType = {
  showConfirmation: (message: string, onConfirm: () => void) => void;
  hideConfirmation: () => void;
};

const ConfirmationModalContext = createContext<ConfirmationModalContextType | undefined>(undefined);

interface ConfirmationModalProviderProps {
  children: React.ReactNode;
}

export const ConfirmationModalProvider: React.FC<ConfirmationModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(null);
  const [loading, setLoading] = useState(false);

  const showConfirmation = (message: string, onConfirm: () => void) => {
    setMessage(message);
    setOnConfirmAction(() => onConfirm);
    setIsOpen(true);
  };

  const hideConfirmation = () => {
    setIsOpen(false);
    setOnConfirmAction(null);
  };

  return (
    <ConfirmationModalContext.Provider value={{ showConfirmation, hideConfirmation }}>
      {children}
      <ConfirmationModal
        isOpen={isOpen}
        loading={loading}
        onRequestClose={hideConfirmation}
        onConfirm={async () => {
          try {
            setLoading(true);
            await onConfirmAction?.();
          } catch (error: any) {
            toast.error(error.message || 'Something went wrong, please try again.');
          } finally {
            setLoading(false);
            hideConfirmation();
          }
        }}
        message={message}
      />
    </ConfirmationModalContext.Provider>
  );
};

export const useConfirmationModal = (): ConfirmationModalContextType => {
  const context = useContext(ConfirmationModalContext);
  if (context === undefined) {
    throw new Error('useConfirmationModal must be used within a ConfirmationModalProvider');
  }
  return context;
};
