import InputContainer from '../inputContainer';
import React from 'react';
import { InputTextarea as InputTextAreaPrime } from 'primereact/inputtextarea';
const InputTextarea = React.forwardRef((props: any, ref: any) => {
  const inputProps = { ...props };
  delete inputProps.parentClasses;
  return (
    <InputContainer {...props}>
      <InputTextAreaPrime {...inputProps} />
    </InputContainer>
  );
});

export default InputTextarea;
