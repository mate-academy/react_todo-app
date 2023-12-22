import { useState } from 'react';
import { Todo } from '../types';
import { todos } from '../signals/todos-signal';

export const Header = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: +new Date(),
      title: inputValue,
      completed: false,
    };

    todos.value = [
      ...todos.value,
      newTodo,
    ];

    setInputValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onInput={handleInput}
        />
      </form>
    </header>
  );
};
