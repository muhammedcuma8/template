import { useHttp } from "../../../hooks/useHttp";
import { SSO_API } from "../../../configs/APIURL";
import { useMutation } from "react-query";
import { columns, labels } from "./constant";
import CRUDDataTable from "../../../components/orginizim/ktnCRUD";
import { getAllUser, useGetAllUser } from "../../../services/users/index.api";

const Users = () => {
  const http = useHttp(SSO_API);
  const getAllUserMutation = useMutation(getAllUser);
  return (
    <CRUDDataTable
      http={http}
      keyField="id"
      view={{
        columns: columns,
        mutition: getAllUserMutation,
        getData: useGetAllUser,
        datakey: "data",
      }}
      labels={labels}
    />
  );
};

export default Users;
