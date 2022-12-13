import React from 'react';
import { Todo } from '../types/Todo';
import { Navigation } from './Navigation';

type Props = {
  todos: Todo[];
  clearCompleted: () => void;
};

export const TodosFilter: React.FC<Props> = ({
  todos,
  clearCompleted,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos} items left`}
      </span>

      <Navigation />

      {completedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
