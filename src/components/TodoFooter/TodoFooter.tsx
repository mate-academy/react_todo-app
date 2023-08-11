import { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../TodosContext';
import { filters } from '../../data';

export const TodoFooter: React.FC = () => {
  const {
    handleClearAllCompleted,
    filterBy,
    setFilterBy,
    isTodosHasCompleted,
    activeTodos,
  } = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {activeTodos.length}
        {' '}
        items left
      </span>

      <ul className="filters" data-cy="todosFilter">
        {filters.map(({ path, filter, value }) => (
          <li>
            <a
              href={path}
              className={cn({
                selected: filterBy === filter,
              })}
              onClick={() => setFilterBy(filter)}
            >
              {value}
            </a>
          </li>
        ))}
      </ul>

      {isTodosHasCompleted
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearAllCompleted}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};
