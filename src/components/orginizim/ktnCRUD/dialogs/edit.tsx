import { useEffect, useRef } from "react";
import KTNDialog from "../../../basic/KTNDialog";
import Button from "../../../basic/ktnButton";
import CRUDForm from "../../form";
import { useNotifyContext } from "../../../../contexts/notify";
import ErrorsAPI from "../../errorsAPI";

interface data {
  image: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

interface EditDialogProps {
  visible: boolean;
  setVisible: any;
  savedata: any;
  culomns?: any;
  extraHtml?: any;
  setData: any;
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
const handleEditQuery = (
  query: any,
  setVisible: any,
  showNotification: any,
  setData: any
) => {
  if (query.isSuccess) {
    const newRow = JSON.parse(query.data.config.data);
    newRow.UserPassword && delete newRow.UserPassword;

    setData((data: any) => {
      return data.map((rowData: any) => {
        if (rowData.UserName === newRow.UserName) {
          return newRow;
        } else {
          return rowData;
        }
      });
    });
    setVisible(false);
    showNotification({
      detail: "Data Edited Successfully",
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

export const EditDialog: React.FC<EditDialogProps> = ({
  visible,
  setVisible,
  savedata,
  data,
  culomns,
  query,
  labels,
  extraHtml,
  setData,
}) => {
  console.log("data", data, culomns);
  const formRef = useRef<any>();
  const { showNotification } = useNotifyContext();
  useEffect(() => {
    handleEditQuery(query, setVisible, showNotification, setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.status]);
  return (
    <KTNDialog
      visible={visible}
      style={{ width: "450px" }}
      header={labels?.edit.label || "Edit"}
      modal
      className="p-fluid"
      footer={
        <>
          <Button
            label={labels?.edit.cancel || "Cancel"}
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => {
              setVisible(false);
            }}
          />
          <Button
            label={labels?.edit.save || "Save"}
            icon="pi pi-check"
            className="p-button-text"
            loading={query.isLoading}
            onClick={() => {
              if (formRef.current) {
                formRef.current.submitForm();
              }
            }}
          />
        </>
      }
      onHide={() => {
        setVisible(false);
      }}
    >
      <CRUDForm
        fields={culomns}
        onSubmit={savedata}
        defaultValues={data}
        setVisible={setVisible}
        ref={formRef}
      />

      {extraHtml && extraHtml}
      <ErrorsAPI query={query} />
    </KTNDialog>
  );
};
