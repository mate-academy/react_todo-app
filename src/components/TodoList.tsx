import React from 'react';
import { Todo, useTodosContext } from './utils';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos } = useTodosContext();

  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.length > 0 && todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
