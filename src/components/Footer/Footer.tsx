import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  filter: string;
  numberOfCompletedTodos: number;
  numberOfTodos: number;
  deleteCompleted: () => void;
}

export const Footer: FC<Props> = ({
  filter, numberOfCompletedTodos, numberOfTodos, deleteCompleted,
}) => {
  const numberOfActiveTodos = numberOfTodos - numberOfCompletedTodos;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {numberOfActiveTodos}
        &nbsp;items left
      </span>

      <ul className="filters">
        <li>
          <Link
            to="/"
            className={classNames({ selected: filter === 'all' })}
          >
            All
          </Link>
        </li>

        <li>
          <Link
            to="/active"
            className={classNames({ selected: filter === 'active' })}
          >
            Active
          </Link>
        </li>

        <li>
          <Link
            to="/completed"
            className={classNames({ selected: filter === 'completed' })}
          >
            Completed
          </Link>
        </li>
      </ul>

      {numberOfCompletedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
