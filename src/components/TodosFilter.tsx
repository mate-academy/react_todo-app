import classNames from 'classnames';
import React from 'react';
import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

interface Props {
  filter: FilterType;
  setFilter: (newFilter: FilterType) => void;
  onRemoveCompleted: () => void;
  todos: Todo[];
}

export const TodosFilter: React.FC<Props> = React.memo(({
  filter,
  setFilter,
  onRemoveCompleted,
  todos,
}) => {
  const hasCompletedTodos = todos.filter(todo => todo.completed).length > 0;
  const itemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filter === FilterType.All,
            })}
            onClick={() => setFilter(FilterType.All)}
          >
            All

          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filter === FilterType.Active,
            })}
            onClick={() => setFilter(FilterType.Active)}
          >
            Active

          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filter === FilterType.Completed,
            })}
            onClick={() => setFilter(FilterType.Completed)}
          >
            Completed

          </a>
        </li>
      </ul>

      {hasCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => onRemoveCompleted()}
        >
          Clear completed
        </button>
      ) }
    </footer>
  );
});
