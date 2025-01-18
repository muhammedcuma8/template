import { useState, useEffect } from "react";
import Button from "../../components/basic/ktnButton";
import { Toolbar } from "primereact/toolbar";
import {
  getProducts,
  useGetAllProduct,
} from "../../services/product/index.api";
import Filters from "../../components/orginizim/filters";
import {
  cities,
  columns,
  createId,
  deleteProductDialogFooter,
  deleteProductsDialogFooter,
  findIndexById,
  handleProductsQuery,
  leftToolbarTemplate,
  productDialogFooter,
  rightToolbarTemplate,
} from "./constant";
import ContainerAPI from "../../components/orginizim/containerAPI";
import { useHttp } from "../../hooks/useHttp";
import { SSO_API } from "../../configs/APIURL";
import { useMutation } from "react-query";
import { useNotifyContext } from "../../contexts/notify";
import KTNDataTable from "../../components/basic/ktnDatatable";
import KTNDialog from "../../components/basic/KTNDialog";
import { EditDialog } from "./Edit";

const Product = () => {
  const emptyProduct = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };

  const [products, setProducts] = useState<any>(null);
  const [multiselectValue, setMultiselectValue] = useState<any>(null);
  const [selectValue, setSelectValue] = useState<any>(null);
  const [textValue, setTextValue] = useState<any>("");
  const [radioValue, setRadioValue] = useState<any>(null);
  const [productDialog, setProductDialog] = useState<boolean>(false);
  const [deleteProductDialog, setDeleteProductDialog] =
    useState<boolean>(false);
  const [deleteProductsDialog, setDeleteProductsDialog] =
    useState<boolean>(false);
  const [product, setProduct] = useState<any>(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState<any>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<any>(null);
  const { showNotification } = useNotifyContext();
  const http = useHttp(SSO_API);
  const allProductQuery: any = useGetAllProduct(http);
  const getAllProductMutation = useMutation(getProducts);
  useEffect(() => {
    handleProductsQuery(allProductQuery, setProducts, showNotification);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProductQuery.status]);
  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      const _products: any[] = [...products];
      const _product: any = { ...product };
      if (product.id) {
        const index = findIndexById(product.id, products);

        _products[index] = _product;
        showNotification({
          detail: "Product Updated",
          // life: 3000,
        });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        showNotification({
          detail: "Product Created",
        });
      }
      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product: any) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: any) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    const _products = products.filter((val: any) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    showNotification({
      detail: "Product Deleted",
    });
  };

  const deleteSelectedProducts = () => {
    const _products = products.filter(
      (val: any) => !selectedProducts.includes(val)
    );
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    showNotification({
      detail: "Products Deleted",
    });
  };
  console.log(products);
  const onCategoryChange = (e: any) => {
    const _product = { ...product };
    _product["category"] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e: any, name: string) => {
    const val = (e.target && e.target.value) || "";
    const _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e: any, name: string) => {
    const val = e.value || 0;
    const _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          label="Edit"
          className="p-button-success mr-2 mb-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger mr-2 mb-2"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </div>
    );
  };

  return (
    <ContainerAPI query={allProductQuery}>
      <div className="grid crud-demo">
        <div className="col-12">
          <div className="card">
            <Toolbar
              className="mb-4"
              left={() =>
                leftToolbarTemplate(
                  openNew,
                  () => {
                    setDeleteProductsDialog(true);
                  },
                  selectedProducts
                )
              }
              right={rightToolbarTemplate}
            ></Toolbar>
            <Filters
              cities={cities}
              setMultiselectValue={setMultiselectValue}
              multiselectValue={multiselectValue}
              selectValue={selectValue}
              setSelectValue={setSelectValue}
              textValue={textValue}
              setTextValue={setTextValue}
              radioValue={radioValue}
              setRadioValue={setRadioValue}
            />
            <KTNDataTable
              data={products}
              query={getAllProductMutation}
              selectedProducts={selectedProducts}
              onSelectionChange={(e: any) => setSelectedProducts(e.value)}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              columns={columns(actionBodyTemplate)}
              actionBodyTemplate={actionBodyTemplate}
              totalDataCount={products?.length}
              // apiPagination={{
              //   onPageChange: (e: any) => {
              //     getAllProductMutation.mutate({
              //       http: http,
              //       pageNumber: e.page,
              //     });
              //   },
              //   rowsPerPageOptions: [10, 20, 30],
              // }}
            />
            <EditDialog
              productDialog={productDialog}
              productDialogFooter={productDialogFooter}
              hideDialog={hideDialog}
              saveProduct={saveProduct}
              product={product}
              onCategoryChange={onCategoryChange}
              onInputChange={onInputChange}
              submitted={submitted}
              onInputNumberChange={onInputNumberChange}
            />
            <KTNDialog
              visible={deleteProductDialog}
              style={{ width: "450px" }}
              header="Confirm"
              modal
              footer={deleteProductDialogFooter(
                hideDeleteProductDialog,
                deleteProduct
              )}
              onHide={hideDeleteProductDialog}
            >
              <div className="flex align-items-center justify-content-center">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {product && (
                  <span>
                    Are you sure you want to delete <b>{product.name}</b>?
                  </span>
                )}
              </div>
            </KTNDialog>

            <KTNDialog
              visible={deleteProductsDialog}
              style={{ width: "450px" }}
              header="Confirm"
              modal
              footer={deleteProductsDialogFooter(
                hideDeleteProductsDialog,
                deleteSelectedProducts
              )}
              onHide={hideDeleteProductsDialog}
            >
              <div className="flex align-items-center justify-content-center">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {product && (
                  <span>
                    Are you sure you want to delete the selected products?
                  </span>
                )}
              </div>
            </KTNDialog>
          </div>
        </div>
      </div>
    </ContainerAPI>
  );
};

export default Product;
