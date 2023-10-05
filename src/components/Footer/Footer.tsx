import React, { useContext } from 'react';

import './Footer.scss';
import { DispatchContext, StateContext } from '../TodosContext';
import { TodosFilter } from '../TodosFilter';

export const Footer: React.FC = () => {
  const todos = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const notCompletedLength = notCompletedTodos.length;
  const completedLength = todos.length - notCompletedLength;

  const handleClearClick = () => {
    dispatch({
      type: 'clearAllCompleted',
      payload: notCompletedTodos,
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedLength} items left`}
      </span>

      <TodosFilter />

      {!!completedLength && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
