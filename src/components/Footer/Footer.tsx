import React from 'react';

import { TodosFilter } from '../TodosFilter/TodosFilter';

type Props = {
  uncompletedTodosLength: number;
  completedTodosLength: number;
  handleClearAllCompletedTodos: () => void;
};

export const Footer: React.FC<Props> = ({
  uncompletedTodosLength,
  completedTodosLength,
  handleClearAllCompletedTodos,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodosLength} items left`}
      </span>

      <TodosFilter />

      {completedTodosLength > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearAllCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
