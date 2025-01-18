import { InputText as InputTextPrime } from "primereact/inputtext";
import InputContainer from "../inputContainer";
import React from "react";
const InputText = React.forwardRef((props: any, ref: any) => {
  const inputProps = { ...props };
  delete inputProps.parentClasses;
  return (
    <InputContainer {...props}>
      <InputTextPrime {...inputProps} ref={ref} />
    </InputContainer>
  );
});

export default InputText;
