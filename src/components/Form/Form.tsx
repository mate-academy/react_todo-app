import { forwardRef, useEffect } from 'react';

type Props = {
  query: string;
  onInput: (v: string) => void;
  onAdd: () => void;
};

export const Form = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { query, onInput, onAdd } = props;

  useEffect(() => {
    if (typeof ref !== 'function') {
      ref?.current?.focus();
    }
  }, [ref]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onAdd();
      }}
    >
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={event => onInput(event.target.value)}
        ref={ref}
        autoFocus
      />
    </form>
  );
});

Form.displayName = 'Form';
