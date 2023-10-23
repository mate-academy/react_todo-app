import { useContext } from 'react';
import { TodosContext, EStatus, filterTodos } from '../TodosContext';

export const TodosFooter = () => {
  const { todos } = useContext(TodosContext);
  const { setFilterType, filterType, setTodos } = useContext(TodosContext);

  if (todos.length > 0) {
    return (
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${todos.filter(todo => !todo.completed).length} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={filterType === 'all' ? 'selected' : ''}
              onClick={() => setFilterType(EStatus.All)}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={filterType === 'active' ? 'selected' : ''}
              onClick={() => setFilterType(EStatus.Active)}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={filterType === 'completed' ? 'selected' : ''}
              onClick={() => setFilterType(EStatus.Completed)}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={() => setTodos(todos.filter(todo => !todo.completed))}
        >
          {filterTodos(todos, EStatus.Completed).length > 0
            ? 'Clear completed' : null}
        </button>
      </footer>
    );
  }

  return null;
};
