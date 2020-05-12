import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Footer = ({
  todos,
  chooseTypeTodos,
  deleteCompletedTodos,
  selectedTodos,
}) => {
  const isVisibleFooter = Boolean(todos.length);
  const isVisibleButton = Boolean(todos.filter(todo => todo.completed).length);
  const todosFilters = ['all', 'active', 'completed'];

  return (
    <footer className={classNames('footer', { covert: !isVisibleFooter })}>
      <span className="todo-count">
        {todos
          .filter(todo => !todo.completed)
          .length
        }
        {' '}
        items left
      </span>

      <ul className="filters">
        {todosFilters.map(filter => (
          <li key={filter}>
            <a
              href={`#/${filter}`}
              title={filter}
              className={classNames({ selected: filter === selectedTodos })}
              onClick={chooseTypeTodos}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={deleteCompletedTodos}
        hidden={!isVisibleButton}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  chooseTypeTodos: PropTypes.func.isRequired,
  deleteCompletedTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf.isRequired,
  selectedTodos: PropTypes.string.isRequired,
};

export default Footer;
