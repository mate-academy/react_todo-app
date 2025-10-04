import { FC } from 'react';
import { Filter, Todo } from '../../types/todo';
import classNames from 'classnames';

type Props = {
  activeFilter: Filter;
  handleActiveFilter: (filter: Filter) => void;
  handleClearCompleted: () => void;
  counter: number;
  completedTodos: Todo[];
};

export const Footer: FC<Props> = ({
  counter,
  activeFilter,
  handleActiveFilter = () => {},
  handleClearCompleted = () => {},
  completedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter === 1 ? '1 item left' : `${counter} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: activeFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleActiveFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: activeFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleActiveFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: activeFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleActiveFilter('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => handleClearCompleted()}
        disabled={completedTodos.length < 1}
      >
        Clear completed
      </button>
    </footer>
  );
};
