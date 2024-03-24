import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../TodosContext';

enum Selected {
  'all',
  'active',
  'completed',
}

export const Footer: React.FC = () => {
  const {
    todos,
    setTodos,
    setSelectedFilter,
    showFilteredTodos,
    selectedFilter,
  } = useContext(TodosContext);

  const removeCompleted = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  return (
    <>
      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {showFilteredTodos(Selected.active).length} items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({
                  selected: selectedFilter === Selected.all,
                })}
                onClick={() => setSelectedFilter(Selected.all)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({
                  selected: selectedFilter === Selected.active,
                })}
                onClick={() => setSelectedFilter(Selected.active)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({
                  selected: selectedFilter === Selected.completed,
                })}
                onClick={() => {
                  setSelectedFilter(Selected.completed);
                }}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            data-cy="clearCompleted"
            onClick={removeCompleted}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
