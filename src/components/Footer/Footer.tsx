import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[],
  filter: string,
  onFilterSelect: (Status: string) => void,
  onDelete: (todoid: number) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  onFilterSelect,
  onDelete,
}) => {
  const handleClearCompleted = () => {
    todos.filter(todo => todo.completed)
      .forEach(todo => onDelete(todo.id));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <ul className="filters">
        <li>
          <Link
            to="/"
            className={
              classnames(
                { selected: filter === Status.All },
              )
            }
            onClick={() => onFilterSelect(Status.All)}
          >
            All
          </Link>
        </li>

        <li>
          <Link
            to="/active"
            className={
              classnames(
                { selected: filter === Status.Active },
              )
            }
            onClick={() => onFilterSelect(Status.Active)}
          >
            Active
          </Link>
        </li>

        <li>
          <Link
            to="/completed"
            className={
              classnames(
                { selected: filter === Status.Completed },
              )
            }
            onClick={() => onFilterSelect(Status.Completed)}
          >
            Completed
          </Link>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompleted}
      >
        {todos.some(todo => todo.completed) && 'Clear completed'}
      </button>
    </footer>
  );
};
