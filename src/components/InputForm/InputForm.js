import React, { useState } from "react";
import { keys } from "../../config";
import css from "./InputForm.module.css";

const InputForm = React.forwardRef((props, ref) => {
  const { label, onSubmit, onSoftLeft, isActive, code } = props;

  const [value, setValue] = useState("");

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleKey = event => {
    switch (event.key) {
      case keys.right:
        setValue("");
        return;
      case keys.left:
        onSoftLeft && onSoftLeft();
        return;
      default:
        return;
    }
  }

  const handleSubmit = event => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onSubmit(trimmedValue);
    }
    event.preventDefault();
  };

  const input = (
    <input
      className={css.input}
      ref={ref}
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKey}
    />
  );

  const id = (<span className={css.code}>{code}</span>);

  return (
    <form className={css.inputForm} onSubmit={handleSubmit}>
      <label>
        <span className={css.label}>{label}{":"}</span>
        {isActive ? input : id}
      </label>
    </form>
  );
});

export { InputForm };
