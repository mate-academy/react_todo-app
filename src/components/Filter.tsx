import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status } from '../types/Type';
import { TodoContext } from '../context/TodosContext';

export const Filter: React.FC = () => {
  const { status, setStatus } = useContext(TodoContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        {Object.values(Status).map(value => (
          <a
            key={value}
            href={`#${value}`}
            className={classNames('filter__link', {
              selected: status === value,
            })}
            onClick={() => setStatus(value)}
            data-cy={`FilterLink${value}`}
          >
            {value}
          </a>
        ))}
        {/* <a
          href="#/"
          className={classNames({ selected: status === Status.All })}
          onClick={() => setStatus(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: status === Status.Active })}
          onClick={() => setStatus(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: status === Status.Completed })}
          onClick={() => setStatus(Status.Completed)}
        >
          Completed
        </a> */}
      </li>
    </ul>
  );
};
