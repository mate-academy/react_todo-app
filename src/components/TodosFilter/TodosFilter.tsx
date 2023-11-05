import React from 'react';
import classNames from 'classnames';
import { Status } from '../../types/Status';
import { TodosContext } from '../../TodosContext';

export const TodosFilter: React.FC = () => {
  const { filteredType, setFilteredType } = React.useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filteredType === Status.All })}
          onClick={() => setFilteredType(Status.All)}
        >
          {Status.All}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: filteredType === Status.Active })}
          onClick={() => setFilteredType(Status.Active)}
        >
          {Status.Active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          // eslint-disable-next-line max-len
          className={classNames({ selected: filteredType === Status.Completed })}
          onClick={() => setFilteredType(Status.Completed)}
        >
          {Status.Completed}
        </a>
      </li>
    </ul>
  );
};
