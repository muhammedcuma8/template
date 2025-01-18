import { useMutation } from "react-query";
import { columns, labels } from "./constant";
import {
  getAllPermissions,
  useGetAllPermissions,
} from "../../../services/users/index.api";
import { SSO_API } from "../../../configs/APIURL";
import { useHttp } from "../../../hooks/useHttp";
import CRUDDataTable from "../../../components/orginizim/ktnCRUD";

const Permissions = () => {
  const http = useHttp(SSO_API);
  const getAllPermissionMutation = useMutation(getAllPermissions);
  return (
    <>
      <CRUDDataTable
        http={http}
        keyField="id"
        view={{
          columns: columns,
          mutition: getAllPermissionMutation,
          getData: useGetAllPermissions,
          datakey: "data",
        }}
        labels={labels}
        // apiPagination={true}
      />
    </>
  );
};

export default Permissions;
