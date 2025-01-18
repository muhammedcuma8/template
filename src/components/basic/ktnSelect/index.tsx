import { Dropdown as SelectPrime } from "primereact/dropdown";
import InputContainer from "../inputContainer";
import React from "react";
const Select = React.forwardRef((props: any, ref: any) => {
  const selectProps = { ...props };
  delete selectProps.parentClasses;
  return (
    <InputContainer {...props}>
      <SelectPrime
        {...selectProps}
        defaultValue={selectProps.defaultValue}
        ref={ref}
      />
    </InputContainer>
  );
});

export default Select;
