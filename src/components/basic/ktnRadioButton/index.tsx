import {
  RadioButton as RadioButtonPrime,
  RadioButtonProps,
} from 'primereact/radiobutton';
import React from 'react';
const RadioButton = React.forwardRef((props: RadioButtonProps, ref: any) => {
  return <RadioButtonPrime {...props} ref={ref} />;
});

export default RadioButton;
