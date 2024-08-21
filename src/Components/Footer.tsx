import React from 'react';
import { Todo } from '../Types/todo';
import { Filter } from '../Types/filter'

type Props = {
  todos: Todo[]
  setFilter: (Filter: Filter) => void;
  clearCompleted: () => void;
  completed: Todo[];
}

export const Footer: React.FC<Props> = ({ todos, setFilter, clearCompleted, completed}) => {
  if (todos.length === 0) {
    return null
  }

  const handleAllClick = () => {
    setFilter(Filter.All)
  };

  const handleActiveClick = () => {
    setFilter(Filter.Active)
  };

  const handleCompletedClick = () => {
    setFilter(Filter.Completed)
  };

  const handleClearClick = () => {
    clearCompleted();
  }

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.length === 1
          ? `${todos.length} item left`
          : `${todos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a href="#/"
            className="selected"
            onClick={handleAllClick}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={handleActiveClick}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={handleCompletedClick}
          >
            Completed
          </a>
        </li>
      </ul>

      {completed.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearClick}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
}
