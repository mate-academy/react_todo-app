import React, { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';

export const Header: React.FC = () => {
  const { todos, setTodos, setVisibleTodos } = useContext(TodoContext);

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim()) {
      const newTodo = {
        id: +new Date(),
        title: inputValue,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setVisibleTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
