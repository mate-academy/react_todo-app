import React, { useContext } from 'react';
import { DispatchContext, TodosContext } from '../../Store';

export const Footer: React.FC = () => {
  const {
    todos,
    selectedAll,
    showActiveTodos,
    selectedCompleted,
  } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const todosNotCompleted = todos.filter(todo => todo.completed === false);
  const numberNotCompletedTodos = todosNotCompleted.length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${numberNotCompletedTodos} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={`${selectedAll && 'selected'}`}
            onClick={() => dispatch({ type: 'selectedAll' })}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={`${showActiveTodos && 'selected'}`}
            onClick={() => dispatch({ type: 'selectedActive' })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={`${selectedCompleted && 'selected'}`}
            onClick={() => dispatch({ type: 'selectedCompleted' })}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={() => dispatch({ type: 'removeTodosCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
