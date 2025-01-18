import { Tooltip as TooltipPrime, TooltipProps } from 'primereact/tooltip';
import React from 'react';
const Tooltip = React.forwardRef((props: TooltipProps, ref: any) => {
  return <TooltipPrime {...props} ref={ref} />;
});

export default Tooltip;
