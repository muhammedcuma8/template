import { useHttp } from "../../../hooks/useHttp";
import { SSO_API } from "../../../configs/APIURL";
import { useMutation } from "react-query";
import { columns, labels } from "./constant";
import CRUDDataTable from "../../../components/orginizim/ktnCRUD";
import { getAllPages, useGetAllPages } from "../../../services/users/index.api";

const Pages = () => {
  const http = useHttp(SSO_API);
  const getAllUserMutation = useMutation(getAllPages);
  return (
    <>
      <CRUDDataTable
        http={http}
        keyField="id"
        view={{
          columns: columns,
          mutition: getAllUserMutation,
          getData: useGetAllPages,
          datakey: "data",
        }}
        labels={labels}
        // apiPagination={true}
      />
    </>
  );
};

export default Pages;
