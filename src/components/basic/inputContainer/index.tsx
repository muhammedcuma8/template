const InputContainer = (props: any) => {
  const selectProps = { ...props };
  delete selectProps.parentClasses;
  return (
    <div className={props.parentClasses}>
      <span className="p-float-label">
        {props.children}
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
      </span>
      {props.error && (
        <small id={props.id} className="p-error">
          {props.error.message}
        </small>
      )}
    </div>
  );
};

export default InputContainer;
