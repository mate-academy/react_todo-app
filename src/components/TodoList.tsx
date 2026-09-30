import React from 'react';
import { useTodos } from '../context/TodosContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
