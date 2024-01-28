import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status, TodosContext } from '../TodosContext.tsx/TodosContext';

export const TodosFilter: React.FC = () => {
  const { setQuery, query } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: query === Status.All,
          })}
          onClick={() => {
            setQuery(Status.All);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: query === Status.Active,
          })}
          onClick={() => {
            setQuery(Status.Active);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: query === Status.Completed,
          })}
          onClick={() => {
            setQuery(Status.Completed);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
