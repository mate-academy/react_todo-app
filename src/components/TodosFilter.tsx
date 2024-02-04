import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../variables/TodosContext.1';
import { Status } from '../types/Status';

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
