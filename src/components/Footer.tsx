import React, { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodosContext';

export const Footer: React.FC = () => {
  const {
    activeTodos,
    handleClearCompleted,
    completedTodos,
    setFilterBy,
    filterBy,
  } = useContext(TodosContext);

  if (activeTodos.length === 0 && completedTodos.length === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {(activeTodos.length > 1 || activeTodos.length === 0) && `${activeTodos.length} items left`}
        {activeTodos.length === 1 && `${activeTodos.length} item left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            onClick={() => {
              setFilterBy('all');
            }}
            className={cn({ selected: filterBy === 'all' })}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={() => {
              setFilterBy('active');
            }}
            className={cn({ selected: filterBy === 'active' })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={() => setFilterBy('completed')}
            className={cn({ selected: filterBy === 'completed' })}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedTodos.length !== 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
