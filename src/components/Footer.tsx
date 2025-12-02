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
  const amountOfNotCompleted = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${amountOfNotCompleted} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(f => {
          const label = f[0].toUpperCase() + f.slice(1);
          const href = f === Filter.All ? '#/' : `#/${f}`;
          const dataCy = `FilterLink${label}`;

          return (
            <a
              key={f}
              href={href}
              className={cn('filter__link', {
                selected: filter === f,
              })}
              data-cy={dataCy}
              onClick={() => setFilter(f)}
            >
              {label}
            </a>
          );
        })}
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
