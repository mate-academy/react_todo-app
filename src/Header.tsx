import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';

export const Header: React.FC = () => {
  const { newTodo, handleInputChange, handleKeyDown }
  = useContext(TodosContext);

  return (
    <header className="header">
      <h1>todos</h1>
      <form>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
