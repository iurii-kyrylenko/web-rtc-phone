import React from "react";

const EmptyForm = React.forwardRef(({ onSubmit }, ref) => {
  const handleSubmit = event => {
    onSubmit();
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: 0, height: 0 }}>
      <input ref={ref} type="text" style={{ opacity: 0 }}/>
    </form>
  );
});

export { EmptyForm };
