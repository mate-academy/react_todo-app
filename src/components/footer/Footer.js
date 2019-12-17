import React from 'react';
import ItemsLeft from './ItemsLeft';

// eslint-disable-next-line react/prop-types
const Footer = ({ todos,
// eslint-disable-next-line react/prop-types
  itemsMany,
  // eslint-disable-next-line react/prop-types
  activeLink,
  // eslint-disable-next-line react/prop-types
  filterTodosAll,
  // eslint-disable-next-line react/prop-types
  filterTodosActive,
  // eslint-disable-next-line react/prop-types
  filterTodosCompleted,
  // eslint-disable-next-line react/prop-types
  clearCompleted }) => (
// eslint-disable-next-line
  <footer className="footer" styFormInputle={{ display: 'block' }}>
    <span className="todo-count">
      <ItemsLeft
        todos={todos}
        itemsMany={itemsMany}
      />
    </span>

    <ul className="filters">
      <li>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className={activeLink === 'all'
            ? 'selected'
            : ''}
          onClick={() => filterTodosAll()}
        >
            All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={activeLink === 'active'
            ? 'selected'
            : ''}
          onClick={() => filterTodosActive()}
        >
            Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={activeLink === 'completed'
            ? 'selected'
            : ''}
          onClick={() => filterTodosCompleted()}
        >
            Completed
        </a>
      </li>
    </ul>

    <button
      value="hello"
      type="button"
      className="clear-completed"
      style={{ display: 'block' }}
      onClick={() => clearCompleted()}
    >
      {todos.some(todo => todo.status)
        && 'Clear completed'}
    </button>
  </footer>
);

export default Footer;
