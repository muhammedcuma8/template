import React, { forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";

import { IFormField } from "./index.modals";
import { renderField } from "./constants";

const CRUDForm: any = forwardRef(
  ({ fields, defaultValues, onSubmit }: any, ref: any) => {
    const {
      control,
      handleSubmit,
      getValues,
      setValue,
      register,
      // formState: { errors },
      watch,
    } = useForm<any>({
      defaultValues,
    });
    useImperativeHandle(ref, () => ({
      submitForm() {
        handleSubmit(onSubmit)();
      },
    }));
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="p-input-filled grid">
        {fields.map((fieldItem: IFormField) => (
          <Controller
            key={fieldItem.name}
            name={fieldItem.name}
            control={control}
            defaultValue={
              defaultValues && defaultValues[fieldItem.name]
                ? defaultValues[fieldItem.name]
                : fieldItem.type === "checkbox"
                ? []
                : ""
            }
            render={({ field, formState: { errors } }) => (
              <>
                {renderField(
                  field,
                  fieldItem,
                  getValues,
                  setValue,
                  register,
                  errors,
                  watch
                )}
              </>
            )}
          />
        ))}
      </form>
    );
  }
);

export default CRUDForm;
