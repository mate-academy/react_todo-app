import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Footer = ({
  todos,
  clearCompletedHandler,
  setCurrentFilter,
  currentFilter,
  filterTypes,
}) => (
  <footer className={cn(
    'footer',
    { hidden: todos.length === 0 }
  )}
  >
    {
      (todos.filter(todo => !todo.completed).length === 1)
        ? (
          <span className="todo-count">
            {`${todos.filter(todo => !todo.completed).length} item left`}
          </span>
        )
        : (
          <span className="todo-count">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>
        )
    }

    <ul className="filters">
      {Object.values(filterTypes).map(filter => (
        <li key={filter}>
          <a
            href={`#/${filter}`}
            onClick={() => setCurrentFilter(filter)}
            className={cn(
              { selected: currentFilter === filterTypes[filter] }
            )}
          >
            {filter}
          </a>
        </li>
      ))}
    </ul>

    <button
      type="button"
      className={cn(
        'clear-completed',
        { hidden: todos.filter(todo => todo.completed).length === 0 }
      )}
      onClick={clearCompletedHandler}
    >
    clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  clearCompletedHandler: PropTypes.func.isRequired,
  setCurrentFilter: PropTypes.func.isRequired,
  todos: PropTypes
    .arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })).isRequired,
  currentFilter: PropTypes.string.isRequired,
  filterTypes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default Footer;
