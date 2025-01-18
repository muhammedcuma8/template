import InputText from "../../components/basic/ktnTextInput";

import Button from "../../components/basic/ktnButton";
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
export const deleteProductsDialogFooter = (
  hideDeleteProductsDialog: any,
  deleteSelectedProducts: any
) => (
  <>
    <Button
      label="No"
      icon="pi pi-times"
      className="p-button-text"
      onClick={hideDeleteProductsDialog}
    />
    <Button
      label="Yes"
      icon="pi pi-check"
      className="p-button-text"
      onClick={deleteSelectedProducts}
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
export const columns = (actionBodyTemplate: any) => [
  {
    field: "title",
    header: "Title",
    sortable: true,
    headerStyle: { width: "14%", minWidth: "10rem" },
  },
  {
    field: "created_at",
    header: "Created At",
    sortable: true,
    headerStyle: { width: "14%", minWidth: "10rem" },
  },
  {
    field: "picture",
    header: "Picture",
    body: imageBodyTemplate,
    headerStyle: { width: "14%", minWidth: "10rem" },
  },
  {
    field: "body",
    header: "Body",
    body: contentBodyTemplate,
    headerStyle: { width: "14%", minWidth: "10rem" },
  },
  {
    field: "title",
    header: "Title",
    sortable: true,
    headerStyle: { width: "14%", minWidth: "10rem" },
  },
  {
    field: "title",
    header: "Title",
    sortable: true,
    headerStyle: { width: "14%", minWidth: "10rem" },
  },
  {
    body: actionBodyTemplate,
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
    setProducts(allProductQuery.data.data.products);
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
