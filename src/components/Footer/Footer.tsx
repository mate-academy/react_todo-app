import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../Types/Todo';
import { deleteTodo } from '../../api/api';

type Props = {
  sortQuery: string,
  activeTodos: number,
  setSearchParams: (arg: { filterBy: string } | {}) => any,
  todos: Todo[],
};

export const Footer: React.FC<Props> = ({
  setSearchParams,
  activeTodos,
  sortQuery,
  todos,
}) => {
  const clearCopleted = () => {
    return todos.forEach(todo => (
      (todo.completed) && deleteTodo(todo.id)
    ));
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      <ul className="filters">
        <li>
          <button
            type="button"
            className={classnames('filter__button',
              { 'filter__button selected': !sortQuery })}
            onClick={() => setSearchParams({})}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={classnames('filter__button',
              { 'filter__button selected': sortQuery === 'active' })}
            onClick={() => setSearchParams({ filterBy: 'active' })}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={classnames('filter__button',
              { 'filter__button selected': sortQuery === 'selected' })}
            onClick={() => setSearchParams({ filterBy: 'completed' })}
          >
            Completed
          </button>
        </li>
      </ul>
      {todos.some(todo => todo.completed === true) && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCopleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
