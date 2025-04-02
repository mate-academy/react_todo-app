import { forwardRef, useEffect } from 'react';

type Props = {
  query: string;
  onInput: (v: string) => void;
  onAdd: () => void;
  isLoading: boolean;
};

export const Form = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { query, onInput, onAdd, isLoading } = props;

  useEffect(() => {
    if (!isLoading && typeof ref !== 'function') {
      ref?.current?.focus();
    }
  }, [isLoading, ref]);

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
        disabled={isLoading}
      />
    </form>
  );
});

Form.displayName = 'Form';
