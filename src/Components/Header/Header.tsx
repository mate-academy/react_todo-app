import React, { useContext, useState } from 'react';
import { TodoContext } from '../Main/TodosContext';

export const Header: React.FC = () => {
  const [inputTodo, setInputTodo] = useState('');
  const { todo, setTodo } = useContext(TodoContext);

  const handleInputTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: +Date.now(),
      title: inputTodo,
      completed: false,
    };

    if (!inputTodo) {
      return;
    }

    setTodo([...todo, newTodo]);
    setInputTodo('');
  };

  const addTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTodo(event.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleInputTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputTodo}
          onChange={addTodo}
        />
      </form>
    </header>
  );
};
