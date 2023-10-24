import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext, EStatus, filterTodos } from '../TodosContext';

export const TodosFooter = () => {
  const { todos } = useContext(TodosContext);
  const { setFilterType, filterType, setTodos } = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({ selected: filterType === 'all' })}
            onClick={() => setFilterType(EStatus.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: filterType === 'active' })}
            onClick={() => setFilterType(EStatus.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: filterType === 'completed' })}
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
          && 'Clear completed'}
      </button>
    </footer>
  );
};
