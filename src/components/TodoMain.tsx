import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoItem } from './TodoItem';
import { TodoStatus } from '../types/TodoStatus';

export const TodoMain: React.FC = () => {
  const { state } = useContext(TodoContext);

  const todos = state.todos.filter(todo => {
    switch (state.filter) {
      case TodoStatus.Active:
        return !todo.completed;
      case TodoStatus.Completed:
        return todo.completed;
      case TodoStatus.All:
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
