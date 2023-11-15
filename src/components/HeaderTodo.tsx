import React, { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';

type Props = {};

const HeaderTodo: React.FC<Props> = () => {
  const { addTodo } = useContext(TodosContext);
  const [query, setQuery] = useState('');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    addTodo(query);

    setQuery('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};

export default HeaderTodo;
