import { useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  todos: Todo[];
  onFilterTodos: (filter: Filter) => void;
  onClearCompleted: (type: string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  onFilterTodos,
  onClearCompleted,
}) => {
  const itemLeft = todos.filter(t => !t.completed);
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.All);

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {itemLeft.length} item{itemLeft.length > 1 && 's'} left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              ['selected']: activeFilter === 'filterAll',
            })}
            data-cy="FilterLinkAll"
            onClick={() => {
              setActiveFilter(Filter.All);
              onFilterTodos(Filter.All);
            }}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              ['selected']: activeFilter === 'filterActive',
            })}
            data-cy="FilterLinkActive"
            onClick={() => {
              setActiveFilter(Filter.Active);
              onFilterTodos(Filter.Active);
            }}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              ['selected']: activeFilter === 'filterCompleted',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => {
              setActiveFilter(Filter.Completed);
              onFilterTodos(Filter.Completed);
            }}
          >
            Completed
          </a>
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() => {
            onClearCompleted('clearAll');
          }}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
