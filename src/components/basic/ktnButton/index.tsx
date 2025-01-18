import { ButtonProps, Button as PrimeButton } from "primereact/button";
import React from "react";
const Button = React.forwardRef((props: ButtonProps, ref: any) => {
  return <PrimeButton {...props} ref={ref} />;
});

export default Button;
