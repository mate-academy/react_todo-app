import React, { useContext } from 'react';
import { TodoFilter } from './TodoFilter';
import { TodosContext } from './TodosContext';

export const Footer: React.FC = () => {
  const { handleClear, todos } = useContext(TodosContext);
  const notCompletedCount = todos.filter((el) => !el.completed).length;
  const completedCount = todos.filter((el) => el.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedCount}
        ${notCompletedCount === 1 ? 'item' : 'items'} left`}
      </span>
      <TodoFilter />
      {!!completedCount && (
        <button type="button" className="clear-completed" onClick={handleClear}>
          Clear completed
        </button>
      )}
    </footer>
  );
};
