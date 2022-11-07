import React from 'react';
import { Todo } from '../../types/Todo';
import { PageNavLink } from '../PageNavLink/PageNavLink';

type Props = {
  todos: Todo[],
  onDelete: (todoid: number) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
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
          <PageNavLink
            to="/"
            text="All"
          />
        </li>

        <li>
          <PageNavLink
            to="/active"
            text="Active"
          />
        </li>

        <li>
          <PageNavLink
            to="/completed"
            text="Completed"
          />
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
