import classNames from 'classnames';
import { useContext } from 'react';
import { Status } from '../../types/Status';
import { TodosContext } from '../../contextes/TodosContext';

export const TodoFilter = () => {
  const { filterField, setFilterField } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          onClick={() => setFilterField(Status.All)}
          className={classNames({
            selected: filterField === Status.All,
          })}
        >
          {Status.All}
        </a>
      </li>

      <li>
        <a
          onClick={() => setFilterField(Status.Active)}
          href="#/active"
          className={classNames({
            selected: filterField === Status.Active,
          })}
        >
          {Status.Active}
        </a>
      </li>

      <li>
        <a
          onClick={() => setFilterField(Status.Completed)}
          href="#/completed"
          className={classNames({
            selected: filterField === Status.Completed,
          })}
        >
          {Status.Completed}
        </a>
      </li>
    </ul>
  );
};
