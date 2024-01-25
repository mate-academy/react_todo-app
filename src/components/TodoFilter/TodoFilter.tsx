import classNames from 'classnames';
import { useContext } from 'react';
import { Status } from '../../types/Status';
import { TodosContext } from '../../contextes/TodosContext';

export const TodoFilter = () => {
  const { filterField, setFilterField } = useContext(TodosContext);
  const statuses = [
    Status.All,
    Status.Active,
    Status.Completed,
  ];

  return (
    <ul className="filters" data-cy="todosFilter">
      {statuses.map((status) => (
        <li>
          <a
            href="#/"
            onClick={() => setFilterField(status)}
            className={classNames({
              selected: filterField === status,
            })}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};
