import React from 'react';
import PropTypes from 'prop-types';

import TodosFilter from './TodosFilter';

const Footer = ({
  todos,
  selectedFilter,
  handleFilter,
  handleRemoveCompleted,
}) => {
  const activeTodos = todos.filter(todo => (!todo.completed)).length;
  const completedTodos = todos.filter(todo => (todo.completed)).length;

  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      <TodosFilter
        selectedFilter={selectedFilter}
        handleFilter={handleFilter}
      />

      {completedTodos > 0
        ? (
          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={handleRemoveCompleted}
          >
            Clear completed
          </button>
        ) : (
          <></>
        )
      }
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleRemoveCompleted: PropTypes.func.isRequired,
};

export default Footer;
