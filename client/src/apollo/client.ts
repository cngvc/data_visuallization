import { API_BASE_URL } from '@/configs';
import { useAuthStore } from '@/store/auth.store';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

const authLink = new ApolloLink((operation: ApolloLink.Operation, forward: any) => {
  const authStore = useAuthStore.getState();
  const token = authStore.getAccessToken();
  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    }));
  }
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: `${API_BASE_URL}/graphql`
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    },
    query: {
      fetchPolicy: 'cache-first'
    }
  }
});
