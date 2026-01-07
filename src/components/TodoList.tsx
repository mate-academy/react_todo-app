import React from 'react';
import { useTodos } from '../context/TodosContext';
import { TodoItem } from '../components/TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodos();

  if (todos.length === 0) {
    return null;
  }

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

  return (
    <section className="todoapp__main">
      <ul className="todoapp__list" data-cy="TodoList">
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};
