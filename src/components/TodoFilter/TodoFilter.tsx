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

type Props = {
  setFilter: (filter: StatusType) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
}) => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const numberOfActiveTodos = todos.filter((todo) => !todo.completed).length;

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const deleteCompletedTodos = () => {
    dispatch({ type: 'DELETE_ALL_COMPLETED_TODOS' });
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${numberOfActiveTodos} items left`}
      </span>

      <ul className="filters">

        {filterOptions.map(
          ({ label, href }) => (
            <li
              key={label}
              className={classNames({ selected: true })}
            >
              <a
                href={href}
                onClick={() => setFilter(label)}
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
            onClick={() => deleteCompletedTodos()}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
