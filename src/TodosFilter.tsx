import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { TodosContext } from './TodosContext';
import { FilterType } from './types/Filter';

type Props = {
  filter: FilterType,
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>
};

export const TodosFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const countActive = useMemo(
    () => todos.filter(todo => todo.completed === false).length,
    todos,
  );
  const countCompleted = useMemo(
    () => todos.filter(todo => todo.completed === true).length,
    todos,
  );
  const handleClear = () => {
    setTodos(oldTodos => (
      oldTodos.filter(oldTodo => oldTodo.completed === false)));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countActive} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filter === FilterType.All,
            })}
            onClick={() => setFilter(FilterType.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: filter === FilterType.Active,
            })}
            onClick={() => setFilter(FilterType.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: filter === FilterType.Completed,
            })}
            onClick={() => setFilter(FilterType.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {(countCompleted > 0) && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClear}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
