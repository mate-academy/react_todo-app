import { useContext } from 'react';
import cn from 'classnames';
import { FilterOptions } from '../../types/FilterOptions';
import { TodosContext } from '../../contexts/TodosProvider';
import { TodoAction } from '../../types/TodoAction';

export const TodosFilter = () => {
  const { todos, filterOptions, dispatch } = useContext(TodosContext);

  const completedTodosCount
    = todos.filter(({ completed }) => !completed).length;

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${completedTodosCount} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            onClick={() => dispatch({
              action: FilterOptions.All,
            })}
            href="#/"
            className={cn({
              selected: filterOptions === FilterOptions.All,
            })}
          >
            All
          </a>
        </li>

        <li>
          <a
            onClick={() => dispatch({
              action: FilterOptions.Active,
            })}
            href="#/active"
            className={cn({
              selected: filterOptions === FilterOptions.Active,
            })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            onClick={() => dispatch({
              action: FilterOptions.Completed,
            })}
            href="#/completed"
            className={cn({
              selected: filterOptions === FilterOptions.Completed,
            })}
          >
            Completed
          </a>
        </li>
      </ul>

      {todos.some(({ completed }) => completed)
        && (
          <button
            onClick={() => dispatch({ action: TodoAction.ClearCompleted })}
            type="button"
            className="clear-completed"
          >
            Clear completed
          </button>
        )}

    </footer>
  );
};
