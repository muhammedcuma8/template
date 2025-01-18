import KTNDialog from '../../../basic/KTNDialog';
import Button from '../../../basic/ktnButton';
import CRUDForm from '../../form';
import ErrorsAPI from '../../errorsAPI';

interface data {
  image: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

interface PreviewDialogProps {
  visible: boolean;
  setVisible: any;
  culomns?: any;
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof data
  ) => void;
  data?: any;
  submitted?: boolean;
  onInputNumberChange?: any;
  labels: any;
}

export const PreviewDialog: React.FC<PreviewDialogProps> = ({
  visible,
  setVisible,
  data,
  culomns,
  labels,
}) => {
  return (
    <KTNDialog
      visible={visible}
      style={{ width: '450px' }}
      header={labels?.preview?.label || 'Preview'}
      modal
      className="p-fluid"
      footer={
        <>
          <Button
            label={labels?.preview?.cancel || 'close'}
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => {
              setVisible(false);
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
        onSubmit={() => {}}
        defaultValues={data}
        setVisible={setVisible}
      />
    </KTNDialog>
  );
};
