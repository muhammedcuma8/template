import InputText from "../../components/basic/ktnTextInput";

import Button from "../../components/basic/ktnButton";

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

export const editColumns = [
  {
    id: "title",
    name: "title",
    label: "title",
    type: "text",
    validations: { required: "required" },
    parentClasses: "field col-6 ",
    onChange: (e: any) => console.log(e.target.value),
  },
  {
    id: "name",
    name: "name",
    label: "Name",
    type: "text",
    parentClasses: "field col-6 ",
    validations: { required: "required" },
  },
  {
    id: "checkbox",
    name: "checkbox",
    label: "checkbox",
    type: "checkbox",
    validations: { required: "required" },
    parentClasses: "field col-6",
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
    parentClasses: "field col-6",
    options: [
      { label: "New York", value: "NY1" },
      { label: "Rome", value: "RM1" },
      { label: "London", value: "LDN1" },
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
      { name: "New York", code: "11NY" },
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
      { name: "New York", code: "22NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ],
    // onChange: (e: any) => console.log(e.value),
  },
];

export const header = (setGlobalFilter: any) => {
  return (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Products</h5>
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

export const productDialogFooter = (saveProduct: any) => (
  <>
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
  selectedProducts: any
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
        disabled={!selectedProducts || !selectedProducts.length}
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
export const confirmDeleteSelected = (setDeleteProductsDialog: any) => {
  console.log(`confirmDeleteSelecteding ${setDeleteProductsDialog}`);
  setDeleteProductsDialog(true);
};
export const handleProductsQuery = (
  allProductQuery: any,
  setProducts: any,
  showNotification: any
) => {
  if (allProductQuery.isSuccess) {
    setProducts(allProductQuery.data.data.result);
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
