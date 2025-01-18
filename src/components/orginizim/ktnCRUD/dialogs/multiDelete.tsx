import { useEffect } from 'react';
import { useNotifyContext } from '../../../../contexts/notify';
import KTNDialog from '../../../basic/KTNDialog';
import Button from '../../../basic/ktnButton';
import ErrorsAPI from '../../errorsAPI';

interface data {
  image: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

interface MultiDeleteDialogProps {
  visible: boolean;
  setVisible: any;
  savedata: any;
  extraHtml: any;
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
const handleMultiDeleteQuery = (
  query: any,
  setVisible: any,
  showNotification: any
) => {
  if (query.isSuccess) {
    setVisible(false);
    showNotification({});
  }
  if (query.isError) {
    showNotification({
      severity: 'error',
      summary: 'Error',
      detail: query.error.message,
    });
  }
};
export const MultiDeleteDialog: React.FC<MultiDeleteDialogProps> = ({
  visible,
  setVisible,
  savedata,
  data,
  query,
  labels,
  extraHtml,
}) => {
  const { showNotification } = useNotifyContext();
  useEffect(() => {
    handleMultiDeleteQuery(query, setVisible, showNotification);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.status]);
  return (
    <KTNDialog
      visible={visible}
      style={{ width: '450px' }}
      header={labels?.multiDelete.label || 'Delete'}
      modal
      className="p-fluid"
      footer={
        <>
          <Button
            label={labels?.multiDelete.cancel || 'Cancel'}
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => {
              setVisible(false);
            }}
          />
          <Button
            label={labels?.multiDelete.delete || 'Delete'}
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
          style={{ fontSize: '2rem' }}
        />
        {<span>{labels?.multiDelete.message}</span>}
      </div>
      {extraHtml && extraHtml}
      <ErrorsAPI query={query} />
    </KTNDialog>
  );
};
