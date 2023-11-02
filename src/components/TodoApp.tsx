import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';

export const TodoApp: React.FC = () => {
  const {
    handleTitleChange,
    newTodo,
    handleOnSubmit,
  } = useContext(TodosContext);

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodo.title}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
