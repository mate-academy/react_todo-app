/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { ALL, FILTER_LINKS } from '../../constants';

export const FilterTodos = ({ todos, setTodos }) => {
  const activeTodos = useMemo(() => (
    todos.filter(todo => !todo.completed).length), [todos]);
  const location = useLocation();
  const { pathname } = location;

  const deleteCompletedTodos = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <>
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      <ul className="filters">
        {FILTER_LINKS.map(link => (
          <li key={link} className="firstLetter">
            <Link
              to={link === ALL ? '/' : `/${link}`}
              className={link === ALL && pathname === '/'
                ? 'selected'
                : pathname === `/${link}`
                  ? 'selected'
                  : null}
            >
              <span className="firstLetter">{link}</span>
            </Link>
          </li>
        ))}

      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={() => deleteCompletedTodos()}
      >
        Clear completed
      </button>
    </>
  );
};

FilterTodos.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
  setTodos: PropTypes.func.isRequired,
};

FilterTodos.defaultProps = {
  todos: [],
};
