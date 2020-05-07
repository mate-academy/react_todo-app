import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Filters from './Filters';

const Footer = ({
  todos,
  isCompletedPresent,
  handleClearCompleted,
  handleTypeOfFilter,
  typeOfFilter,
}) => (
  <footer className={
    cn(
      'footer',
      { hidden: todos.length === 0 },
    )
  }
  >
    <span className="todo-count">
      {todos.filter(todo => !todo.completed).length}
      {' '}
      items left
    </span>

    <Filters
      handleTypeOfFilter={handleTypeOfFilter}
      typeOfFilter={typeOfFilter}
    />

    <button
      type="button"
      className={cn('clear-completed', {
        hidden: !isCompletedPresent,
      })}
      onClick={handleClearCompleted}
    >
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCompletedPresent: PropTypes.bool.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  handleTypeOfFilter: PropTypes.func.isRequired,
  typeOfFilter: PropTypes.string.isRequired,
};

export default Footer;
