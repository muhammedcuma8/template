import { CRUDDataTableProps } from ".";
import Button from "../../basic/ktnButton";

export const leftToolbarTemplate = (
  dataProps: CRUDDataTableProps,
  openNew: any,
  // confirmDeleteSelected: any,
  selected: any,
  onDelete: any,
  checkAdd: any,
  checkMultiDelete: any
  // checkPreview: any
) => {
  return (
    <>
      {checkAdd() && (
        <Button
          label={dataProps.labels?.add.label || "New"}
          icon="pi pi-plus"
          className="p-button-success mr-2 mb-2"
          onClick={openNew}
        />
      )}
      {checkMultiDelete() && (
        <Button
          label={dataProps.labels?.delete.label || "Delete"}
          icon="pi pi-trash"
          className="p-button-danger mb-2"
          onClick={onDelete}
          disabled={!selected || !selected.length}
        />
      )}
    </>
  );
};
export const rightToolbarTemplate = (
  dt: any,
  checkExport: any,
  dataProps: any
) => {
  return (
    <>
      {checkExport() && (
        <Button
          label={dataProps.labels?.export || "Export"}
          icon="pi pi-upload"
          className="p-button-help"
          onClick={() => {
            console.log("export");
            dt.current.exportCSV();
          }}
        />
      )}
    </>
  );
};
export const handleDataQuery = (
  allDataQuery: any,
  setData: any,
  showNotification: any,
  datakey: any
) => {
  if (allDataQuery.isSuccess) {
    const data = datakey
      ? allDataQuery.data[datakey]
      : allDataQuery.data.data.products;
    setData(data);
    showNotification({
      summary: "Success",
      detail: "Data Loaded Successfully",
    });
  }
  if (allDataQuery.isError) {
    showNotification({
      severity: "error",
      summary: "Error",
      detail: allDataQuery.error.message,
    });
  }
};
