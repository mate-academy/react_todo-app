import React from 'react';
import { useTodos } from '../context/TodoContext';
import { Todo } from './Todo';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
