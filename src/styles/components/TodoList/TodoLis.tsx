import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { useTodos } from '../../../Store';

export const TodoList: React.FC = () => {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return null;
  }

  return (
    <ul
      className="todo-list"
      data-cy="todosList"
    >
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
