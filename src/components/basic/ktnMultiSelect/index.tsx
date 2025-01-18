import {
  MultiSelect as MultiSelectPrime,
  MultiSelectProps,
} from 'primereact/multiselect';
import InputContainer from '../inputContainer';
import React from 'react';
interface NewMultiSelectProps extends MultiSelectProps {
  parentClasses?: String;
  label?: String;
}
const MultiSelect = React.forwardRef((props: NewMultiSelectProps, ref: any) => {
  const selectProps = { ...props };
  delete selectProps.parentClasses;
  return (
    <InputContainer {...props}>
      <MultiSelectPrime {...selectProps} ref={ref} />
    </InputContainer>
  );
});

export default MultiSelect;
