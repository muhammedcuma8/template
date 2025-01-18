import React from 'react';
import RadioButton from '../ktnRadioButton';
const KTNRadioButton = React.forwardRef((props: any, ref: any) => {
  const inputProps = { ...props };
  delete inputProps.parentClasses;
  return (
    <div className={props.parentClasses}>
      <div className="grid">
        {props.options.map((option: any, index: any) => (
          <div className="col-12 md:col-3" key={option.value}>
            <div className="field-radiobutton">
              <RadioButton
                inputId={option.value}
                name={option.value}
                value={option.value}
                onChange={props.onChange}
                checked={props.value === option.value}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          </div>
        ))}
      </div>
      {props.error && (
        <small id={props.id} className="p-error">
          {props.error.message}
        </small>
      )}
    </div>
  );
});

export default KTNRadioButton;
