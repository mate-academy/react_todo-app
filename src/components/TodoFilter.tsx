import React, { useContext } from "react";
import cn from "classnames";
import { TodosContext } from "../store";
import { Status } from "../types/Status";

export const TodoFilter: React.FC = () => {
  const { todos, setTodos, filteredTodos, status, setStatus } =
    useContext(TodosContext);
  const itemsLeft = todos.filter((item) => !item.completed).length;
  const filterTodos = (s: Status) => setStatus(s);
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} ${itemsLeft > 1 ? "items" : "item"} left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({ selected: status === Status.All })}
            onClick={() => filterTodos(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: status === Status.Active })}
            onClick={() => filterTodos(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: status === Status.Completed })}
            onClick={() => filterTodos(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {filteredTodos.filter((item) => item.completed).length > 0 && (
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
