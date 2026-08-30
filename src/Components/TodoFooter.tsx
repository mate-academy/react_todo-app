import { useMemo } from "react";
import { useTodoContext } from "./TodoContext";
import { FilterStatus } from "../Types/types";


export const TodoFooter: React.FC  = () => {
  const { todos, filterStatus, setFilterStatus, clearCompleted } = useTodoContext();

  const activetodos = useMemo(() => todos.filter(todo => !todo.completed).length,
[todos],
);

  const hasCompleted = todos.some(todo => todo.completed);

  return (

<footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {activetodos} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            {Object.values(FilterStatus).map(status => (
          <a
            key={status}
            href={`#/${status === 'all' ? '' : status}`}
            className={`filter__link ${filterStatus === status ? 'selected' : ''}`}
            data-cy={`FilterLink${status.charAt(0).toUpperCase() + status.slice(1)}`}
            onClick={() => {
              setFilterStatus(status);
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </a>
        ))}
          </nav>

          {/* this button should be disabled if there are no completed todos */}

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={clearCompleted}
                disabled={!hasCompleted}
              >
                Clear completed
              </button>


        </footer>
  )
}
