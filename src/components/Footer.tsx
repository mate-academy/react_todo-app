import React, { useContext } from 'react';

import { TodosContext } from '../store/TodosContextProvider';
import { TodosFilter } from './TodosFilter';
import { Status } from '../types/Status';

interface Props {
  handleFilteredTodos: (newStatus: Status) => void;
  handleClearCompleted: () => void;
}

export const Footer: React.FC<Props> = React.memo(({
  handleFilteredTodos,
  handleClearCompleted,
}) => {
  const todos = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <TodosFilter handleFilteredTodos={handleFilteredTodos} />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
