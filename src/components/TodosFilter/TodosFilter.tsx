import { useContext } from 'react';
import './TodosFilter.css';
import classNames from 'classnames';
import { TodosContext } from '../../context/TodosContext';
import { Status } from '../../types/Status';

export const TodosFilter: React.FC = () => {
  const { filterTodos, setFilterTodos } = useContext(TodosContext);
  const filtersStatus = [
    Status.all,
    Status.active,
    Status.completed,
  ];

  return (
    <ul className="filters" data-cy="todosFilter">
      {filtersStatus.map((status) => (
        <li>
          <a
            href="#/"
            className={classNames({
              selected: filterTodos === status,
            })}
            onClick={() => setFilterTodos(status)}
          >
            {status}
          </a>
        </li>
      ))}
    </ul>
  );
};
