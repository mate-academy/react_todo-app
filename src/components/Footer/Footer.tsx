import React, { useContext } from 'react';

import { StateContext } from '../TodosContext';

export const Footer: React.FC = () => {
  const todos = useContext(StateContext);

  const notCompletedLength = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedLength} items left`}
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">All</a>
        </li>

        <li>
          <a href="#/active">Active</a>
        </li>

        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
