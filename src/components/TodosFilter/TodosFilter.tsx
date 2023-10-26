import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { Status } from '../../data/enums';

type Props = {
  currentAppliedFilter: Status;
  onFilterChange: (newFilter: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({
  currentAppliedFilter,
  onFilterChange,
}) => {
  const { todos, setTodos } = useContext(TodosContext);
  const notCompletedTodos = todos.filter(todo => todo.completed === false);
  const completedTodos = todos.filter(todo => todo.completed === true);

  const handleClearCompletedClick = () => {
    const updatedTodos = todos.filter(item => item.completed === false);

    setTodos(updatedTodos);
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={currentAppliedFilter === Status.All ? 'selected' : ''}
            onClick={() => onFilterChange(Status.All)}
          >
            {Status.All}
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={currentAppliedFilter === Status.Active ? 'selected' : ''}
            onClick={() => onFilterChange(Status.Active)}
          >
            {Status.Active}
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={currentAppliedFilter === Status.Completed
              ? 'selected' : ''}
            onClick={() => onFilterChange(Status.Completed)}
          >
            {Status.Completed}
          </a>
        </li>
      </ul>

      {completedTodos.length !== 0
        && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompletedClick}
          >
            Clear completed
          </button>
        )}
    </footer>
  );
};
