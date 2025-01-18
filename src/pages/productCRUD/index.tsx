import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  useGetAllProduct,
} from "../../services/product/index.api";
import { useHttp } from "../../hooks/useHttp";
import { SSO_API } from "../../configs/APIURL";
import { useMutation } from "react-query";
import { addColumns, columns, editColumns, labels } from "./constant";
import CRUDDataTable from "../../components/orginizim/ktnCRUD";

const Product = () => {
  const http = useHttp(SSO_API);
  const getAllProductMutation = useMutation(getProducts);
  const updateProductMutation = useMutation(updateProduct);
  const deleteProductMutation = useMutation(deleteProduct);
  const multiDeleteProductMutation = useMutation(deleteProduct);
  const createProductMutation = useMutation(createProduct);

  return (
    <CRUDDataTable
      http={http}
      keyField="id"
      view={{
        columns: columns,
        mutition: getAllProductMutation,
        getData: useGetAllProduct,
      }}
      edit={{
        columns: editColumns,
        mutition: updateProductMutation,
      }}
      add={{
        columns: addColumns,
        mutition: createProductMutation,
      }}
      delete={{ mutition: deleteProductMutation }}
      multiDelete={{ mutition: multiDeleteProductMutation }}
      permissions={{
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canExport: true,
      }}
      export={true}
      labels={labels}
      apiPagination={true}
    />
  );
};

export default Product;
