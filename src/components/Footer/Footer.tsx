import { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};

enum filerType {
  FILTER_TODO_ALL = 'all',
  FILTER_TODO_ACTIVE = 'active',
  FILTER_TODO_COMPLETED = 'completed',
}

function getPrepareTodos(filterField: filerType, todos: Todo[]) {
  const prepearedTodos = [...todos];

  if (filterField) {
    prepearedTodos.filter(todo => {
      switch (filterField) {
        case filerType.FILTER_TODO_ALL:
          return todo;
        case filerType.FILTER_TODO_ACTIVE:
          return todo.completed === true;
        case filerType.FILTER_TODO_COMPLETED:
          return todo.completed !== true;
        default:
          return 0;
      }
    });
  }

  return prepearedTodos;
}

export const Footer: React.FC<Props> = ({ todos }) => {
  const [filterField, setFilterField] = useState(filerType.FILTER_TODO_ALL);

  const visibleTodos = getPrepareTodos(filterField, todos);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterField === filerType.FILTER_TODO_ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterField(filerType.FILTER_TODO_ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterField === filerType.FILTER_TODO_ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterField(filerType.FILTER_TODO_ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterField === filerType.FILTER_TODO_COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterField(filerType.FILTER_TODO_COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
