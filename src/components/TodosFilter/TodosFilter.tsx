import { useContext } from 'react';
import './TodosFilter.css';
import classNames from 'classnames';
import { TodosContext } from '../../context/TodosContext';
import { Status } from '../../types/Status';

export const TodosFilter: React.FC = () => {
  const { filterTodos, setFilterTodos } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filterTodos === Status.all,
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
            selected: filterTodos === Status.active,
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
            selected: filterTodos === Status.completed,
          })}
          onClick={() => setFilterTodos(Status.completed)}
        >
          {Status.completed}
        </a>
      </li>
    </ul>
  );
};
