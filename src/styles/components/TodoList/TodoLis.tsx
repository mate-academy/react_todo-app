import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { useTodos } from '../../../Store';

export const TodoList: React.FC = () => {
  const { todos } = useTodos();

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
