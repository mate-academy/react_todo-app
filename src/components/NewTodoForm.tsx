import { FormEventHandler, useRef } from 'react';
import { NewTodoInput } from './styled-components';
import { useTodos } from '../contexts/TodosContext';

export const NewTodoForm = () => {
  const { handleAddTodo } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = (e): void => {
    e.preventDefault();

    if (!inputRef.current) {
      return;
    }

    const { value } = inputRef.current;
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    handleAddTodo(trimmedValue);
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <NewTodoInput
        type="text"
        data-cy="createTodo"
        placeholder="What needs to be done?"
        ref={inputRef}
      />
    </form>
  );
};
