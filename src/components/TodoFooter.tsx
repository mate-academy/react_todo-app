import { useTodosContext } from '../context/TodosContext';
import { FilterType, filters } from '../types/Filter';

type TodoFooterProps = {
  filterType: FilterType;
  onFilterChange: (filterType: FilterType) => void;
};

export const TodoFooter: React.FC<TodoFooterProps> = ({
  filterType,
  onFilterChange,
}) => {
  const { activeCount, hasCompletedTodos, handleClearCompleted } =
    useTodosContext();
  const itemsLabel = activeCount === 1 ? 'item' : 'items';

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} {itemsLabel} left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(filter => (
          <a
            key={filter.type}
            href={filter.href}
            className={`filter__link ${
              filterType === filter.type ? 'selected' : ''
            }`}
            data-cy={filter.dataCy}
            onClick={() => onFilterChange(filter.type)}
          >
            {filter.title}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
