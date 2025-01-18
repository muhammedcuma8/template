import { Checkbox as CheckboxPrime, CheckboxProps } from 'primereact/checkbox';
import React from 'react';
const Checkbox = React.forwardRef((props: CheckboxProps, ref: any) => {
  return <CheckboxPrime {...props} ref={ref} />;
});

export default Checkbox;
