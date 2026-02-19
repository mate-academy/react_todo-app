import React from 'react';
import { useTodos } from '../../context/TodosContext';
import classNames from 'classnames';
import { FilterEnum } from '../../context/types';

export const Footer: React.FC = () => {
  const { state, dispatch } = useTodos();
  const { todos, filter } = state;

  const activeCount = todos.filter(t => !t.completed).length;
  const hasCompleted = todos.some(t => t.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {[FilterEnum.All, FilterEnum.Active, FilterEnum.Completed].map(f => (
          <a
            key={f}
            href={`#/${f}`}
            className={classNames('filter__link', { selected: filter === f })}
            onClick={() => {
              dispatch({ type: 'SET_FILTER', payload: f });
            }}
            data-cy={`FilterLink${f[0].toUpperCase() + f.slice(1)}`}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!hasCompleted}
        data-cy="ClearCompletedButton"
        onClick={() => {
          dispatch({ type: 'CLEAR_COMPLETED' });
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
