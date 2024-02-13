import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../contexts/TodoContext';
import { TodoFilters } from './TodoFilters';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed);

  const handleRemoveTodos = () => {
    dispatch({
      type: 'removeCompletedTodo',
    });
  };

  return (
    <footer className="footer">
      {activeTodos === 1 ? (
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos} items left`}
        </span>
      ) : (
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos} items left`}
        </span>
      )}

      <TodoFilters />

      {completedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleRemoveTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
