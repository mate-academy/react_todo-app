import cn from 'classnames';
import { useState } from 'react';
import { useTodo } from '../../providers/TodosContext';
import { Status } from '../../utils/status';

export const TodosFilter = () => {
  const {
    setFilter,
    todos,
    filteredTodos,
    deleteCompetedTodos,
  } = useTodo();
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
            className={cn({ selected: selectFilter === Status.All })}
            onClick={() => handleFilter(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: selectFilter === Status.Active })}
            onClick={() => handleFilter(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: selectFilter === Status.Completed })}
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
