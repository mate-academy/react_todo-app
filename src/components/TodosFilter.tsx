import { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../store/TodosContext';
import { FilterBy } from '../types/FilterBy';

export const TodosFilter = () => {
  const {
    filterValue,
    setFilterValue,
    todos,
    setTodos,
  } = useContext(TodosContext);

  const activeTodos = todos.filter(({ completed }) => !completed);
  const complitedTodosCount = todos.length - activeTodos.length;

  const handleFilterChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const value = event.currentTarget.innerText as FilterBy;

    setFilterValue(value);
  };

  const handleClearCompleted = () => setTodos(activeTodos);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <ul className="filters">
        {Object.values(FilterBy).map(filter => (
          <li key={filter}>
            <a
              href={`#/${filter !== FilterBy.ALL ? filter : ''}`}
              className={classNames({
                selected: filterValue === filter,
              })}
              onClick={(event) => handleFilterChange(event)}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>
      {complitedTodosCount > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
