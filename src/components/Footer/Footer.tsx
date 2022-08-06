import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../TodoFilter';

type Props = {
  todos: Todo[],
  onClearCompleted: () => void,
};

export const Footer: React.FC<Props> = ({ todos, onClearCompleted }) => {
  const todosLength = todos.filter(todo => !todo.completed).length;

  const todosCompletedLength = todos.filter(todo => todo.completed).length;

  return (
    <>
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {todosLength === 1
            ? `${todosLength} item left`
            : `${todosLength} items left`}
        </span>

        <TodoFilter />

        {todosCompletedLength > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={onClearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    </>
  );
};
