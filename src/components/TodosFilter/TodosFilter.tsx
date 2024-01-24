import { useContext } from 'react';
import './TodosFilter.css';
import { TodosContext } from '../../context/TodosContext';
import { Status } from '../../types/Status';
import classNames from 'classnames';

export const TodosFilter: React.FC = () => {
  const { filteredTodos, setFilterTodos } = useContext(TodosContext);
  // хотів зробити

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filteredTodos === Status.all,
          })}
          onClick={() => setFilterTodos(Status.all)}
        >
          {Status.all}
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filteredTodos === Status.active,
          })}
          onClick={() => setFilterTodos(Status.active)}
        >
          {Status.active}
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filteredTodos === Status.completed,
          })}
          onClick={() => setFilterTodos(Status.completed)}
        >
          {Status.completed}
        </a>
      </li>
    </ul>
  );
};
