import React, { useContext } from 'react';
import { Context } from '../../context';

function Footer() {
  const { clearCompleted, todos, choseAction } = useContext(Context);

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todos.filter(item => !item.isDone).length} items left`}
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={() => choseAction('all')}
          >
            All
          </a>
        </li>
        <li>
          <a href="#/active" onClick={() => choseAction('active')}>Active</a>
        </li>
        <li>
          <a
            href="#/completed"
            onClick={() => choseAction('completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
