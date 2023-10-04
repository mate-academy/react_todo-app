import React from 'react';
import classNames from 'classnames';
import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  todoFilter: TodoStatus;
  setFilterBy: (filter: TodoStatus) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  todoFilter,
  setFilterBy,
}) => {
  const itemsLeft = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed);

  const handleDeleteTodosCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: todoFilter === TodoStatus.All,
            })}
            onClick={() => setFilterBy(TodoStatus.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: todoFilter === TodoStatus.Active,
            })}
            onClick={() => setFilterBy(TodoStatus.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: todoFilter === TodoStatus.Completed,
            })}
            onClick={() => setFilterBy(TodoStatus.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>

      {!!completedTodos.length && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteTodosCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
