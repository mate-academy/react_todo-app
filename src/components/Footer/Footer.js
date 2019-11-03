import React from 'react';
import cx from 'classnames';

const Footer = ({
  handleButtonChange,
  todosList,
  originalTodos,
  buttonSelected,
  handleDeleteAllCompleted,
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
            className={buttonSelected === 'all' ? 'selected' : ''}
            onClick={() => handleButtonChange('all')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={() => handleButtonChange('active')}
            className={buttonSelected === 'active' ? 'selected' : ''}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={() => handleButtonChange('completed')}
            className={buttonSelected === 'completed' ? 'selected' : ''}
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

export default Footer;
