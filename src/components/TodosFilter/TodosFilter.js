import React from 'react';

const Footer = ({
  listOfTodos,
  activeFilter,
  changeActiveFilter,
  removeCheckedTodos,
}) => {
  const amountOfItems = listOfTodos
    .filter(({ isChecked }) => !isChecked).length;

  return (
    (listOfTodos.length > 0) && (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          {amountOfItems}
          {' '}
          {amountOfItems === 1
            ? 'item left'
            : 'items left'
          }
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={activeFilter === 'all' ? 'selected' : ''}
              onClick={() => changeActiveFilter('all')}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={activeFilter === 'active' ? 'selected' : ''}
              onClick={() => changeActiveFilter('active')}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={activeFilter === 'completed' ? 'selected' : ''}
              onClick={() => changeActiveFilter('completed')}
            >
              Completed
            </a>
          </li>
        </ul>

        {listOfTodos.some(todo => todo.isChecked) && (
          <button
            type="button"
            className="clear-completed"
            onClick={removeCheckedTodos}
            style={{ display: 'block' }}
          >
            Clear completed
          </button>
        )}
      </footer>
    )
  );
};

export default Footer;
