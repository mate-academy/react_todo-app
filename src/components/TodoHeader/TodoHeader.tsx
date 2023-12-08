import React, { useState, useContext } from 'react';
import { TodosContext } from '../../store/TodosContext';

export const TodoHeader: React.FC = () => {
  const [query, setQuery] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const validQuery = query.trim();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const addTodo = () => {
    const newTodo = {
      id: +new Date(),
      title: query,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validQuery) {
      return;
    }

    addTodo();
    setQuery('');
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
          value={query}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};
