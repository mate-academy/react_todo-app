import React from 'react';
import classnames from 'classnames';
import { TodoStatus } from '../types/TodoStatus';
import { SearchLink } from './SearchLink';

interface Props {
  status: string
  itemsLeft: number
  itemsCompleted: number
  clearCompletedTodos: () => void
}

export const TodoFilter: React.FC<Props> = ({
  status,
  itemsLeft,
  itemsCompleted,
  clearCompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {status === TodoStatus.Completed
          ? (`${itemsCompleted} items completed`)
          : (`${itemsLeft} items left`)}
      </span>

      <nav className="filter">
        <SearchLink
          params={{ status: null }}
          className={
            classnames(
              'filter__link',
              { selected: !status },
            )
          }
        >
          All
        </SearchLink>

        <SearchLink
          params={{ status: TodoStatus.Active }}
          className={
            classnames(
              'filter__link',
              { selected: status === TodoStatus.Active },
            )
          }
        >
          Active
        </SearchLink>

        <SearchLink
          params={{ status: TodoStatus.Completed }}
          className={
            classnames(
              'filter__link',
              { selected: status === TodoStatus.Completed },
            )
          }
        >
          Completed
        </SearchLink>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{ visibility: itemsCompleted ? 'visible' : 'hidden' }}
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
