import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TodosContext } from '../../TodosContext';

export const TodosFilter = ({ filterTodos }) => {
  const { todos } = useContext(TodosContext);
  const [active, setActive] = useState('all');

  const showAllTodosHandler = () => {
    filterTodos(todos);
    setActive('all');
  };

  useEffect(() => {
    setActive('all');
  }, [todos]);

  const showActiveTodosHandler = () => {
    const activeTodos = todos.filter(todo => todo.completed === false);

    filterTodos(activeTodos);
    setActive('active');
  };

  const showComplitedTodos = () => {
    const activeTodos = todos.filter(todo => todo.completed === true);

    filterTodos(activeTodos);
    setActive('completed');
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={active === 'all' && 'selected'}
          onClick={showAllTodosHandler}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={active === 'active' && 'selected'}
          onClick={showActiveTodosHandler}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={active === 'completed' && 'selected'}
          onClick={showComplitedTodos}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodosFilter.propTypes = {
  filterTodos: PropTypes.func.isRequired,
};
