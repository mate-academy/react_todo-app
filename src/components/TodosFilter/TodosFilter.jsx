import React, { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../TodoContext';

const TodosFilter = ({ setFilterStatus, clearCompleted, filterStatus }) => {
  const [leftItem, setLeftItem] = useState([]);
  const { todos } = useContext(TodoContext);

  const toggleClass = status => ((filterStatus === status) ? 'selected' : '');

  useEffect(() => {
    setLeftItem(todos.filter(todo => !todo.complete));
  }, [todos]);

  return (
    <>
      {(leftItem.length > 0)
        && (
        <span className="todo-count">
          {leftItem.length}
          {' '}
          items left
        </span>
        )
      }

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={toggleClass('all')}
            onClick={() => setFilterStatus('all')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={toggleClass('active')}
            onClick={() => setFilterStatus('active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={toggleClass('completed')}
            onClick={() => setFilterStatus('completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      {(leftItem.length !== todos.length) && (
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
      )}
    </>
  );
};

export default TodosFilter;
