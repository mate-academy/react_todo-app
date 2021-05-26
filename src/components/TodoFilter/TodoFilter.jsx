import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TodosContext } from '../../TodosContext';

export const TodoFilter = ({ filterTodos }) => {
  const { todos } = useContext(TodosContext);

  return (
    <>
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            onClick={() => filterTodos('all')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={() => filterTodos('active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={() => filterTodos('completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </>
  );
};

TodoFilter.TodoItem.propTypes = {
  filterTodos: PropTypes.func.isRequired,
};
