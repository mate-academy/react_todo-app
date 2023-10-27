import React, { useContext } from 'react';
import cn from 'classnames';
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
  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleClearCompletedClick = () => {
    const updatedTodos = todos.filter(item => !item.completed);

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
            className={cn({ selected: currentAppliedFilter === Status.All })}
            onClick={() => onFilterChange(Status.All)}
          >
            {Status.All}
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: currentAppliedFilter === Status.Active })}
            onClick={() => onFilterChange(Status.Active)}
          >
            {Status.Active}
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({
              selected: currentAppliedFilter === Status.Completed,
            })}
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
