import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext';

export const TodosFilter: React.FC = () => {
  const { todo, setTodo, finishedTodos } = useContext(TodoContext);
  const { activeTodos, setVisibleTodoses } = useContext(TodoContext);
  const [type, setType] = useState('all');

  useEffect(() => {
    switch (type) {
      case 'active':
        setVisibleTodoses(activeTodos);
        break;
      case 'completed':
        setVisibleTodoses(finishedTodos);
        break;
      default:
        setVisibleTodoses(todo);
    }
  }, [type, todo]);

  return (
    <>
      {todo.length > 0 && (
        <>
          <footer className="footer">
            <span
              data-cy="todosCounter"
              className="todo-count">
              {`${activeTodos.length} items left`}
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={classNames({ selected: type === 'all' })}
                  onClick={() => setType('all')}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={classNames({ selected: type === 'active' })}
                  onClick={() => setType('active')}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="#/completed"
                  className={classNames({ selected: type === 'completed' })}
                  onClick={() => setType('completed')}
                >
                  Completed
                </a>
              </li>
            </ul>

            {finishedTodos.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => setTodo(activeTodos)}
              >
                Clear completed
              </button>
            )}

          </footer>
        </>
      )}

    </>
  );
};
