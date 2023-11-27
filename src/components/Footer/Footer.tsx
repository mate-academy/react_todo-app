import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import { Filters } from '../Filters';

export const Footer: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const todosToComplete = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todosToComplete} items left`}
          </span>

          <Filters />

          {hasCompletedTodos && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => dispatch({ type: 'clearCompleted' })}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
