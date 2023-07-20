import React from 'react';

import { Todo } from '../../types/Todo';
import { TodosFilter } from '../TodosFilter/TodosFilter';

type Props = {
  uncompletedTodo: Todo[];
  completedTodo: Todo[];
  handleClearAllCompletedTodos: () => void;
};

export const Footer: React.FC<Props> = ({
  uncompletedTodo,
  completedTodo,
  handleClearAllCompletedTodos,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodo.length} items left`}
      </span>

      <TodosFilter />

      {completedTodo.length > 0 && (
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
