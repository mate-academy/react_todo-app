import { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';
import { Filters } from '../../types/Filters';

export const Footer = () => {
  const {
    todos,
    setTodos,
    setFilter,
    filter,
  } = useContext(TodosContext);

  const todosLeft = todos.filter((todo) => !todo.completed).length;

  const handleClearCompleted = () => {
    const newTodos = [...todos].filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  return (
    <footer className="footer">
      <span
        className="todo-count"
        data-cy="todosCounter"
      >
        {`${todosLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({
              selected: filter === Filters.ALL,
            })}
            onClick={() => setFilter(Filters.ALL)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({
              selected: filter === Filters.ACTIVE,
            })}
            onClick={() => setFilter(Filters.ACTIVE)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({
              selected: filter === Filters.COMPLETED,
            })}
            onClick={() => setFilter(Filters.COMPLETED)}
          >
            Completed
          </a>
        </li>
      </ul>

      {todosLeft !== todos.length && (
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
