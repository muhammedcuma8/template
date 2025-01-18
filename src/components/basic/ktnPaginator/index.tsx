import React, { useState } from 'react';
import {
  PaginatorPageChangeEvent,
  Paginator as PaginatorPrime,
} from 'primereact/paginator';
const Paginator = React.forwardRef((props: any, ref: any) => {
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    props.onPageChange && props.onPageChange(event);
  };

  return (
    <div className="card">
      <PaginatorPrime
        {...props}
        ref={ref}
        first={first}
        rows={rows}
        totalRecords={props.totalRecords}
        rowsPerPageOptions={props.rowsPerPageOptions}
        onPageChange={onPageChange}
      />
    </div>
  );
});

export default Paginator;
