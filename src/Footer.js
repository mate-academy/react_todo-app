import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Footer = ({
  todos,
  clearCompletedHandler,
  filterHandler,
  filters,
  activeFilterIndex,
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
      {filters.map((filter, i) => (
        <li key={filter}>
          <a
            href={`#/${filter}`}
            onClick={() => filterHandler(filter, i)}
            className={cn(
              { selected: i === activeFilterIndex }
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
  filterHandler: PropTypes.func.isRequired,
  todos: PropTypes
    .arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })).isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeFilterIndex: PropTypes.number.isRequired,
};
export default Footer;
