import cn from 'classnames';
import React, { useContext } from 'react';
import { TodoContext } from './TodoProvider';
import { Status } from './Status/Status';

const TodosFilter: React.FC = () => {
  const { locationPage } = useContext(TodoContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a href="#/" className={cn({ selected: Status.all === locationPage })}>
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: Status.active === locationPage })}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: Status.completed === locationPage })}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TodosFilter;
