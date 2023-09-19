import { useContext } from 'react';
import classnames from 'classnames';

import { TodoContext } from '../../context/TodoContext';
import { FilterContext } from '../../context/FilterContext';
import { Status } from '../../interface/Status';

export const TodoFooter = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { selectedFilter, setSelectedFilter } = useContext(FilterContext);

  const clearCompleted = () => {
    const activeTodos = todos.filter(({ completed }) => !completed);

    setTodos(activeTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(({ completed }) => !completed).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classnames(
              {
                selected: selectedFilter === Status.All,
              },
            )}
            onClick={() => setSelectedFilter(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classnames(
              {
                selected: selectedFilter === Status.Active,
              },
            )}
            onClick={() => setSelectedFilter(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classnames(
              {
                selected: selectedFilter === Status.Completed,
              },
            )}
            onClick={() => setSelectedFilter(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {!!todos.filter(({ completed }) => completed).length && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
