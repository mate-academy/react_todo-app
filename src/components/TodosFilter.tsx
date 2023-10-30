import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { TodoContext } from '../TodoContext';
import { Status } from '../Types/Status';

export const TodosFilter: React.FC = () => {
  const {
    todos,
    setTodos,
    setVisibleTodos,
  } = useContext(TodoContext);

  const hasCompletedTodo = todos.some(todo => todo.completed);

  const [selectedFilter, setSelectedFilter] = useState(Status.All);

  const handleFilterTodo = (typeFilter: Status) => {
    switch (typeFilter) {
      case Status.Active:
        return () => {
          setVisibleTodos(todos.filter(todo => todo.completed !== true));
          setSelectedFilter(typeFilter);
        };

      case Status.Completed:
        return () => {
          setVisibleTodos(todos.filter(todo => todo.completed));
          setSelectedFilter(typeFilter);
        };

      case Status.All:
      default:
        return () => {
          setVisibleTodos(todos);
          setSelectedFilter(typeFilter);
        };
    }
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed !== true));
    setVisibleTodos(todos.filter(todo => todo.completed !== true));
  };

  const unCompletedCount = todos.filter(
    todo => todo.completed === false,
  ).length;

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${unCompletedCount} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({ selected: selectedFilter === Status.All })}
            onClick={handleFilterTodo(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: selectedFilter === Status.Active })}
            onClick={handleFilterTodo(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: selectedFilter === Status.Completed })}
            onClick={handleFilterTodo(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>
      {hasCompletedTodo && (
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
