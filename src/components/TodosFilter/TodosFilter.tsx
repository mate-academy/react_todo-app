import React from 'react';
import classnames from 'classnames';
import { StatusEnum } from '../../interfaces/StatusEnum';

type Props = {
  filter: StatusEnum;
  onChangeFilter: (newFilter:StatusEnum) => void;
};

export const TodosFilter:React.FC<Props> = ({ filter, onChangeFilter }) => (
  <ul className="filters" data-cy="todosFilter">
    <li>
      <a
        href="#/"
        className={classnames({ selected: filter === StatusEnum.All })}
        onClick={() => onChangeFilter(StatusEnum.All)}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        className={classnames({ selected: filter === StatusEnum.Active })}
        onClick={() => onChangeFilter(StatusEnum.Active)}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        className={classnames({ selected: filter === StatusEnum.Completed })}
        onClick={() => onChangeFilter(StatusEnum.Completed)}
      >
        Completed
      </a>
    </li>
  </ul>
);
