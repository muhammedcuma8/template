import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Paginator from "../ktnPaginator";
import ContainerAPI from "../../orginizim/containerAPI";

type Data = {
  [key: string]: any;
};

interface TableColumn {
  field?: string;
  query?: string;
  header?: string;
  sortable?: boolean;
  totalDataCount?: number;
  body?: (rowData: Data) => React.ReactNode;
  headerStyle?: React.CSSProperties;
  selectionMode: "multiple" | "single" | undefined;
  emptyMessage?: any;
  currentPageReportTemplate?: string;
  paginatorTemplate?: string;
  rows?: number;
  rowsPerPageOptions?: any;
  dataKey?: string;
  apiPagination?: any;
  onPageChange?: any;
}

const KTNDataTable: React.FC<any> = React.forwardRef(
  (
    {
      data,
      selectedProducts,
      onSelectionChange,
      globalFilter,
      // setGlobalFilter,
      totalDataCount,
      columns,
      emptyMessage = "No data found.",
      currentPageReportTemplate = "Showing {first} to {last} of {totalRecords} data",
      paginatorTemplate = "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",
      header = <div></div>,
      rows = 10,
      rowsPerPageOptions = [5, 10, 25],
      dataKey = "id",
      selectionMode = "single",
      // onPageChange,
      apiPagination,
      query,
    },
    ref: any
  ) => {
    const selectionColumn: TableColumn = {
      selectionMode: "multiple",
      headerStyle: { width: "3rem" },
    };
    const extraProps: any = {};
    if (!apiPagination) {
      extraProps["paginator"] = true;
    }
    return (
      <>
        <ContainerAPI query={query}>
          <DataTable
            ref={ref}
            value={data}
            selection={selectedProducts}
            onSelectionChange={onSelectionChange}
            dataKey={dataKey}
            {...extraProps}
            rows={rows}
            rowsPerPageOptions={rowsPerPageOptions}
            className="datatable-responsive"
            paginatorTemplate={paginatorTemplate}
            currentPageReportTemplate={currentPageReportTemplate}
            globalFilter={globalFilter}
            emptyMessage={emptyMessage}
            header={header}
            responsiveLayout="scroll"
          >
            {selectionMode === "multiple" && (
              <Column
                selectionMode={selectionColumn.selectionMode}
                headerStyle={selectionColumn.headerStyle}
              ></Column>
            )}
            {columns.map((column: any, index: any) => (
              <Column
                key={index}
                field={column.field}
                header={column.header}
                sortable={column.sortable}
                body={column.body}
                headerStyle={column.headerStyle}
              ></Column>
            ))}
          </DataTable>
        </ContainerAPI>
        {apiPagination && (
          <Paginator
            {...apiPagination}
            totalRecords={totalDataCount || data?.length}
          />
        )}
      </>
    );
  }
);

export default KTNDataTable;
