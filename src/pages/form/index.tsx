import { updateProduct } from '../../services/product/index.api';
// import { useHttp } from '../../hooks/useHttp';
// import { SSO_API } from '../../configs/APIURL';
import { useMutation } from 'react-query';
import { editColumns } from './constant';
import CRUDForm from '../../components/orginizim/form';
import { useRef } from 'react';
import ErrorsAPI from '../../components/orginizim/errorsAPI';
import Button from '../../components/basic/ktnButton';
// import { usePermissions } from '../../contexts/permissions';

const Form = () => {
  // const http = useHttp(SSO_API);
  const updateProductMutation = useMutation(updateProduct);

  const formRef = useRef<any>();
  const savedata = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };
  return (
    <div className="formPage">
      <CRUDForm
        fields={editColumns}
        onSubmit={(data: any) => {
          console.log(data);
        }}
        // defaultValues={{}}
        ref={formRef}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={savedata}
      />
      <ErrorsAPI query={updateProductMutation} />
    </div>
  );
};

export default Form;
