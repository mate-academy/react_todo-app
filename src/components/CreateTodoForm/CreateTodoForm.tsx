import { useEffect, useRef } from 'react';
import { useCreateTodoForm } from './useCreateTodoForm';

export const CreateTodoForm: React.FC = () => {
  const { inputValue, onChange, onSubmit } = useCreateTodoForm();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={onChange}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
