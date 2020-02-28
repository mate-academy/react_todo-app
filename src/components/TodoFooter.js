import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { filterTypes } from './Filter';

export const Footer = (props) => {
  const {
    todos,
    activeFilter,
    onSetFilter,
    onClearCompleted,
  } = props;

  const quantity = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${quantity} items left`}
      </span>

      <ul className="filters">
        {Object.values(filterTypes).map(filter => (
          <li key={filter}>
            <a
              href={`#/${filter}`}
              className={cn(activeFilter === filter && 'selected')}
              onClick={() => onSetFilter(filter)}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeFilter: PropTypes.string.isRequired,
  onSetFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};
