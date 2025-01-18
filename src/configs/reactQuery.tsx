import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      notifyOnChangeProps: 'tracked',
      retry: false,
    },
  },
});

export default queryClient;