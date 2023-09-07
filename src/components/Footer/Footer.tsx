import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useTodos } from '../TodosContext/TodosContext';
import { Status } from '../../types/Status';

function getNumberActiveTodos(arrOfTodos: Todo[]) {
  let count = 0;

  arrOfTodos.forEach((item) => {
    if (!item.completed) {
      count += 1;
    }
  });

  return count;
}

export const Footer: React.FC = () => {
  const {
    todos,
    todosStatus,
    setTodosStatus,
    setTodos,
  } = useTodos();

  const notCompletedAmount = getNumberActiveTodos(todos);

  const [clearButtonIsShown, setClearButtonIsShown] = useState(false);

  useEffect(() => {
    const hasCompletedTodos = todos.some((todo) => todo.completed);

    setClearButtonIsShown(hasCompletedTodos);
  }, [todos]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    switch (event.currentTarget.textContent) {
      case Status.Active:
        setTodosStatus(Status.Active);
        break;

      case Status.Completed:
        setTodosStatus(Status.Completed);
        break;

      default: setTodosStatus(Status.All);
    }
  };

  const clearCompleted = () => {
    const todosWithoutCompleted = todos.filter(todo => !todo.completed);

    setTodos(todosWithoutCompleted);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedAmount} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: todosStatus === Status.All,
            })}
            onClick={handleClick}
          >
            {Status.All}
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: todosStatus === Status.Active,
            })}
            onClick={handleClick}
          >
            {Status.Active}
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: todosStatus === Status.Completed,
            })}
            onClick={handleClick}
          >
            {Status.Completed}
          </a>
        </li>
      </ul>

      {clearButtonIsShown && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
