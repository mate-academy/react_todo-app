import { useContext } from 'react';
import './TodosFilter.css';
import { TodosContext } from '../../context/TodosContext';
import { Status } from '../../types/Status';

export const TodosFilter: React.FC = () => {
  const { setFilterTodos } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className="selected"
          onClick={() => setFilterTodos(Status.all)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={() => setFilterTodos(Status.active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={() => setFilterTodos(Status.completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
