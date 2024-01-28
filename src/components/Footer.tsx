import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext.tsx/TodosContext';
import { TodosFilter } from './TodosFilter';

export const Footer: React.FC = () => {
  const {
    todos,
    deleteCompletedTodos,
  } = useContext(TodosContext);

  const unCompletedTodos = todos.filter(todo => todo.completed === false);

  const completedTodos = todos.filter(todo => todo.completed === true);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${unCompletedTodos.length} items left`}
      </span>

      <TodosFilter />

      {completedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => deleteCompletedTodos()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
