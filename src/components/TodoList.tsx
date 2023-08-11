import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodo } from '../hooks/useTodo';

export const TodoList: React.FC = React.memo(() => {
  const { visibleTodos } = useTodo();

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos().map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
});
