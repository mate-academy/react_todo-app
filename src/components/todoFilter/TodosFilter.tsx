import cn from 'classnames';
import { useContext, useState } from 'react';
import { TodosContext } from '../../providers/TodosContext';
import { Status } from '../../utils/status';

export const TodosFilter = () => {
  const {
    setFilter,
    todos,
    filteredTodos,
    deleteCompetedTodos,
  } = useContext(TodosContext);
  const [selectFilter, setSelectFilter] = useState(Status.All);
  const countActiveTodos = filteredTodos.filter(todo => !todo.completed).length;
  const countCompletedTodos = filteredTodos.length - countActiveTodos;

  const handleFilter = (filter: Status) => {
    setSelectFilter(filter);
    setFilter(filter);
  };

  return todos.length > 0 ? (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countActiveTodos}
        item${countActiveTodos !== 1 ? 's' : ''} left`}
      </span>
      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={cn(selectFilter === Status.All ? 'selected' : '')}
            onClick={() => handleFilter(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn(selectFilter === Status.Active ? 'selected' : '')}
            onClick={() => handleFilter(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn(selectFilter === Status.Completed ? 'selected' : '')}
            onClick={() => handleFilter(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>
      {countCompletedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteCompetedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  ) : null;
};
