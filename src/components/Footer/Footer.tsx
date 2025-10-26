import { useContext } from 'react';
import { StateContext } from '../Store';
import { Filters } from '../../types/Filters';
import cn from 'classnames';

type Props = {
  current: Filters;
  onFilterChange: (currentFilter: Filters) => void;
  onClearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  current,
  onFilterChange,
  onClearCompleted,
}) => {
  const { todos } = useContext(StateContext);

  const completedTodos = todos.filter(todo => todo.completed === true);
  const activeTodos = todos.filter(todo => todo.completed === false);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: current === Filters.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange(Filters.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: current === Filters.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange(Filters.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: current === Filters.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange(Filters.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
