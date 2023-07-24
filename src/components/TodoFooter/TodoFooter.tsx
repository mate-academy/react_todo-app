import { useContext } from 'react';
import cn from 'classnames';
import { Filter } from '../../services/enums';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../services/types';

function countActiveTodos(todos: Todo[]): number {
  return todos.filter(todo => {
    return !todo.completed;
  }).length;
}

export const TodoFooter: React.FC = () => {
  const {
    todos,
    handleClearAllCompleted,
    filterBy,
    setFilterBy,
    isTodosHasCompleted,
  } = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countActiveTodos(todos)} `}
        items left
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={cn({
              selected: filterBy === Filter.ALL,
            })}
            onClick={() => setFilterBy(Filter.ALL)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({
              selected: filterBy === Filter.ACTIVE,
            })}
            onClick={() => setFilterBy(Filter.ACTIVE)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({
              selected: filterBy === Filter.COMPLETED,
            })}
            onClick={() => setFilterBy(Filter.COMPLETED)}
          >
            Completed
          </a>
        </li>
      </ul>

      {isTodosHasCompleted()
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
