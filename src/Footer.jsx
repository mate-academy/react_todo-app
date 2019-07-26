import React from 'react';
import PropTypes from 'prop-types';

const Footer = (
  {
    handleFilterByField,
    destroyAllCompletedTodos,
    filteredTodos,
  }
) => {
  const unfinishedTodos = filteredTodos
    .filter(todo => !todo.completed);

  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        {unfinishedTodos.length < 2
          ? `${unfinishedTodos.length} Item left`
          : `${unfinishedTodos.length} Items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={handleFilterByField === 'All' && 'selected'}
            onClick={() => handleFilterByField('All')}
          >
All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={handleFilterByField === 'Active' && 'selected'}
            onClick={() => handleFilterByField('Active')}
          >
Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={handleFilterByField === 'Completed' && 'selected'}
            onClick={() => handleFilterByField('Completed')}
          >
Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={destroyAllCompletedTodos}
      >
        {' '}
Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  filteredTodos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  destroyAllCompletedTodos: PropTypes.func.isRequired,
  handleFilterByField: PropTypes.func.isRequired,
};

export default Footer;
