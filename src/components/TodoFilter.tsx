import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../context/TodosContext';
import { filterOptions } from '../constants/filterOptions';

type Props = {};

export const TodoFilter: React.FC<Props> = () => {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      {filterOptions.map(({ label, status }) => (
        <li key={status}>
          <a
            href={`#/${status.toLowerCase()}`}
            className={classNames({ selected: filter === status })}
            onClick={() => setFilter(status)}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
};
