import { client } from '@/apollo/client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { RouterProvider } from '@/router-provider';
import { ApolloProvider } from '@apollo/client/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfirmationModalProvider } from './context/confirm-modal.context';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <SidebarProvider>
          <ConfirmationModalProvider>
            <RouterProvider />
            <Toaster />
          </ConfirmationModalProvider>
        </SidebarProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}

export default App;
