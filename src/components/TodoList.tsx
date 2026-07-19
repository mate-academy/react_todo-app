import React from 'react';
import { useTodo } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { state } = useTodo();
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') {
      return !todo.completed;
    }

    if (state.filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
