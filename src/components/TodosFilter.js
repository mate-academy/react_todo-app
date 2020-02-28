import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const TodosFilter = ({
  todosList,
  initialTodos,
  buttonSelected,
  handleButtonChange,
  handleDeleteAllCompleted,
}) => {
  const buttonClearStyles = cx('clear-completed', {
    disable: !todosList.some(todo => todo.completed),
  });
  const footerStyle = cx('footer', {
    hidden: !initialTodos.length,
  });

  return (
    <footer className={footerStyle}>
      <span className="todo-count">
        {initialTodos.length && initialTodos
          .filter(todo => !todo.completed).length}
        {' items left'}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/all"
            className={buttonSelected === 'all' ? 'selected' : ''}
            onClick={() => handleButtonChange('all')}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={buttonSelected === 'active' ? 'selected' : ''}
            onClick={() => handleButtonChange('active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={buttonSelected === 'completed' ? 'selected' : ''}
            onClick={() => handleButtonChange('completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className={buttonClearStyles}
        onClick={handleDeleteAllCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

TodosFilter.propTypes = {
  handleButtonChange: PropTypes.func.isRequired,
  initialTodos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  todosList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  buttonSelected: PropTypes.string.isRequired,
  handleDeleteAllCompleted: PropTypes.func.isRequired,
};
