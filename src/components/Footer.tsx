import { useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { TodoContext } from './TodoContext';

type FilterType = 'All' | 'Active' | 'Completed';

export const Footer: React.FC<{
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
}> = ({ filter, setFilter }) => {
  const { todos, clearCompleted } = useContext(TodoContext);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  const filters: FilterType[] = ['All', 'Active', 'Completed'];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map((filterName: FilterType) => (
          <a
            key={filterName}
            href="#/"
            className={classNames('filter__link', {
              selected: filter === filterName,
            })}
            data-cy={`FilterLink${filterName}`}
            onClick={() => setFilter(filterName)}
          >
            {filterName}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
