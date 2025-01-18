import { useHttp } from "../../../hooks/useHttp";
import { SSO_API } from "../../../configs/APIURL";
import { useMutation } from "react-query";
import { columns, labels } from "./constant";
import CRUDDataTable from "../../../components/orginizim/ktnCRUD";
import { getAllRoles, useGetAllRoles } from "../../../services/users/index.api";

const Roles = () => {
  const http = useHttp(SSO_API);
  const getAllUserMutation = useMutation(getAllRoles);
  return (
    <>
      <CRUDDataTable
        http={http}
        keyField="id"
        view={{
          columns: columns,
          mutition: getAllUserMutation,
          getData: useGetAllRoles,
          datakey: "data",
        }}
        labels={labels}
        // apiPagination={true}
      />
    </>
  );
};

export default Roles;
