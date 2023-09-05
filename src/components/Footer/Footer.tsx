import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';
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
  } = useContext(TodosContext);

  const notCompletedAmount = getNumberActiveTodos(todos);

  const [clearButtonIsShown, setClearButtonIsShown] = useState(false);
  const [footerIsShown, setFooterIsShown] = useState(false);

  useEffect(() => {
    const hasCompletedTodos = todos.some((todo) => todo.completed);

    setClearButtonIsShown(hasCompletedTodos);
    setFooterIsShown(todos.length > 0);
  }, [todos]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const newStatus = event.currentTarget.textContent || 'All';

    setTodosStatus(newStatus);
  };

  const clearCompleted = () => {
    const todosWithoutCompleted = todos.filter(todo => !todo.completed);

    setTodos(todosWithoutCompleted);
  };

  return (
    <>
      {footerIsShown && (
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
      )}
    </>
  );
};
