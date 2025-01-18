import { useEffect } from "react";
import { useNotifyContext } from "../../../../contexts/notify";
import KTNDialog from "../../../basic/KTNDialog";
import Button from "../../../basic/ktnButton";
import ErrorsAPI from "../../errorsAPI";

interface data {
  image: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

interface DeleteDialogProps {
  visible: boolean;
  setVisible: any;
  savedata: any;
  extraHtml?: any;

  setData?: any;
  query: any;
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof data
  ) => void;
  data?: any;
  submitted?: boolean;
  onInputNumberChange?: any;
  labels: any;
}
const handleDeleteQuery = (
  query: any,
  setVisible: any,
  showNotification: any,
  setData: any
) => {
  if (query.isSuccess && query.data) {
    const newRow = JSON.parse(query.data?.config?.data);
    setData((data: any) => {
      return data.filter(
        (rowData: any) => rowData.UserName !== newRow.UserName
      );
    });
    setVisible(false);
    showNotification({
      detail: "Data Deleted Successfully",
    });
  }
  if (query.isError) {
    showNotification({
      severity: "error",
      summary: "Error",
      detail: query.error.message,
    });
  }
};
export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  visible,
  setVisible,
  savedata,
  data,
  query,
  labels,
  extraHtml,
  setData,
}) => {
  const { showNotification } = useNotifyContext();
  useEffect(() => {
    handleDeleteQuery(query, setVisible, showNotification, setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.status]);
  return (
    <KTNDialog
      visible={visible}
      style={{ width: "450px" }}
      header={labels?.delete.label || "Delete"}
      modal
      className="p-fluid"
      footer={
        <>
          <Button
            label={labels?.delete.cancel || "Cancel"}
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => {
              setVisible(false);
            }}
          />
          <Button
            label={labels?.delete.delete || "Delete"}
            icon="pi pi-check"
            loading={query.isLoading}
            className="p-button-text"
            onClick={savedata}
          />
        </>
      }
      onHide={() => {
        setVisible(false);
      }}
    >
      <div className="flex align-items-center justify-content-center">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        {data && <span>{labels?.delete.message}</span>}
      </div>
      {extraHtml && extraHtml}
      <ErrorsAPI query={query} />
    </KTNDialog>
  );
};
