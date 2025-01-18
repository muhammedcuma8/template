import InputText from "../../../components/basic/ktnTextInput";

import Button from "../../../components/basic/ktnButton";

export const columns = [
  {
    field: "permission_id",
    header: "permission_id",
    sortable: true,
  },
  {
    field: "permission_name",
    header: "permission_name",
    sortable: true,
  },
  {
    field: "description",
    header: "description",
    sortable: true,
  },
];

export const labels = {
  add: {
    label: "New Product",
    title: "Add Product",
    cancel: "Cancel",
    save: "Save",
  },
  edit: {
    label: "Edit",
    title: "Edit Product",
    cancel: "Cancel",
    save: "Save",
  },
  delete: {
    label: "Delete",
    title: "Delete Product",
    message: "Are you sure you want to delete ?",
    cancel: "Cancel",
    save: "Delete",
  },
  multiDelete: {
    label: "Delete",
    title: "Delete Permissions",
    message: "Are you sure you want to delete selected Items ?",
    cancel: "Cancel",
    save: "Delete",
  },
  export: "Export",
};
export const header = (setGlobalFilter: any) => {
  return (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Permissions</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e: any) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
};
export const rightToolbarTemplate = () => {
  return (
    <>
      {/* <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          chooseLabel="Import"
          className="mr-2 inline-block"
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        /> */}
    </>
  );
};
export const leftToolbarTemplate = (
  openNew: any,
  confirmDeleteSelected: any,
  selectedPermissions: any
) => {
  return (
    <>
      <Button
        label="New"
        icon="pi pi-plus"
        className="p-button-success mr-2 mb-2"
        onClick={openNew}
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-button-danger mb-2"
        onClick={confirmDeleteSelected}
        disabled={!selectedPermissions || !selectedPermissions.length}
      />
    </>
  );
};

export const handlePermissionsQuery = (
  allProductQuery: any,
  setPermissions: any,
  showNotification: any
) => {
  if (allProductQuery.isSuccess) {
    setPermissions(allProductQuery.data.data.result);
    showNotification({});
  }
  if (allProductQuery.isError) {
    showNotification({
      severity: "error",
      summary: "Error",
      detail: allProductQuery.error.message,
    });
  }
};
export const handleDataQuery = (
  allDataQuery: any,
  setData: any,
  showNotification: any
) => {
  if (allDataQuery.isSuccess) {
    setData(allDataQuery.data.data.result);
    showNotification({});
  }
  if (allDataQuery.isError) {
    showNotification({
      severity: "error",
      summary: "Error",
      detail: allDataQuery.error.message,
    });
  }
};
