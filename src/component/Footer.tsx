import React, { useContext } from 'react';
import cn from 'classnames';
import { TodoMethod, TodosContext } from './TodosContext';
import { SortType } from './types/types';

export const Footer: React.FC = () => {
  const methods = useContext(TodoMethod);
  const { todos, sorted, setSorted } = useContext(TodosContext);

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: SortType.All === sorted,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSorted(SortType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: SortType.Active === sorted,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSorted(SortType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: SortType.Completed === sorted,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSorted(SortType.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={methods.clearCompleted}
        disabled={activeTodos.length === todos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
