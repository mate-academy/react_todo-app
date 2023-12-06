import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

interface TodosFilterProps {
  itemLeftToDo: number,
  handleTodoList: (modifier: string) => void,
  handleClearCompleted: () => void,
  itemDone: number,
}

export const TodosFilter: React.FC<TodosFilterProps> = ({
  itemLeftToDo,
  handleTodoList,
  handleClearCompleted,
  itemDone,
}) => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      <span className="todo-count" data-cy="todosCounter">
        {`${itemLeftToDo} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames({
              selected: currentHash === '#/',
            })}
            onClick={() => handleTodoList('all')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: currentHash === '#/active',
            })}
            onClick={() => handleTodoList('active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: currentHash === '#/completed',
            })}
            onClick={() => handleTodoList('completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      {
        itemDone > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        )
      }
    </>
  );
};
