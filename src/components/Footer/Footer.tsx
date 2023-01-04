import React from 'react';
import { Todo } from '../../types/Todo';
import { Navigation } from './Navigation';

type Props = {
  todos: Todo[];
  onDelete: () => Promise<void>;
};

export const Footer: React.FC<Props> = ({ todos, onDelete }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const comletedTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="todosCounter">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <Navigation />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={onDelete}
      >
        {comletedTodos.length ? 'Clear completed' : ''}
      </button>

    </footer>
  );
};
