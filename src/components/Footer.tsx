import React from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from './TodoFilter';

type Props = {
  numberOfActiveTodos: number,
  numberOfCompletedTodos: number,
  todos: Todo[],
  deleteTodo: (todoId: number) => void,
};

export const Footer: React.FC<Props> = ({
  numberOfActiveTodos,
  numberOfCompletedTodos,
  todos,
  deleteTodo,
}) => {
  const clearCompleted = () => {
    Promise.all(todos.filter(todo => todo.completed)
      .map(todo => deleteTodo(todo.id)));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${numberOfActiveTodos} items left`}
      </span>

      <TodoFilter />

      {!!numberOfCompletedTodos && (
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
