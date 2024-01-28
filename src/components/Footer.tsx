import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../contexts/TodoContext';
import { Todos } from '../types/Todos';
import { Status } from '../types/Status';

export const Footer: React.FC = () => {
  const {
    todos, setStatus, status, clearTodo,
  } = useContext(TodoContext);
  const visibleTodo = todos.some(todo => todo.completed);

  const unCompletedTodos = (todosList: Todos[]) => {
    return todosList.filter(todo => !todo.completed).length;
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${unCompletedTodos(todos)} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames({ selected: status === Status.All })}
            onClick={() => setStatus(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: status === Status.Active })}
            onClick={() => setStatus(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: status === Status.Completed })}
            onClick={() => setStatus(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {visibleTodo && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearTodo}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
