import React, { useMemo } from 'react';
import cn from 'classnames';
import { TodosStatus } from '../../types/enums';
import { useTodosContext } from '../../context/TodoContext';
interface Props {
  activeStatus: TodosStatus;
  onStatusChange: (status: TodosStatus) => void;
  onClearCompleted: () => void;
  completedTodosExist: boolean;
}

const FILTER_LINKS = [
  { status: TodosStatus.ALL, href: '#/', text: 'All' },
  { status: TodosStatus.ACTIVE, href: '#/active', text: 'Active' },
  { status: TodosStatus.COMPLETED, href: '#/completed', text: 'Completed' },
];

const FooterComponent: React.FC<Props> = ({
  activeStatus,
  onStatusChange,
  onClearCompleted,
}) => {
  const { todos } = useTodosContext();

  const itemsCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const completedTodosExist = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${itemsCount} item${itemsCount !== 1 ? 's' : ''} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {FILTER_LINKS.map(({ status, href, text }) => (
          <a
            key={href}
            href={href}
            data-cy={`FilterLink${text}`}
            className={cn('filter__link', {
              selected: activeStatus === status,
            })}
            onClick={event => {
              event.preventDefault();
              onStatusChange(status);
            }}
          >
            {text}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={!completedTodosExist}
      >
        Clear completed
      </button>
    </footer>
  );
};

export const Footer = React.memo(FooterComponent);
