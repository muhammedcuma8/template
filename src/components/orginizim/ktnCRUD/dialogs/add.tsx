import { useEffect, useRef } from 'react';
import KTNDialog from '../../../basic/KTNDialog';
import Button from '../../../basic/ktnButton';
import CRUDForm from '../../form';
import ErrorsAPI from '../../errorsAPI';
import { useNotifyContext } from '../../../../contexts/notify';

interface data {
  image: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

interface AddDialogProps {
  visible: boolean;
  setVisible: any;
  savedata: any;
  culomns?: any;
  extraHtml?: any;
  query: any;
  setData: any;
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof data
  ) => void;
  submitted?: boolean;
  onInputNumberChange?: any;
  labels: any;
}
const handleAddQuery = (
  query: any,
  setVisible: any,
  showNotification: any,
  setData: any
) => {
  if (query.isSuccess) {
    const newRow = JSON.parse(query.data.config.data);
    delete newRow.UserPassword;
    newRow.IsActive = true;
    newRow.IsDeleted = false;
    setData((data: any) => {
      data.push(newRow);
      return data;
    });
    setVisible(false);
    showNotification({
      detail: 'Data Added Successfully',
    });
  }
  if (query.isError) {
    showNotification({
      severity: 'error',
      summary: 'Error',
      detail: query.error.message,
    });
  }
};
export const AddDialog: React.FC<AddDialogProps> = ({
  visible,
  setVisible,
  savedata,
  culomns,
  query,
  labels,
  extraHtml,
  setData,
}) => {
  const { showNotification } = useNotifyContext();
  useEffect(() => {
    handleAddQuery(query, setVisible, showNotification, setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.status]);
  const formRef = useRef<any>();
  return (
    <KTNDialog
      visible={visible}
      style={{ width: '450px' }}
      header={labels?.add.label || 'Add'}
      modal
      className="p-fluid"
      footer={
        <>
          <Button
            label={labels?.add.cancel || 'Cancel'}
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => {
              setVisible(false);
            }}
          />
          <Button
            label={labels?.add.save || 'Save'}
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
        setVisible={setVisible}
        ref={formRef}
      />
      {extraHtml && extraHtml}
      <ErrorsAPI query={query} />
    </KTNDialog>
  );
};
