import React from 'react';
import { Todo } from '../Types/Todo';
import { Filter } from './Filter';

type Props = {
  todos: Todo[],
  clearCompleted: () => void,
};

export const Footer: React.FC<Props> = ({ todos, clearCompleted }) => {
  const filterTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${filterTodos.length} items left`}
      </span>

      <Filter />

      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
