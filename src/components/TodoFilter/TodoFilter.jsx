import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const active = 'active';
const completed = 'completed';
const all = 'all';

export const TodoFilter = ({
  todos,
  filterTodos,
  clearCompletedTodos,
}) => {
  const [isSelected, setIsSelected] = useState('all');

  const handleFilter = useCallback(
    (type) => {
      filterTodos(type);
      setIsSelected(type);
    }, [filterTodos],
  );

  return (
    <footer className="footer">
      <span className="todo-count">
        {todos.filter(todo => (
          !todo.completed)).length > 0
          ? `${todos.filter(todo => (!todo.completed)).length} not completed`
          : `all done`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: isSelected === all,
            })}
            onClick={() => handleFilter(all)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: isSelected === active,
            })}
            onClick={() => handleFilter(active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: isSelected === completed,
            })}
            onClick={() => handleFilter(completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {todos.some(todo => todo.completed) && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
      )}
    </footer>
  );
};

TodoFilter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
    }),
  ),
  clearCompletedTodos: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
};

TodoFilter.defaultProps = {
  todos: [],
};
