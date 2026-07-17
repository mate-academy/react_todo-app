import React from 'react';
import { useTodo } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { state } = useTodo();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {state.todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
