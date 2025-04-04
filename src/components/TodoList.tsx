import React from 'react';
import { useTodo } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useTodo();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
