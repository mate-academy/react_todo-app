import React from 'react';
import PropTypes from 'prop-types';
import { filterTypes } from './const/Filter';

export const Footer = (props) => {
  const {
    count,
    activeFilter,
    onSetFilter,
    onClearCompleted,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${count} items left`}
      </span>

      <ul className="filters">
        {Object.values(filterTypes).map(filter => (
          <li key={filter}>
            <button
              type="button"
              className={activeFilter === filter && 'selected'}
              onClick={() => onSetFilter(filter)}
            >
              {filter}
            </button>
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
  count: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onSetFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};
