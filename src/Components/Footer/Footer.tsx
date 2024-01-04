import React, { useContext, useEffect } from 'react';
import { DispatchContext, TodoContext } from '../../Data/Store';

export const Footer: React.FC = () => {
  const {
    todos,
    filterActive,
    selectedAll,
    selectedCompleted,
  } = useContext(TodoContext);

  const dispatch = useContext(DispatchContext);
  const todosNotCompleted = todos.filter(todo => todo.completed === false);
  const numberItemsLeft = todosNotCompleted.length;

  useEffect(() => {
    dispatch({ type: 'selectedAll' });
  }, [dispatch]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${numberItemsLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={`${selectedAll && 'selected'}`}
            onClick={() => {
              dispatch({ type: 'selectedAll' });
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={`${filterActive && 'selected'}`}
            onClick={() => {
              dispatch({ type: 'filterActive' });
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={`${selectedCompleted && 'selected'}`}
            onClick={() => {
              dispatch({ type: 'selectedCompleted' });
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={() => {
          dispatch({ type: 'clearCompleted' });
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
