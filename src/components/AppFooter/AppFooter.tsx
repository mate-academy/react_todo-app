import cn from 'classnames';
import { FilterParams } from '../../types/types';
import { useTodoContext } from '../../globalProvider';

const filterOptions = [
  { value: FilterParams.All, label: 'All' },
  { value: FilterParams.Active, label: 'Active' },
  { value: FilterParams.Completed, label: 'Completed' },
];

export const AppFooter = () => {
  const { isCompletedTodos, filter, activeTodos, deleteCompleted, setFilter } =
    useTodoContext();

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOptions.map(option => {
          const { value, label } = option;

          return (
            <a
              key={value}
              href="#/"
              className={cn('filter__link', {
                selected: filter === value,
              })}
              data-cy={`FilterLink${label}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isCompletedTodos}
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
