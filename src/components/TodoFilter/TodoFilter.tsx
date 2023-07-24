import classNames from 'classnames';
import React, { useContext } from 'react';
import { StatusType } from '../../types';
import { DispatchContext, StateContext } from '../Store';

const filterOptions = [
  {
    label: StatusType.All,
    href: '#/',
  },
  {
    label: StatusType.Active,
    href: '#/active',
  },
  {
    label: StatusType.Completed,
    href: '#/completed',
  },
];

export const TodoFilter: React.FC = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const numberOfActiveTodos = todos.filter((todo) => !todo.completed).length;
  const hasCompletedTodos = todos.some((todo) => todo.completed);

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${numberOfActiveTodos} items left`}
      </span>

      <ul className="filters">

        {filterOptions.map(
          ({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={classNames({ selected: filter === label })}
                onClick={() => dispatch({ type: 'SET_FILTER', payload: label })}
              >
                {label}
              </a>
            </li>
          ),
        )}
      </ul>

      {
        hasCompletedTodos && (
          <button
            type="button"
            className="clear-completed"
            onClick={() => dispatch({ type: 'DELETE_ALL_COMPLETED_TODOS' })}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
