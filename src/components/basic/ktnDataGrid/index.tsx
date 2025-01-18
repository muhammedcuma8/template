import React from 'react';
import DataGrid, {
  Editing,
  GroupPanel,
  SearchPanel,
  Grouping,
  FilterRow,
  Column,
  Pager,
  Paging,
} from 'devextreme-react/data-grid';

export interface ColumnConfig {
  dataField: string;
  dataType?: any;
  caption?: any;
  width?: any;
  formItem?: any;
  alignment?: any;
}

interface KTNDataGridProps {
  custom_store: any;
  columns: any;
  pageSizes: Array<number | 'all' | 'auto'> | 'auto';
}

const KTNDataGrid: React.FC<KTNDataGridProps> = ({
  custom_store,
  columns,
  pageSizes,
}) => {
  return (
    <DataGrid
      dataSource={custom_store}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      showBorders={true}
      onRowUpdating={(options) => {
        options.newData = Object.assign({}, options.oldData, options.newData);
      }}
    >
      <Editing
        mode="form"
        allowAdding
        allowDeleting
        allowUpdating
        useIcons={true}
      />
      <GroupPanel visible={true} />
      <SearchPanel visible={true} highlightCaseSensitive={true} />
      <Grouping autoExpandAll={false} />
      <FilterRow visible={true} />

      {columns.map((column: any, index: any) => (
        <Column key={index} {...column} />
      ))}

      <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
      <Paging defaultPageSize={10} />
    </DataGrid>
  );
};

export default KTNDataGrid;
