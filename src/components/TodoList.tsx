import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodos } from '../context/TodoContext';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodos();

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
