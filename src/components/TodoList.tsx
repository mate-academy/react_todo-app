import React from 'react';
import { useTodos } from '../context/ TodosContext';
import { TodoItem } from '../components/TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodos();

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (visibleTodos.length === 0 && todos.length === 0) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
