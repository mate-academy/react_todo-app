import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import React from 'react';

type Props = {
  sortField: Status;
  setSortField: (field: Status) => void;
  todos: Todo[];
  clearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  sortField,
  setSortField,
  todos,
  clearCompleted,
}) => {
  const oneTodoCompleted = todos.some(todo => todo.completed);

  const activeTodos = todos.reduce(
    (acc, todo) => (todo.completed ? acc : acc + 1),
    0,
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${sortField === Status.All && 'selected'}`}
          data-cy="FilterLinkAll"
          onClick={() => setSortField(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${sortField === Status.Active && 'selected'}`}
          data-cy="FilterLinkActive"
          onClick={() => setSortField(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${sortField === Status.Completed && 'selected'}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setSortField(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        onClick={clearCompleted}
        disabled={!oneTodoCompleted}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
