import cn from 'classnames';
import React, { useContext, useMemo } from 'react';
import { TodoContext } from './TodoContext';
import { Status } from '../types/Status';

type Props = {};

export const Footer: React.FC<Props> = React.memo(() => {
  const {
    filter,
    setFilter,
    todos,
    setTodos,
    setChecked,
  } = useContext(TodoContext);

  const handleSelected = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const targetValue = event.target as HTMLElement;
    const ourText = targetValue.getAttribute('data-value');

    setFilter(ourText as Status);
  };

  const completedTodosCounter = useMemo(() => {
    return todos.filter(todo => todo.completed === true).length;
  }, [todos]);

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => todo.completed === false));
    setChecked(false);
  };

  const uncompletedTodosCounter = useMemo(() => {
    return todos.filter(todo => todo.completed === false).length;
  }, [todos]);

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodosCounter} item${uncompletedTodosCounter === 1 ? '' : 's'} left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            data-value={Status.ALL}
            href="#/"
            className={cn({
              selected: filter === Status.ALL,
            })}
            onClick={handleSelected}
          >
            All
          </a>
        </li>
        <li>
          <a
            data-value={Status.ACTIVE}
            href="#/active"
            className={cn({
              selected: filter === Status.ACTIVE,
            })}
            onClick={handleSelected}
          >
            Active
          </a>
        </li>

        <li>
          <a
            data-value={Status.COMPLETED}
            href="#/completed"
            className={cn({
              selected: filter === Status.COMPLETED,
            })}
            onClick={handleSelected}
          >
            Completed
          </a>
        </li>
      </ul>

      {completedTodosCounter > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
