import React from 'react';
import { Todo } from '../types/todo';

type Props = {
  todos: Todo[]
  onTodoDeleted: (value: boolean) => void
  completedTodos: Todo[],
};

export const TodosFilter: React.FC<Props> = ({
  todos,
  onTodoDeleted,
  completedTodos,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">

        {todos.length - completedTodos.length}
        {' '}
        items left
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">All</a>
        </li>

        <li>
          <a href="#/active">Active</a>
        </li>

        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      {(completedTodos.length > 0)
          && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => onTodoDeleted(true)}
            >
              Clear completed
            </button>
          ) }
    </footer>
  );
};
