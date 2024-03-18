import React, { useContext, useState } from 'react';
import { TodosContext } from '../store/TodosContext';

export const Header = () => {
  const [inputValue, setInputValue] = useState('');

  const { todos, setTodos } = useContext(TodosContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    const newTodos = { id: +Date.now(), title: trimmedValue, completed: false };

    setTodos([...todos, newTodos]);
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
          onChange={e => setInputValue(e.target.value)}
        />
      </form>
    </header>
  );
};
