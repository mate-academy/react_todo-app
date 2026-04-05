import React from 'react';
import { useTodos } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
