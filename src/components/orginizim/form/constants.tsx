import KTNCheckboxButton from "../../basic/ktnCheckboxGroup";
import InputDate from "../../basic/ktnDateInputWithCover";
import FileUpload from "../../basic/ktnFileUpload";
import MultiSelect from "../../basic/ktnMultiSelect";
import KTNRadioButton from "../../basic/ktnRadioGroup";
import Select from "../../basic/ktnSelect";
import InputTextarea from "../../basic/ktnTextAreaInputWithCover";
import InputText from "../../basic/ktnTextInputWithCover";
import { RenderFunction } from "./index.modals";

export const renderMultiselectField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors
  // validations
) => {
  let inputProps = {
    ...field,
    optionLabel: "name",
    options: fieldItem.options,
    value: getValues(fieldItem.name),
    onChange: (e: any) => {
      setValue(fieldItem.name, e.value, {
        shouldValidate: true,
      });
    },

    ...fieldItem,
  };
  if (fieldItem.validations) {
    inputProps = {
      ...register(fieldItem.name, fieldItem.validations),
      error: errors[fieldItem.name],
      ...inputProps,
    };
  }
  return <MultiSelect {...inputProps} />;
};

export const renderCheckboxField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors
) => {
  let inputProps = {
    ...field,
    onChange: (e: any) => {
      const selectedValue = getValues(fieldItem.name);
      if (e.checked) selectedValue.push(e.value);
      else selectedValue.splice(selectedValue.indexOf(e.value), 1);
      setValue(fieldItem.name, selectedValue, {
        shouldValidate: true,
      });
    },

    ...fieldItem,
  };
  if (fieldItem.validations) {
    inputProps = {
      ...register(fieldItem.name, fieldItem.validations),
      error: errors[fieldItem.name],
      ...inputProps,
    };
  }
  return <KTNCheckboxButton {...inputProps} />;
};

export const renderRadioButtonField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors
) => {
  let inputProps = {
    ...field,
    onChange: (e: any) => {
      setValue(fieldItem.name, e.value, {
        shouldValidate: true,
      });
    },

    value: getValues(fieldItem.name),
    ...fieldItem,
  };
  if (fieldItem.validations) {
    inputProps = {
      ...register(fieldItem.name, fieldItem.validations),
      error: errors[fieldItem.name],
      ...inputProps,
    };
  }
  return <KTNRadioButton {...inputProps} />;
};

export const renderNumberField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors
) => {
  let inputProps = {
    ...field,
    ...fieldItem,
    value: getValues(fieldItem.name),
    onChange: (e: any) => {
      console.log(e);
      setValue(fieldItem.name, e.target.value, {
        shouldValidate: true,
      });
    },
  };
  if (fieldItem.validations) {
    inputProps = {
      ...register(fieldItem.name, fieldItem.validations),
      error: errors[fieldItem.name],
      ...inputProps,
    };
  }
  return <InputText {...inputProps} />;
};

export const renderSelectField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors
) => {
  let inputProps = {
    ...field,
    ...fieldItem,
    options: fieldItem.options,
    optionLabel: "name",
    onChange: (e: any) => {
      setValue(fieldItem.name, e.value, {
        shouldValidate: true,
      });
    },
    value: getValues(fieldItem.name),
  };
  if (fieldItem.validations) {
    inputProps = {
      ...register(fieldItem.name, fieldItem.validations),
      error: errors[fieldItem.name],
      ...inputProps,
    };
  }
  console.log(
    "ffff",
    inputProps.options.find((o: any) => o.code === inputProps.value)
  );
  return (
    <Select
      {...inputProps}
      defaultValue={
        inputProps.value
          ? inputProps.options.find((o: any) => o.code === inputProps.value)
          : null
      }
    />
  );
};

export const renderTextField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors
) => {
  let inputProps = {
    ...field,
    ...fieldItem,
    value: getValues(fieldItem.name),
    onChange: (e: any) => {
      setValue(fieldItem.name, e.target.value, {
        shouldValidate: true,
      });
    },
  };

  if (fieldItem.validations) {
    inputProps = {
      ...register(fieldItem.name, fieldItem.validations),
      error: errors[fieldItem.name],
      ...inputProps,
    };
  }

  return <InputText {...inputProps} />;
};
export const renderPasswordField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors,
  watch
) => {
  let inputProps = {
    ...field,
    ...fieldItem,
    value: getValues(fieldItem.name),
    onChange: (e: any) => {
      setValue(fieldItem.name, e.target.value, {
        shouldValidate: true,
      });
    },
  };
  if (fieldItem.customvalidation) {
    if (fieldItem.customvalidation.match) {
      const customVal = {
        validate: (val: string) => {
          if (watch(fieldItem.customvalidation.match) !== val) {
            return fieldItem.customvalidation.message;
          }
        },
      };
      fieldItem.validations.validate = customVal.validate;
    }
  }

  if (fieldItem.validations) {
    inputProps = {
      ...register(fieldItem.name, fieldItem.validations),
      error: errors[fieldItem.name],
      ...inputProps,
    };
  }
  return <InputText {...inputProps} />;
};
export const renderDateField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors
) => {
  let inputProps = {
    ...field,
    ...fieldItem,
    value: getValues(fieldItem.name),
    onChange: (e: any) => {
      console.log(e);
      setValue(fieldItem.name, e.value, {
        shouldValidate: true,
      });
    },
  };
  if (fieldItem.validations) {
    inputProps = {
      ...register(fieldItem.name, fieldItem.validations),
      error: errors[fieldItem.name],
      ...inputProps,
    };
  }
  return <InputDate {...inputProps} showIcon showButtonBar />;
};
export const renderFileField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors
) => {
  let inputProps = {
    ...field,
    ...fieldItem,
    value: getValues(fieldItem.name),
    onUpload: (files: any) => {
      if ((getValues(fieldItem.name) && files.length === 0) || files.length > 0)
        setValue(fieldItem.name, files, {
          shouldValidate: true,
        });
    },
  };
  if (fieldItem.validations) {
    inputProps = {
      ...register(fieldItem.name, fieldItem.validations),
      error: errors[fieldItem.name],
      ...inputProps,
    };
  }
  if (inputProps.allowedTypes) {
    const generateAcceptValue = () => {
      const acceptTypes = Object.keys(inputProps.allowedTypes)
        .map((type) => inputProps.allowedTypes[type])
        .flat();
      return acceptTypes.map((ext) => `${ext}`).join(",");
    };
    inputProps.accept = generateAcceptValue();
    console.log(inputProps.accept);
  }
  // console.log(inputProps);
  return <FileUpload {...inputProps} />;
};

export const renderTextAreaField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors
) => {
  let inputProps = {
    ...field,
    ...fieldItem,
    value: getValues(fieldItem.name),
    onChange: (e: any) => {
      setValue(fieldItem.name, e.target.value, {
        shouldValidate: true,
      });
    },
  };
  if (fieldItem.validations) {
    inputProps = {
      ...register(fieldItem.name, fieldItem.validations),
      error: errors[fieldItem.name],
      ...inputProps,
    };
  }
  return <InputTextarea {...inputProps} />;
};
const fieldRenderers: any = {
  multiselect: renderMultiselectField,
  checkbox: renderCheckboxField,
  radio: renderRadioButtonField,
  number: renderNumberField,
  select: renderSelectField,
  default: renderTextField,
  password: renderPasswordField,
  textArea: renderTextAreaField,
  Date: renderDateField,
  File: renderFileField,
};
export const renderField: RenderFunction = (
  field,
  fieldItem,
  getValues,
  setValue,
  register,
  errors,
  watch
) => {
  const renderFunction =
    fieldRenderers[fieldItem.type] || fieldRenderers.default;
  return renderFunction(
    field,
    fieldItem,
    getValues,
    setValue,
    register,
    errors,
    watch
  );
};
