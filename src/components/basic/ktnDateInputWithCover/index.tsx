import InputContainer from '../inputContainer';
import React from 'react';
import { Calendar } from 'primereact/calendar';
const InputDate = React.forwardRef((props: any, ref: any) => {
  const inputProps = { ...props };
  delete inputProps.parentClasses;
  return (
    <InputContainer {...props}>
      <Calendar {...inputProps} />
    </InputContainer>
  );
});

export default InputDate;
