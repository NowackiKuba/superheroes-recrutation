import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const defaultQc = new QueryClient();
  return <QueryClientProvider client={defaultQc}>{children}</QueryClientProvider>;
};

export default QueryProvider;
