import React, { useCallback, useContext, useMemo } from 'react';
import { Status } from '../types/Status';
import { TodosContext } from '../services/TodosContext';
import cn from 'classnames';

type Props = {
  status: Status;
  selectStatus: (newStatus: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({ status, selectStatus }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const completedTodosCount = useMemo(() => {
    let count = 0;

    todos.forEach(todoItem => {
      if (todoItem.completed) {
        count += 1;
      }
    });

    return count;
  }, [todos]);

  const notCompletedTodosCount = useMemo(
    () => todos.length - completedTodosCount,
    [completedTodosCount, todos],
  );

  const handleClearCompleted = useCallback((): void => {
    setTodos(todos.filter(todoItem => !todoItem.completed));
  }, [todos, setTodos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: status === Status.all })}
          data-cy="FilterLinkAll"
          onClick={() => selectStatus(Status.all)}
        >
          {Status.all}
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: status === Status.active })}
          data-cy="FilterLinkActive"
          onClick={() => selectStatus(Status.active)}
        >
          {Status.active}
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: status === Status.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => selectStatus(Status.completed)}
        >
          {Status.completed}
        </a>
      </nav>
      {completedTodosCount > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
