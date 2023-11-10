import React, { useState, useContext } from 'react';
import { TodosContext } from './TodosContext';

type TodoAppProps = {
};

const TodoApp: React.FC<TodoAppProps> = () => {
  const [query, setQuery] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (query.trim()) {
      const newTodos
      = [...todos, { id: Date.now(), title: query, completed: false }];

      setTodos(newTodos);
      setQuery('');
    }
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

export default TodoApp;
