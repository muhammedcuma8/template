import React from 'react';
import { ContainerAPIProps } from './index.model';
import Loading from '../../basic/ktnLoading';
import ErrorsAPI from '../errorsAPI';

function ContainerAPI({
  children,
  query,
  queries,
  stopLoading,
}: ContainerAPIProps) {
  const isLoading =
    queries?.some((q) => q.isLoading || q.isFetching) ||
    (query && (query.isLoading || query.isFetching));
  const isError =
    queries?.some((q) => q.status === 'error') ||
    (query && query.status === 'error');
  if (isError) {
    return <ErrorsAPI query={query} queries={queries} />;
  }
  if (queries?.every((q) => q.isSuccess)) {
    return children;
  }
  if (!queries && query && query.isSuccess) {
    return children;
  }
  if (isLoading && !stopLoading) {
    return <Loading />;
  }

  return children;
}

export default ContainerAPI;
