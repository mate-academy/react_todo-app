import cx from 'classnames';
import React from 'react';
import { TodosFilterProps } from '../PropTypes/PropTypes';

const TodosFilter = ({
  onButtonAllChange, onButtonCompletedChange, onButtonActiveChange,
  todosList, originalTodos, buttonSelected, handleDeleteAllCompleted,
}) => {
  const buttonClearStyles = cx('clear-completed', {
    disable: !todosList.some(todo => todo.completed),
  });
  const footerStyles = cx('footer', {
    hidden: !originalTodos.length,
  });

  return (
    <footer className={footerStyles}>
      <span className="todo-count">
        {originalTodos.length && originalTodos
          .filter(todo => !todo.completed).length }
        {' items left'}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={buttonSelected === 'all' && 'selected'}
            onClick={onButtonAllChange}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={onButtonActiveChange}
            className={buttonSelected === 'active' && 'selected'}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={onButtonCompletedChange}
            className={buttonSelected === 'completed' && 'selected'}
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

TodosFilter.propTypes = TodosFilterProps;

export default TodosFilter;
