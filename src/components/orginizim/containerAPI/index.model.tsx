import { ReactNode } from 'react';

export interface Query {
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  status: string;
  error: any;
}

export interface ContainerAPIProps {
  children: ReactNode;
  query?: Query | any;
  queries?: Query[];
  stopLoading?: boolean;
}
