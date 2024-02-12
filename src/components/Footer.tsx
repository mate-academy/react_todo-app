import React, { useContext } from 'react';
import { TodoFilter } from './TodoFilter';
import { dispatchContext, stateContext } from '../manage/TodoContext';

export const Footer: React.FC = () => {
  const { todos } = useContext(stateContext);
  const dispatch = useContext(dispatchContext);

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.some((todo) => todo.completed);

  const handleRemoveCompl = () => {
    dispatch({
      type: 'removeComplTodos',
    });
  };

  return (
    <footer className="footer">
      {activeTodos.length === 1 ? (
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos.length} item left`}
        </span>
      ) : (
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos.length} items left`}
        </span>
      )}

      <TodoFilter />

      {completedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleRemoveCompl}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
