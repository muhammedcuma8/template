import {
  InputText as InputTextPrime,
  InputTextProps,
} from "primereact/inputtext";
import React from "react";
const InputText = React.forwardRef((props: InputTextProps, ref: any) => {
  return <InputTextPrime {...props} ref={ref} />;
});

export default InputText;
