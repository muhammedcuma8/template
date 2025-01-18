import {
  InputNumber as InputNumberPrime,
  InputNumberProps,
} from 'primereact/inputnumber';
import React from 'react';
const InputNumber = React.forwardRef((props: InputNumberProps, ref: any) => {
  return <InputNumberPrime {...props} ref={ref} />;
});

export default InputNumber;
