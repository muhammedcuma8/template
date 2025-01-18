import React from 'react';
import { APIErrorsProps } from './index.model';
import Button from '../../basic/ktnButton';
import Messages from '../../basic/ktnMessage';

function ErrorsAPI({ query, queries }: APIErrorsProps) {
  const queryArray = Array.isArray(queries) ? queries : [query];
  const errors: (string | number)[] = queryArray.reduce((acc: any, query) => {
    if (query && query.status === 'error') {
      if (
        query.error.response &&
        Array.isArray(query.error.response.data.errors)
      ) {
        const queryErrors = query.error.response.data.errors.map(
          (error: any) => error.message
        );
        return [...acc, ...queryErrors];
      } else {
        return [...acc, query.error.message];
      }
    }
    return acc;
  }, []);
  return (
    <>
      {errors.length > 0 && (
        <>
          {errors.map((error, index) => (
            <>
              <Messages
                sticky={true}
                severity={'error'}
                summary={'Error'}
                detail={error}
                content={
                  <>
                    <span className="p-message-detail" data-pc-section="detail">
                      {error}
                    </span>
                    {query && query.refetch && (
                      <Button
                        label="Retry"
                        severity="danger"
                        className="p-message-close p-link"
                        onClick={() => {
                          if (query && query.refetch) query.refetch();
                          else {
                            queries &&
                              queries.forEach((que: any) => {
                                que.error && que.refetch();
                              });
                          }
                        }}
                      />
                    )}
                  </>
                }
              />
            </>
          ))}
        </>
      )}
    </>
  );
}

export default ErrorsAPI;
