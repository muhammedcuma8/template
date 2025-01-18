import { forwardRef } from "react";
import Checkbox from "../ktnCheckboxButton";
const KTNCheckboxButton = forwardRef((props: any, ref: any) => {
  const inputProps = { ...props };
  delete inputProps.parentClasses;
  return (
    <div className={props.parentClasses}>
      <div className="grid">
        {props.options.map((option: any) => (
          <div className="col-12 md:col-3" key={option.value}>
            <div className="field-checkbox">
              <Checkbox
                inputId={option.value}
                name={option.value}
                value={option.value}
                onChange={props.onChange}
                ref={ref}
                // checked={props.value === option.value}
                checked={props.value.indexOf(option.value) !== -1}
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

export default KTNCheckboxButton;
