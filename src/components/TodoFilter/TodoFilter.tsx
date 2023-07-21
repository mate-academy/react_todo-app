import classNames from 'classnames';
import React from 'react';
import { ITodo, StatusType } from '../../types';

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
  todos: ITodo[];
  setFilter: (filter: StatusType) => void;
  setTodos: (todos: ITodo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  setFilter,
  setTodos,
}) => {
  const numberOfActiveTodos = todos.filter((todo) => !todo.completed).length;

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
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
                onClick={() => setFilter(label as StatusType)}
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
