import React from 'react';
import { useTodos } from '../Context/TodoContext';
import { QueryFilter } from '../Types/QueryFilter';
import classNames from 'classnames';

export const TodoFooter: React.FC = () => {
  const {
    todoLeft,
    query,
    setQuery,
    isSomeTodosCompleted,
    removeAllCompletedTodos,
  } = useTodos();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todoLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.entries(QueryFilter).map(([key, value]) => {
          return (
            <a
              key={key}
              href={`#/${value}`}
              className={classNames('filter__link', {
                selected: query === value,
              })}
              data-cy={`FilterLink${key}`}
              onClick={() => setQuery(value)}
            >
              {key}
            </a>
          );
        })}
      </nav>

      <button
        disabled={!isSomeTodosCompleted}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => removeAllCompletedTodos()}
      >
        Clear completed
      </button>
    </footer>
  );
};
