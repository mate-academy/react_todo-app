import React, { useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { TodosContext } from '../../utils/TodosContext';
import { getNotCompleted } from '../../utils/helpers';
import { FILTERS, ClearCompleted } from '../../utils/constants';
import { deleteAllTodos } from '../../utils/api';

export const TodosFilter = React.memo(() => {
  const { todos, setTodos } = useContext(TodosContext);

  const leftTodos = useMemo(() => getNotCompleted(todos), [todos]);
  const clearCompleted = () => {
    const notCompletedTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    setTodos(notCompletedTodos);
    deleteAllTodos(completedTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${leftTodos} items left`}
      </span>

      <ul className="filters">
        <li>
          <NavLink
            activeClassName="selected"
            to="/active"
          >
            {FILTERS.active}
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="selected"
            to="/completed"
          >
            {FILTERS.completed}
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="selected"
            to="/"
            exact
          >
            {FILTERS.all}
          </NavLink>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        {ClearCompleted}
      </button>
    </footer>
  );
});
