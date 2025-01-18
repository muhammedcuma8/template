import InputText from "../../../components/basic/ktnTextInput";

import Button from "../../../components/basic/ktnButton";
export const contentBodyTemplate = (rowData: any) => {
  return (
    <>
      <span className="p-column-title">body</span>
      {rowData.body}
    </>
  );
};
export const cities = [
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
];
export const options = [
  { label: "New York", value: "NY" },
  { label: "New York1", value: "NY1" },
  { label: "New York2", value: "NY2" },
  { label: "New York3", value: "NY3" },
];
export const deleteUsersDialogFooter = (
  hideDeleteUsersDialog: any,
  deleteSelectedUsers: any
) => (
  <>
    <Button
      label="No"
      icon="pi pi-times"
      className="p-button-text"
      onClick={hideDeleteUsersDialog}
    />
    <Button
      label="Yes"
      icon="pi pi-check"
      className="p-button-text"
      onClick={deleteSelectedUsers}
    />
  </>
);
export const imageBodyTemplate = (rowData: any) => {
  return (
    <>
      <span className="p-column-title">picture</span>
      <img
        src={`https://picsum.photos/200`}
        alt={rowData.picture}
        className="product-image"
      />
    </>
  );
};
export const columns = (AllRoles: any, AllUsers: any) => {
  return [
    {
      field: "user_id",
      header: "User name ",
      sortable: true,
      headerStyle: { minWidth: "10rem" },
      body: (rowData: any) => {
        return AllUsers.find((user: any) => user.user_id === rowData.user_id)
          ?.username;
      },
    },
    {
      field: "role_id",
      header: "Role name",
      sortable: true,
      headerStyle: { minWidth: "10rem" },
      relation: {
        type: "many-to-one",
        targetEntity: AllRoles,
        targetField: "role_id",
        displayField: "role_name",
      },
      body: (rowData: any) => {
        return AllRoles.find((role: any) => role.role_id === rowData.role_id)
          ?.role_name;
      },
    },
  ];
};
export const editColumns = (AllRoles: any, AllUsers: any) => [
  {
    id: "user_id",
    name: "user_id",
    label: "user name",
    type: "select",
    validations: { required: "required" },
    parentClasses: "field col-12",
    options: AllUsers.map((user: any) => {
      return { name: user.username, code: user.user_id };
    }),
  },
  {
    id: "role_id",
    name: "role_id",
    label: "role name",
    type: "select",
    validations: { required: "required" },
    parentClasses: "field col-12",
    options: AllRoles.map((role: any) => {
      return { name: role.role_name, code: role.role_id };
    }),
  },
];
export const addColumns = [
  {
    id: "title",
    name: "title",
    label: "title",
    type: "text",
    validations: { required: "required" },
    parentClasses: "field col-12 ",
  },
  {
    id: "name",
    name: "name",
    label: "Name",
    type: "text",
    parentClasses: "field col-12 ",
    validations: { required: "required" },
    default: "John",
  },
  {
    id: "textArea",
    name: "textArea",
    label: "textArea",
    type: "textArea",
    parentClasses: "field col-12 ",
    validations: { required: "required" },
    default: "John",
  },
  {
    id: "Date",
    name: "Date",
    label: "Date",
    type: "Date",
    parentClasses: "field col-12 ",
    validations: { required: "required" },
    default: "John",
  },
  {
    id: "File",
    name: "File",
    label: "",
    type: "File",
    parentClasses: "field col-12 ",
    validations: { required: "required" },
    allowedTypes: {
      "image/png": [".png"],
      "text/html": [".html", ".htm"],
    },
    maxFileSize: 10485760,
    maxFiles: 5,
    onError: (error: any) => console.log(error),
  },
  {
    id: "checkbox",
    name: "checkbox",
    label: "checkbox",
    type: "checkbox",
    validations: { required: "required" },
    parentClasses: "field col-12",
    options: [
      { label: "New York", value: "NY" },
      { label: "Rome", value: "RM" },
      { label: "London", value: "LDN" },
    ],
    // validation: { required: true },
  },
  {
    id: "radio",
    name: "radio",
    label: "radio",
    type: "radio",
    validations: { required: "required" },
    parentClasses: "field col-12",
    options: [
      { label: "New York", value: "NY" },
      { label: "Rome", value: "RM" },
      { label: "London", value: "LDN" },
    ],
    // validation: { required: true },
  },
  {
    id: "number",
    name: "number",
    label: "number",
    type: "number",
    validations: { required: "required" },
    parentClasses: "field col-12 ",
    // validation: { required: true },
  },
  {
    name: "select",
    parentClasses: "field col-12",
    label: "select",
    type: "select",
    validations: { required: "required" },
    options: [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ],
    // onChange: (e: any) => console.log(e.value),
  },
  {
    name: "multiselect",
    parentClasses: "field col-12",
    label: "multiselect",
    type: "multiselect",
    validations: { required: "required" },
    options: [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ],
    // onChange: (e: any) => console.log(e.value),
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
    title: "Delete Users",
    message: "Are you sure you want to delete selected Items ?",
    cancel: "Cancel",
    save: "Delete",
  },
  export: "Export",
};
export const header = (setGlobalFilter: any) => {
  return (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Users</h5>
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

export const deleteProductDialogFooter = (
  hideDeleteProductDialog: any,
  deleteProduct: any
) => (
  <>
    <Button
      label="No"
      icon="pi pi-times"
      className="p-button-text"
      onClick={hideDeleteProductDialog}
    />
    <Button
      label="Yes"
      icon="pi pi-check"
      className="p-button-text"
      onClick={deleteProduct}
    />
  </>
);

export const productDialogFooter = (hideDialog: any, saveProduct: any) => (
  <>
    <Button
      label="Cancel"
      icon="pi pi-times"
      className="p-button-text"
      onClick={hideDialog}
    />
    <Button
      label="Save"
      icon="pi pi-check"
      className="p-button-text"
      onClick={saveProduct}
    />
  </>
);
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
  selectedUsers: any
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
        disabled={!selectedUsers || !selectedUsers.length}
      />
    </>
  );
};
export const createId = () => {
  let id = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};
export const findIndexById = (id: any, products: any) => {
  let index = -1;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
};
export const confirmDeleteSelected = (setDeleteUsersDialog: any) => {
  console.log(`confirmDeleteSelecteding ${setDeleteUsersDialog}`);
  setDeleteUsersDialog(true);
};
export const handleUsersQuery = (
  allProductQuery: any,
  setUsers: any,
  showNotification: any
) => {
  if (allProductQuery.isSuccess) {
    setUsers(allProductQuery.data.data.result);
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
