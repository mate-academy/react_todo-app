import { useContext, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { TodosContext } from '../TodosContext';

export const NewTodo: React.FC = () => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error('TodosContext is not available');
  }

  const { addTodo, inputRef } = todosContext;
  const [inputValue, setInputValue] = useState('');

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const formHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = inputValue.trim();

    if (normalizedTitle === '') {
      inputRef.current?.focus();

      return;
    }

    addTodo(normalizedTitle);
    setInputValue('');
  };

  return (
    <form onSubmit={formHandler}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={inputHandler}
        autoFocus
      />
    </form>
  );
};
