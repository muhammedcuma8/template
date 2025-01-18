import { useHttp } from "../../../hooks/useHttp";
import { SSO_API } from "../../../configs/APIURL";
import { useMutation } from "react-query";
import { columns, editColumns, labels } from "./constant";
import CRUDDataTable from "../../../components/orginizim/ktnCRUD";
import {
  getAllUserRoles,
  useGetAllRoles,
  useGetAllUser,
  useGetAllUserRoles,
} from "../../../services/users/index.api";
import ContainerAPI from "../../../components/orginizim/containerAPI";
import { updateProduct } from "../../../services/product/index.api";

const UserRoles = () => {
  const http = useHttp(SSO_API);
  const getAllUserRolesMutation = useMutation(getAllUserRoles);
  const AllRoles = useGetAllRoles(http);
  const AllUsers = useGetAllUser(http);
  const updateProductMutation = useMutation(updateProduct);

  console.log(AllUsers.data?.data, AllRoles.data?.data);
  return (
    <ContainerAPI query={AllRoles}>
      <CRUDDataTable
        http={http}
        keyField="id"
        view={{
          columns: columns(
            AllRoles.data?.data || [],
            AllUsers.data?.data || []
          ),
          mutition: getAllUserRolesMutation,
          getData: useGetAllUserRoles,
          datakey: "data",
        }}
        edit={{
          columns: editColumns(
            AllRoles.data?.data || [],
            AllUsers.data?.data || []
          ),
          mutition: updateProductMutation,
        }}
        labels={labels}
      />
    </ContainerAPI>
  );
};

export default UserRoles;
