// import React from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

type Props = {
  todos: Todo[],
  todoStatus: Status,
  setTodoStatus: (status: Status) => void,
  clearCompletedTodos: () => void,
};

export const TodosFilter: React.FC<Props> = ({
  todos, todoStatus, setTodoStatus, clearCompletedTodos,
}) => {
  const countActiveTodo = todos.filter(todo => !todo.completed).length;
  const countCompletedTodo = todos.filter(todo => todo.completed).length;

  const handleAllTodos = () => {
    setTodoStatus(Status.All);
  };

  const handleActiveTodos = () => {
    setTodoStatus(Status.Active);
  };

  const handleCompletedTodos = () => {
    setTodoStatus(Status.Completed);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {` ${countActiveTodo} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={classNames({ selected: todoStatus === Status.All })}
            onClick={handleAllTodos}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames({
              selected: todoStatus === Status.Active,
            })}
            onClick={handleActiveTodos}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames({
              selected: todoStatus === Status.Completed,
            })}
            onClick={handleCompletedTodos}
          >
            Completed
          </a>
        </li>
      </ul>

      {countCompletedTodo > 0 && (
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
};
