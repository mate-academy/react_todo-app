import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../contexts/TodoContext';
import { Todos } from '../types/Todos';
import { FilterStatus } from '../types/Status';

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
            className={classNames({ selected: status === FilterStatus.All })}
            onClick={() => setStatus(FilterStatus.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({ selected: status === FilterStatus.Active })}
            onClick={() => setStatus(FilterStatus.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({ selected: status === FilterStatus.Completed })}
            onClick={() => setStatus(FilterStatus.Completed)}
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
