import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  const { allTodos, filter, setFilter, clearCompletedTodos } = props;
  const filterNames = ['all', 'active', 'completed'];

  return (
    <footer className="footer">
      <span className="todo-count">
        {allTodos.filter(todo => !todo.completed)
          .length}
        {' '}
        items left
      </span>

      <ul className="filters">
        {filterNames.map(filterName => (
          <li>
            <a
              href={`#/${filterName}`}
              onClick={() => setFilter(filterName)}
              className={filter === filterName ? 'selected' : ''}
            >
              {filterName
                .split('')
                .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
                .join('')}
            </a>
          </li>
        ))}
      </ul>

      {allTodos.some(todo => todo.completed) && (
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

Footer.propTypes = {
  allTodos: PropTypes.oneOfType([PropTypes.object]).isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCompletedTodos: PropTypes.func.isRequired,
};

export default Footer;
