import classNames from 'classnames';

import React, { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import { Filter } from '../../Utils/Filter';

type Props = {
  filter: Filter;
  onFilterChange: (
    event: React.MouseEvent<HTMLAnchorElement>,
    value: Filter,
  ) => void;
};

export const TodoFooter: React.FC<Props> = ({ filter, onFilterChange }) => {
  const { todos, dispatch, mainInputRef } = useContext(TodoContext);

  const focusMain = () => {
    mainInputRef.current?.focus();
  };

  const handleClearCompleted = () => {
    dispatch({
      type: 'clearCompleted',
    });
    focusMain();
  };

  const filterLinks = [
    { label: 'All', value: Filter.All, href: '#/', dataCy: 'FilterLinkAll' },

    {
      label: 'Active',
      value: Filter.Active,
      href: '#/active',
      dataCy: 'FilterLinkActive',
    },

    {
      label: 'Completed',
      value: Filter.Completed,
      href: '#/completed',
      dataCy: 'FilterLinkCompleted',
    },
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterLinks.map(({ label, value, href, dataCy }) => (
          <a
            key={value}
            href={href}
            className={classNames('filter__link', {
              selected: filter === value,
            })}
            data-cy={dataCy}
            onClick={event => onFilterChange(event, value)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
