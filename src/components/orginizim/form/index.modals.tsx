import { SubmitHandler } from 'react-hook-form';

export interface IFormField {
  name: string;
  label: string;
  type: 'text' | 'select' | 'number' | 'checkbox' | 'radio' | 'multiselect';
  options?: { label: string; value: string }[];
  validations?: any;
  customvalidation?: any;
  onChange?: any;
}

export interface IGenericFormProps {
  fields: IFormField[];
  defaultValues?: Record<string, any>;
  onSubmit: SubmitHandler<any>;
  setVisible?: any;
  formRef?: any;
}
export type RenderFunction = (
  field: any, // Update this type as needed
  fieldItem: IFormField,
  getValues: any,
  setValue: any,
  register: any,
  errors: any,
  validations?: any,
  onChange?: any,
  watch?: any,
  customvalidation?: any
) => JSX.Element;
