import React, { useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const Header = () => {
  const [input, setInput] = useState('');
  const { addItem } = React.useContext(TodosContext);

  const handleSubmit = () => {
    addItem(input);
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
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </header>
  );
};
