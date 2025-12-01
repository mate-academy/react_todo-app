import cn from 'classnames';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import React, { useContext } from 'react';
import { TodosContext } from '../todosContext';

interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  deleteAllCompleted: (todos: Todo[]) => void;
  isInputDisabled: boolean;
}

export const Footer: React.FC<Props> = ({
  filter,
  setFilter,
  deleteAllCompleted,
  isInputDisabled,
}) => {
  const { todos } = useContext(TodosContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === Filter.All })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => deleteAllCompleted(todos.filter(td => td.completed))}
        disabled={isInputDisabled || todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
