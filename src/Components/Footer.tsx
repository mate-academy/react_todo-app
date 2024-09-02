import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../Types/todo';
import { Filter } from '../Types/filter';
import { TodoContext } from './Context/TodoContext';

type Props = {
  setFilter: (Filter: Filter) => void;
  filter: Filter;
  clearCompleted: () => void;
  active: Todo[];
  completed: Todo[];
};

export const Footer: React.FC<Props> = ({
  setFilter,
  filter,
  clearCompleted,
  active,
  completed,
}) => {
  const { todos } = useContext(TodoContext);

  if (todos.length === 0) {
    return null;
  }

  const handleAllClick = () => {
    setFilter(Filter.All);
  };

  const handleActiveClick = () => {
    setFilter(Filter.Active);
  };

  const handleCompletedClick = () => {
    setFilter(Filter.Completed);
  };

  const handleClearClick = () => {
    clearCompleted();
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {active.length === 1
          ? `${active.length} item left`
          : `${active.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({ "selected": filter === Filter.All })}
            onClick={handleAllClick}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ "selected": filter === Filter.Active })}
            onClick={handleActiveClick}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ "selected": filter === Filter.Completed })}
            onClick={handleCompletedClick}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={handleClearClick}
        disabled={completed.length===0}
      >
        Clear completed
      </button>
    </footer>
  );
};
