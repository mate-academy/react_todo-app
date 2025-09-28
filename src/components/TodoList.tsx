import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodos } from '../context/TodosContext';

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
