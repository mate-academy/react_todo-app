import React, { useContext } from 'react';

import { TodosContext } from '../TodosContext';

export const AddTodo: React.FC = () => {
  const { title, handleTitleChange, handleEnter } = useContext(TodosContext);

  return (
    <form>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={handleEnter}
        value={title}
        onChange={handleTitleChange}
      />
    </form>
  );
};
