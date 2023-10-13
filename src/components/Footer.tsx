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
    const ourText = targetValue.innerText;

    setFilter(ourText as Status);
  };

  const completedTodosCounter = useMemo(() => {
    return todos.filter(todo => todo.completed === true).length;
  }, [todos]);

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => todo.completed === false));
    setChecked(false);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.length === 1 ? (
          `${todos.length} items left`
        ) : (
          `${todos.length} item left`
        )}
      </span>

      <ul className="filters" data-cy="todosList">
        <li>
          <a
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
